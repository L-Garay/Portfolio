import { SVGProps } from 'react';

export type SectionProps = {
  height?: number;
};

export type SectionContentProps = {
  calculatedWidth?: number;
  isMobile: boolean;
};

export type CustomSVGProps = SVGProps<SVGSVGElement> & {
  fill?: string;
  id?: string;
};
