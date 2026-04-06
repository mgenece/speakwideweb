import { inter } from '@/mui-theme/_muiTheme';
import { Box, styled } from '@mui/material';

export const AccountInformationMainStyled = styled(Box)`
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
      padding: 45px 14px 39px;
      @media (max-width: 599px) {
        padding: 25px 14px 25px;
      }
      .top-stack {
        padding-bottom: 30px;
        @media (max-width: 599px) {
          padding-bottom: 20px;
        }
        .profile-img-fig {
          width: 72px;
          height: 72px;
          overflow: hidden;
          border-radius: 50%;
          font-size: 0;
          line-height: 0;
          @media (max-width: 599px) {
            width: 50px;
            height: 50px;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .user-name {
          font-size: 24px;
          font-weight: 600;
          font-family: ${inter.style.fontFamily};
          @media (max-width: 599px) {
            font-size: 18px;
          }
        }
        .edit-button {
          padding: 14px;
          min-width: 166px;
          border: 1px solid ${({ theme }) => theme.palette.customColors.colordec9ff};
          color: ${({ theme }) => theme.palette.text.primary};
          font-weight: 500;
          &:hover {
            color: ${({ theme }) => theme.palette.common.white};
          }
          @media (max-width: 599px) {
            width: 100%;
          }
        }
        .edit-profile-btn {
          width: auto;
          min-height: auto;
          min-width: auto;
          padding: 0;
          text-transform: capitalize;
          font-size: 14px;
          font-weight: 400;
          transition: all 0.3s;
          color: ${({ theme }) => theme.palette.primary.main};
          &:hover {
            background: transparent;
            opacity: 0.75;
          }
        }
      }
      .body-box {
        .common-head-stack {
          width: 100%;
          background-color: ${({ theme }) => theme.palette.customColors.primary200};
          padding: 15px 17px 15px 25px;
          border-radius: 10px;
          .title {
            font-size: 18px;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.primary.main};
          }
        }
        .details-box-main {
          padding: 25px 17px 0;
          @media (max-width: 599px) {
            padding: 10px 10px 0;
          }
          .details-box {
            min-width: 145px;
            .input-label {
              color: ${({ theme }) => theme.palette.customColors.placeText};
              padding-bottom: 5px;
            }
            .input-value {
              font-size: 18px;
              font-weight: 600;
              color: ${({ theme }) => theme.palette.customColors.light};
              @media (max-width: 599px) {
                font-size: 16px;
              }
            }
            &.text-right {
              flex-grow: 0;
            }
          }
          .logo-figure {
            line-height: 0;
            font-size: 0;
            max-width: 200px;
            max-height: 100px;
            img {
              object-fit: cover;
            }
          }
          .document-stack {
            .border-stack {
              border: 1px solid ${({ theme }) => theme.palette.customColors.borderColor4};
              padding: 8px 14px;
              border-radius: 50px;
            }
            .download-icon-btn {
              width: auto;
              min-height: auto;
              min-width: auto;
              padding: 0;
              transition: all 0.3s;
              &:hover {
                background-color: transparent;
                opacity: 0.75;
              }
            }
          }
        }
      }
    }
  }
`;
