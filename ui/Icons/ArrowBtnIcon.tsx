import { CustomIconProps } from '@/typescript/interface/icons.interface';

export default function ArrowBtnIcon({ IconColor, IconHeight, IconWidth }: CustomIconProps) {
  return (
    <svg
      width={IconWidth || '16'}
      height={IconHeight || '16'}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 0.5C3.8675 0.5 0.5 3.8675 0.5 8C0.5 12.1325 3.8675 15.5 8 15.5C12.1325 15.5 15.5 12.1325 15.5 8C15.5 3.8675 12.1325 0.5 8 0.5ZM9.3425 10.25C9.56 10.4675 9.56 10.8275 9.3425 11.045C9.23 11.1575 9.0875 11.21 8.945 11.21C8.8025 11.21 8.66 11.1575 8.5475 11.045L5.9 8.3975C5.6825 8.18 5.6825 7.82 5.9 7.6025L8.5475 4.955C8.765 4.7375 9.125 4.7375 9.3425 4.955C9.56 5.1725 9.56 5.5325 9.3425 5.75L7.0925 8L9.3425 10.25Z'
        fill={IconColor || '#120248'}
      />
    </svg>
  );
}
