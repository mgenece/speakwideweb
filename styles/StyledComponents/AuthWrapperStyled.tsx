import { Box, Stack, styled } from '@mui/material';

export const AuthContainer = styled(Stack)`
  padding: 15px;
  &.authWrapperBusiness {
    text-align: left;
    .child-content-wrap {
      .authheadingStyled {
        text-align: left;
        margin-bottom: 70px;
        color: ${({ theme }) => theme.palette.text.primary};
        @media (max-width: 899px) {
          margin-bottom: 20px;
        }
        h1 {
          @media (max-width: 899px) {
            font-size: 30px;
          }
        }
      }
    }
  }
`;

export const AuthLeft = styled(Box)`
  width: 50%;
  padding: 15px 30px 15px 25px;
  position: relative;

  @media (max-width: 1199px) {
    width: 100%;
  }

  @media (max-width: 899px) {
    padding: 0;
  }

  .auth-head {
    width: 100%;
    min-height: 50px;
    padding-bottom: 50px;

    @media (max-width: 1599px) {
      padding-bottom: 30px;
    }

    @media (max-width: 899px) {
      padding-bottom: 15px;
      min-height: auto;
    }
    @media (max-width: 599px) {
      padding-bottom: 10px;
    }

    .header-logo {
      line-height: 0;
    }

    .auth-head-right {
      gap: 12px;
      .text {
        color: ${({ theme }) => theme.palette.customColors.light};
      }
    }
  }

  .auth-btn {
    min-width: 142px;
    text-align: center;
    @media (max-width: 1599px) {
      padding: 13px 25px;
      font-size: 14px;
    }

    @media (max-width: 599px) {
      padding: 0;
      font-size: 14px;
      color: ${({ theme }) => theme.palette.text.primary};
      font-weight: 600;
    }
  }

  .auth-tabs {
    margin-top: 25px;

    @media (max-width: 1599px) {
      margin-top: 18px;
    }
  }

  .left-child-content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;

    @media (max-width: 1599px) {
    }

    @media (max-width: 899px) {
    }

    @media (max-width: 599px) {
      margin-right: -15px;
      padding-right: 15px;
    }

    &.back-height {
      /* height: calc(100svh - 186px); */
    }

    .child-content-wrap {
      max-width: 476px;
      width: 100%;
      margin: auto;
      @media (max-width: 899px) {
        max-width: 100%;
        /* padding: 0 10px; */
      }
      .bold-text {
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
      }
    }
  }

  .goback-btn {
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    text-transform: inherit;
    color: ${({ theme }) => theme.palette.text.primary};
    position: absolute;
    bottom: 0;
    left: 32px;
    transition: all 0.3s;
    &:hover {
      color: ${({ theme }) => theme.palette.primary.main};
      background-color: transparent;
    }
  }

  .primary-gradiant-btn {
    margin-top: 18px;
  }
`;

export const AuthRight = styled(Box)`
  width: 50%;
  height: calc(100svh - 30px);
  position: relative;

  figure {
    margin: 0;
    width: 100%;
    height: 100%;
    line-height: 0;
    border-radius: 30px;
    overflow: hidden;
    position: relative;

    .float-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .MuiAvatar-root {
      position: absolute;
      border: 2px solid ${({ theme }) => theme.palette.common.white};
      box-shadow:
        0px 4px 4px rgba(129, 66, 233, 0.2),
        0px 24px 24px rgba(129, 66, 233, 0.2);
      transform: translatey(0px);
      animation: float 5s ease-in-out infinite;

      &.auth-avt1 {
        top: 17%;
        left: 43%;
        animation-delay: 0s;
      }

      &.auth-avt2 {
        top: 35%;
        right: 26%;
        animation-delay: 0.5s;
      }

      &.auth-avt3 {
        top: 55%;
        right: 3%;
        animation-delay: 1s;
      }

      &.auth-avt4 {
        top: 49%;
        right: 43%;
        animation-delay: 1.5s;
      }

      &.auth-avt5 {
        bottom: 29%;
        left: 14%;
        animation-delay: 2s;
      }

      &.auth-avt6 {
        bottom: 45%;
        left: 27%;
        animation-delay: 2.5s;
      }

      &.auth-avt7 {
        top: 32%;
        left: 16%;
        animation-delay: 3s;
      }
    }
  }

  .auth-slider {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0 20px 30px;

    .slider-content {
      background: radial-gradient(
        81.29% 131.82% at 15.32% 21.04%,
        rgba(129, 66, 233, 0.034) 0%,
        rgba(129, 66, 233, 0.2) 77.08%,
        rgba(129, 66, 233, 0.2) 100%
      );
      backdrop-filter: blur(20px);
      border-radius: 30px;
      padding: 28px 25px 50px 50px;
      border: 1px solid rgba(129, 66, 233, 0.17);

      @media (max-width: 1599px) {
        padding: 25px;
        border-radius: 15px;
      }

      .slide-head {
        margin-bottom: 25px;

        @media (max-width: 1599px) {
          margin-bottom: 15px;
        }

        p {
          font-weight: 500;
          font-size: 26px;
          width: calc(100% - 133px);

          @media (max-width: 1599px) {
            font-size: 22px;
            width: calc(100% - 93px);
          }
        }

        .slide-arrows {
          gap: 13px;

          button {
            width: 60px;
            height: 60px;
            padding: 0;
            border: 1px solid ${({ theme }) => theme.palette.primary.main};

            @media (max-width: 1599px) {
              width: 40px;
              height: 40px;
            }

            &:hover {
              background-color: ${({ theme }) => theme.palette.primary.main};
              svg {
                path {
                  fill: ${({ theme }) => theme.palette.common.white};
                }
              }
            }
          }
        }
      }
    }

    .splide {
      .description-text {
        color: ${({ theme }) => theme.palette.customColors?.light};
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-20px);
    }
    100% {
      transform: translatey(0px);
    }
  }
`;

export const AuthHeading = styled(Box)`
  text-align: center;

  h1 {
    margin-bottom: 8px;

    @media (max-width: 1599px) {
      font-size: 30px;
    }

    span {
      color: ${({ theme }) => theme.palette.primary.dark};
    }
  }

  p {
    color: ${({ theme }) => theme.palette.customColors?.light};
  }
`;

export const AuthContent = styled(Box)`
  margin-top: 30px;

  .remember-sec {
    .MuiCheckbox-root {
      .MuiSvgIcon-root {
        font-size: 20px;
        color: ${({ theme }) => theme.palette.text.primary};
      }
    }

    .MuiFormControlLabel-label {
      font-size: 14px;
    }

    .forgot-password-link {
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }

  .otp-content {
    .MuiFormLabel-root {
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.text.primary};
      margin-bottom: 6px;
    }

    .otp-container {
      gap: 15px;
      justify-content: space-between;

      @media (max-width: 599px) {
        gap: 8px;
      }

      .otp-input {
        background-color: ${({ theme }) => theme.palette.grey[50]};
        border-radius: 11px;
        padding: 15px 10px;
        border: 1px solid ${({ theme }) => theme.palette.customColors?.inputBorder};
        font-weight: 400;
        font-size: 16px;
        color: ${({ theme }) => theme.palette.text.primary};
        width: calc(25% - (3 * 14px / 4));
        text-align: center;

        /* Hide number input arrows (Chrome, Safari, Edge) */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Hide number input arrows (Firefox) */
        &[type='number'] {
          -moz-appearance: textfield;
        }

        &::placeholder {
          color: ${({ theme }) => theme.palette.text.primary} !important;
          opacity: 1;
          -webkit-text-fill-color: ${({ theme }) => theme.palette.text.primary} !important;
        }

        &::-ms-input-placeholder {
          color: ${({ theme }) => theme.palette.text.primary} !important;
          opacity: 1;
          -webkit-text-fill-color: ${({ theme }) => theme.palette.text.primary} !important;
        }

        &.filled {
          border: 1px solid ${({ theme }) => theme.palette.customColors?.primary100};
        }
      }
    }
  }

  .MuiDivider-root {
    max-width: 294px;
    margin: 15px auto 0;
    width: 100%;

    .MuiDivider-wrapper {
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.grey[100]};
    }
  }
`;
