import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import LinearProgress from '@mui/joy/LinearProgress';
import Alert from '@mui/joy/Alert';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Grid from '@mui/joy/Grid';
import Slider from '@mui/joy/Slider';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import { OSB_THRESHOLDS } from '../data/formData';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';

interface BudgetExpense {
  id: string;
  name: string;
  amount: string;
  category: string;
  isNonDiscretionary: boolean;
}

const expenseCategories = [
  'Housing',
  'Food & Groceries',
  'Transportation',
  'Utilities',
  'Medical & Health',
  'Personal Care',
  'Childcare',
  'Insurance',
  'Entertainment',
  'Clothing',
  'Education',
  'Savings',
  'Other',
];

const categoryColors: Record<string, string> = {
  'Housing': '#3B82F6',
  'Food & Groceries': '#10B981',
  'Transportation': '#8B5CF6',
  'Utilities': '#F59E0B',
  'Medical & Health': '#EF4444',
  'Personal Care': '#EC4899',
  'Childcare': '#06B6D4',
  'Insurance': '#14B8A6',
  'Entertainment': '#F97316',
  'Clothing': '#84CC16',
  'Education': '#6366F1',
  'Savings': '#22C55E',
  'Other': '#94A3B8',
};

const defaultExpenses: BudgetExpense[] = [
  { id: '1', name: 'Rent / Mortgage', amount: '1450', category: 'Housing', isNonDiscretionary: true },
  { id: '2', name: 'Hydro / Electricity', amount: '89', category: 'Utilities', isNonDiscretionary: true },
  { id: '3', name: 'Natural Gas / Heat', amount: '95', category: 'Utilities', isNonDiscretionary: true },
  { id: '4', name: 'Cell Phone', amount: '65', category: 'Utilities', isNonDiscretionary: true },
  { id: '5', name: 'Internet', amount: '70', category: 'Utilities', isNonDiscretionary: true },
  { id: '6', name: 'Groceries', amount: '450', category: 'Food & Groceries', isNonDiscretionary: true },
  { id: '7', name: 'Car Insurance', amount: '175', category: 'Transportation', isNonDiscretionary: true },
  { id: '8', name: 'Gas / Fuel', amount: '180', category: 'Transportation', isNonDiscretionary: true },
  { id: '9', name: 'Personal Care', amount: '75', category: 'Personal Care', isNonDiscretionary: true },
  { id: '10', name: 'Clothing', amount: '80', category: 'Clothing', isNonDiscretionary: true },
  { id: '11', name: 'Recreation', amount: '50', category: 'Entertainment', isNonDiscretionary: false },
  { id: '12', name: 'Prescriptions', amount: '45', category: 'Medical & Health', isNonDiscretionary: true },
];

const fmt = (n: number) =>
  n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2 });

const fmtShort = (n: number) =>
  n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

const generateId = () => Math.random().toString(36).slice(2, 9);

const budgetTips = [
  {
    title: 'Every Expense Counts',
    body: 'Make sure every non-discretionary expense is listed. Your bankruptcy payment is based on what\'s left over after all your essential expenses.',
    icon: <CheckCircleRoundedIcon />,
    color: '#10B981',
  },
  {
    title: 'Your Bankruptcy Payment',
    body: 'You pay 50% of your "surplus income" — the amount left after essential expenses and above the government minimum threshold.',
    icon: <AccountBalanceRoundedIcon />,
    color: '#2266D9',
  },
  {
    title: 'Reduce Discretionary Spending',
    body: 'Cutting back on discretionary items like dining out and entertainment reduces your overall expenses, which can actually INCREASE your surplus income. Focus on cutting genuine luxuries.',
    icon: <TipsAndUpdatesRoundedIcon />,
    color: '#F59E0B',
  },
  {
    title: 'Build an Emergency Fund',
    body: 'Even setting aside $25-50/month after all expenses builds a safety net. Unexpected costs won\'t need to go on credit — helping you stay on track.',
    icon: <SaveRoundedIcon />,
    color: '#8B5CF6',
  },
];

const Budgeting: React.FC = () => {
  const [income, setIncome] = useState<string>('3200');
  const [taxDeductions, setTaxDeductions] = useState<string>('850');
  const [householdSize, setHouseholdSize] = useState<number>(1);
  const [expenses, setExpenses] = useState<BudgetExpense[]>(defaultExpenses);
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const s = localStorage.getItem('wealthix_budget');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        if (parsed.income) setIncome(parsed.income);
        if (parsed.taxDeductions) setTaxDeductions(parsed.taxDeductions);
        if (parsed.householdSize) setHouseholdSize(parsed.householdSize);
        if (parsed.expenses) setExpenses(parsed.expenses);
      } catch (_) { /* ignore */ }
    }
  }, []);

  // Load from income/expense form
  const loadFromForm = useCallback(() => {
    const savedValues = localStorage.getItem('wealthix_form_values');
    const savedHousehold = localStorage.getItem('wealthix_household_size');
    if (savedValues) {
      try {
        const formVals: Record<string, string> = JSON.parse(savedValues);
        // Set income from form
        const employmentIncome = parseFloat(formVals['employment-income'] || '0');
        if (employmentIncome > 0) setIncome(String(employmentIncome));
        // Set tax deductions
        const fedTax = parseFloat(formVals['federal-tax'] || '0');
        const provTax = parseFloat(formVals['provincial-tax'] || '0');
        const ei = parseFloat(formVals['ei-premiums'] || '0');
        const cpp = parseFloat(formVals['cpp-contributions'] || '0');
        const totalDeductions = fedTax + provTax + ei + cpp;
        if (totalDeductions > 0) setTaxDeductions(String(totalDeductions));

        // Map form expenses to budget expenses
        const newExpenses: BudgetExpense[] = [];
        const mappings: { formId: string; name: string; category: string; nonDisc: boolean }[] = [
          { formId: 'rent-mortgage', name: 'Rent / Mortgage', category: 'Housing', nonDisc: true },
          { formId: 'electricity', name: 'Electricity / Hydro', category: 'Utilities', nonDisc: true },
          { formId: 'heat', name: 'Heat / Natural Gas', category: 'Utilities', nonDisc: true },
          { formId: 'cell-phone', name: 'Cell Phone', category: 'Utilities', nonDisc: true },
          { formId: 'internet', name: 'Internet', category: 'Utilities', nonDisc: true },
          { formId: 'food-groceries', name: 'Groceries', category: 'Food & Groceries', nonDisc: true },
          { formId: 'car-insurance', name: 'Car Insurance', category: 'Transportation', nonDisc: true },
          { formId: 'gas-fuel', name: 'Gas / Fuel', category: 'Transportation', nonDisc: true },
          { formId: 'car-payment', name: 'Car Loan / Lease', category: 'Transportation', nonDisc: true },
          { formId: 'public-transit', name: 'Public Transit', category: 'Transportation', nonDisc: true },
          { formId: 'personal-care', name: 'Personal Care', category: 'Personal Care', nonDisc: true },
          { formId: 'clothing', name: 'Clothing', category: 'Clothing', nonDisc: true },
          { formId: 'prescriptions', name: 'Prescriptions', category: 'Medical & Health', nonDisc: true },
          { formId: 'medical-expenses', name: 'Medical Expenses', category: 'Medical & Health', nonDisc: true },
          { formId: 'dental', name: 'Dental', category: 'Medical & Health', nonDisc: true },
          { formId: 'daycare', name: 'Daycare / Childcare', category: 'Childcare', nonDisc: true },
          { formId: 'recreation', name: 'Recreation', category: 'Entertainment', nonDisc: false },
          { formId: 'cable-streaming', name: 'Cable / Streaming', category: 'Entertainment', nonDisc: false },
          { formId: 'property-tax', name: 'Property Tax', category: 'Housing', nonDisc: true },
          { formId: 'home-insurance', name: 'Home / Tenant Insurance', category: 'Housing', nonDisc: true },
        ];
        mappings.forEach(({ formId, name, category, nonDisc }) => {
          const val = formVals[formId];
          if (val && parseFloat(val) > 0) {
            newExpenses.push({ id: generateId(), name, amount: val, category, isNonDiscretionary: nonDisc });
          }
        });
        if (newExpenses.length > 0) {
          setExpenses(newExpenses);
          alert(`Loaded ${newExpenses.length} expense(s) from your Income & Expenses form.`);
        } else {
          alert('No expenses found in your saved form. Please fill out the Income & Expenses form first.');
        }
      } catch (_) {
        alert('Could not load form data. Please fill out the Income & Expenses form first.');
      }
    } else {
      alert('No saved form data found. Please fill out the Income & Expenses form first.');
    }
    if (savedHousehold) setHouseholdSize(parseInt(savedHousehold, 10));
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem('wealthix_budget', JSON.stringify({ income, taxDeductions, householdSize, expenses }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [income, taxDeductions, householdSize, expenses]);

  const addExpense = useCallback(() => {
    setExpenses((prev) => [
      ...prev,
      { id: generateId(), name: '', amount: '0', category: 'Other', isNonDiscretionary: true },
    ]);
  }, []);

  const removeExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateExpense = useCallback((id: string, field: keyof BudgetExpense, value: string | boolean) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
    setSaved(false);
  }, []);

  const calculations = useMemo(() => {
    const grossIncome = parseFloat(income) || 0;
    const deductions = parseFloat(taxDeductions) || 0;
    const netIncome = grossIncome - deductions;
    const osbThreshold = OSB_THRESHOLDS[Math.min(householdSize, 7)];

    const totalExpensesAmt = expenses.reduce((sum, e) => {
      const amt = parseFloat(e.amount) || 0;
      return sum + amt;
    }, 0);

    const nonDiscTotal = expenses
      .filter((e) => e.isNonDiscretionary)
      .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const discTotal = expenses
      .filter((e) => !e.isNonDiscretionary)
      .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const remainingAfterExpenses = netIncome - totalExpensesAmt;
    const surplusIncome = Math.max(0, netIncome - totalExpensesAmt - osbThreshold);
    const bankruptcyPayment = surplusIncome * 0.5;
    const availableAfterPayment = remainingAfterExpenses - bankruptcyPayment;
    const budgetUsedPercent = Math.min(100, grossIncome > 0 ? Math.round((totalExpensesAmt / grossIncome) * 100) : 0);

    // Category totals for pie chart
    const categoryTotals: Record<string, number> = {};
    expenses.forEach((e) => {
      const amt = parseFloat(e.amount) || 0;
      if (amt > 0) {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + amt;
      }
    });
    const pieData = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value, color: categoryColors[name] || '#94A3B8' }))
      .sort((a, b) => b.value - a.value);

    return {
      grossIncome, deductions, netIncome, osbThreshold,
      totalExpensesAmt, nonDiscTotal, discTotal,
      remainingAfterExpenses, surplusIncome, bankruptcyPayment,
      availableAfterPayment, budgetUsedPercent, pieData,
    };
  }, [income, taxDeductions, householdSize, expenses]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography level="h2" sx={{ fontWeight: 800, color: '#0D2137', mb: 0.5 }}>
          Budget Planner
        </Typography>
        <Typography level="body-md" sx={{ color: '#64748B', maxWidth: 680, lineHeight: 1.6 }}>
          Plan your monthly budget, account for your bankruptcy payment, and see exactly where your money goes. 
          The more accurately you budget, the lower your payment may be.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column — Inputs */}
        <Grid xs={12} lg={7}>
          {/* Income Section */}
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', mb: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography level="title-md" sx={{ fontWeight: 700, color: '#0D2137', mb: 2 }}>
                Monthly Income
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <FormControl>
                    <FormLabel sx={{ fontWeight: 600 }}>Gross Monthly Income</FormLabel>
                    <Input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      startDecorator={<Typography level="body-sm" sx={{ color: '#64748B' }}>$</Typography>}
                      placeholder="0.00"
                      sx={{ mt: 0.5 }}
                      slotProps={{ input: { min: 0, step: 0.01 } }}
                    />
                    <FormHelperText>Before taxes — all sources of income</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl>
                    <FormLabel sx={{ fontWeight: 600 }}>Non-Disc. Deductions (Tax, CPP, EI)</FormLabel>
                    <Input
                      type="number"
                      value={taxDeductions}
                      onChange={(e) => setTaxDeductions(e.target.value)}
                      startDecorator={<Typography level="body-sm" sx={{ color: '#64748B' }}>$</Typography>}
                      placeholder="0.00"
                      sx={{ mt: 0.5 }}
                      slotProps={{ input: { min: 0, step: 0.01 } }}
                    />
                    <FormHelperText>Income tax + CPP + EI from your paycheque</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl>
                    <FormLabel sx={{ fontWeight: 600 }}>Household Size</FormLabel>
                    <Select
                      value={householdSize}
                      onChange={(_, v) => v && setHouseholdSize(v as number)}
                      sx={{ mt: 0.5 }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <Option key={n} value={n}>
                          {n} {n === 1 ? 'person' : 'people'} — threshold: {fmtShort(OSB_THRESHOLDS[n])}/mo
                        </Option>
                      ))}
                    </Select>
                    <FormHelperText>Affects your OSB threshold</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: '10px', bgcolor: '#F0FDF4', border: '1px solid #BBF7D0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography level="body-xs" sx={{ color: '#15803D', fontWeight: 600 }}>
                      Net Monthly Income
                    </Typography>
                    <Typography level="h4" sx={{ fontWeight: 800, color: '#14532D' }}>
                      {fmt(calculations.netIncome)}
                    </Typography>
                    <Typography level="body-xs" sx={{ color: '#16A34A' }}>
                      After deductions
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Expenses Section */}
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', mb: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography level="title-md" sx={{ fontWeight: 700, color: '#0D2137' }}>
                  Monthly Expenses
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Load expenses from your saved Income & Expenses form" placement="top">
                    <Button
                      size="sm"
                      variant="soft"
                      color="neutral"
                      startDecorator={<SyncRoundedIcon />}
                      onClick={loadFromForm}
                    >
                      Load from Form
                    </Button>
                  </Tooltip>
                  <Button
                    size="sm"
                    variant="soft"
                    color="primary"
                    startDecorator={<AddRoundedIcon />}
                    onClick={addExpense}
                  >
                    Add Expense
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* Header */}
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'grid' },
                    gridTemplateColumns: '1fr 160px 140px 80px 40px',
                    gap: 1,
                    px: 1.5,
                    py: 0.75,
                    bgcolor: '#F8FAFC',
                    borderRadius: '8px',
                  }}
                >
                  <Typography level="body-xs" sx={{ fontWeight: 700, color: '#64748B', textTransform: 'uppercase', fontSize: '10px' }}>
                    Expense Name
                  </Typography>
                  <Typography level="body-xs" sx={{ fontWeight: 700, color: '#64748B', textTransform: 'uppercase', fontSize: '10px' }}>
                    Monthly Amount
                  </Typography>
                  <Typography level="body-xs" sx={{ fontWeight: 700, color: '#64748B', textTransform: 'uppercase', fontSize: '10px' }}>
                    Category
                  </Typography>
                  <Typography level="body-xs" sx={{ fontWeight: 700, color: '#64748B', textTransform: 'uppercase', fontSize: '10px' }}>
                    Type
                  </Typography>
                  <Box />
                </Box>

                {expenses.map((expense) => (
                  <Box
                    key={expense.id}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 160px 140px 80px 40px' },
                      gap: 1,
                      p: 1.5,
                      borderRadius: '10px',
                      border: '1px solid #F1F5F9',
                      bgcolor: expense.isNonDiscretionary ? '#FAFFFE' : '#FFFAF5',
                      alignItems: 'center',
                    }}
                  >
                    <Input
                      size="sm"
                      value={expense.name}
                      onChange={(e) => updateExpense(expense.id, 'name', e.target.value)}
                      placeholder="Expense name..."
                      sx={{ bgcolor: 'white' }}
                    />
                    <Input
                      size="sm"
                      type="number"
                      value={expense.amount}
                      onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                      startDecorator={<Typography level="body-xs" sx={{ color: '#64748B' }}>$</Typography>}
                      placeholder="0.00"
                      slotProps={{ input: { min: 0, step: 0.01, style: { textAlign: 'right' } } }}
                      sx={{ bgcolor: 'white' }}
                    />
                    <Select
                      size="sm"
                      value={expense.category}
                      onChange={(_, v) => v && updateExpense(expense.id, 'category', v as string)}
                      sx={{ bgcolor: 'white', fontSize: '12px' }}
                    >
                      {expenseCategories.map((c) => (
                        <Option key={c} value={c} sx={{ fontSize: '12px' }}>{c}</Option>
                      ))}
                    </Select>
                    <Select
                      size="sm"
                      value={expense.isNonDiscretionary ? 'yes' : 'no'}
                      onChange={(_, v) => v && updateExpense(expense.id, 'isNonDiscretionary', v === 'yes')}
                      sx={{ bgcolor: 'white', fontSize: '12px' }}
                    >
                      <Option value="yes" sx={{ fontSize: '12px', color: '#15803D' }}>Ess.</Option>
                      <Option value="no" sx={{ fontSize: '12px', color: '#D97706' }}>Disc.</Option>
                    </Select>
                    <Tooltip title="Remove this expense" placement="top">
                      <IconButton
                        size="sm"
                        variant="plain"
                        color="danger"
                        onClick={() => removeExpense(expense.id)}
                        sx={{ minWidth: 32, minHeight: 32 }}
                      >
                        <DeleteRoundedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, pt: 2, borderTop: '1px solid #F1F5F9' }}>
                <InfoRoundedIcon sx={{ fontSize: 16, color: '#64748B' }} />
                <Typography level="body-xs" sx={{ color: '#64748B' }}>
                  <strong>Ess.</strong> = Essential/Non-Discretionary (reduces your bankruptcy payment). 
                  <strong> Disc.</strong> = Discretionary (still claimable but may be scrutinized).
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startDecorator={<AddRoundedIcon />}
                onClick={addExpense}
                sx={{ mt: 2, borderStyle: 'dashed', borderColor: '#CBD5E1', color: '#64748B' }}
              >
                Add Another Expense
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            fullWidth
            variant="solid"
            color="primary"
            size="lg"
            startDecorator={<SaveRoundedIcon />}
            onClick={handleSave}
            sx={{ fontWeight: 700 }}
          >
            {saved ? '✓ Budget Saved!' : 'Save My Budget'}
          </Button>
        </Grid>

        {/* Right Column — Summary & Chart */}
        <Grid xs={12} lg={5}>
          {/* Bankruptcy Payment Summary */}
          <Card
            sx={{
              border: '2px solid #2266D9',
              bgcolor: '#F0F6FF',
              mb: 2.5,
              position: { lg: 'sticky' },
              top: { lg: 24 },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <AccountBalanceRoundedIcon sx={{ color: '#2266D9', fontSize: 22 }} />
                <Typography level="title-md" sx={{ fontWeight: 800, color: '#0D2137' }}>
                  Payment Calculator
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="body-sm" sx={{ color: '#64748B' }}>Gross Income</Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 700, color: '#15803D' }}>+ {fmt(calculations.grossIncome)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="body-sm" sx={{ color: '#64748B' }}>Non-Disc. Deductions</Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 700, color: '#DC2626' }}>− {fmt(calculations.deductions)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="body-sm" sx={{ fontWeight: 600, color: '#374151' }}>Net Income</Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 700, color: '#0D2137' }}>{fmt(calculations.netIncome)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="body-sm" sx={{ color: '#64748B' }}>Total Expenses</Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 700, color: '#DC2626' }}>− {fmt(calculations.totalExpensesAmt)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="body-sm" sx={{ color: '#64748B' }}>
                    OSB Threshold ({householdSize} {householdSize === 1 ? 'person' : 'people'})
                  </Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 700, color: '#64748B' }}>− {fmt(calculations.osbThreshold)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="body-sm" sx={{ fontWeight: 600, color: '#374151' }}>Surplus Income</Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 700, color: calculations.surplusIncome > 0 ? '#DC2626' : '#15803D' }}>
                    {fmt(calculations.surplusIncome)}
                  </Typography>
                </Box>
              </Box>

              {/* Estimated Payment */}
              <Box sx={{ p: 2.5, borderRadius: '12px', bgcolor: 'white', border: '2px solid #2266D9', textAlign: 'center', mb: 2 }}>
                <Typography level="body-xs" sx={{ color: '#2266D9', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px', mb: 0.5 }}>
                  Estimated Monthly Bankruptcy Payment
                </Typography>
                <Typography
                  sx={{ fontSize: '2.5rem', fontWeight: 900, color: '#143E82', lineHeight: 1.1 }}
                >
                  {fmt(calculations.bankruptcyPayment)}
                </Typography>
                <Typography level="body-xs" sx={{ color: '#64748B', mt: 0.5 }}>
                  = 50% of ${calculations.surplusIncome.toFixed(2)} surplus
                </Typography>
              </Box>

              {calculations.bankruptcyPayment === 0 ? (
                <Alert variant="soft" color="success" startDecorator={<CheckCircleRoundedIcon />} sx={{ borderRadius: '10px', mb: 2 }}>
                  <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                    No surplus income — your payment may be $0!
                  </Typography>
                </Alert>
              ) : calculations.surplusIncome > 500 ? (
                <Alert variant="soft" color="warning" startDecorator={<WarningAmberRoundedIcon />} sx={{ borderRadius: '10px', mb: 2 }}>
                  <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                    You have significant surplus income. Review the Income & Expenses form — you may have missed expenses.
                  </Typography>
                </Alert>
              ) : null}

              {/* Available after payment */}
              <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography level="body-xs" sx={{ color: '#64748B' }}>After all expenses & payment:</Typography>
                  <Typography level="body-xs" sx={{ fontWeight: 700, color: calculations.availableAfterPayment >= 0 ? '#15803D' : '#DC2626' }}>
                    {fmt(calculations.availableAfterPayment)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography level="body-xs" sx={{ color: '#64748B' }}>Budget used:</Typography>
                  <Typography level="body-xs" sx={{ fontWeight: 700, color: '#374151' }}>
                    {calculations.budgetUsedPercent}%
                  </Typography>
                </Box>
                <LinearProgress
                  determinate
                  value={calculations.budgetUsedPercent}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: '#F1F5F9',
                    '--LinearProgress-progressColor':
                      calculations.budgetUsedPercent > 95 ? '#EF4444' :
                      calculations.budgetUsedPercent > 80 ? '#F59E0B' : '#10B981',
                  }}
                />
              </Box>

              {/* Non-Disc vs Disc breakdown */}
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Box sx={{ flex: 1, p: 1.25, borderRadius: '8px', bgcolor: '#F0FDF4', textAlign: 'center' }}>
                  <Typography level="body-xs" sx={{ color: '#15803D', fontWeight: 700, fontSize: '10px', mb: 0.25 }}>Essential</Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 800, color: '#14532D' }}>{fmt(calculations.nonDiscTotal)}</Typography>
                </Box>
                <Box sx={{ flex: 1, p: 1.25, borderRadius: '8px', bgcolor: '#FFF7ED', textAlign: 'center' }}>
                  <Typography level="body-xs" sx={{ color: '#D97706', fontWeight: 700, fontSize: '10px', mb: 0.25 }}>Discretionary</Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 800, color: '#92400E' }}>{fmt(calculations.discTotal)}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Spending Chart */}
          {calculations.pieData.length > 0 && (
            <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', mb: 2.5 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography level="title-sm" sx={{ fontWeight: 700, color: '#0D2137', mb: 2 }}>
                  Spending Breakdown
                </Typography>
                <Box sx={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={calculations.pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {calculations.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value) => [fmt(Number(value)), '']}
                        contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
                      />
                      <Legend
                        formatter={(value) => <span style={{ fontSize: 11, color: '#64748B' }}>{value}</span>}
                        wrapperStyle={{ paddingTop: 8 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                {/* Category list */}
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {calculations.pieData.slice(0, 6).map((item) => (
                    <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color, flexShrink: 0 }} />
                      <Typography level="body-xs" sx={{ color: '#64748B', flex: 1 }}>{item.name}</Typography>
                      <Typography level="body-xs" sx={{ fontWeight: 700, color: '#374151' }}>{fmt(item.value)}</Typography>
                      <Typography level="body-xs" sx={{ color: '#94A3B8', width: 36, textAlign: 'right' }}>
                        {calculations.totalExpensesAmt > 0
                          ? Math.round((item.value / calculations.totalExpensesAmt) * 100)
                          : 0}%
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Savings Goal Slider */}
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', mb: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography level="title-sm" sx={{ fontWeight: 700, color: '#0D2137', mb: 0.5 }}>
                Emergency Fund Goal
              </Typography>
              <Typography level="body-xs" sx={{ color: '#64748B', mb: 2, lineHeight: 1.6 }}>
                Even a small monthly savings prevents needing credit for emergencies.
              </Typography>
              <Slider
                defaultValue={50}
                min={0}
                max={Math.max(200, Math.floor(calculations.availableAfterPayment / 10) * 10)}
                step={10}
                valueLabelDisplay="on"
                valueLabelFormat={(v) => `$${v}`}
                sx={{ '--Slider-thumbSize': '20px', '--Slider-trackSize': '8px', color: '#2266D9' }}
                marks={[
                  { value: 0, label: '$0' },
                  { value: 50, label: '$50' },
                  { value: 100, label: '$100' },
                ]}
              />
              <Typography level="body-xs" sx={{ color: '#64748B', mt: 2 }}>
                Setting aside just $50/month builds a $600 emergency fund in a year — a meaningful financial cushion.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Budget Tips */}
      <Typography level="title-md" sx={{ fontWeight: 700, color: '#0D2137', mt: 2, mb: 2 }}>
        Budgeting Tips
      </Typography>
      <Grid container spacing={2}>
        {budgetTips.map((tip) => (
          <Grid key={tip.title} xs={12} sm={6} lg={3}>
            <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: '10px',
                      bgcolor: `${tip.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tip.color,
                      flexShrink: 0,
                      '& svg': { fontSize: 20 },
                    }}
                  >
                    {tip.icon}
                  </Box>
                  <Box>
                    <Typography level="body-sm" sx={{ fontWeight: 700, color: '#1E293B', mb: 0.5 }}>
                      {tip.title}
                    </Typography>
                    <Typography level="body-xs" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                      {tip.body}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Budgeting;
