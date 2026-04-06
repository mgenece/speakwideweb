import { getTaxInfoApi } from '@/api/functions/pyment';
import ButtonCommon from '@/components/layouts/common/ButtonCommon';
import EarningsTab from '@/components/layouts/payouts/Earning';
import Payouts from '@/components/layouts/payouts/Payouts';
import { EarningsAndPayoutsMainWrapper } from '@/styles/StyledComponents/EarningsAndPayoutsMainWrapper';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import { Box, Link, Tab, Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DynamicTabPanel } from '../DashboardMainTab';
import AddBankAccountModalContent from './AddBankAccountModalContent/AddBankAccountModalContent';
import BankAccountDetailsModalContent from './BankAccountDetailsModalContent/BankAccountDetailsModalContent';

export function disputTableInterpreter(
  disputId: string,
  clientName: string,
  category: string,
  dateInitiate: string,
  status: string
) {
  return { disputId, clientName, category, dateInitiate, status };
}

const tabsItem = [
  {
    label: 'Session Earning',
    content: <EarningsTab />,
  },
  {
    label: 'Monthly Payouts',
    content: <Payouts />,
  },
];

export default function EarningsAndPayoutsMain() {
  // const router = useRouter();
  const [value, setValue] = useState(0);

  const taxInfoQuery = useQuery({
    queryKey: ['tax-info-url'],
    queryFn: getTaxInfoApi,
    refetchOnMount: true,
  });

  // console.log(taxInfoQuery.data?.data.link, '***d');

  const tabsHandler = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const handleToggleBankModal = () => {
    setIsBankModalOpen(!isBankModalOpen);
  };
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const handleToggleAddBankModal = () => {
    setIsAddBankModalOpen(!isAddBankModalOpen);
  };
  return (
    <EarningsAndPayoutsMainWrapper>
      <Box className='wrapper_disputeMain'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: 1,
          }}
        >
          <Link
            href={taxInfoQuery.data?.data.link || '#'}
            target='_blank'
            rel='noopener noreferrer'
            underline='none'
            sx={{ order: { xs: 0, md: 1 } }}
          >
            <ButtonCommon
              variant='contained'
              size='small'
              sx={{
                width: { xs: '100%', md: 250 },
              }}
            >
              Tax Information
            </ButtonCommon>
          </Link>

          <Tabs
            value={value}
            onChange={tabsHandler}
            variant='scrollable'
            scrollButtons='auto'
            sx={{ width: '100%', order: { xs: 1, md: 0 } }}
          >
            {tabsItem.map((tab, index) => (
              <Tab key={index} label={tab.label} disableRipple />
            ))}
          </Tabs>
        </Box>

        <Box className='allTabInfoList'>
          <Box className='bottomTabInfo'>
            {tabsItem.map((tab, index) => (
              <DynamicTabPanel key={index} value={value} index={index}>
                {tab.content}
              </DynamicTabPanel>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Bank Account Details Modal */}
      <MuiModalWrapper
        open={isBankModalOpen}
        onClose={handleToggleBankModal}
        className='bank-account-details'
        isHeadingContainerWithTitle
        containerHeading='Bank Account Details'
      >
        <BankAccountDetailsModalContent />
      </MuiModalWrapper>

      {/* Add New Bank Account Modal */}
      <MuiModalWrapper
        open={isAddBankModalOpen}
        onClose={handleToggleAddBankModal}
        className=''
        isHeadingContainerWithTitle
        containerHeading='Add New Bank Account'
      >
        <AddBankAccountModalContent onClose={handleToggleAddBankModal} />
      </MuiModalWrapper>
    </EarningsAndPayoutsMainWrapper>
  );
}
