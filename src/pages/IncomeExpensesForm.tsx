import React, { useState, useCallback } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Tooltip from '@mui/joy/Tooltip';
import Alert from '@mui/joy/Alert';
import Grid from '@mui/joy/Grid';
import { formSections, OSB_THRESHOLDS, type FormLineItem } from '../data/formData';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

const fmt = (n: number) =>
  n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

const sectionColors: Record<string, string> = {
  success: '#10B981',
  warning: '#F59E0B',
  primary: '#2266D9',
  neutral: '#64748B',
  danger: '#EF4444',
};

interface LineItemRowProps {
  item: FormLineItem;
  value: string;
  onChange: (id: string, value: string) => void;
}

const LineItemRow: React.FC<LineItemRowProps> = ({ item, value, onChange }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Box sx={{ py: 2, borderBottom: '1px solid #F1F5F9' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
        {/* Line number badge */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            bgcolor: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            mt: 0.5,
          }}
        >
          <Typography level="body-xs" sx={{ fontWeight: 700, color: '#64748B', fontSize: '10px' }}>
            {item.lineNumber}
          </Typography>
        </Box>

        {/* Label & Description */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography level="body-md" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {item.simpleLabel}
            </Typography>
            <Typography level="body-xs" sx={{ color: '#94A3B8', fontStyle: 'italic' }}>
              ({item.name})
            </Typography>
            <Tooltip
              title={
                <Box sx={{ maxWidth: 320, p: 0.5 }}>
                  <Typography level="body-sm" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {item.name}
                  </Typography>
                  <Typography level="body-xs" sx={{ lineHeight: 1.6, mb: 1 }}>
                    {item.description}
                  </Typography>
                  {item.examples.length > 0 && (
                    <>
                      <Typography level="body-xs" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Examples:
                      </Typography>
                      {item.examples.map((ex, i) => (
                        <Typography key={i} level="body-xs" sx={{ lineHeight: 1.6 }}>
                          • {ex}
                        </Typography>
                      ))}
                    </>
                  )}
                </Box>
              }
              variant="outlined"
              placement="top"
            >
              <InfoRoundedIcon sx={{ fontSize: 16, color: '#94A3B8', cursor: 'help' }} />
            </Tooltip>
          </Box>
          <Typography level="body-xs" sx={{ color: '#94A3B8', mt: 0.25 }}>
            {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
          </Typography>

          {/* Examples toggle */}
          <Button
            size="sm"
            variant="plain"
            onClick={() => setShowDetails(!showDetails)}
            sx={{ mt: 0.5, px: 0, py: 0, color: '#2266D9', fontSize: '12px', minHeight: 'auto', fontWeight: 500 }}
          >
            {showDetails ? 'Hide examples ▲' : 'See examples & tips ▼'}
          </Button>

          {showDetails && (
            <Box sx={{ mt: 1.5, p: 1.5, borderRadius: '10px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              {item.examples.length > 0 && (
                <>
                  <Typography level="body-xs" sx={{ fontWeight: 700, color: '#374151', mb: 0.75 }}>
                    Examples:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0, mb: 1.5 }}>
                    {item.examples.map((ex, i) => (
                      <Typography key={i} component="li" level="body-xs" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                        {ex}
                      </Typography>
                    ))}
                  </Box>
                </>
              )}
              {item.tips.length > 0 && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <TipsAndUpdatesRoundedIcon sx={{ fontSize: 16, color: '#F59E0B', flexShrink: 0, mt: 0.125 }} />
                    <Box>
                      <Typography level="body-xs" sx={{ fontWeight: 700, color: '#92400E', mb: 0.5 }}>
                        Tips to maximize your claim:
                      </Typography>
                      {item.tips.map((tip, i) => (
                        <Typography key={i} level="body-xs" sx={{ color: '#92400E', lineHeight: 1.7, '&::before': { content: '"• "' } }}>
                          {tip}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>

        {/* Dollar Input */}
        <FormControl sx={{ width: { xs: '100%', sm: 160 }, flexShrink: 0 }}>
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(item.id, e.target.value)}
            startDecorator={<Typography level="body-sm" sx={{ color: '#64748B' }}>$</Typography>}
            placeholder="0.00"
            slotProps={{
              input: {
                min: 0,
                step: 0.01,
                style: { textAlign: 'right' },
              },
            }}
            sx={{
              bgcolor: value && parseFloat(value) > 0 ? '#F0FDF4' : 'white',
              borderColor: value && parseFloat(value) > 0 ? '#86EFAC' : '#E2E8F0',
            }}
          />
          <FormHelperText sx={{ textAlign: 'right', fontSize: '10px' }}>per month</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
};

const IncomeExpensesForm: React.FC = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [householdSize, setHouseholdSize] = useState<number>(1);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    income: true,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setSaved(false);
  }, []);

  const getValue = (id: string): number => {
    const v = values[id];
    if (!v) return 0;
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  };

  const getSectionTotal = (sectionId: string): number => {
    const section = formSections.find((s) => s.id === sectionId);
    if (!section) return 0;
    return section.items.reduce((sum, item) => sum + getValue(item.id), 0);
  };

  const totalIncome = getSectionTotal('income');
  const totalDeductions = getSectionTotal('deductions');
  const netIncome = totalIncome - totalDeductions;

  const totalExpenses =
    getSectionTotal('living') +
    getSectionTotal('housing') +
    getSectionTotal('transportation') +
    getSectionTotal('medical') +
    getSectionTotal('childcare') +
    getSectionTotal('other');

  const osbThreshold = OSB_THRESHOLDS[Math.min(householdSize, 7)];
  const surplusIncome = Math.max(0, netIncome - totalExpenses - osbThreshold);
  const estimatedPayment = surplusIncome * 0.5;

  const handleSave = () => {
    localStorage.setItem('wealthix_form_values', JSON.stringify(values));
    localStorage.setItem('wealthix_household_size', String(householdSize));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all values?')) {
      setValues({});
      localStorage.removeItem('wealthix_form_values');
    }
  };

  // Load from localStorage on mount
  React.useEffect(() => {
    const savedValues = localStorage.getItem('wealthix_form_values');
    const savedHousehold = localStorage.getItem('wealthix_household_size');
    if (savedValues) {
      try { setValues(JSON.parse(savedValues)); } catch (_) { /* ignore */ }
    }
    if (savedHousehold) {
      setHouseholdSize(parseInt(savedHousehold, 10));
    }
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography level="h2" sx={{ fontWeight: 800, color: '#0D2137', mb: 0.5 }}>
          Monthly Income & Expenses Form
        </Typography>
        <Typography level="body-md" sx={{ color: '#64748B', maxWidth: 680, lineHeight: 1.6 }}>
          Fill out each section carefully. Every expense you claim <strong>reduces your surplus income</strong> and 
          lowers your monthly bankruptcy payment. Take your time and use the examples and tips to ensure you 
          claim everything you're entitled to.
        </Typography>
      </Box>

      {/* Info Alert */}
      <Alert
        variant="soft"
        color="primary"
        startDecorator={<InfoRoundedIcon />}
        sx={{ mb: 3, borderRadius: '12px' }}
      >
        <Box>
          <Typography level="body-sm" sx={{ fontWeight: 700 }}>
            How Your Payment Is Calculated
          </Typography>
          <Typography level="body-sm" sx={{ mt: 0.25, lineHeight: 1.6 }}>
            Surplus Income = Net Income − Total Allowable Expenses − Government Threshold.
            Your monthly bankruptcy payment = 50% of Surplus Income.
            <strong> The more expenses you legitimately claim, the lower your payment.</strong>
          </Typography>
        </Box>
      </Alert>

      {/* Household Size */}
      <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', mb: 3 }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography level="title-sm" sx={{ fontWeight: 700, color: '#0D2137', mb: 0.5 }}>
            Household Size
          </Typography>
          <Typography level="body-sm" sx={{ color: '#64748B', mb: 2 }}>
            The government sets a minimum income threshold based on how many people are in your household. 
            More people = higher threshold = lower payment.
          </Typography>
          <FormControl sx={{ maxWidth: 300 }}>
            <FormLabel sx={{ fontWeight: 600 }}>Number of people in your household (including yourself)</FormLabel>
            <Select
              value={householdSize}
              onChange={(_, v) => v && setHouseholdSize(v as number)}
              sx={{ mt: 1 }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <Option key={n} value={n}>
                  {n} {n === 1 ? 'person' : 'people'} — threshold: {fmt(OSB_THRESHOLDS[n])}/mo
                </Option>
              ))}
            </Select>
            <FormHelperText>
              OSB threshold for {householdSize} {householdSize === 1 ? 'person' : 'people'}: {fmt(osbThreshold)}/month
            </FormHelperText>
          </FormControl>
        </CardContent>
      </Card>

      {/* Form Sections */}
      <AccordionGroup sx={{ gap: 2 }}>
        {formSections.map((section) => {
          const sectionTotal = getSectionTotal(section.id);
          const color = sectionColors[section.colorScheme];
          const isOpen = expandedSections[section.id] ?? false;

          return (
            <Accordion
              key={section.id}
              expanded={isOpen}
              onChange={() => toggleSection(section.id)}
              sx={{
                borderRadius: '12px !important',
                border: '1px solid #E2E8F0',
                bgcolor: 'white',
                boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
                '&::before': { display: 'none' },
                overflow: 'hidden',
              }}
            >
              <AccordionSummary
                indicator={<ExpandMoreRoundedIcon />}
                sx={{
                  px: 2.5,
                  py: 2,
                  '& .MuiAccordionSummary-indicator': { transition: 'transform 0.2s' },
                  '&[aria-expanded="true"] .MuiAccordionSummary-indicator': { transform: 'rotate(180deg)' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mr: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 4, height: 40, borderRadius: '2px', bgcolor: color, flexShrink: 0 }} />
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography level="title-md" sx={{ fontWeight: 700, color: '#0D2137' }}>
                          {section.title}
                        </Typography>
                        <Chip
                          size="sm"
                          variant="soft"
                          sx={{
                            bgcolor: `${color}15`,
                            color: color,
                            fontWeight: 600,
                            fontSize: '11px',
                          }}
                        >
                          {section.type === 'income' ? 'Income' : section.type === 'deduction' ? 'Deduction' : 'Expense'}
                        </Chip>
                      </Box>
                      <Typography level="body-xs" sx={{ color: '#94A3B8', mt: 0.25 }}>
                        {section.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                  {sectionTotal > 0 && (
                    <Chip
                      variant="soft"
                      sx={{
                        bgcolor: section.type === 'income' ? '#DCFCE7' : '#F1F5F9',
                        color: section.type === 'income' ? '#15803D' : '#374151',
                        fontWeight: 700,
                        fontSize: '13px',
                        px: 1.5,
                      }}
                    >
                      {section.type === 'income' ? '+' : '−'}{fmt(sectionTotal)}
                    </Chip>
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
                <Box sx={{ ml: { xs: 0, sm: 6 } }}>
                  {section.items.map((item) => (
                    <LineItemRow
                      key={item.id}
                      item={item}
                      value={values[item.id] ?? ''}
                      onChange={handleChange}
                    />
                  ))}
                  {sectionTotal > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography level="body-xs" sx={{ color: '#94A3B8', mb: 0.25 }}>
                          Section total
                        </Typography>
                        <Typography level="title-md" sx={{ fontWeight: 700, color: section.type === 'income' ? '#15803D' : '#0D2137' }}>
                          {section.type === 'income' ? '+' : '−'}{fmt(sectionTotal)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </AccordionGroup>

      {/* Summary Card */}
      <Card
        sx={{
          mt: 3,
          border: '2px solid #2266D9',
          bgcolor: '#F0F6FF',
          borderRadius: '16px',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <AccountBalanceRoundedIcon sx={{ color: '#2266D9', fontSize: 24 }} />
            <Typography level="h4" sx={{ fontWeight: 800, color: '#0D2137' }}>
              Your Summary
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid xs={12} sm={6} md={3}>
              <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#DCFCE7', textAlign: 'center' }}>
                <Typography level="body-xs" sx={{ color: '#15803D', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', mb: 0.5 }}>
                  Total Income
                </Typography>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#14532D' }}>
                  {fmt(totalIncome)}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#FEF3C7', textAlign: 'center' }}>
                <Typography level="body-xs" sx={{ color: '#92400E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', mb: 0.5 }}>
                  Non-Disc. Deductions
                </Typography>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#78350F' }}>
                  −{fmt(totalDeductions)}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#F1F5F9', textAlign: 'center' }}>
                <Typography level="body-xs" sx={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', mb: 0.5 }}>
                  Total Expenses
                </Typography>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#1E293B' }}>
                  −{fmt(totalExpenses)}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#DBEAFE', textAlign: 'center' }}>
                <Typography level="body-xs" sx={{ color: '#1D4ED8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px', mb: 0.5 }}>
                  Net Income
                </Typography>
                <Typography level="h4" sx={{ fontWeight: 800, color: '#1E3A8A' }}>
                  {fmt(netIncome)}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 2.5 }} />

          <Grid container spacing={2} alignItems="center">
            <Grid xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="body-sm" sx={{ color: '#64748B' }}>
                    Government Threshold (for {householdSize} {householdSize === 1 ? 'person' : 'people'})
                  </Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 600, color: '#374151' }}>
                    {fmt(osbThreshold)}/mo
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="body-sm" sx={{ color: '#64748B' }}>
                    Surplus Income (above threshold)
                  </Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 600, color: surplusIncome > 0 ? '#DC2626' : '#15803D' }}>
                    {fmt(surplusIncome)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box sx={{ p: 2.5, borderRadius: '12px', bgcolor: 'white', border: '2px solid #2266D9', textAlign: 'center' }}>
                <Typography level="body-xs" sx={{ color: '#2266D9', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px', mb: 0.5 }}>
                  Estimated Monthly Payment
                </Typography>
                <Typography level="h3" sx={{ fontWeight: 900, color: '#143E82' }}>
                  {fmt(estimatedPayment)}
                </Typography>
                <Typography level="body-xs" sx={{ color: '#64748B', mt: 0.5 }}>
                  = 50% × surplus income
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {estimatedPayment === 0 && (
            <Alert
              variant="soft"
              color="success"
              startDecorator={<CheckCircleRoundedIcon />}
              sx={{ mt: 2, borderRadius: '10px' }}
            >
              <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                No surplus income — your expenses meet or exceed the government threshold. Your payment may be $0!
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
        <Button
          variant="solid"
          color="primary"
          startDecorator={<SaveRoundedIcon />}
          onClick={handleSave}
          size="lg"
          sx={{ fontWeight: 700 }}
        >
          {saved ? '✓ Saved!' : 'Save My Form'}
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<RestartAltRoundedIcon />}
          onClick={handleReset}
          size="lg"
          sx={{ borderColor: '#E2E8F0', color: '#64748B' }}
        >
          Start Over
        </Button>
      </Box>

      <Typography level="body-xs" sx={{ color: '#94A3B8', mt: 2, lineHeight: 1.6 }}>
        * This tool provides an estimate only. Your Licensed Insolvency Trustee will confirm your actual monthly 
        payment based on verified documentation. All values are saved locally on your device.
      </Typography>
    </Box>
  );
};

export default IncomeExpensesForm;
