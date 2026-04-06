import { Box, styled } from '@mui/material';

export const HelpSupportMainStyled = styled(Box)`
  .bordered-box {
    position: relative;
    background: linear-gradient(133.06deg, #efe5ff 4.51%, rgba(243, 243, 243, 0.2) 55.88%);
    padding: 1px;
    border-radius: 20px;
    box-shadow: 0px 18px 39px 0px #cbc6dc1a;
    box-shadow: 0px 71px 71px 0px #cbc6dc17;
    box-shadow: 0px 159px 95px 0px #cbc6dc0d;
    box-shadow: 0px 282px 113px 0px #cbc6dc03;
    box-shadow: 0px 441px 123px 0px #cbc6dc00;
    .inner-main-box {
      padding: 21px 60px 14px 36px;
      background: ${({ theme }) => theme.palette.common.white};
      border-radius: 20px;
      @media (max-width: 899px) {
        padding: 20px;
      }
      .left-box {
        @media (max-width: 899px) {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-bottom: 80px;
        }
        @media (max-width: 599px) {
          padding-bottom: 30px;
        }
        .heading {
          font-size: 24px;
          font-weight: 600;
          color: ${({ theme }) => theme.palette.primary.main};
          padding-bottom: 20px;
          @media (max-width: 899px) {
            text-align: center;
            padding-bottom: 10px;
          }
          @media (max-width: 599px) {
            text-align: center;
            padding-bottom: 0;
          }
        }
        .content {
          max-width: 510px;
          width: 100%;
          color: ${({ theme }) => theme.palette.customColors.color383838};
          line-height: 28px;
          padding-bottom: 60px;
          @media (max-width: 899px) {
            text-align: center;
            padding-bottom: 20px;
          }
          @media (max-width: 599px) {
            line-height: normal;
          }
        }
        .support-btn {
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
        }
      }

      .fig-class {
        max-width: 250px;
        width: 100%;
        /* @media (max-width: 899px) {
          max-width: none;
          width: auto;
          height: auto;
        } */
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;
