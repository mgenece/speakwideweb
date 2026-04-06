import { manrope } from '@/mui-theme/_muiTheme';
import { Drawer, styled } from '@mui/material';

export const AddCardDrawerStyled = styled(Drawer)`
  .MuiBackdrop-root {
    background-color: transparent;
  }
  .MuiDrawer-paper {
    max-width: 541px;
    width: 100%;
    border-radius: 30px 0 0 30px;
    box-shadow:
      -2px -11px 25px 0px #8185c51a,
      -7px -45px 45px 0px #8185c517,
      -15px -101px 61px 0px #8185c50d,
      -26px -179px 72px 0px #8185c503,
      -41px -279px 79px 0px #8185c500;

    @media (max-width: 899px) {
      max-width: 100%;
      border-radius: 0;
    }
    .head-stack {
      padding: 22px 23px 23px 27px;
      border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
      @media (max-width: 899px) {
        padding: 20px;
      }
      @media (max-width: 599px) {
        padding: 20px 10px;
      }
      .back-btn {
        color: ${({ theme }) => theme.palette.common.white};
        padding: 0;
        svg {
          width: 20px;
          height: 20px;
        }
      }
      .drawer-title {
        font-size: 24px;
        font-weight: 600;
        /* color: ${({ theme }) => theme.palette.common.white}; */
        font-family: ${manrope.style.fontFamily};
        @media (max-width: 899px) {
          font-size: 18px;
        }
      }
      .filter-btn {
        min-height: auto;
        min-width: auto;
        padding: 0;
        svg {
          path {
            fill: ${({ theme }) => theme.palette.common.white};
          }
        }
      }
    }
    .main-body {
      padding: 25px 22px;
      max-height: calc(100dvh - 131px);
      overflow-y: auto;
      @media (max-width: 899px) {
        padding: 20px 20px 40px;
        max-height: calc(100dvh - 218px);
      }
      @media (max-width: 599px) {
        padding: 10px;
      }
      .eachInputBox {
        label {
          margin-bottom: 5px;
          font-size: 14px;
          font-weight: 600;
          color: ${({ theme }) => theme.palette.text.primary};
          text-transform: capitalize;
          span {
            font-weight: 400;
          }
        }
        .input-field {
          .MuiInputBase-input {
            font-size: 14px;
            color: ${({ theme }) => theme.palette.customColors.light};
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
            color: ${({ theme }) => theme.palette.customColors.light};
          }
          .intValue {
            font-size: 14px;
            color: ${({ theme }) => theme.palette.customColors.placeText};
          }
        }
      }
    }
    .btn-box {
      padding: 0 22px 25px;
      @media (max-width: 899px) {
        padding: 20px;
      }
      @media (max-width: 599px) {
        padding: 10px;
      }
      .cancel-btn {
        border: 1px solid ${({ theme }) => theme.palette.customColors.colorD0B3FF};
        padding-block: 14px;
      }
      .add-btn {
        border: 1px solid ${({ theme }) => theme.palette.customColors.colorD0B3FF};
        padding-block: 14px;
        background:
          radial-gradient(
            100% 100% at 50% 0%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 100%
          ),
          #8142e9;
        &:hover {
          background: ${({ theme }) => theme.palette.common.white};
        }
      }
    }
  }

  &.account-details-drawer {
    position: relative;
    .MuiDrawer-paper {
      max-width: 680px;
      box-shadow: none;
      background-color: transparent;
      border-radius: 30px 0 0 30px;
      @media (max-width: 899px) {
        max-width: 100%;
        border-radius: 0;
      }
      .cross-button {
        background-color: ${({ theme }) => theme.palette.common.white};
        padding: 19px;
        position: absolute;
        left: 62px;
        top: 15px;
        border-radius: 50%;
        box-shadow:
          0px 4px 10px rgba(167, 179, 225, 0.25),
          -26px -179px 72px rgba(129, 133, 197, 0.01),
          -15px -101px 61px rgba(129, 133, 197, 0.05),
          -7px -45px 45px rgba(129, 133, 197, 0.09),
          -2px -11px 25px rgba(129, 133, 197, 0.1);

        transition: all 0.3s;

        &:hover {
          opacity: 0.75;
        }

        @media (max-width: 899px) {
          right: 20px;
          top: 20px;
          left: unset;
          padding: 10px;
        }
        @media (max-width: 599px) {
          right: 10px;
          top: 15px;
          padding: 10px;
          svg {
            width: 12px;
            height: 12px;
          }
        }
      }

      .white-box {
        max-width: 541px;
        width: 100%;
        height: 100%;
        margin-left: auto;
        background-color: ${({ theme }) => theme.palette.common.white};
        box-shadow:
          -2px -11px 25px 0px #8185c51a,
          -7px -45px 45px 0px #8185c517,
          -15px -101px 61px 0px #8185c50d,
          -26px -179px 72px 0px #8185c503,
          -41px -279px 79px 0px #8185c500;
        border-radius: 30px 0 0 30px;
        @media (max-width: 899px) {
          max-width: 100%;
          border-radius: 0;
        }
        .radio-main {
          position: relative;
          margin: 0;
          .MuiRadio-root {
            position: absolute;
            right: 10px;
            bottom: 12px;
          }
          .MuiFormControlLabel-label {
            width: 100%;
            .bordered-box {
              background: radial-gradient(100% 100% at 77.33% 0%, #c1b9f9 0%, #ffffff 30.59%);
              padding: 1px;
              border-radius: 20px;
              width: 100%;
              box-shadow:
                0px 0px 10px rgba(158, 170, 200, 0.25),
                6px 96px 39px rgba(172, 171, 211, 0.01),
                4px 54px 33px rgba(172, 171, 211, 0.05),
                2px 24px 24px rgba(172, 171, 211, 0.09),
                0px 6px 13px rgba(172, 171, 211, 0.1);

              .bank-card-main {
                background-color: ${({ theme }) => theme.palette.common.white};
                padding: 16px;
                border-radius: 20px;
                .top-part {
                  padding-bottom: 20px;
                  border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
                  .bank-name-stack {
                    padding-bottom: 11px;
                    .bank-logo-fig {
                      font-size: 0;
                      line-height: 0;
                      width: 61px;
                      height: 42px;
                      border-radius: 5px;
                      overflow: hidden;
                      img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                      }
                    }
                    .right-part {
                      width: calc(100% - 61px);
                      padding-left: 17px;
                      .bank-name {
                        font-size: 11px;
                      }
                    }
                  }
                  .routing-box {
                    border-radius: 5px;
                    background-color: ${({ theme }) => theme.palette.customColors.btnBg};
                    border: 1px solid ${({ theme }) => theme.palette.customColors.borderColor2};
                    width: max-content;
                    padding: 5px 10px;
                    .routing-text {
                      font-size: 11px;
                      color: ${({ theme }) => theme.palette.customColors.light};
                      span {
                        font-weight: 500;
                        color: ${({ theme }) => theme.palette.text.primary};
                      }
                    }
                  }
                }
                .bottom-stack {
                  padding: 16px 0 5px 0;
                }
              }
            }
          }
        }
      }
    }
    &.select-plan-drawer {
      .MuiBackdrop-root {
        background: #000326cc;
        backdrop-filter: blur(20px);
      }
      .head-stack {
        border-bottom: 0;
      }
      .main-body {
        padding: 10px 24px 32px 31px;
        max-height: calc(100dvh - 156px);

        @media (max-width: 899px) {
          padding: 20px 20px 40px;
        }
        @media (max-width: 599px) {
          padding: 10px;
        }

        .bank-list-box {
          margin-top: 25px;
          .bank-head {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 15px;
          }
          .account-list {
            background-color: ${({ theme }) => theme.palette.customColors.primary800};
            border-radius: 10px;
            padding: 19px 22px 19px 19px;

            .radio-main {
              &:not(:last-child) {
                border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colore8e8e8};
                padding-bottom: 22px;
                .MuiRadio-root {
                  bottom: 24px;
                }
              }
              &:first-child {
                .MuiRadio-root {
                  bottom: 24px;
                }
              }
              &:not(:first-child) {
                padding-top: 22px;
              }
              .MuiRadio-root {
                bottom: 4px;
              }
            }

            li {
              &:not(:last-child) {
                margin-bottom: 8px;
              }

              .account-items {
                justify-content: space-between;
                padding: 0;
                text-transform: inherit;

                &:hover {
                  background-color: transparent;
                }

                .btn-capstack {
                  display: flex;
                  align-items: center;
                  gap: 13px;

                  figure {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    width: 62px;
                    height: 23px;

                    img {
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                    }
                  }

                  .btn-capinr {
                    text-align: left;

                    .btn-captxt {
                      display: block;
                      color: ${({ theme }) => theme.palette.text.primary};
                    }

                    .MuiChip-root {
                      height: auto;
                      font-size: 10px;
                      font-weight: 500;
                      color: ${({ theme }) => theme.palette.primary.main};
                      background-color: ${({ theme }) => theme.palette.customColors.colorF0E7FF};

                      .MuiChip-label {
                        padding-left: 13px;
                        padding-right: 13px;
                      }
                    }
                  }
                }

                .MuiButton-endIcon {
                  margin-right: 0;
                }
              }
            }
          }
        }
        .white-box {
          .radio-main {
            .MuiRadio-root {
            }
          }
        }
      }
    }
  }
`;
