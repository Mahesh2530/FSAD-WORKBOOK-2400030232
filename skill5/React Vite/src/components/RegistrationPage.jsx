import { useState } from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Divider,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const steps = ['Personal Information', 'Account Setup', 'Review & Submit']

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  password: '',
  confirmPassword: '',
  role: 'student',
  agreeTerms: false,
}

export default function RegistrationPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setErrors({ ...errors, [name]: '' })
  }

  const validateStep = (step) => {
    const errs = {}

    if (step === 0) {
      if (!form.firstName.trim()) errs.firstName = 'Required'
      if (!form.email.trim()) errs.email = 'Required'
      else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
      if (!form.phone.trim()) errs.phone = 'Required'
      else if (!/^\d{10}$/.test(form.phone)) errs.phone = '10-digit number required'
    }

    if (step === 1) {
      if (form.password.length < 8) errs.password = 'Min 8 characters'
      if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep(activeStep)) setActiveStep((s) => s + 1)
  }

  const handleBack = () => setActiveStep((s) => s - 1)

  const handleSubmit = () => {
    if (!form.agreeTerms) {
      setErrors({ agreeTerms: 'Required' })
      return
    }
    setSnackOpen(true)
  }

  const renderStep0 = () => (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField fullWidth label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={form.gender} onChange={handleChange} label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )

  const renderStep1 = () => (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPwd ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password || 'Min 8 chars, 1 uppercase, 1 number'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </Grid>
      <Grid size={12}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Select Your Role
        </Typography>
        <RadioGroup row name="role" value={form.role} onChange={handleChange}>
          <FormControlLabel value="student" control={<Radio />} label="Student" />
          <FormControlLabel value="faculty" control={<Radio />} label="Faculty" />
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        </RadioGroup>
      </Grid>
    </Grid>
  )

  const renderStep2 = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Details
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {[
        ['First Name', form.firstName],
        ['Last Name', form.lastName],
        ['Email', form.email],
        ['Phone', form.phone],
        ['Gender', form.gender],
        ['Role', form.role],
      ].map(([label, val]) => (
        <Box key={label} sx={{ display: 'flex', mb: 1 }}>
          <Typography variant="body2" fontWeight={600} sx={{ width: 140 }}>
            {label}:
          </Typography>
          <Typography variant="body2">{val || '—'}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <FormControlLabel
        control={<Checkbox name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} />}
        label="I agree to the Terms & Conditions"
      />
      {errors.agreeTerms && (
        <Typography color="error" variant="caption">
          Please accept the terms to continue
        </Typography>
      )}
    </Box>
  )

  const stepContent = [renderStep0, renderStep1, renderStep2]

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" fontWeight={700} color="primary" gutterBottom>
          Create Account
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {stepContent[activeStep]()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit} disabled={!form.agreeTerms}>
              Submit Registration
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Registration successful! Welcome aboard.
        </Alert>
      </Snackbar>
    </Container>
  )
}
