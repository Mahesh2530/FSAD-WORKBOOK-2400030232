import { useState } from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ButtonGroup,
  Snackbar,
  Alert,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const initialItems = [
  { id: 1, name: 'Wireless Headphones', price: 4999, qty: 1, image: 'https://via.placeholder.com/60/1565C0/fff?text=HP' },
  { id: 2, name: 'USB-C Hub Adapter', price: 1299, qty: 2, image: 'https://via.placeholder.com/60/2E7D32/fff?text=USB' },
  { id: 3, name: 'Mechanical Keyboard', price: 3499, qty: 1, image: 'https://via.placeholder.com/60/E91E63/fff?text=KB' },
]

export default function ShoppingCart() {
  const [items, setItems] = useState(initialItems)
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [snack, setSnack] = useState({ open: false, msg: '', type: 'success' })

  const updateQty = (id, delta) => {
    setItems(items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)))
  }

  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id))
    setSnack({ open: true, msg: 'Item removed from cart', type: 'info' })
  }

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SAVE10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 10 })
      setCoupon('')
      setSnack({ open: true, msg: 'Coupon applied! 10% off', type: 'success' })
    } else {
      setSnack({ open: true, msg: 'Invalid coupon code', type: 'error' })
    }
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discount) / 100) : 0
  const shipping = subtotal > 5000 ? 0 : 99
  const total = subtotal - discount + shipping
  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Shopping Cart ({items.length} items)
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2} sx={{ borderRadius: 2 }}>
            {items.length === 0 ? (
              <Box sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  Your cart is empty
                </Typography>
              </Box>
            ) : (
              <List>
                {items.map((item, idx) => (
                  <Box key={item.id}>
                    {idx > 0 && <Divider />}
                    <ListItem
                      sx={{ py: 2 }}
                      secondaryAction={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <ButtonGroup size="small" variant="outlined">
                            <IconButton onClick={() => updateQty(item.id, -1)}>
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Button disabled sx={{ minWidth: 40 }}>
                              {item.qty}
                            </Button>
                            <IconButton onClick={() => updateQty(item.id, 1)}>
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </ButtonGroup>
                          <Typography fontWeight={700} sx={{ minWidth: 80, textAlign: 'right' }}>
                            {fmt(item.price * item.qty)}
                          </Typography>
                          <IconButton edge="end" onClick={() => removeItem(item.id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar variant="rounded" src={item.image} sx={{ width: 60, height: 60, mr: 1 }} />
                      </ListItemAvatar>
                      <ListItemText primary={item.name} secondary={`${fmt(item.price)} each`} />
                    </ListItem>
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {[
                ['Subtotal', fmt(subtotal)],
                ['Shipping', shipping === 0 ? 'FREE' : fmt(shipping)],
              ].map(([label, val]) => (
                <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{label}</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {val}
                  </Typography>
                </Box>
              ))}

              {appliedCoupon && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip
                    label={appliedCoupon.code}
                    size="small"
                    onDelete={() => setAppliedCoupon(null)}
                    icon={<LocalOfferIcon />}
                    color="success"
                  />
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    -{fmt(discount)}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight={700}>
                  Total
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary">
                  {fmt(total)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                <TextField size="small" placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} fullWidth />
                <Button variant="outlined" onClick={applyCoupon}>
                  Apply
                </Button>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Try: SAVE10
              </Typography>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ShoppingCartCheckoutIcon />}
                disabled={items.length === 0}
                sx={{ mt: 3, py: 1.5 }}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.type} variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </Container>
  )
}
