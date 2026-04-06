import { pricingListUserApi } from '@/api/functions/subscription';
import { CustomTabPanel } from '@/components/CommonTabs/CommonTabs';
import { queryKeys } from '@/config/constants';
import { PaymentTableStyled } from '@/styles/StyledComponents/PaymentTableStyled';
import { WrapperSessionModalWrap } from '@/styles/StyledComponents/PricingPageStyled';
import CrossIcon from '@/ui/Icons/CrossIcon';
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';
import {
  Box,
  IconButton,
  Paper,
  Tab,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface IPlanSession {
  _id: string;
  area_of_expertise_id: string;
  session_format_id: string;
  price: number;
  interpreter_type: 'Certified' | 'Qualified';
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  areaofexpertiseDetails: {
    _id: string;
    expertise_display_name: string;
  };
  sessionformatDetails: {
    _id: string;
    title: 'Audio' | 'Video' | 'On-site (2 hour minimum)' | string;
  };
}

interface IProps {
  handelSessionModal: () => void;
  sessionRate: boolean;
}

interface PricingTableProps {
  data: IPlanSession[];
}

const PricingTable = ({ data }: PricingTableProps) => {
  // Extract unique expertise names
  const expertiseTypes = Array.from(
    new Set(data.map(item => item.areaofexpertiseDetails.expertise_display_name))
  );

  // Render table rows dynamically
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <PaymentTableStyled sx={{ minWidth: 642 }} aria-label='payment table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' width={110}></TableCell>
            <TableCell align='center' width={130}>
              Audio
            </TableCell>
            <TableCell align='center' width={185}>
              Video
            </TableCell>
            <TableCell align='left' width={210}>
              On-site <span>( 2hrs minimum)</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expertiseTypes.map(expertise => {
            const audioPrice = data.find(
              item =>
                item.areaofexpertiseDetails.expertise_display_name === expertise &&
                item.sessionformatDetails.title === 'Audio'
            )?.price;
            const videoPrice = data.find(
              item =>
                item.areaofexpertiseDetails.expertise_display_name === expertise &&
                item.sessionformatDetails.title === 'Video'
            )?.price;
            const onsitePrice = data.find(
              item =>
                item.areaofexpertiseDetails.expertise_display_name === expertise &&
                item.sessionformatDetails.title === 'On-site (2 hour minimum)'
            )?.price;

            return (
              <TableRow key={expertise} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='left'>{expertise}</TableCell>
                <TableCell align='center'>{audioPrice ? `${audioPrice}/hr` : '-'}</TableCell>
                <TableCell align='center'>{videoPrice ? `${videoPrice}/hr` : '-'}</TableCell>
                <TableCell align='left'>{onsitePrice ? `${onsitePrice}/hr` : '-'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </PaymentTableStyled>
    </TableContainer>
  );
};

function PricingUser({ handelSessionModal, sessionRate }: IProps) {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { data: planPriceQueryData } = useQuery({
    queryKey: queryKeys.userPriceList,
    queryFn: pricingListUserApi,
  });

  const pricingData = planPriceQueryData?.data ?? [];

  // Filter data by interpreter type based on active tab
  const filteredData = pricingData.filter(item =>
    tabValue === 1 ? item.interpreter_type === 'Qualified' : item.interpreter_type === 'Certified'
  );

  return (
    <MuiModalWrapper
      open={sessionRate}
      onClose={handelSessionModal}
      className='sessionModalPricing'
    >
      <WrapperSessionModalWrap>
        <IconButton onClick={handelSessionModal} className='modal-close-icon'>
          <CrossIcon />
        </IconButton>
        <Box className='mainTabInnerInfo'>
          <Box className='topTabWrapper_info'>
            <Tabs value={tabValue} onChange={handleChange} aria-label='interpreter tabs'>
              <Tab label='Certified Interpreter' disableRipple />
              <Tab label='Qualified Interpreter' disableRipple />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <PricingTable data={filteredData} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <PricingTable data={filteredData} />
          </CustomTabPanel>
        </Box>
      </WrapperSessionModalWrap>
    </MuiModalWrapper>
  );
}

export default PricingUser;
