import { SVGProps } from 'react';

export type SectionProps = {
  height?: number;
};

export type SectionContentProps = {
  width: number;
};

export type CustomSVGProps = SVGProps<SVGSVGElement> & {
  fill: string;
};
