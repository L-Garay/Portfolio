import * as React from 'react';
import { CustomSVGProps } from '../../constants/sharedTypes';

const EmailSVG = ({ fill }: CustomSVGProps) => {
  return (
    <svg
      fill={fill ? fill : 'none'}
      width="26px"
      height="26px"
      viewBox="-1 0 19 19"
      xmlns="http://www.w3.org/2000/svg"
      className="cf-icon-svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M16.5 9.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-9.832.256L2.833 6.928v5.286zM3.824 6.665l3.743 2.76a1.684 1.684 0 0 0 1.844 0l3.743-2.76zm9.03 5.674-3.26-2.091a2.545 2.545 0 0 1-2.21 0l-3.263 2.091zm1.291-5.41L10.31 9.756l3.835 2.46z"></path>
      </g>
    </svg>
  );
};

export default EmailSVG;
