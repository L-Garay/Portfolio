import { SVGProps } from 'react';

export type SectionProps = {
  height?: number;
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
