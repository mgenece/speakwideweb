import assest from '@/json/assest';
import { inter, manrope } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const PricingCardStyled = styled(Box)`
  height: 100%;
  .PricingCardOuter {
    background: linear-gradient(156.07deg, #0b0e29 49.66%, #2c4088 78.04%);
    mix-blend-mode: normal;
    box-shadow: inset 0px 28.8px 48px #000000;
    border-radius: 15px;
    position: relative;
    z-index: 1;
    color: ${({ theme }) => theme.palette.common?.white};
    padding: 30px 24px;
    height: 100%;
    padding-bottom: 100px;
    overflow: hidden;
    @media (max-width: 1199px) {
      padding: 24px 20px;
      padding-bottom: 100px;
    }
    @media (max-width: 599px) {
      padding: 16px;
      border-radius: 10px;
      padding-bottom: 100px;
    }
    &:after {
      position: absolute;
      content: '';
      background: url(${assest?.subscribePlanLayer}) no-repeat right bottom;
      /* priceBg */
      background-size: 100% auto;
      bottom: -78px;
      left: 50%;
      transform: translateX(-50%);
      width: 681px;
      height: 481px;
      z-index: -1;
      background-size: contain;
      filter: blur(20px);
    }
  }
  .PricingCardTop {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 27px;
    @media (max-width: 599px) {
      margin-bottom: 16px;
    }
  }
  .priceStatus {
    .typePrc {
      font-weight: 700;
      font-size: 18px;
      line-height: 1.3;
      font-family: ${inter?.style?.fontFamily};
      margin-bottom: 7px;
    }
    p {
      font-size: 12px;
      line-height: 1.4;
      font-weight: 400;
      span {
        font-weight: 600;
      }
    }
  }
  .priceAmount {
    text-align: right;
    span {
      display: block;
      text-align: center;
    }
    .priceTotal {
      font-weight: 700;
      font-size: 42px;
      line-height: 1.1;
      font-family: ${manrope?.style?.fontFamily};
      @media (max-width: 1199px) {
        font-size: 36px;
      }
      @media (max-width: 899px) {
        font-size: 32px;
      }
      @media (max-width: 599px) {
        font-size: 24px;
      }
    }
    .priceYearMnth {
      font-size: 12px;
      font-weight: 500;
      /* margin-right: 13px; */
    }
    .customprice {
      font-family: ${manrope?.style?.fontFamily};
      font-weight: 600;
      font-size: 24px;
      line-height: 1.1;
      @media (max-width: 899px) {
        font-size: 20px;
      }
      @media (max-width: 599px) {
        font-size: 18px;
      }
    }
  }
  .PricingCardMiddle {
    .planGetsHd {
      font-weight: 600;
      font-size: 13px;
      line-height: 1.4;
      margin-bottom: 13px;
    }
  }
  .planfeatureBox {
    background: url(${assest?.planGetsLayer}) no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    padding: 15px 11px 34px 11px;
    min-height: 305px;
    position: relative;
    z-index: 1;
    /* &:after {
      position: absolute;
      content: '';
      background: linear-gradient(
        158.72deg,
        rgba(255, 255, 255, 0.4) 3.01%,
        rgba(255, 255, 255, 0) 103.3%
      );
      backdrop-filter: blur(21px);
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    } */
    ul {
      padding: 0;
      margin: 0;
      li {
        padding: 0;
        margin: 0;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.3;
        background: url(${assest?.tickSign}) no-repeat 0 6px;
        background-size: 14px;
        padding: 2px 0;
        padding-left: 32px;
        margin-bottom: 10px;
        &.inactive {
          background: url(${assest?.crossSign}) no-repeat 0 6px;
        }
        @media (max-width: 599px) {
          padding-left: 24px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .PricingCardBtm {
    position: absolute;
    bottom: 33px;
    left: 0;
    right: 0;
    padding: 0 24px;
    @media (max-width: 1199px) {
      padding: 0 20px;
    }
    @media (max-width: 599px) {
      padding: 0 16px;
      bottom: 24px;
    }
    .MuiButtonBase-root {
      width: 100%;
      padding: 15px 26px;
      border-color: ${({ theme }) => theme.palette.common?.white};
      color: ${({ theme }) => theme.palette.common?.white};
      &:hover {
        background: ${({ theme }) => theme.palette.common?.white};
        color: ${({ theme }) => theme.palette.customColors?.dark};
      }
    }
  }
  &.interpreterCard {
    .PricingCardOuter {
      padding: 25px 18px;
    }
    .priceStatus {
      .typePrc {
        font-size: 20px;
        font-family: ${manrope.style.fontFamily};
      }
      p {
        font-size: 16px;
      }
    }
    .priceAmount {
      .priceTotal {
        font-size: 30px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.common?.white};
      }
      span {
        color: ${({ theme }) => theme.palette.customColors?.colorD7D7D7};
      }
    }
    .planfeatureBox {
      min-height: auto;
    }
    .subs-btn {
      width: 100%;
      padding: 15px 26px;
      margin-bottom: 26px;
      border-color: ${({ theme }) => theme.palette.common?.white};
      color: ${({ theme }) => theme.palette.common?.white};
      &:hover {
        background: ${({ theme }) => theme.palette.common?.white};
        color: ${({ theme }) => theme.palette.customColors?.dark};
      }
    }
    .chip-class {
      background-color: ${({ theme }) => theme.palette.common?.white};
      box-shadow: 0px 1px 10px 0px #00000024;
      padding: 6px 9px;
      .MuiChip-label {
        padding: 0;
      }
      .MuiRadio-root {
        padding: 0;
        display: flex;
      }
      p {
        color: ${({ theme }) => theme.palette.text?.primary};
      }
    }
  }
`;
