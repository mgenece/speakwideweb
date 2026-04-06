import { CustomIconProps } from '@/typescript/interface/icons.interface';

export default function RemoveBankIcon({ IconHeight, IconWidth }: CustomIconProps) {
  return (
    <svg
      width={IconWidth || '84'}
      height={IconHeight || '84'}
      viewBox='0 0 84 84'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='42' cy='42' r='42' fill='url(#paint0_radial_1229_87437)' />
      <circle cx='42.0016' cy='42.0016' r='36.4' fill='url(#paint1_radial_1229_87437)' />
      <circle cx='41.9969' cy='42.0008' r='29.2' fill='#FF7361' />
      <mask id='mask0_1229_87437' maskUnits='userSpaceOnUse' x='27' y='27' width='30' height='30'>
        <rect x='27.1953' y='27.2031' width='29.6' height='29.6' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1229_87437)'>
        <path
          d='M34.2856 48.1665V38.9165H36.1356V48.1665H34.2856ZM41.069 48.1665V38.9165H42.919V48.1665H41.069ZM30.6094 52.4832V50.6332H53.3786V52.4832H30.6094ZM47.8523 48.1665V38.9165H49.7023V48.1665H47.8523ZM30.6094 36.4499V34.6948L41.994 29.1211L53.3786 34.6948V36.4499H30.6094Z'
          fill='white'
        />
      </g>
      <defs>
        <radialGradient
          id='paint0_radial_1229_87437'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(-20 100.4) rotate(-41.8141) scale(147.589)'
        >
          <stop stopColor='#FFE1DD' />
          <stop offset='0.970307' stopColor='#FFFBFA' />
          <stop offset='1' stopColor='white' />
          <stop offset='1' stopColor='#FFEFED' stopOpacity='0' />
        </radialGradient>
        <radialGradient
          id='paint1_radial_1229_87437'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(-21.1984 117.602) rotate(-45) scale(161.22)'
        >
          <stop stopColor='#FFC0B8' />
          <stop offset='0.900871' stopColor='#FFB1B1' stopOpacity='0.2' />
          <stop offset='1' stopColor='white' />
        </radialGradient>
      </defs>
    </svg>
  );
}
