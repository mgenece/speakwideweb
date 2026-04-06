import { Box, styled } from '@mui/material';

export const PricingPageStyled = styled(Box)`
  position: relative;
  .bgShapeImgPricing {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .subscribePlanrowRt {
    align-self: center;
    text-align: right;
  }
  .seasonRatebtn {
    padding: 0;
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.3;
    color: ${({ theme }) => theme.palette.text?.primary};
    text-transform: none;
    background: transparent !important;
    .icon {
      margin-left: 13px;
    }
    &:hover {
      color: ${({ theme }) => theme.palette.primary?.main};
      .icon {
        svg {
          path {
            fill: ${({ theme }) => theme.palette.primary?.main};
          }
        }
      }
    }
  }
  .subscribePlanheading {
    margin-bottom: 48px;
    position: relative;
    @media (max-width: 1199px) {
      margin-bottom: 32px;
    }
    @media (max-width: 599px) {
      margin-bottom: 24px;
    }
  }
  .subscribePlanOuter {
    padding: 140px 0 100px 0;
    position: relative;
    @media (max-width: 1199px) {
      padding: 120px 0 60px;
    }
    @media (max-width: 599px) {
      padding: 120px 0 40px;
    }
  }
`;

export const WrapperSessionModalWrap = styled(Box)`
  position: relative;
  .modal-close-icon {
    position: absolute;
    right: -10px;
    z-index: 1;
  }
  .mainTabInnerInfo {
    position: relative;
    padding-top: 10px;
  }
  .topTabWrapper_info {
    position: relative;
    .MuiTabs-root {
      margin-bottom: 26px;
    }
    .MuiTabs-fixed {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .MuiTabs-list {
      justify-content: center;
      display: inline-flex;
      align-items: center;
      gap: 16px;
      padding: 4px 5px;
      background: ${({ theme }) => theme.palette.customColors?.colorFBF9FF};
      border: 1px solid ${({ theme }) => theme.palette.customColors?.colorF2EAFF};
      border-radius: 10px;
      margin: 0 auto;
      gap: 4px;
      @media (max-width: 599px) {
        gap: 4px;
      }
      .MuiTab-root {
        font-weight: 400;
        font-size: 16px;
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.palette.grey.A700};
        text-transform: capitalize;
        border-radius: 10px;
        font-weight: 500;
        padding: 0 12px;
        min-height: 38px;
        @media (max-width: 599px) {
          padding: 0 6px;
          font-size: 12px;
        }
        &.Mui-selected,
        &:hover {
          background: ${({ theme }) => theme.palette.common.white};
          box-shadow: 0px 1px 3px ${({ theme }) => theme.palette.customColors?.colorD5BEFF};
          color: ${({ theme }) => theme.palette.text.primary};
        }
      }
    }
    .MuiTabs-indicator {
      display: none;
    }
  }
  .innerWrapTab_infoBox {
    background: ${({ theme }) => theme.palette.customColors.colorF8F4FF};
    border-radius: 10px;
  }
`;
