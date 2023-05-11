import { SVGProps } from 'react';

export type SectionProps = {
  height?: number;
  marginTop?: number;
  ref?: React.ForwardedRef<HTMLDivElement>;
};

export type SectionContentProps = {
  calculatedWidth?: number;
  isMobile: boolean;
  paddingTop?: number;
};

export type SharedPageProps = {
  isAboveSmall?: boolean;
  isAboveMedium?: boolean;
  isAboveLarge?: boolean;
  shouldChangeFlexDirection?: boolean;
};

export type CustomSVGProps = SVGProps<SVGSVGElement> & {
  fill?: string;
  id?: string;
};

export type InViewProps = {
  inView: boolean;
};
