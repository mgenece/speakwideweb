import { manrope } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const SectionHeadingStyled = styled(Box)`
  .headingWrapperSec {
    .mainHead,
    h2 {
      font-weight: 700;
      font-size: 42px;
      line-height: 1.3;
      color: ${({ theme }) => theme.palette.text?.primary};
      margin-bottom: 5px;
      @media (max-width: 1199px) {
        font-size: 36px;
      }
      @media (max-width: 899px) {
        font-size: 32px;
      }
      @media (max-width: 599px) {
        font-size: 24px;
      }
      span {
        font-size: 100%;
        font-family: ${manrope?.style?.fontFamily};
        font-weight: 700;
        line-height: 1.3;
        color: ${({ theme }) => theme.palette.primary?.dark};
      }
    }
    p {
      color: ${({ theme }) => theme.palette.customColors?.light};
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .desc-content {
      max-width: 513px;
      color: ${({ theme }) => theme.palette.grey['A700']};
    }
  }
`;
