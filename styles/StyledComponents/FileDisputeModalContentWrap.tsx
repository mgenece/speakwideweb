import { manrope } from '@/mui-theme/_muiTheme';
import { Box, Stack, styled } from '@mui/material';

export const FileDisputeModalContentWrap = styled(Box)`
  .interpretationLanguagesBox {
    @media (max-width: 599px) {
      flex-wrap: wrap;
      justify-content: center;
    }
    .commonAutocomplete {
      min-width: 46%;
      @media (max-width: 599px) {
        min-width: 100%;
      }
      .MuiInputBase-root {
        &.Mui-focused {
          border: 1px solid ${({ theme }) => theme.palette.primary.main};
        }
      }
    }
  }
  .eachInputBox {
    &.topBoxWrapper {
      border-bottom: 1px solid ${({ theme }) => theme.palette.customColors?.colore8e8e8};
      padding-bottom: 29px;
    }
    .label-class {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.text.primary};
      text-transform: capitalize;
    }
    .checkbox-group {
      .MuiFormControlLabel-root {
        margin: 0;
        .MuiCheckbox-root {
          padding: 0;
        }
        .MuiFormControlLabel-label {
          padding-left: 10px;
          font-size: 14px;
          font-weight: 400;
          color: ${({ theme }) => theme.palette.customColors.light};
        }
      }
    }
  }
  .informationBox {
    margin-top: 5px;
    i {
      display: inline-flex;
    }
    .infoText {
      font-size: 12px;
      font-weight: 400;
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  .requestSessionTranslatebtn {
    background: ${({ theme }) => theme.palette.primary.main};
    border: 1px solid rgba(129, 66, 233, 0.04);
    border-radius: 10px;
    width: 100%;
    display: block;
    padding: 10px 19px;
    p {
      color: ${({ theme }) => theme.palette.common.white};
      font-size: 14px;
      font-weight: 500;
      text-transform: capitalize;
    }
    &:hover {
      opacity: 0.7;
    }
  }
  .checkbox {
    margin: 0;
    margin-top: 25px;
    .MuiButtonBase-root {
      padding: 0;
      margin-right: 15px;
    }
    span {
      font-size: 14px;
    }
  }
  .requestSessionbtn {
    margin-top: 25px;
    button {
      height: 50px;
      @media (max-width: 599px) {
        height: 40px;
        width: 100%;
      }
      background:
        radial-gradient(
          100% 100% at 50% 0%,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0) 100%
        ),
        rgb(129, 66, 233);
      border-radius: 10px;
      &:hover {
        background: transparent;
      }
      &.submitBtn {
        min-width: 170px;
      }
    }
  }

  &.editAccountContent {
    .top-stack {
      padding-bottom: 35px;
      .head-title {
        font-size: 24px;
        font-weight: 600;
        font-family: ${manrope.style.fontFamily};
        padding-bottom: 3px;
      }
      .btn-stack {
        @media (max-width: 599px) {
          width: 100%;
        }
        .discard-btn,
        .save-btn {
          padding: 12px 20px;
          min-width: 100px;
          font-weight: 500;
          @media (max-width: 599px) {
            width: 48%;
          }
        }
        .discard-btn {
          color: ${({ theme }) => theme.palette.text.primary};
          border: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
          &:hover {
            color: ${({ theme }) => theme.palette.common.white};
          }
        }
      }
    }
    .profile-pic-box {
      .icon {
        line-height: 0;
      }
      .label {
        font-size: 13px;
        font-weight: 500;
      }
      .profile-image-fig {
        line-height: 0;
        font-size: 0;
        width: 69px;
        height: 69px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .btn-stack {
        @media (max-width: 599px) {
          width: 100%;
        }
        .change-btn {
          padding: 11px 12px;
          min-width: 134px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 10px;
          @media (max-width: 599px) {
            width: 100%;
          }
        }
        .delete-pic-btn {
          padding: 11px 12px;
          min-width: 134px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 10px;
          color: ${({ theme }) => theme.palette.text.primary};
          border: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
          &:hover {
            color: ${({ theme }) => theme.palette.common.white};
          }
          @media (max-width: 599px) {
            width: 48%;
          }
        }
        .upload-wrapper {
          position: relative;
          display: inline-block;
          cursor: pointer;
          @media (max-width: 599px) {
            width: 48%;
          }

          .upload-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }
        }
      }
    }
    .upload-business-box {
      padding: 30px 0 10px;
      @media (max-width: 599px) {
        padding: 20px 0 10px;
      }
      .upload-box {
        width: 100%;
        background: ${({ theme }) => theme.palette.grey['50']};
        border: 1px solid #8142e90a;
        border-radius: 10px;
        padding: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        input {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          z-index: 2;
        }
        i {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .uploadText {
        }
        .uploadSubText {
          margin-top: 5px;
          font-size: 10px;
          font-weight: 400;
          color: ${({ theme }) => theme.palette.customColors.placeText};
        }
      }
    }
    .form-box {
      padding-bottom: 15px;
      .cmn-head-stack {
        padding: 10px 0;
        .title {
          color: ${({ theme }) => theme.palette.customColors.light};
        }
      }
      .eachInputBox {
        .input-field {
          .MuiInputBase-input {
            font-size: 14px;
            // Hide arrows in Chrome, Safari, Edge, Opera
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            // Hide arrows in Firefox
            &[type='number'] {
              -moz-appearance: textfield;
            }
          }
        }
        .select-box {
          .MuiSelect-select {
            font-size: 14px;
          }
          .intValue {
            font-size: 14px;
          }
        }
      }
    }
  }
  .smallCaptionTxt {
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.palette.customColors?.placeText};
  }
  .bldLabelTxt {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.primary};
  }
  .wrapper_cmnRatioWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    @media (max-width: 899px) {
      flex-wrap: wrap;
    }
    .normalLabelTxt {
      font-weight: 400;
      font-size: 14px;
      color: ${({ theme }) => theme.palette.customColors?.light};
    }
    .MuiFormGroup-root {
      flex-direction: row;
      display: flex;
      align-items: center;
      gap: 16px;
      .MuiFormControlLabel-root {
        margin: 0;
        .MuiRadio-root {
          padding: 0;
          margin: 0 6px 0 0;
        }
        span {
          font-size: 14px;
          font-weight: 400;
          color: ${({ theme }) => theme.palette.text.primary};
        }
      }
    }
    .selectBoxWrap {
      display: flex;
      align-items: center;
      gap: 10px;
      .MuiInputBase-root {
        min-width: 115px;
        .intValue {
          color: ${({ theme }) => theme.palette.text.primary};
        }
      }
    }
  }
`;

export const InfoBox = styled(Stack)`
  margin-top: 5px;
  i {
    display: inline-flex;
  }
  .infoText {
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
