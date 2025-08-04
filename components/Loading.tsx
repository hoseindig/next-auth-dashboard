import { CircularProgress, Box } from "@mui/material";
import styled from "@emotion/styled";

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: #1976d2;
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <StyledCircularProgress size={60} thickness={4} />
    </LoadingContainer>
  );
};

export default Loading;
