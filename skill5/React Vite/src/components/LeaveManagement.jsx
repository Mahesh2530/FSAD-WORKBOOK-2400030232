import { useState } from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'

const balances = [
  { type: 'Casual Leave', total: 12, used: 4, icon: <BeachAccessIcon />, color: '#1565C0' },
  { type: 'Sick Leave', total: 10, used: 2, icon: <LocalHospitalIcon />, color: '#E91E63' },
  { type: 'Earned Leave', total: 15, used: 8, icon: <WorkIcon />, color: '#2E7D32' },
  { type: 'Study Leave', total: 5, used: 1, icon: <SchoolIcon />, color: '#ED6C02' },
]

const initialHistory = [
  { id: 1, type: 'Casual Leave', from: '2025-12-20', to: '2025-12-22', days: 3, reason: 'Family function', status: 'Approved', appliedOn: '2025-12-15' },
  { id: 2, type: 'Sick Leave', from: '2025-11-05', to: '2025-11-05', days: 1, reason: 'Fever and cold', status: 'Approved', appliedOn: '2025-11-05' },
  { id: 3, type: 'Earned Leave', from: '2026-01-15', to: '2026-01-20', days: 6, reason: 'Vacation trip to Kerala', status: 'Pending', appliedOn: '2026-01-02' },
  { id: 4, type: 'Casual Leave', from: '2025-10-10', to: '2025-10-10', days: 1, reason: 'Personal work', status: 'Rejected', appliedOn: '2025-10-08' },
]

const statusColor = {
  Approved: 'success',
  Pending: 'warning',
  Rejected: 'error',
}

export default function LeaveManagement() {
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [history] = useState(initialHistory)
  const [form, setForm] = useState({ type: '', fromDate: '', toDate: '', reason: '' })
  const [snack, setSnack] = useState({ open: false, msg: '' })

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleApply = () => {
    setDialogOpen(false)
    setSnack({ open: true, msg: 'Leave application submitted successfully!' })
    setForm({ type: '', fromDate: '', toDate: '', reason: '' })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary">
          Leave Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} sx={{ borderRadius: 2 }}>
          Apply Leave
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {balances.map((b) => (
          <Grid key={b.type} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={2} sx={{ borderRadius: 2, borderTop: `4px solid ${b.color}` }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box sx={{ color: b.color }}>{b.icon}</Box>
                  <Typography variant="subtitle2">{b.type}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {b.total - b.used}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {b.used} used of {b.total}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(b.used / b.total) * 100}
                  sx={{
                    mt: 1,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#E0E0E0',
                    '& .MuiLinearProgress-bar': { bgcolor: b.color },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tab label="My Leaves" />
          <Tab label="Team Leaves" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                {['Leave Type', 'From', 'To', 'Days', 'Reason', 'Applied On', 'Status'].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow key={row.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.from}</TableCell>
                  <TableCell>{row.to}</TableCell>
                  <TableCell align="center">{row.days}</TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.reason}
                  </TableCell>
                  <TableCell>{row.appliedOn}</TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" color={statusColor[row.status]} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Apply for Leave</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel>Leave Type</InputLabel>
                <Select name="type" value={form.type} onChange={handleFormChange} label="Leave Type">
                  {balances.map((b) => (
                    <MenuItem key={b.type} value={b.type}>
                      {b.type} ({b.total - b.used} remaining)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="From Date"
                name="fromDate"
                type="date"
                value={form.fromDate}
                onChange={handleFormChange}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="To Date"
                name="toDate"
                type="date"
                value={form.toDate}
                onChange={handleFormChange}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Reason"
                name="reason"
                multiline
                rows={3}
                value={form.reason}
                onChange={handleFormChange}
                placeholder="Describe the reason for your leave..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleApply} variant="contained" disabled={!form.type || !form.fromDate || !form.reason}>
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </Container>
  )
}
