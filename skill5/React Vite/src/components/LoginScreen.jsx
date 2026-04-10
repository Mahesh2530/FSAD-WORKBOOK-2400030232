import { useState } from 'react'
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  Collapse,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function LoginScreen() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [submitMsg, setSubmitMsg] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const errs = {}
    if (!formData.email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address'

    if (!formData.password) errs.password = 'Password is required'
    else if (formData.password.length < 6) errs.password = 'Minimum 6 characters required'

    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setSubmitMsg({ type: 'error', text: 'Please fix the errors below' })
    } else {
      setErrors({})
      setSubmitMsg({ type: 'success', text: 'Login successful! Redirecting...' })
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 3,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Avatar sx={{ mx: 'auto', mb: 2, width: 56, height: 56, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>

          <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Sign in to your account to continue
          </Typography>

          <Collapse in={!!submitMsg.text}>
            <Alert
              severity={submitMsg.type || 'info'}
              sx={{ mb: 2 }}
              onClose={() => setSubmitMsg({ type: '', text: '' })}
            >
              {submitMsg.text}
            </Alert>
          </Collapse>

          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} size="small" onChange={(e) => setRememberMe(e.target.checked)} />}
              label={<Typography variant="body2">Remember me</Typography>}
            />
            <Link href="#" variant="body2" underline="hover">
              Forgot password?
            </Link>
          </Box>

          <Button fullWidth variant="contained" size="large" onClick={handleSubmit} sx={{ mt: 2, py: 1.5, borderRadius: 2, fontSize: '1rem' }}>
            Sign In
          </Button>

          <Typography align="center" variant="body2" sx={{ mt: 3 }}>
            Don't have an account? <Link href="#" fontWeight={600}>Sign Up</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}
