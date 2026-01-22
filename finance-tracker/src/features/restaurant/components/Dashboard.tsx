import React from 'react';
import { 
  Box, Typography, Paper, Chip, Button 
} from '@mui/material';
import Grid from '@mui/material/Grid'; 
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import WarningIcon from '@mui/icons-material/Warning';

type OrderStatus = 'Ready' | 'Cooking' | 'Delivered';

interface StatusTileProps {
  label: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

interface KitchenUpdate {
  id: string;
  item: string;
  status: OrderStatus;
  time: string;
}

const StatusTile: React.FC<StatusTileProps> = ({ label, count, color, icon }) => (
  <Paper 
    elevation={3} 
    sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.paper',
      borderTop: `4px solid ${color}`,
      height: 160
    }}
  >
    {icon}
    <Typography variant="h3" fontWeight="bold" sx={{ my: 1, color: 'text.primary' }}>
      {count}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {label}
    </Typography>
  </Paper>
);

export const Dashboard: React.FC = () => {
  const updates: KitchenUpdate[] = [
    { id: '#9012', item: '2x Big Mac Meal', status: 'Ready', time: '1 min ago' },
    { id: '#9011', item: '1x Happy Meal', status: 'Cooking', time: '3 mins ago' },
    { id: '#9010', item: '4x McFlurry', status: 'Delivered', time: '5 mins ago' },
  ];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Ready': return 'success';
      case 'Cooking': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            Store #1024 - Operations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <AccessTimeIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
            Shift: Lunch Rush
          </Typography>
        </Box>
        <Chip 
          icon={<WarningIcon />} 
          label="High Traffic Alert" 
          color="error" 
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatusTile 
            label="Pending Orders" 
            count={12} 
            color="#FFC72C"
            icon={<AccessTimeIcon fontSize="large" sx={{ color: '#FFC72C' }} />} 
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatusTile 
            label="Cooking" 
            count={8} 
            color="#DA291C"
            icon={<FastfoodIcon fontSize="large" sx={{ color: '#DA291C' }} />} 
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatusTile 
            label="Ready for Pickup" 
            count={5} 
            color="#4CAF50"
            icon={<DeliveryDiningIcon fontSize="large" sx={{ color: '#4CAF50' }} />} 
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
           <Button 
             variant="contained" 
             fullWidth 
             sx={{ height: 160, fontSize: '1.2rem', flexDirection: 'column', gap: 1 }}
           >
             <Typography variant="h4">+</Typography>
             New Order
           </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom color="primary">
        Live Kitchen Updates
      </Typography>
      <Paper sx={{ overflow: 'hidden' }}>
        {updates.map((row, i) => (
          <Box 
            key={row.id} 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            p={2} 
            sx={{ borderBottom: i < updates.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{row.id}</Typography>
              <Typography variant="body2" color="text.secondary">{row.item}</Typography>
            </Box>
            <Box textAlign="right">
              <Chip 
                label={row.status} 
                size="small" 
                color={getStatusColor(row.status)} 
              />
              <Typography variant="caption" display="block" color="text.secondary" mt={0.5}>
                {row.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};