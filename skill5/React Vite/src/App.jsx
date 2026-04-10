import { useMemo } from 'react'
import { Link as RouterLink, Route, Routes, useLocation } from 'react-router-dom'
import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import LoginScreen from './components/LoginScreen'
import RegistrationPage from './components/RegistrationPage'
import StudentProfileCard from './components/StudentProfileCard'
import SalaryCalculator from './components/SalaryCalculator'
import ProductCard from './components/ProductCard'
import ShoppingCart from './components/ShoppingCart'
import LeaveManagement from './components/LeaveManagement'

const navItems = [
  { label: 'Login', path: '/' },
  { label: 'Register', path: '/register' },
  { label: 'Profile', path: '/profile' },
  { label: 'Salary', path: '/salary' },
  { label: 'Product', path: '/product' },
  { label: 'Cart', path: '/cart' },
  { label: 'Leave', path: '/leave' },
]

export default function App() {
  const { pathname } = useLocation()

  const tabValue = useMemo(() => {
    const index = navItems.findIndex((item) => item.path === pathname)
    return index === -1 ? 0 : index
  }, [pathname])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={1} color="inherit">
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'stretch', py: 1 }}>
          <Typography variant="h6" color="primary" sx={{ px: 1, mb: 1 }}>
            React + Vite + MUI 7 Screens
          </Typography>
          <Tabs
            value={tabValue}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ '& .MuiTab-root': { minHeight: 40 } }}
          >
            {navItems.map((item) => (
              <Tab key={item.path} component={RouterLink} to={item.path} label={item.label} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} disableGutters>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/profile" element={<StudentProfileCard />} />
          <Route path="/salary" element={<SalaryCalculator />} />
          <Route path="/product" element={<ProductCard />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/leave" element={<LeaveManagement />} />
        </Routes>
      </Container>
    </Box>
  )
}
