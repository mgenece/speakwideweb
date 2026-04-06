import { Box, styled } from '@mui/material';

export const SearchNoFoundWraaper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  figure {
    margin: 0;
  }
  @media (max-width: 599px) {
    figure {
      width: 150px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  p {
    margin-top: 15px;
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.primary.main};
    @media (max-width: 599px) {
      font-size: 16px;
    }
  }
`;
