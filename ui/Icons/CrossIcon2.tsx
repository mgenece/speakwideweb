import { CustomIconProps } from '@/typescript/interface/icons.interface';

export default function CrossIcon2({ ...props }: CustomIconProps) {
  return (
    <svg
      width={props.IconWidth || '8'}
      height={props.IconHeight || '8'}
      viewBox='0 0 8 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.17188 6.83187L6.83187 1.17188'
        stroke={props.IconColor || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.83187 6.83187L1.17188 1.17188'
        stroke={props.IconColor || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
