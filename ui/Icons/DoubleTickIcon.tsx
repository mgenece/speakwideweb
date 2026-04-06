import { CustomIconProps } from '@/typescript/interface/icons.interface';

export default function DoubleTickIcon({ IconColor }: CustomIconProps) {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <mask x='0' y='0' width='16' height='16'>
        <rect width='16' height='16' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1229_88280)'>
        <path
          d='M4.46532 11.5379L1.16016 8.2327L1.63582 7.76086L4.46916 10.5942L4.93066 10.1327L5.40249 10.6045L4.46532 11.5379ZM8.23199 11.5379L4.92682 8.2327L5.39866 7.75703L8.23199 10.5904L14.3653 4.45703L14.8372 4.9327L8.23199 11.5379ZM7.77049 8.2327L7.29482 7.76086L10.5948 4.46086L11.0705 4.9327L7.77049 8.2327Z'
          fill={IconColor || '#7879F1'}
        />
      </g>
    </svg>
  );
}
