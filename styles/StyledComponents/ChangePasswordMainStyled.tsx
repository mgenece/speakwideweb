import { Box, styled } from '@mui/material';

export const ChangePasswordMainStyled = styled(Box)`
  i {
    line-height: 0;
  }
  .bordered-box {
    position: relative;
    background: linear-gradient(133.06deg, #efe5ff 4.51%, rgba(243, 243, 243, 0.2) 55.88%);
    padding: 1px;
    border-radius: 20px;
    box-shadow:
      0px 34px 75px 0px #dfe1fb1a,
      0px 136px 136px 0px #dfe1fb17,
      0px 307px 184px 0px #dfe1fb0d,
      0px 546px 218px 0px #dfe1fb03,
      0px 853px 239px 0px #dfe1fb00;
    @media (max-width: 899px) {
      border-radius: 10px;
    }
    .inner-main-box {
      background: ${({ theme }) => theme.palette.common.white};
      border-radius: 20px;
      padding: 28px 21px 22px 28px;
      @media (max-width: 899px) {
        border-radius: 10px;
        padding: 15px;
      }
      .left-part {
        padding-bottom: 30px;
        @media (max-width: 899px) {
          padding-bottom: 10px;
        }
        .label-withInput-box {
          .label {
            font-size: 16px;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.text.primary};
            padding-bottom: 10px;
          }
        }
      }
      .right-part {
        border-radius: 15px;
        box-shadow:
          0px 6px 14px 0px #c0c0dd1a,
          0px 25px 25px 0px #c0c0dd17,
          0px 57px 34px 0px #c0c0dd0d,
          0px 101px 40px 0px #c0c0dd03,
          0px 158px 44px 0px #c0c0dd00,
          0px -2px 20px 0px #eae0fb40;
        padding: 26px 30px;
        height: 100%;
        @media (max-width: 899px) {
          border-radius: 10px;
          padding: 15px;
        }
        .info-text {
          font-size: 16px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.text.primary};
          padding-bottom: 30px;
          @media (max-width: 599px) {
            padding-bottom: 20px;
          }
        }
        .validation-rule {
          color: ${({ theme }) => theme.palette.customColors.redText};
          position: relative;
          padding-left: 20px;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 7px;
            width: 10px;
            height: 10px;
            background-color: ${({ theme }) => theme.palette.customColors.redText};
            border-radius: 50%;
          }
          &.success {
            color: ${({ theme }) => theme.palette.info.main};
            text-decoration: line-through;
            &::before {
              background-color: ${({ theme }) => theme.palette.info.main};
            }
          }
        }
      }
    }
  }
  .change-password-btn {
    background:
      radial-gradient(
        100% 100% at 50% 0%,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      #8142e9;
    border-radius: 10px;
    min-height: 50px;
    min-width: 240px;
    padding: 10px 30px;
    transition: all 0.3s;
    &:hover {
      background: ${({ theme }) => theme.palette.common.white};
    }
    @media (max-width: 899px) {
      width: 100%;
    }
  }
  .go-back-btn {
    padding: 0;
    min-height: auto;
    min-width: auto;
    width: auto;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.text.primary};
    transition: all 0.3s;
    &:hover {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;
