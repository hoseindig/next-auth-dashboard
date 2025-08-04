// components/LoadingSkeleton.tsx
import { Box, Skeleton } from "@mui/material";
import styled from "@emotion/styled";

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  height: 100vh;
  background: #f5f7fa;
`;

const LoadingSkeleton = () => {
  return (
    <LoadingContainer>
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="rectangular" width="100%" height={200} />
    </LoadingContainer>
  );
};

export default LoadingSkeleton;
