import assest from '@/json/assest';
import { Box, styled } from '@mui/material';

export const MultiSelectWrapper = styled(Box)`
  .cmnautoComplete {
    .MuiInputBase-root {
      padding: 10px 10px;
      border: 1px solid #8142e90a;
      background: url(${assest.down}) ${({ theme }) => theme.palette.grey[50]} no-repeat 96%;
      background-size: 10px;
      border-radius: 10px;
      &:has(.MuiChip-root) {
        .MuiInputBase-input {
          margin-top: 10px;
          padding: 4px 10px;
          border-radius: 10px;
        }
      }
      .MuiChip-root {
        background-color: ${({ theme }) => theme.palette.common.white};
        border-color: transparent;
        .MuiSvgIcon-root {
          opacity: 0;
        }
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          background: url(${assest.CloseIcon}) no-repeat center;
          width: 10px;
          height: 10px;
        }
      }
      .MuiAutocomplete-clearIndicator {
        background: ${({ theme }) => theme.palette.common.white};
        color: ${({ theme }) => theme.palette.common.black};
        padding: 0;
        width: 30px;
        height: 30px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
        svg {
          width: 12px;
          height: auto;
        }
      }
      textarea {
        height: 24px !important;
        padding: 6px !important;
        width: auto !important;
        margin: 0 !important;
      }
      .MuiInputBase-input {
        width: 100%;
        padding: 10px 15px;
        /* background-color: ${({ theme }) => theme.palette.common.white}; */
      }

      &::before,
      &::after {
        opacity: 0;
      }
    }
  }
`;
