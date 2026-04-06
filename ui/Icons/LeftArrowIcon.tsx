import { CustomIconProps } from '@/typescript/interface/icons.interface';

function LeftArrowIcon({ IconColor }: CustomIconProps) {
  return (
    <svg width='9' height='18' viewBox='0 0 9 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.99984 16.9181L1.47984 10.3981C0.709844 9.62812 0.709844 8.36813 1.47984 7.59813L7.99984 1.07812'
        stroke={IconColor || 'currentColor'}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default LeftArrowIcon;
