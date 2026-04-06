import { Box, styled } from '@mui/material';

export const AccountEditInformationInterpreterMainWrap = styled(Box)`
  i {
    line-height: 0;
  }
  .bordered-box {
    position: relative;
    background: linear-gradient(133.06deg, #efe5ff 4.51%, rgba(243, 243, 243, 0.2) 55.88%);
    padding: 1px;
    border-radius: 10px;
    box-shadow:
      0px 34px 75px 0px #dfe1fb1a,
      0px 136px 136px 0px #dfe1fb17,
      0px 307px 184px 0px #dfe1fb0d,
      0px 546px 218px 0px #dfe1fb03,
      0px 853px 239px 0px #dfe1fb00;
    .inner-main-box {
      background: ${({ theme }) => theme.palette.common.white};
      border-radius: 10px;
      padding: 25px 19px 25px 22px;
      @media (max-width: 599px) {
        padding: 25px 14px 25px;
      }
      .border-top-stack {
        border: 1px dashed ${({ theme }) => theme.palette.customColors.borderColor5};
        border-radius: 10px;
        padding: 10px 12px;
        margin-bottom: 30px;
        .left-stack {
          @media (max-width: 599px) {
            width: 100%;
          }
          .profile-fig {
            line-height: 0;
            font-size: 0;
            width: 83px;
            height: 82px;
            border-radius: 10px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }

      .form-box {
        .eachInputBox {
          .MuiInputLabel-root {
            font-size: 16px;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 5px;
          }
          .input-field {
            input {
              color: ${({ theme }) => theme.palette.customColors.light};
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }

              &[type='number'] {
                -moz-appearance: textfield;
              }
            }
          }
          .grey-box {
            padding: 10px 10px;
            border: 1px solid #8142e90a;
            background-color: ${({ theme }) => theme.palette.grey['50']};
            border-radius: 10px;
            .file-list-stack {
              .border-stack {
                border: 1px solid ${({ theme }) => theme.palette.customColors.borderColor4};
                border-radius: 50px;
                padding-block: 8px;
                padding-inline: 12px;
                .cross-icon-btn {
                  padding: 0;
                  min-height: auto;
                  min-width: auto;
                  width: auto;
                  svg {
                    width: 10px;
                    height: 10px;
                    path {
                      fill: ${({ theme }) => theme.palette.customColors.darkTextColor};
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .btn-stack {
    @media (max-width: 899px) {
      width: 100%;
    }
    button {
      padding: 15px;
      min-height: 50px;
      min-width: 143px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 500;
      @media (max-width: 899px) {
        width: 48%;
      }
      @media (max-width: 599px) {
        min-width: auto;
        min-height: 40px;
      }
      &.change-btn {
        background:
          radial-gradient(
            100% 100% at 50% 0%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 100%
          ),
          #8142e9;
        transition: all 0.3s;
        &:hover {
          background: ${({ theme }) => theme.palette.common.white};
        }
      }
      &.remove-btn {
        color: ${({ theme }) => theme.palette.text.primary};
        border: 1px solid ${({ theme }) => theme.palette.customColors.colordec9ff};

        &:hover {
          color: ${({ theme }) => theme.palette.common.white};
        }
      }
    }
  }
`;
