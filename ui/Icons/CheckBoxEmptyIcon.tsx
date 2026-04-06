import { CustomIconProps } from '@/typescript/interface/icons.interface';

const CheckBoxEmptyIcon = ({ IconWidth, IconHeight }: CustomIconProps) => {
  return (
    <svg
      width={IconWidth || '15'}
      height={IconHeight || '15'}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_3014_29380)'>
        <path
          d='M10.7688 0.566406H3.40041C1.83523 0.566406 0.566406 1.83523 0.566406 3.40041V10.7688C0.566406 12.334 1.83523 13.6028 3.40041 13.6028H10.7688C12.334 13.6028 13.6028 12.334 13.6028 10.7688V3.40041C13.6028 1.83523 12.334 0.566406 10.7688 0.566406Z'
          stroke='#120248'
          strokeWidth='2'
        />
      </g>
      <defs>
        <clipPath id='clip0_3014_29380'>
          <rect width='14.17' height='14.17' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckBoxEmptyIcon;
