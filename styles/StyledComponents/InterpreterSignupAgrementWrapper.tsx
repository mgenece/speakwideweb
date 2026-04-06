import { Stack, styled } from '@mui/material';

export const InterpreterSignupAgrementWrapper = styled(Stack)`
  .termsTextWrapper {
    .termsText {
      p {
        margin-bottom: 10px;
        color: ${({ theme }) => theme.palette.customColors.light};
        &:last-child {
          margin-bottom: 0;
        }
      }
      ol {
        padding-left: 28px;
        list-style: decimal-leading-zero;
      }
    }
  }
`;
