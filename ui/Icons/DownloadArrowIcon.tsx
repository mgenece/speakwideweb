import { CustomIconProps } from '@/typescript/interface/icons.interface';

export default function DownloadArrowIcon({ IconWidth, IconHeight, IconColor }: CustomIconProps) {
  return (
    <svg
      width={IconWidth || '15'}
      height={IconHeight || '15'}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask id='mask0_1229_85919' maskUnits='userSpaceOnUse' x='0' y='0' width='15' height='15'>
        <rect width='15' height='15' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1229_85919)'>
        <path
          d='M2.8125 13.4375V12.5H12.1875V13.4375H2.8125ZM7.49406 11.0095L3.55172 5.87141H5.82328V1.5625H9.17062V5.87141H11.4423L7.49406 11.0095Z'
          fill={IconColor || '#120248'}
        />
      </g>
    </svg>
  );
}
