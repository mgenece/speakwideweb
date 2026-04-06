import { disputTableData } from '@/components/DashboardOther/DisputCommon/DisputeMain';
import { disputTableInterpreter } from '@/components/DashboardOther/InterpreterAllComponents/InterpreterDisputeMain';
import {
  IDashboardTabsTableInter,
  IDashboardTabsTableRow,
} from '@/typescript/interface/commonall.interface';
import GoogleMeetIcon from '@/ui/Icons/GoogleMeetIcon';
import MenuCallCancelIcon from '@/ui/Icons/MenuCallCancelIcon';
import MenuChatHistoryIcon from '@/ui/Icons/MenuChatHistoryIcon';
import MenuEditIcon from '@/ui/Icons/MenuEditIcon';
import MenuFeedbackIcon from '@/ui/Icons/MenuFeedbackIcon';
import MenuInvoiceIocn from '@/ui/Icons/MenuInvoiceIocn';
import MenuLinkIcon from '@/ui/Icons/MenuLinkIcon';
import MenuRaiseIcon from '@/ui/Icons/MenuRaiseIcon';
import MenuStarIcon from '@/ui/Icons/MenuStarIcon';
import ZoomIcon from '@/ui/Icons/ZoomIcon';
import assest from '../assest';

export const authSliderData = [
  {
    heading: 'Professional Interpretation on Demand',
    description:
      'Speakwide is a U.S.-based platform delivering certified interpretation services through audio, video, and on-site sessions, connecting clients with qualified professionals for secure, real-time communication support.',
  },
  {
    heading: 'Professional Interpretation on Demand',
    description:
      'Speakwide is a U.S.-based platform delivering certified interpretation services through audio, video, and on-site sessions, connecting clients with qualified professionals for secure, real-time communication support.',
  },
  {
    heading: 'Professional Interpretation on Demand',
    description:
      'Speakwide is a U.S.-based platform delivering certified interpretation services through audio, video, and on-site sessions, connecting clients with qualified professionals for secure, real-time communication support.',
  },
];

export const requestTableData: IDashboardTabsTableRow[] = [
  {
    day: 'Today, 10:00AM',
    time: '45m',
    address: '',
    callHappen: true,
  },
  {
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
    callHappen: true,
  },
  {
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
    callHappen: true,
  },
  {
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
    callHappen: true,
  },
];

export const scheduleTableData: IDashboardTabsTableRow[] = [
  {
    interpreterName: 'Interpreter Name',
    day: 'Today, 10:00AM',
    time: '45m',
    address: '',
    isJoinSession: true,
    callHappen: true,
  },
  {
    interpreterName: 'Interpreter Name',
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
  },
  {
    interpreterName: 'Interpreter Name',
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
  },
  {
    interpreterName: 'Interpreter Name',
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
  },
];

export const completeTableData: IDashboardTabsTableRow[] = [
  {
    interpreterName: 'Interpreter Name',
    day: 'Today, 10:00AM',
    time: '45m',
    address: '',
  },
  {
    interpreterName: 'Interpreter Name',
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
  },
  {
    interpreterName: 'Interpreter Name',
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
  },
  {
    interpreterName: 'Interpreter Name',
    day: 'Today, 10:00AM',
    time: '45m',
    address: '47 W 13th St, New York, NY 10011, USA',
  },
];

export const requestActionlist = [
  {
    icon: <MenuLinkIcon />,
    label: 'Session Details',
  },
  {
    icon: <MenuEditIcon />,
    label: 'Edit Session Details',
  },

  // {
  //   icon: <MenuCallCancelIcon />,
  //   label: 'Cancel Session',
  // },
];

export const scheduleActionlist = [
  {
    icon: <MenuLinkIcon />,
    label: 'Session Details',
  },
  {
    icon: <MenuEditIcon />,
    label: 'Edit Session Details',
  },
  {
    icon: <MenuCallCancelIcon />,
    label: 'Cancel Session',
  },
];

export const scheduleIntActionlist = [
  {
    icon: <MenuLinkIcon />,
    label: 'Session Details',
  },
  {
    icon: <MenuCallCancelIcon />,
    label: 'Request Cancellation',
  },
];

export const completeActionlist = [
  {
    icon: <MenuFeedbackIcon />,
    label: 'Provide Feedback',
  },
  {
    icon: <MenuRaiseIcon />,
    label: 'Raise a Dispute',
  },
  {
    icon: <MenuChatHistoryIcon />,
    label: 'Chat History',
  },
  {
    icon: <MenuInvoiceIocn />,
    label: 'Download Invoice',
  },
  {
    icon: <MenuStarIcon />,
    label: 'Add Interpreter to Favorites',
  },
];

export const billingHistoryList = [
  {
    purchaseDate: 'September 23, 2025',
    planName: 'Silver',
    endDate: 'October 23, 2025',
    amount: 49,
    paymentMethod: 'Credit Card',
  },
  {
    purchaseDate: 'September 23, 2025',
    planName: 'Silver',
    endDate: 'October 23, 2025',
    amount: 49,
    paymentMethod: 'Credit Card',
  },
];

export const userListArray = [
  {
    id: 1,
    userImage: assest.chatUser1,
    name: 'John Williams',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: true,
    unreadCount: 0,
    hasSeen: true,
  },
  {
    id: 2,
    userImage: assest.chatUser2,
    name: 'Geoffrey Hudosn',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: false,
    unreadCount: 0,
  },
  {
    id: 3,
    userImage: assest.chatUser3,
    name: 'Antoinette Nicolas',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: false,
    unreadCount: 0,
  },
  {
    id: 4,
    userImage: assest.chatUser4,
    name: 'Fannie Thompson',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: false,
    unreadCount: 1,
  },
  {
    id: 5,
    userImage: assest.chatUser5,
    name: 'Fannie Thompson',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: false,
    unreadCount: 1,
  },
  {
    id: 6,
    userImage: assest.chatUser6,
    name: 'Alton Wyman',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: false,
  },
  {
    id: 7,
    userImage: assest.chatUser7,
    name: 'Beverly Moore',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: false,
    unreadCount: 1,
  },
  {
    id: 8,
    userImage: assest.chatUser8,
    name: 'Dwayne Mitchell',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: true,
  },
  {
    id: 9,
    userImage: assest.chatUser9,
    name: 'Alyssa Stanton',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: true,
  },
  {
    id: 10,
    userImage: assest.chatUser10,
    name: 'Sidney White',
    message: 'Potter ipsum wand elf parchme....',
    sentTime: '13:15',
    isDelivered: true,
  },
];

export const userMessageListArray = [
  {
    id: 1,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: true,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'receiver',
  },
  {
    id: 2,
    userImage: assest.chatUser1,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: false,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'sender',
  },
  {
    id: 3,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: false,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'receiver',
  },
  {
    id: 4,
    userImage: assest.chatUser1,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: false,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'sender',
  },
  {
    id: 5,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: false,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'receiver',
  },
];

export const helpMessageListArray = [
  {
    id: 1,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: true,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'receiver',
  },
  {
    id: 2,
    userImage: assest.chatUser1,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: false,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'sender',
  },
  {
    id: 3,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: false,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'receiver',
  },
  {
    id: 4,
    userImage: assest.chatUser1,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: true,
    hasFile: false,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'sender',
  },
  {
    id: 5,
    name: 'John Williams',
    message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    sentTime: '8:00 PM',
    isDelivered: false,
    hasFile: false,
    fileName: 'mydocuments.pdf',
    fileSize: '1.2Mb',
    type: 'receiver',
  },
];

export const sharedFilesArray = [
  {
    fileName: 'Lorem Ipsum.pdf',
  },
  {
    fileName: 'Lorem Ipsum.pdf',
  },
  {
    fileName: 'Lorem Ipsum.pdf',
  },
  {
    fileName: 'Lorem Ipsum.pdf',
  },
];

export const cardOptions = [
  {
    value: 'mastercard',
    label: 'XXXX - XXXX - XXXX - 1234',
    icon: assest.mastercardIcon,
  },
  {
    value: 'visacard',
    label: 'XXXX - XXXX - XXXX - 5678',
    icon: assest.visaIcon,
  },
];

export const bankaccountOptions = [
  {
    bankLogo: assest.cicb,
    bankName: 'Canadian Impe...',
    accountNumber: 6545,
    accountType: 'Primary',
  },
  {
    bankLogo: assest.bmo,
    bankName: 'Bano of Montreal...',
    accountNumber: 1111,
    accountType: '',
  },
];

export const bankaccountOptions2 = [
  {
    bankLogo: assest.CIBCLogo,
    bankName: 'Canadian Impe...',
    accountNumber: 6545,
    accountType: 'Primary',
  },
  {
    bankLogo: assest.BMOlogo,
    bankName: 'Bano of Montreal...',
    accountNumber: 7515,
    accountType: '',
  },
];

export const sharedLinksArray = [
  {
    icon: <GoogleMeetIcon />,
    name: 'Google Meet',
    link: 'meet.google.com/uls-sxqr-rtb',
  },
  {
    icon: <ZoomIcon />,
    name: 'Zoom Link',
    link: 'meet.zoom.com/uls-sxqr-rtb',
  },
];

export const sharedFilesDetailsArray = [
  {
    fileName: 'terms_of_reference.pdf',
    size: '5.2Mb',
    type: 'pdf',
  },
  {
    fileName: 'terms_of_reference.doc',
    size: '5.2Mb',
    type: 'doc',
  },
  {
    fileName: 'terms_of_reference.doc',
    size: '5.2Mb',
    type: 'doc',
  },
  {
    fileName: 'terms_of_reference.doc',
    size: '5.2Mb',
    type: 'doc',
  },
  {
    fileName: 'terms_of_reference.pdf',
    size: '5.2Mb',
    type: 'pdf',
  },
  {
    fileName: 'terms_of_reference.doc',
    size: '5.2Mb',
    type: 'doc',
  },
  {
    fileName: 'terms_of_reference.doc',
    size: '5.2Mb',
    type: 'doc',
  },
  {
    fileName: 'terms_of_reference.doc',
    size: '5.2Mb',
    type: 'doc',
  },
];

export const sharedLinksDetailsArray = [
  {
    name: 'Google Meet',
    link: 'meet.google.com/uls-sxqr-rtb',
    type: 'meet',
    icon: <GoogleMeetIcon />,
  },
  {
    name: 'Google Meet',
    link: 'meet.google.com/uls-sxqr-rtb',
    type: 'meet',
    icon: <GoogleMeetIcon />,
  },
  {
    name: 'Zoom Link',
    link: 'meet.zoom.com/uls-sxqr-rtb',
    type: 'zoom',
    icon: <ZoomIcon />,
  },
  {
    name: 'Zoom Link',
    link: 'meet.zoom.com/uls-sxqr-rtb',
    type: 'zoom',
    icon: <ZoomIcon IconColor='#292D32' />,
  },
];

export const disPutTableData = [
  disputTableData(
    '01',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Pending'
  ),
  disputTableData(
    '02',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Resolved'
  ),
  disputTableData(
    '03',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Declined'
  ),
  disputTableData(
    '04',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Resolved'
  ),
  disputTableData(
    '05',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Pending'
  ),
];

export const disPutTableDataPending = [
  disputTableData(
    '01',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Pending'
  ),
  disputTableData(
    '02',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Pending'
  ),
  disputTableData(
    '03',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Pending'
  ),
  disputTableData(
    '04',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Pending'
  ),
  disputTableData(
    '05',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Pending'
  ),
];

export const disPutTableDataDecline = [
  disputTableData(
    '01',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Declined'
  ),
  disputTableData(
    '02',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Declined'
  ),
  disputTableData(
    '03',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Declined'
  ),
  disputTableData(
    '04',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Declined'
  ),
  disputTableData(
    '05',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Declined'
  ),
];

export const disPutTableDataResolve = [
  disputTableData(
    '01',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Resolved'
  ),
  disputTableData(
    '02',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Resolved'
  ),
  disputTableData(
    '03',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Resolved'
  ),
  disputTableData(
    '04',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Resolved'
  ),
  disputTableData(
    '05',
    '#12345',
    'Mandy Stone',
    'Call Not Clear',
    '$49',
    'Today at 7:00PM',
    'Resolved'
  ),
];

export const datalistDisputList = [
  {
    imgPath: assest.clientImg1,
    name: 'Client Name',
    date: 'December 29, 2012',
    infotxt: 'Customer Initiated dispute for dispute id #12345',
  },
  {
    imgPath: assest.clientImg1,
    name: 'Client Name',
    date: 'December 29, 2012',
    infotxt: 'You contested the dispute and provided supporting documentation',
  },
  {
    imgPath: assest.logoOnly,
    name: 'Speakwide',
    date: 'December 29, 2012',
    infotxt: 'Our customer care contacted you',
  },
  {
    imgPath: assest.clientImg1,
    name: 'Client Name',
    date: 'December 29, 2012',
    infotxt: 'Issue Pending',
  },
];

export const multiselectInput = [
  { label: 'Medical', value: 'Medical' },
  {
    label: 'Legal',
    value: 'Legal',
  },
  { label: 'General', value: 'General' },
  { label: 'ASL', value: 'ASL' },
];

export const messageList = [
  {
    userImage: assest.chatUser2,
    messageText: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    type: 'receiver',
    timeText: '8:00 PM',
  },
  {
    userImage: assest.chatUser1,
    messageText: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    type: 'sender',
    timeText: '8:00 PM',
  },
  {
    userImage: assest.chatUser2,
    messageText: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    type: 'receiver',
    timeText: '8:00 PM',
  },
  {
    userImage: assest.chatUser1,
    messageText: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    type: 'sender',
    timeText: '8:00 PM',
  },
  {
    userImage: assest.chatUser2,
    messageText: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    type: 'receiver',
    timeText: '8:00 PM',
  },
  {
    userImage: assest.chatUser1,
    messageText: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    type: 'sender',
    timeText: '8:00 PM',
  },
];

export const disPutTableInterPret = [
  disputTableInterpreter(
    '#12345',
    'Richard Schumm',
    'Technical Problem',
    'Today at 6:55am',
    'Pending'
  ),
  disputTableInterpreter(
    '#12345',
    'Renee Blanda',
    'Technical Problem',
    'Today at 6:55am',
    'Resolved'
  ),
  disputTableInterpreter(
    '#12345',
    `Wilson D'Amore`,
    'Payment Dispute',
    'Today at 6:55am',
    'Pending'
  ),
  disputTableInterpreter(
    '#12345',
    'Traci Kozey',
    'Service Quality Issue',
    'Today at 6:55am',
    'Pending'
  ),
  disputTableInterpreter(
    '#12345',
    'Sandra Larkin',
    'Service Quality Issue',
    '47 W 13th St, New York, NY 10011, USA',
    'Declined'
  ),
  disputTableInterpreter(
    '#12345',
    'Marlon Kub',
    'Payment Dispute',
    '47 W 13th St, New York, NY 10011, USA',
    'Resolved'
  ),
];

export const interpreterRequestTableData: IDashboardTabsTableInter[] = [
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    description: 'Presurgery consult & review',
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    description: 'Presurgery consult & review',
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    description: 'Presurgery consult & review',
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    description: 'Presurgery consult & review',
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    description: 'Presurgery consult & review',
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    description: 'Presurgery consult & review',
  },
];

export const trasactionMock = [
  {
    name: 'Jack Tyson',
    date: '21Jul, 2024',
    invoiceId: '#123456',
    amount: '$49',
    status: 'Paid',
  },
  {
    name: 'Jack Tyson',
    date: '21Jul, 2024',
    invoiceId: '#123456',
    amount: '$49',
    status: 'Paid',
  },
  {
    name: 'Jack Tyson',
    date: '21Jul, 2024',
    invoiceId: '#123456',
    amount: '$49',
    status: 'Paid',
  },
  {
    name: 'Jack Tyson',
    date: '21Jul, 2024',
    invoiceId: '#123456',
    amount: '$49',
    status: 'Paid',
  },
  {
    name: 'Jack Tyson',
    date: '21Jul, 2024',
    invoiceId: '#123456',
    amount: '$49',
    status: 'Paid',
  },
  {
    name: 'Jack Tyson',
    date: '21Jul, 2024',
    invoiceId: '#123456',
    amount: '$49',
    status: 'Paid',
  },
];

export const interpreterSessionRequestTableData = [
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    topic: 'Presurgery consult & review',
    format: 'Audio',
    location: '',
    hasAction: true,
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    topic: 'Presurgery consult & review',
    format: 'In Person',
    location: '47 W 13th St, New York, NY 10011, USA',
    hasAction: false,
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    topic: 'Presurgery consult & review',
    format: 'Video',
    location: '',
    hasAction: true,
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    topic: 'Presurgery consult & review',
    format: 'Audio',
    location: '',
    hasAction: true,
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    topic: 'Presurgery consult & review',
    format: 'In Person',
    location: '47 W 13th St, New York, NY 10011, USA',
    hasAction: false,
  },
  {
    clientName: 'Jack Tyson',
    day: 'Today, 10:00AM',
    time: '45m',
    topic: 'Presurgery consult & review',
    format: 'In Person',
    location: '47 W 13th St, New York, NY 10011, USA',
    hasAction: false,
  },
];

export const disPutTablePendingInterPret = [
  disputTableInterpreter(
    '#12345',
    'Richard Schumm',
    'Technical Problem',
    'Today at 6:55am',
    'Pending'
  ),
  disputTableInterpreter(
    '#12345',
    'Renee Blanda',
    'Technical Problem',
    'Today at 6:55am',
    'Pending'
  ),
  disputTableInterpreter(
    '#12345',
    `Wilson D'Amore`,
    'Payment Dispute',
    'Today at 6:55am',
    'Pending'
  ),
  disputTableInterpreter(
    '#12345',
    'Traci Kozey',
    'Service Quality Issue',
    'Today at 6:55am',
    'Pending'
  ),
  disputTableInterpreter(
    '#12345',
    'Sandra Larkin',
    'Service Quality Issue',
    '47 W 13th St, New York, NY 10011, USA',
    'Pending'
  ),
  disputTableInterpreter(
    '#12345',
    'Marlon Kub',
    'Payment Dispute',
    '47 W 13th St, New York, NY 10011, USA',
    'Pending'
  ),
];

export const disPutTableDeclineInterPret = [
  disputTableInterpreter(
    '#12345',
    'Richard Schumm',
    'Technical Problem',
    'Today at 6:55am',
    'Declined'
  ),
  disputTableInterpreter(
    '#12345',
    'Renee Blanda',
    'Technical Problem',
    'Today at 6:55am',
    'Declined'
  ),
  disputTableInterpreter(
    '#12345',
    `Wilson D'Amore`,
    'Payment Dispute',
    'Today at 6:55am',
    'Declined'
  ),
  disputTableInterpreter(
    '#12345',
    'Traci Kozey',
    'Service Quality Issue',
    'Today at 6:55am',
    'Declined'
  ),
  disputTableInterpreter(
    '#12345',
    'Sandra Larkin',
    'Service Quality Issue',
    'Today at 6:55am',
    'Declined'
  ),
  disputTableInterpreter('#12345', 'Marlon Kub', 'Payment Dispute', 'Today at 6:55am', 'Declined'),
];

export const disPutTableResolvedInterPret = [
  disputTableInterpreter(
    '#12345',
    'Richard Schumm',
    'Technical Problem',
    'Today at 6:55am',
    'Resolved'
  ),
  disputTableInterpreter(
    '#12345',
    'Renee Blanda',
    'Technical Problem',
    'Today at 6:55am',
    'Resolved'
  ),
  disputTableInterpreter(
    '#12345',
    `Wilson D'Amore`,
    'Payment Dispute',
    'Today at 6:55am',
    'Resolved'
  ),
  disputTableInterpreter(
    '#12345',
    'Traci Kozey',
    'Service Quality Issue',
    'Today at 6:55am',
    'Resolved'
  ),
  disputTableInterpreter(
    '#12345',
    'Sandra Larkin',
    'Service Quality Issue',
    'Today at 6:55am',
    'Resolved'
  ),
  disputTableInterpreter('#12345', 'Marlon Kub', 'Payment Dispute', 'Today at 6:55am', 'Resolved'),
];

export const Dateevents = [new Date(2025, 9, 12, 10, 0)];
