import { useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Rating,
  Chip,
  IconButton,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const product = {
  name: 'Wireless Noise-Cancelling Headphones',
  brand: 'SoundMax Pro',
  price: 4999,
  originalPrice: 7999,
  rating: 4.3,
  reviewCount: 1284,
  image: 'https://via.placeholder.com/340x220/1565C0/FFFFFF?text=Headphones',
  discount: 38,
  inStock: true,
}

export default function ProductCard() {
  const [wishlisted, setWishlisted] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, bgcolor: 'background.default', minHeight: 'calc(100vh - 120px)' }}>
      <Card
        sx={{
          maxWidth: 340,
          borderRadius: 3,
          transition: 'transform 0.25s, box-shadow 0.25s',
          '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 },
        }}
        elevation={4}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia component="img" height={220} image={product.image} alt={product.name} sx={{ objectFit: 'cover' }} />
          <Chip
            label={`${product.discount}% OFF`}
            color="error"
            size="small"
            sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 700 }}
          />
          <IconButton
            onClick={() => setWishlisted(!wishlisted)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255,255,255,0.9)',
              '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
            }}
          >
            {wishlisted ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>

        <CardContent>
          <Typography variant="caption" color="text.secondary" textTransform="uppercase" letterSpacing={1}>
            {product.brand}
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.reviewCount.toLocaleString()} reviews)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
            <Typography variant="h5" color="primary" fontWeight={700}>
              ₹{product.price.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </Typography>
            <Chip
              label={`Save ₹${(product.originalPrice - product.price).toLocaleString('en-IN')}`}
              size="small"
              color="success"
              variant="outlined"
            />
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            disabled={!product.inStock}
            onClick={() => setCartOpen(true)}
            sx={{ py: 1.2, borderRadius: 2 }}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={cartOpen}
        autoHideDuration={3000}
        onClose={() => setCartOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}
