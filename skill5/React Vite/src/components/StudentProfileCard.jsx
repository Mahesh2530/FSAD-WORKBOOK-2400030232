import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Chip,
  Stack,
  LinearProgress,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Badge,
  styled,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import ShareIcon from '@mui/icons-material/Share'
import SchoolIcon from '@mui/icons-material/School'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    width: 14,
    height: 14,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))

const student = {
  name: 'Priya Reddy',
  rollNo: '2200030125',
  department: 'Computer Science & Engineering',
  year: '3rd Year – B.Tech',
  cgpa: 8.7,
  attendance: 92,
  email: 'priya.reddy@kluniversity.in',
  phone: '+91 98765 43210',
  skills: ['React', 'Python', 'Machine Learning', 'Java', 'SQL', 'Docker'],
}

export default function StudentProfileCard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, bgcolor: 'background.default', minHeight: 'calc(100vh - 120px)' }}>
      <Card sx={{ width: 380, borderRadius: 3, overflow: 'visible' }} elevation={6}>
        <Box
          sx={{
            height: 120,
            background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
            borderRadius: '12px 12px 0 0',
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: -5 }}>
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar sx={{ width: 88, height: 88, border: '4px solid white', bgcolor: 'secondary.main', fontSize: '2rem' }}>
              {student.name.charAt(0)}
            </Avatar>
          </StyledBadge>
        </Box>

        <CardContent sx={{ textAlign: 'center', pt: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            {student.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.rollNo} | {student.year}
          </Typography>
          <Chip icon={<SchoolIcon />} label={student.department} size="small" sx={{ mt: 1 }} color="primary" variant="outlined" />

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'left', mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">CGPA</Typography>
              <Typography variant="subtitle2" color="primary">
                {student.cgpa} / 10
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={student.cgpa * 10} sx={{ height: 8, borderRadius: 4, mt: 0.5 }} />
          </Box>

          <Box sx={{ textAlign: 'left', mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Attendance</Typography>
              <Typography variant="subtitle2" color="success.main">
                {student.attendance}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={student.attendance} color="success" sx={{ height: 8, borderRadius: 4, mt: 0.5 }} />
          </Box>

          <Typography variant="subtitle2" sx={{ textAlign: 'left', mb: 1 }}>
            Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {student.skills.map((skill) => (
              <Chip key={skill} label={skill} size="small" color="primary" variant="outlined" />
            ))}
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
          <Tooltip title={student.email}>
            <IconButton color="primary">
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={student.phone}>
            <IconButton color="success">
              <PhoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share Profile">
            <IconButton color="secondary">
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  )
}
