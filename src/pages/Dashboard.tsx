import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import LinearProgress from '@mui/joy/LinearProgress';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Grid from '@mui/joy/Grid';
import { useNavigate } from 'react-router-dom';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

// Demo data — in a real app this would come from user context/state
const DEMO_INCOME = 3200;
const DEMO_EXPENSES = 2780;
const DEMO_BANKRUPTCY_PAYMENT = 347.5;
const DEMO_DAYS_TO_REPORT = 14;
const DEMO_SURPLUS = DEMO_INCOME - DEMO_EXPENSES;

const upcomingBills = [
  { name: 'Hydro / Electricity', amount: 89.0, daysUntil: 3, icon: <ElectricBoltRoundedIcon />, color: '#F59E0B' },
  { name: 'Apartment Rent', amount: 1450.0, daysUntil: 8, icon: <HomeRoundedIcon />, color: '#3B82F6' },
  { name: 'Cell Phone Plan', amount: 65.0, daysUntil: 12, icon: <PhoneAndroidRoundedIcon />, color: '#8B5CF6' },
  { name: 'Car Insurance', amount: 175.0, daysUntil: 18, icon: <DirectionsCarRoundedIcon />, color: '#10B981' },
];

const tips = [
  {
    title: 'Claim Every Possible Expense',
    body: 'Every legitimate expense you report reduces your surplus income — meaning a lower monthly bankruptcy payment. Don\'t leave money on the table.',
    color: '#2266D9',
    icon: <EmojiEventsRoundedIcon />,
  },
  {
    title: 'What Is Surplus Income?',
    body: 'The government sets a minimum income threshold. If you earn above this threshold, you pay 50% of the difference as your monthly bankruptcy payment.',
    color: '#10B981',
    icon: <InfoRoundedIcon />,
  },
  {
    title: 'Non-Discretionary Items Are Key',
    body: 'Non-discretionary expenses are deducted from your income before calculating your payment. Use the Discretionary Lookup to check every expense.',
    color: '#8B5CF6',
    icon: <SearchRoundedIcon />,
  },
];

const budgetCategories = [
  { name: 'Housing', amount: 1450, color: '#3B82F6', percent: 52 },
  { name: 'Food', amount: 450, color: '#10B981', percent: 16 },
  { name: 'Transport', amount: 310, color: '#8B5CF6', percent: 11 },
  { name: 'Utilities', amount: 290, color: '#F59E0B', percent: 10 },
  { name: 'Medical', amount: 160, color: '#EF4444', percent: 6 },
  { name: 'Other', amount: 120, color: '#6B7280', percent: 4 },
];

const fmt = (n: number) =>
  n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const budgetUsedPercent = Math.min(100, Math.round((DEMO_EXPENSES / DEMO_INCOME) * 100));

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography level="h2" sx={{ fontWeight: 800, color: '#0D2137', mb: 0.5 }}>
          Your Dashboard
        </Typography>
        <Typography level="body-md" sx={{ color: '#64748B' }}>
          {today.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          {' · '}
          <Typography component="span" level="body-md" sx={{ color: '#2266D9', fontWeight: 600 }}>
            {DEMO_DAYS_TO_REPORT} days until your next monthly report
          </Typography>
        </Typography>
      </Box>

      {/* Key Metric Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Monthly Income */}
        <Grid xs={12} sm={6} lg={3}>
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography level="body-sm" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
                  Monthly Income
                </Typography>
                <Box sx={{ p: 0.75, borderRadius: '8px', bgcolor: '#DCFCE7', display: 'flex' }}>
                  <TrendingUpRoundedIcon sx={{ fontSize: 18, color: '#16A34A' }} />
                </Box>
              </Box>
              <Typography level="h3" sx={{ fontWeight: 800, color: '#0D2137', mb: 0.5 }}>
                {fmt(DEMO_INCOME)}
              </Typography>
              <Typography level="body-xs" sx={{ color: '#10B981', fontWeight: 600 }}>
                Gross income this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Expenses */}
        <Grid xs={12} sm={6} lg={3}>
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography level="body-sm" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
                  Monthly Expenses
                </Typography>
                <Box sx={{ p: 0.75, borderRadius: '8px', bgcolor: '#FEF3C7', display: 'flex' }}>
                  <TrendingDownRoundedIcon sx={{ fontSize: 18, color: '#D97706' }} />
                </Box>
              </Box>
              <Typography level="h3" sx={{ fontWeight: 800, color: '#0D2137', mb: 0.5 }}>
                {fmt(DEMO_EXPENSES)}
              </Typography>
              <Typography level="body-xs" sx={{ color: '#64748B', fontWeight: 500 }}>
                {budgetUsedPercent}% of income used
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bankruptcy Payment */}
        <Grid xs={12} sm={6} lg={3}>
          <Card sx={{ border: '2px solid #2266D9', bgcolor: '#F0F6FF', height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography level="body-sm" sx={{ color: '#2266D9', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
                  Monthly Payment
                </Typography>
                <Box sx={{ p: 0.75, borderRadius: '8px', bgcolor: '#DBEAFE', display: 'flex' }}>
                  <AccountBalanceWalletRoundedIcon sx={{ fontSize: 18, color: '#2266D9' }} />
                </Box>
              </Box>
              <Typography level="h3" sx={{ fontWeight: 800, color: '#143E82', mb: 0.5 }}>
                {DEMO_BANKRUPTCY_PAYMENT.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
              </Typography>
              <Typography level="body-xs" sx={{ color: '#2266D9', fontWeight: 500 }}>
                Bankruptcy payment (estimated)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Next Report */}
        <Grid xs={12} sm={6} lg={3}>
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography level="body-sm" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
                  Next Report
                </Typography>
                <Box sx={{ p: 0.75, borderRadius: '8px', bgcolor: '#F3E8FF', display: 'flex' }}>
                  <CalendarTodayRoundedIcon sx={{ fontSize: 18, color: '#7C3AED' }} />
                </Box>
              </Box>
              <Typography level="h3" sx={{ fontWeight: 800, color: '#0D2137', mb: 0.5 }}>
                {DEMO_DAYS_TO_REPORT} days
              </Typography>
              <Typography level="body-xs" sx={{ color: DEMO_DAYS_TO_REPORT <= 7 ? '#DC2626' : '#64748B', fontWeight: 500 }}>
                {DEMO_DAYS_TO_REPORT <= 7 ? '⚠ Due soon — start now!' : 'Monthly income report due'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Budget Overview */}
        <Grid xs={12} md={7}>
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography level="title-md" sx={{ fontWeight: 700, color: '#0D2137' }}>
                  Budget Overview
                </Typography>
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => navigate('/budgeting')}
                  sx={{ borderColor: '#E2E8F0', color: '#64748B', '&:hover': { bgcolor: '#F8FAFC' } }}
                >
                  View Budget
                </Button>
              </Box>

              {/* Income vs Expense Bar */}
              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography level="body-sm" sx={{ color: '#64748B', fontWeight: 500 }}>
                    Expenses vs. Income
                  </Typography>
                  <Typography level="body-sm" sx={{ fontWeight: 700, color: budgetUsedPercent > 90 ? '#DC2626' : '#0D2137' }}>
                    {budgetUsedPercent}%
                  </Typography>
                </Box>
                <LinearProgress
                  determinate
                  value={budgetUsedPercent}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: '#F1F5F9',
                    '--LinearProgress-progressColor': budgetUsedPercent > 90 ? '#EF4444' : budgetUsedPercent > 75 ? '#F59E0B' : '#10B981',
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.75 }}>
                  <Typography level="body-xs" sx={{ color: '#64748B' }}>
                    {fmt(DEMO_EXPENSES)} spent
                  </Typography>
                  <Typography level="body-xs" sx={{ color: '#64748B' }}>
                    {fmt(DEMO_INCOME)} income
                  </Typography>
                </Box>
              </Box>

              {/* Surplus */}
              <Box sx={{ p: 2, borderRadius: '10px', bgcolor: DEMO_SURPLUS > 0 ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${DEMO_SURPLUS > 0 ? '#BBF7D0' : '#FECACA'}`, mb: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleRoundedIcon sx={{ color: DEMO_SURPLUS > 0 ? '#16A34A' : '#DC2626', fontSize: 18 }} />
                  <Typography level="body-sm" sx={{ fontWeight: 600, color: DEMO_SURPLUS > 0 ? '#15803D' : '#DC2626' }}>
                    Monthly surplus after expenses: {fmt(DEMO_SURPLUS)}
                  </Typography>
                </Box>
                <Typography level="body-xs" sx={{ color: '#64748B', mt: 0.5, ml: 3.5 }}>
                  Your estimated bankruptcy payment is 50% of your surplus income above the government threshold.
                </Typography>
              </Box>

              {/* Category Breakdown */}
              <Typography level="body-sm" sx={{ fontWeight: 600, color: '#374151', mb: 1.5 }}>
                Expense Breakdown
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {budgetCategories.map((cat) => (
                  <Box key={cat.name} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: cat.color, flexShrink: 0 }} />
                    <Typography level="body-xs" sx={{ color: '#64748B', width: 80, flexShrink: 0 }}>
                      {cat.name}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        determinate
                        value={cat.percent}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#F1F5F9',
                          '--LinearProgress-progressColor': cat.color,
                        }}
                      />
                    </Box>
                    <Typography level="body-xs" sx={{ color: '#374151', fontWeight: 600, width: 64, textAlign: 'right', flexShrink: 0 }}>
                      {fmt(cat.amount)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Bills */}
        <Grid xs={12} md={5}>
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography level="title-md" sx={{ fontWeight: 700, color: '#0D2137', mb: 2 }}>
                Upcoming Bills
              </Typography>
              <List sx={{ gap: 0.5, '--ListItem-paddingY': '10px', '--ListItem-paddingX': '0' }}>
                {upcomingBills.map((bill, index) => (
                  <React.Fragment key={bill.name}>
                    {index > 0 && <Divider sx={{ my: 0.5 }} />}
                    <ListItem>
                      <ListItemDecorator>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '8px',
                            bgcolor: `${bill.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: bill.color,
                            '& svg': { fontSize: 18 },
                          }}
                        >
                          {bill.icon}
                        </Box>
                      </ListItemDecorator>
                      <ListItemContent sx={{ ml: 1.5 }}>
                        <Typography level="body-sm" sx={{ fontWeight: 600, color: '#1E293B' }}>
                          {bill.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
                          <Chip
                            size="sm"
                            variant="soft"
                            color={bill.daysUntil <= 5 ? 'danger' : bill.daysUntil <= 10 ? 'warning' : 'neutral'}
                            sx={{ fontSize: '10px', fontWeight: 600 }}
                          >
                            {bill.daysUntil === 0 ? 'Due today' : `Due in ${bill.daysUntil}d`}
                          </Chip>
                        </Box>
                      </ListItemContent>
                      <Typography level="body-sm" sx={{ fontWeight: 700, color: '#0D2137' }}>
                        {bill.amount.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                      </Typography>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions + Tips */}
      <Grid container spacing={2}>
        {/* Quick Actions */}
        <Grid xs={12} md={4}>
          <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography level="title-md" sx={{ fontWeight: 700, color: '#0D2137', mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="solid"
                  color="primary"
                  startDecorator={<ReceiptLongRoundedIcon />}
                  onClick={() => navigate('/income-expenses')}
                  sx={{ justifyContent: 'flex-start', borderRadius: '10px', py: 1.5 }}
                >
                  Fill Out Monthly Form
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startDecorator={<SearchRoundedIcon />}
                  onClick={() => navigate('/discretionary')}
                  sx={{ justifyContent: 'flex-start', borderRadius: '10px', py: 1.5, borderColor: '#E2E8F0', color: '#374151' }}
                >
                  Check an Expense
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startDecorator={<AccountBalanceWalletRoundedIcon />}
                  onClick={() => navigate('/budgeting')}
                  sx={{ justifyContent: 'flex-start', borderRadius: '10px', py: 1.5, borderColor: '#E2E8F0', color: '#374151' }}
                >
                  Update My Budget
                </Button>
              </Box>

              <Divider sx={{ my: 2.5 }} />

              <Box sx={{ p: 2, borderRadius: '10px', bgcolor: '#FFF7ED', border: '1px solid #FED7AA' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <WarningAmberRoundedIcon sx={{ color: '#EA580C', fontSize: 18, mt: 0.25 }} />
                  <Box>
                    <Typography level="body-sm" sx={{ fontWeight: 700, color: '#9A3412', mb: 0.25 }}>
                      Report Due in {DEMO_DAYS_TO_REPORT} Days
                    </Typography>
                    <Typography level="body-xs" sx={{ color: '#9A3412' }}>
                      Your monthly income & expense report must be filed with your trustee on time.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tips */}
        <Grid xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography level="title-md" sx={{ fontWeight: 700, color: '#0D2137', px: 0.5 }}>
              Tips to Reduce Your Payment
            </Typography>
            {tips.map((tip) => (
              <Card key={tip.title} sx={{ border: '1px solid #E2E8F0', bgcolor: 'white' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        bgcolor: `${tip.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: tip.color,
                        flexShrink: 0,
                        '& svg': { fontSize: 22 },
                      }}
                    >
                      {tip.icon}
                    </Box>
                    <Box>
                      <Typography level="body-sm" sx={{ fontWeight: 700, color: '#1E293B', mb: 0.5 }}>
                        {tip.title}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                        {tip.body}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
