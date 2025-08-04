"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Fade,
  Typography,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import { saveUser } from "@/lib/auth";
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

// Styled components for a modern look
const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #7c3aed 0%, #a5b4fc 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: "100%",
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
  background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
  animation: `${slideIn} 0.6s ease-out`,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: "none",
  display: "flex",
  gap: theme.spacing(1),
}));

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validatePhone = (value: string) => {
    const pattern = /^09\d{9}$/;
    return pattern.test(value);
  };

  const handleLogin = async () => {
    if (!validatePhone(phone)) {
      setError("Invalid phone number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        "https://randomuser.me/api/?results=1&nat=us"
      );
      const user: User = res.data.results[0];
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      saveUser(user);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <Fade in timeout={800}>
        <LoginCard>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ mb: 3, fontWeight: 700, color: "primary.main" }}
            >
              Login
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., 09123456789"
              error={!!error}
              disabled={loading}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />
            <StyledButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <LoginIcon />
                )
              }
            >
              {loading ? "Logging in..." : "Login"}
            </StyledButton>
          </CardContent>
        </LoginCard>
      </Fade>
    </AuthContainer>
  );
}
