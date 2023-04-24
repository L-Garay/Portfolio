import { SVGProps } from 'react';

export type SectionProps = {
  height?: number;
};

export type SectionContentProps = {
  calculatedWidth?: number;
};

export type CustomSVGProps = SVGProps<SVGSVGElement> & {
  fill: string;
};
