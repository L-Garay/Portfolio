import * as React from 'react';
import { CustomSVGProps } from '../../constants/sharedTypes';

const DownloadSVG = ({ fill }: CustomSVGProps) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill={fill ? fill : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm12-6a1 1 0 1 0-2 0v6.586l-2.293-2.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L13 12.586V6ZM7 18a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
          fill={fill ? fill : 'none'}
        ></path>
      </g>
    </svg>
  );
};

export default DownloadSVG;
