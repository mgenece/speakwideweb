import { CustomIconProps } from '@/typescript/interface/icons.interface';

export default function ResolvedIcon({ IconHeight, IconWidth, IconColor }: CustomIconProps) {
  return (
    <svg
      width={IconWidth || '14'}
      height={IconHeight || '14'}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.9974 12.8346C10.2057 12.8346 12.8307 10.2096 12.8307 7.0013C12.8307 3.79297 10.2057 1.16797 6.9974 1.16797C3.78906 1.16797 1.16406 3.79297 1.16406 7.0013C1.16406 10.2096 3.78906 12.8346 6.9974 12.8346Z'
        fill={IconColor || '#8142E9'}
        stroke={IconColor || '#8142E9'}
        strokeWidth='1.58333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.52344 6.99849L6.17427 8.64932L9.48177 5.34766'
        stroke='white'
        strokeWidth='0.875'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export const ResolverOutlineShadow = ({ ...props }: CustomIconProps) => {
  return (
    <svg
      width={props.IconWidth || '38'}
      height={props.IconHeight || '38'}
      viewBox='0 0 38 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle opacity='0.2' cx='19' cy='19' r='19' fill='#00879B' />
      <path
        d='M18.9931 29.5486C24.7986 29.5486 29.5486 24.7986 29.5486 18.9931C29.5486 13.1875 24.7986 8.4375 18.9931 8.4375C13.1875 8.4375 8.4375 13.1875 8.4375 18.9931C8.4375 24.7986 13.1875 29.5486 18.9931 29.5486Z'
        fill={props.IconColor || '#00879B'}
        stroke={props.IconColor || '#00879B'}
        strokeWidth='1.58333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.5078 18.995L17.495 21.9823L23.48 16.0078'
        stroke='white'
        strokeWidth='1.58333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
