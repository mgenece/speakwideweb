import { Box, styled } from '@mui/material';

export const SharedFileListStyled = styled(Box)`
  .heading-stack {
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.borderColor};
    padding: 18px 21px 18px 28px;
    @media (max-width: 599px) {
      padding: 15px;
    }
    .heading {
      font-size: 18px;
      font-weight: 500;
    }
    .close-button {
      background-color: ${({ theme }) => theme.palette.primary.main};
      border: 1px solid ${({ theme }) => theme.palette.primary.main};
      padding: 5px;
      transition: all 0.3s;
      &:hover {
        background-color: ${({ theme }) => theme.palette.common.white};
        svg {
          path {
            stroke: ${({ theme }) => theme.palette.primary.main};
          }
        }
      }
    }
  }
  .list-stack {
    padding: 24px 22px 30px;
    @media (max-width: 599px) {
      padding: 15px;
    }
    .icon {
      margin-top: 3px;
      width: 31px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      svg {
      }
    }
    .size {
      font-size: 10px;
      color: ${({ theme }) => theme.palette.customColors.placeText};
    }
    .delete-btn {
      padding: 0;
      transition: all 0.3s;
      &:hover {
        opacity: 0.75;
        svg {
          path {
            fill: ${({ theme }) => theme.palette.error.main};
          }
        }
      }
    }
  }

  &.shared-link {
    .list-stack {
      .icon {
        width: 44px;
        height: 41px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${({ theme }) => theme.palette.customColors.borderColor};
        margin-top: 0;
      }
    }
  }
`;
