// import { DisputDetailsWrapper } from '@/styles/StyledComponents/DisputDetailsWrapper';
// import ArrowBackBtnIcon from '@/ui/Icons/ArrowBackBtnIcon';
// import DeclineIcon from '@/ui/Icons/DeclineIcon';
// import NewDocumenticon from '@/ui/Icons/NewDocumenticon';
// import { TimePendingIcon } from '@/ui/Icons/PendingIcon';
// import { ResolverOutlineShadow } from '@/ui/Icons/ResolvedIcon';
// import { Box, Button, Chip, List, ListItem, Typography, useTheme } from '@mui/material';
// import { useRouter } from 'next/router';
// import { IdisputDetailsprops } from '../DisputCommon/DisputDetails';

// export default function InterpreterDisputDetails({ disputeType }: IdisputDetailsprops) {
//   const router = useRouter();
//   const theme = useTheme();
//   return (
//     <DisputDetailsWrapper>
//       <Box className='wrapper_disputDtlsMain'>
//         <Box className='wrapper_topTitleWrap'>
//           <Button type='button' disableRipple onClick={() => router.back()}>
//             <ArrowBackBtnIcon />
//           </Button>
//           <Typography variant='h1'>File Dispute</Typography>
//         </Box>
//         <Box className='mainDetailsWrapper iterPreterDetailsWrap'>
//           <Box className='cmnBoxInner'>
//             <Typography variant='body1' className='topTitleTxt'>
//               Dispute Details
//             </Typography>
//             <Box className='wrapper_innerListAll'>
//               <List disablePadding>
//                 <ListItem disablePadding>
//                   <Typography variant='body1' className='lightTxt'>
//                     Dispute ID
//                   </Typography>
//                   <Typography variant='body1' className='boldTxt'>
//                     #123456
//                   </Typography>
//                 </ListItem>
//                 <ListItem disablePadding>
//                   <Typography variant='body1' className='lightTxt'>
//                     Client Name
//                   </Typography>
//                   <Typography variant='body1' className='boldTxt'>
//                     Jack Tyson
//                   </Typography>
//                 </ListItem>
//                 <ListItem disablePadding>
//                   <Typography variant='body1' className='lightTxt'>
//                     Transaction Amount
//                   </Typography>
//                   <Typography variant='body1' className='boldTxt'>
//                     $149
//                   </Typography>
//                 </ListItem>
//                 <ListItem disablePadding>
//                   <Typography variant='body1' className='lightTxt'>
//                     Date Initiated
//                   </Typography>
//                   <Typography variant='body1' className='boldTxt'>
//                     Today at 6:50PM
//                   </Typography>
//                 </ListItem>
//                 <ListItem disablePadding>
//                   <Typography variant='body1' className='lightTxt'>
//                     Dispute Reason
//                   </Typography>
//                   <Typography variant='body1' className='boldTxt'>
//                     Payment Dispute
//                   </Typography>
//                 </ListItem>
//                 <ListItem disablePadding className='fullWidth'>
//                   <Typography variant='body1' className='lightTxt'>
//                     Proof Uploaded
//                   </Typography>
//                   <Box className='btnWrap'>
//                     <Button type='button' disableRipple>
//                       <NewDocumenticon />
//                       document_1.doc
//                     </Button>
//                     <Button type='button' disableRipple>
//                       <NewDocumenticon />
//                       document_1.doc
//                     </Button>
//                     <Button type='button' disableRipple className='txtBtn'>
//                       3+
//                     </Button>
//                   </Box>
//                 </ListItem>
//                 <ListItem disablePadding className='fullWidth'>
//                   <Typography variant='body1' className='lightTxt'>
//                     Request Details
//                   </Typography>
//                   <Typography variant='body1' className='descripTion'>
//                     Potter ipsum wand elf parchment wingardium. Nagini minister oddment flavor magic
//                     law locket beasts powder. Chalice to wronski honeydukes shunpike plums points
//                     releases devil’s lupin. Transfiguration bright mcgonagall owl tart you flying.
//                     Cadogan dirigible leviosa thestral bezoar cores. Black rock-cake easy you’ve
//                     spider lupin transfiguration it whomping. Patronum of of is butter holly inferi
//                     floor for. Lion robes drops headmaster bee crimson scales together flavor. Black
//                     feint wingardium ground grindlewald seek scarlet treacle easy hermione.
//                     Locomotor elder me duel heir levicorpus hat. Snare leg beaded will potter hair
//                     cup. Where flat broken broken mrs. Horseless feint lily many hollow three-headed
//                     sunshine. Gillywater stand them levicorpus candles knut it black. Frisbees
//                     mischief floor the parchment. Candles snivellus owl owl headmaster erumpent sing
//                     splinched tart. Owl petrified silver large elemental parvati venom sopophorous
//                     mrs grim. Lupin catherine winky scabbers cup padma sticking sticking. Pumpkin is
//                     requirement owl gobbledegook map ravenclaw’s petrificus trelawney hexed. Lily
//                     shell knitted forbidden filch.
//                   </Typography>
//                 </ListItem>
//               </List>
//               <Box className='statusBox'>
//                 {/* <Chip label='Pending' icon={<PendingIcon IconHeight='38' IconWidth='38' />} /> */}
//                 <Chip
//                   label={`Status: ${disputeType === 'pending' ? 'Issue Pending' : disputeType === 'resolved' ? 'Issue Resolved' : 'Declined'}`}
//                   sx={{
//                     textTransform: 'capitalize',
//                     color: theme.palette.customColors.placeText,
//                     span: {
//                       color: 'inherit !important',
//                     },
//                   }}
//                   icon={
//                     disputeType === 'pending' ? (
//                       <TimePendingIcon IconHeight='38' IconWidth='38' />
//                     ) : disputeType === 'resolved' ? (
//                       <ResolverOutlineShadow
//                         IconColor={theme.palette.info.main}
//                         IconHeight='38'
//                         IconWidth='38'
//                       />
//                     ) : (
//                       <DeclineIcon IconHeight='38' IconWidth='38' />
//                     )
//                   }
//                 />
//               </Box>
//               <Box className='wrapper_btmBtnWrapperAll'>
//                 <Button
//                   disableRipple
//                   variant='outlined'
//                   color='primary'
//                   aria-label='Decline'
//                   onClick={() => router.push('/interpreter/dashboard/dispute/')}
//                 >
//                   Decline
//                 </Button>
//                 <Button
//                   disableRipple
//                   variant='contained'
//                   color='primary'
//                   aria-label='Accept'
//                   onClick={() => router.push('/interpreter/dashboard/dispute/')}
//                 >
//                   Accept
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </DisputDetailsWrapper>
//   );
// }
