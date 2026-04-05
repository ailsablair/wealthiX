import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';

const navItems = [
  { path: '/', label: 'Dashboard', shortLabel: 'Home', icon: <DashboardRoundedIcon /> },
  { path: '/income-expenses', label: 'Income & Expenses', shortLabel: 'Form', icon: <ReceiptLongRoundedIcon /> },
  { path: '/discretionary', label: 'Discretionary Items', shortLabel: 'Lookup', icon: <SearchRoundedIcon /> },
  { path: '/budgeting', label: 'Budgeting', shortLabel: 'Budget', icon: <AccountBalanceWalletRoundedIcon /> },
];

const SIDEBAR_WIDTH = 268;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeRoute = navItems.find(item =>
    item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path)
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F0F4F8' }}>
      {/* Desktop Sidebar */}
      <Sheet
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          bgcolor: '#0D2137',
          borderRight: 'none',
          zIndex: 100,
          overflowY: 'auto',
        }}
      >
        {/* Brand */}
        <Box sx={{ p: 3, pb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2266D9 0%, #10B981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldRoundedIcon sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography
                level="h4"
                sx={{ color: 'white', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1 }}
              >
                WealthiX
              </Typography>
              <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.25 }}>
                Your Financial Guide
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Navigation */}
        <Box sx={{ flex: 1, py: 2 }}>
          <Typography
            level="body-xs"
            sx={{ px: 3, mb: 1, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Navigation
          </Typography>
          <List sx={{ gap: 0.5, '--ListItem-paddingX': '12px' }}>
            {navItems.map((item) => {
              const isActive = item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
              return (
                <ListItem key={item.path}>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: '10px',
                      mx: 0.5,
                      py: 1.25,
                      color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                      bgcolor: isActive ? 'rgba(34,102,217,0.35)' : 'transparent',
                      borderLeft: isActive ? '3px solid #2266D9' : '3px solid transparent',
                      '&:hover': {
                        bgcolor: isActive ? 'rgba(34,102,217,0.35)' : 'rgba(255,255,255,0.07)',
                        color: 'white',
                      },
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <ListItemDecorator sx={{ color: isActive ? '#4B9EFF' : 'rgba(255,255,255,0.5)', minWidth: 36 }}>
                      {item.icon}
                    </ListItemDecorator>
                    <Typography
                      level="body-sm"
                      sx={{ fontWeight: isActive ? 600 : 400, color: 'inherit' }}
                    >
                      {item.label}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Footer */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ p: 2, borderRadius: '12px', bgcolor: 'rgba(34,102,217,0.2)', border: '1px solid rgba(34,102,217,0.3)' }}>
            <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, mb: 0.5 }}>
              Need Help?
            </Typography>
            <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
              Contact your Licensed Insolvency Trustee with any questions about your filing.
            </Typography>
          </Box>
          <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.2)', mt: 2, textAlign: 'center' }}>
            WealthiX © 2025
          </Typography>
        </Box>
      </Sheet>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          pb: { xs: '72px', md: 0 },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mobile Header */}
        <Sheet
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 1.5,
            bgcolor: '#0D2137',
            borderBottom: 'none',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2266D9 0%, #10B981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldRoundedIcon sx={{ color: 'white', fontSize: 16 }} />
            </Box>
            <Typography level="title-md" sx={{ color: 'white', fontWeight: 800 }}>
              WealthiX
            </Typography>
          </Box>
          <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
            {activeRoute?.label || 'Dashboard'}
          </Typography>
        </Sheet>

        {/* Page Content */}
        <Box className="page-content" sx={{ flex: 1 }}>
          {children}
        </Box>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Sheet
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          bgcolor: '#0D2137',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          zIndex: 100,
          alignItems: 'center',
        }}
      >
        {navItems.map((item) => {
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);
          return (
            <Box
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                cursor: 'pointer',
                py: 1,
                color: isActive ? '#4B9EFF' : 'rgba(255,255,255,0.45)',
                transition: 'color 0.15s ease',
                '&:active': { opacity: 0.7 },
              }}
            >
              <Box sx={{ fontSize: 22, lineHeight: 1, '& svg': { fontSize: 'inherit' } }}>
                {item.icon}
              </Box>
              <Typography
                level="body-xs"
                sx={{ fontSize: '10px', fontWeight: isActive ? 700 : 400, color: 'inherit', lineHeight: 1 }}
              >
                {item.shortLabel}
              </Typography>
              {isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    width: 32,
                    height: 2,
                    borderRadius: '0 0 2px 2px',
                    bgcolor: '#4B9EFF',
                  }}
                />
              )}
            </Box>
          );
        })}
      </Sheet>
    </Box>
  );
};

export default Layout;
