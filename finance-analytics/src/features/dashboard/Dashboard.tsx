import React from 'react';
import { 
  Box, Paper, Typography, Button, Divider, 
  Card, CardContent, CardActions 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
}

interface QuickAction {
  title: string;
  desc: string;
  link: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, icon }) => (
  <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, height: '100%' }}>
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          {value}
        </Typography>
        <Typography variant="body2" color="success.main" sx={{ mt: 1, fontWeight: 500 }}>
          {subtext}
        </Typography>
      </Box>
      <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 2, color: 'white', display: 'flex' }}>
        {icon}
      </Box>
    </Box>
  </Paper>
);

export const Dashboard: React.FC = () => {
  const quickActions: QuickAction[] = [
    { title: "Employee Management", desc: "Manage payroll, shifts, and hiring.", link: "/employees" },
    { title: "Financial Reports", desc: "Download Q3 earnings and tax documents.", link: "/finance" },
    { title: "Inventory Control", desc: "Check stock levels across all regions.", link: "/inventory" },
  ];

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Good Morning, Admin
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Executive overview for your franchise network.
        </Typography>
      </Box>

      {/* v7 Grid Syntax: Use 'size' prop */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard 
            title="Total Revenue (Today)" 
            value="$42,500" 
            subtext="+12% vs yesterday"
            icon={<TrendingUpIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard 
            title="Active Employees" 
            value="1,240" 
            subtext="98% clocked in"
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard 
            title="Live Stores" 
            value="85" 
            subtext="3 stores offline"
            icon={<StoreIcon />}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        Quick Access
      </Typography>
      
      <Grid container spacing={3}>
        {quickActions.map((item, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card variant="outlined" sx={{ height: '100%', '&:hover': { boxShadow: 3, borderColor: 'primary.main' } }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowForwardIcon />}>Open Module</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};