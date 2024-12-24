import { useTheme } from '@mui/material/styles';
import type * as React from 'react';

const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { palette } = useTheme();

  const colors =
    palette.mode === 'dark'
      ? {
          vagem: palette.common.white,
          ervilha1: palette.common.white,
          ervilha2: palette.common.white,
          ervilha3: palette.common.white,
        }
      : {
          vagem: '#1D8A4A',
          ervilha1: '#2ECE71',
          ervilha2: '#25B15F',
          ervilha3: '#289F57',
        };

  const paths = [
    {
      id: 'vagem',
      color: colors.vagem,
      d: 'M24.698 16.438A56.4 56.4 0 0 1 .004 10.577C-.238 18.75 11.275 25 24.885 25c13.704 0 23.236-4.567 24.929-12.538-7.81 3.846-16.37 3.976-25.116 3.976',
    },
    {
      id: 'ervilha1',
      color: colors.ervilha1,
      d: 'M34.544 15.224c5.289-.382 10.423-1.337 15.27-3.724q-.13.61-.32 1.19c.328-.965.506-2 .506-3.075C50 4.305 45.67 0 40.328 0a9.67 9.67 0 0 0-7.189 3.183 9.56 9.56 0 0 1 2.915 6.88c0 1.9-.554 3.67-1.51 5.161',
    },
    {
      id: 'ervilha2',
      color: colors.ervilha2,
      d: 'M18.866 15.14q2.903.32 5.832.336c2.949 0 5.876-.015 8.76-.182a9.53 9.53 0 0 0 1.535-5.198c0-5.31-4.33-9.615-9.672-9.615a9.67 9.67 0 0 0-6.996 2.975 9.54 9.54 0 0 1 2.273 6.193c0 2.041-.64 3.934-1.732 5.491',
    },
    {
      id: 'ervilha3',
      color: colors.ervilha3,
      d: 'M17.691 14.998a9.53 9.53 0 0 0 1.656-5.383c0-5.31-4.33-9.615-9.672-9.615C4.334 0 .005 4.305.005 9.615a56.5 56.5 0 0 0 17.687 5.383',
    },
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="25"
      fill="none"
      viewBox="0 0 50 25"
      {...props}
    >
      <title>Peapods Logo</title>
      {paths.map(({ id, color, d }) => (
        <path key={id} fill={color} d={d} />
      ))}
    </svg>
  );
};

export default SvgIcon;
