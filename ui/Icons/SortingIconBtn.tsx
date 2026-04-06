import { CustomIconProps } from '@/typescript/interface/icons.interface';

export default function SortingIconBtn({ IconColor }: CustomIconProps) {
  return (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5.62969 12.8109L2.49219 9.67969'
        stroke={IconColor || '#120248'}
        strokeWidth='0.9375'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.63281 2.1875V12.8125'
        stroke={IconColor || '#120248'}
        strokeWidth='0.9375'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.36719 2.1875L12.5047 5.31875'
        stroke={IconColor || '#120248'}
        strokeWidth='0.9375'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.36719 12.8125V2.1875'
        stroke={IconColor || '#120248'}
        strokeWidth='0.9375'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
