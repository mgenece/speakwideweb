import { CustomIconProps } from '@/typescript/interface/icons.interface';

export default function EmailIcon({ IconWidth, IconHeight, IconColor }: CustomIconProps) {
  return (
    <svg
      width={IconWidth || '14'}
      height={IconHeight || '14'}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask x='0' y='0' width='14' height='14'>
        <rect width='14' height='14' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1229_88462)'>
        <path
          d='M2.51155 11.375C2.21687 11.375 1.96745 11.2729 1.76328 11.0688C1.55911 10.8646 1.45703 10.6152 1.45703 10.3205V3.67952C1.45703 3.38484 1.55911 3.13542 1.76328 2.93125C1.96745 2.72708 2.21687 2.625 2.51155 2.625H11.4858C11.7805 2.625 12.0299 2.72708 12.2341 2.93125C12.4383 3.13542 12.5404 3.38484 12.5404 3.67952V10.3205C12.5404 10.6152 12.4383 10.8646 12.2341 11.0688C12.0299 11.2729 11.7805 11.375 11.4858 11.375H2.51155ZM6.9987 7.32535L11.6654 4.34131L11.5757 3.5L6.9987 6.41667L2.42172 3.5L2.33203 4.34131L6.9987 7.32535Z'
          fill={IconColor || '#8142E9'}
        />
      </g>
    </svg>
  );
}
