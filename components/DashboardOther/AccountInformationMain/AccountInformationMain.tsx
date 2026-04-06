import ProfileBody from '@/components/layouts/profile/user/ProfileBody';
import { AccountInformationMainStyled } from '@/styles/StyledComponents/AccountInformationMainStyled';
import { Box } from '@mui/material';

export default function AccountInformationMain() {
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const handleEditModalToggle = () => {
  //   setIsEditModalOpen(!isEditModalOpen);
  // };
  return (
    <AccountInformationMainStyled>
      <Box className='bordered-box'>
        <ProfileBody />
      </Box>
      {/* <MuiModalWrapper
        open={isEditModalOpen}
        onClose={handleEditModalToggle}
        className='editAccountModal'
      >
        <EditAccountModalContent handleClose={handleEditModalToggle} />
      </MuiModalWrapper> */}
    </AccountInformationMainStyled>
  );
}
