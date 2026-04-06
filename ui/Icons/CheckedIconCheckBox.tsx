import { CustomIconProps } from '@/typescript/interface/icons.interface';

const CheckedIconCheckBox = ({ IconHeight, IconWidth }: CustomIconProps) => {
  return (
    <svg
      width={IconWidth || '16'}
      height={IconHeight || '16'}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.83464 11.2128L12.4371 5.61026L11.559 4.73214L6.83464 9.45651L4.45964 7.08151L3.58151 7.95964L6.83464 11.2128ZM2.42443 15.0846C2.00345 15.0846 1.64714 14.9388 1.35547 14.6471C1.0638 14.3555 0.917969 13.9991 0.917969 13.5782V2.42443C0.917969 2.00345 1.0638 1.64714 1.35547 1.35547C1.64714 1.0638 2.00345 0.917969 2.42443 0.917969H13.5782C13.9991 0.917969 14.3555 1.0638 14.6471 1.35547C14.9388 1.64714 15.0846 2.00345 15.0846 2.42443V13.5782C15.0846 13.9991 14.9388 14.3555 14.6471 14.6471C14.3555 14.9388 13.9991 15.0846 13.5782 15.0846H2.42443Z'
        fill='#120248'
      />
    </svg>
  );
};

export default CheckedIconCheckBox;
