import { useState } from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Slider,
  Switch,
  FormControlLabel,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Card,
  CardContent,
  Divider,
} from '@mui/material'
import CalculateIcon from '@mui/icons-material/Calculate'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'

export default function SalaryCalculator() {
  const [salary, setSalary] = useState({
    basicPay: 50000,
    hra: 20000,
    da: 15000,
    specialAllowance: 10000,
    taxPercent: 10,
    pfEnabled: true,
    esiEnabled: false,
  })
  const [result, setResult] = useState(null)

  const handleField = (name) => (e) => setSalary({ ...salary, [name]: Number(e.target.value) || 0 })

  const calculate = () => {
    const gross = salary.basicPay + salary.hra + salary.da + salary.specialAllowance
    const pf = salary.pfEnabled ? Math.round(salary.basicPay * 0.12) : 0
    const esi = salary.esiEnabled ? Math.round(gross * 0.0175) : 0
    const tax = Math.round(gross * (salary.taxPercent / 100))
    const totalDed = pf + esi + tax
    setResult({ gross, pf, esi, tax, totalDed, net: gross - totalDed })
  }

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Employee Salary Calculator
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Earnings
            </Typography>

            {[
              ['Basic Pay', 'basicPay'],
              ['HRA', 'hra'],
              ['DA', 'da'],
              ['Special Allowance', 'specialAllowance'],
            ].map(([label, key]) => (
              <TextField
                key={key}
                fullWidth
                label={label}
                type="number"
                sx={{ mb: 2 }}
                value={salary[key]}
                onChange={handleField(key)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            ))}

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Deductions
            </Typography>

            <Typography variant="body2" gutterBottom>
              Income Tax: {salary.taxPercent}%
            </Typography>
            <Slider
              value={salary.taxPercent}
              onChange={(_, v) => setSalary({ ...salary, taxPercent: v })}
              min={0}
              max={30}
              step={0.5}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: '0%' },
                { value: 10, label: '10%' },
                { value: 20, label: '20%' },
                { value: 30, label: '30%' },
              ]}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={<Switch checked={salary.pfEnabled} onChange={(e) => setSalary({ ...salary, pfEnabled: e.target.checked })} />}
              label="Provident Fund (12% of Basic)"
            />
            <FormControlLabel
              control={<Switch checked={salary.esiEnabled} onChange={(e) => setSalary({ ...salary, esiEnabled: e.target.checked })} />}
              label="ESI (1.75% of Gross)"
            />

            <Button fullWidth variant="contained" size="large" startIcon={<CalculateIcon />} onClick={calculate} sx={{ mt: 2, py: 1.5 }}>
              Calculate Salary
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {result ? (
            <>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                  color: 'white',
                  mb: 3,
                  borderRadius: 2,
                }}
                elevation={4}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                    Net Monthly Salary
                  </Typography>
                  <Typography variant="h3" fontWeight={700}>
                    {fmt(result.net)}
                  </Typography>
                </CardContent>
              </Card>

              <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#E3F2FD' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Component</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      ['Basic Pay', salary.basicPay],
                      ['HRA', salary.hra],
                      ['DA', salary.da],
                      ['Special Allowance', salary.specialAllowance],
                    ].map(([label, value]) => (
                      <TableRow key={label}>
                        <TableCell>{label}</TableCell>
                        <TableCell align="right">{fmt(value)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: '#E8F5E9' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Gross Salary</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        {fmt(result.gross)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) PF</TableCell>
                      <TableCell align="right">{fmt(result.pf)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) ESI</TableCell>
                      <TableCell align="right">{fmt(result.esi)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>(-) Income Tax</TableCell>
                      <TableCell align="right">{fmt(result.tax)}</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: '#FFEBEE' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Total Deductions</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#C62828' }}>
                        {fmt(result.totalDed)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 2, bgcolor: '#FAFAFA' }}>
              <CurrencyRupeeIcon sx={{ fontSize: 64, color: '#BDBDBD' }} />
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Enter salary details and click Calculate
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
