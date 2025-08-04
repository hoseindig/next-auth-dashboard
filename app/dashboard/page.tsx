"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Container,
  Divider,
  Chip,
  LinearProgress,
  Paper,
  Fade,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { User } from "@/types/user";

// Keyframe animation for card entrance
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DashboardContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #6b7280 0%, #a5b4fc 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 750,
  width: "100%",
  borderRadius: theme.shape.borderRadius * 4,
  boxShadow: "0 15px 50px rgba(0, 0, 0, 0.25)",
  background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
  animation: `${slideIn} 0.6s ease-out`,
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  margin: "0 auto",
  border: `6px solid ${theme.palette.primary.main}`,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.06)",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)",
  },
}));

const InfoRow = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    background: theme.palette.grey[50],
    transform: "translateX(8px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
}));

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchedUser = getUser();
    setUser(fetchedUser);
    if (!fetchedUser) {
      router.replace("/auth");
    } else {
      setIsVisible(true);
    }
  }, [router]);

  if (!user) {
    return null; // Render nothing until user data is loaded
  }

  return (
    <DashboardContainer>
      <Fade in={isVisible} timeout={800}>
        <ProfileCard>
          <Box
            sx={{
              bgcolor: "primary.main",
              p: 5,
              textAlign: "center",
              borderTopLeftRadius: "inherit",
              borderTopRightRadius: "inherit",
            }}
          >
            <AvatarWrapper
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <Typography
              variant="h3"
              sx={{ mt: 2, color: "white", fontWeight: 700, letterSpacing: 1 }}
            >
              {user.name.title} {user.name.first} {user.name.last}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}
            >
              <Chip
                icon={<PersonIcon />}
                label={user.nat}
                color="secondary"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<VpnKeyIcon />}
                label={user.login.username}
                color="secondary"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
          <CardContent sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InfoRow elevation={2}>
                  <EmailIcon sx={{ color: "primary.main", fontSize: 30 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.email}
                    </Typography>
                  </Box>
                </InfoRow>
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow elevation={2}>
                  <PhoneIcon sx={{ color: "primary.main", fontSize: 30 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      Phone
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.phone} (Cell: {user.cell})
                    </Typography>
                  </Box>
                </InfoRow>
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow elevation={2}>
                  <LocationOnIcon
                    sx={{ color: "primary.main", fontSize: 30 }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      Location
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.location.street.number} {user.location.street.name},{" "}
                      {user.location.city}, {user.location.state},{" "}
                      {user.location.country} ({user.location.postcode})
                    </Typography>
                  </Box>
                </InfoRow>
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow elevation={2}>
                  <CakeIcon sx={{ color: "primary.main", fontSize: 30 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      Date of Birth
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {new Date(user.dob.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      (Age: {user.dob.age})
                    </Typography>
                  </Box>
                </InfoRow>
              </Grid>
            </Grid>
            <Divider sx={{ my: 4, borderColor: "grey.300" }} />
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Account Overview
              </Typography>
              <LinearProgress
                variant="determinate"
                value={100}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  bgcolor: "grey.200",
                  "& .MuiLinearProgress-bar": { bgcolor: "primary.main" },
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Registered since{" "}
                {new Date(user.registered.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                ({user.registered.age} years ago)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Timezone: {user.location.timezone.description} (
                {user.location.timezone.offset})
              </Typography>
            </Box>
          </CardContent>
        </ProfileCard>
      </Fade>
    </DashboardContainer>
  );
}
