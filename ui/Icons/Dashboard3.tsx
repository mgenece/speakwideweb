import { CustomIconProps } from '@/typescript/interface/icons.interface';

const Dashboard3 = ({ ...props }: CustomIconProps) => {
  return (
    <svg
      width={props.IconWidth || '20'}
      height={props.IconHeight || '21'}
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask id='mask0_3001_31765' maskUnits='userSpaceOnUse' x='0' y='0' width='20' height='21'>
        <rect y='0.359375' width='20' height='20' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_3001_31765)'>
        <path
          d='M5.93018 14.6208C5.72129 14.6208 5.54615 14.5502 5.40477 14.4089C5.26352 14.2677 5.19289 14.0926 5.19289 13.8837V12.6337H15.5054L15.7698 12.8981V5.35807H17.0198C17.2287 5.35807 17.4037 5.4287 17.545 5.56995C17.6864 5.71134 17.7571 5.88641 17.7571 6.09516V17.5695L14.8083 14.6208H5.93018ZM2.24414 13.9158V3.1787C2.24414 2.96981 2.31484 2.79467 2.45622 2.65328C2.59747 2.51203 2.77254 2.44141 2.98143 2.44141H13.366C13.5749 2.44141 13.75 2.51203 13.8912 2.65328C14.0325 2.79467 14.1031 2.96981 14.1031 3.1787V10.2299C14.1031 10.4387 14.0325 10.6138 13.8912 10.7552C13.75 10.8964 13.5749 10.967 13.366 10.967H5.19289L2.24414 13.9158Z'
          fill={props.IconColor || 'white'}
        />
      </g>
    </svg>
  );
};

export default Dashboard3;
