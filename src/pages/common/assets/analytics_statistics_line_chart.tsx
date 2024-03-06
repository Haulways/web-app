import React from "react";
import { IconProps } from "../../../types/icon";

export const StatisticPositiveLineChart: React.FC<IconProps> = ({
  width = "98",
  height = "50",
  color = "#1748C5",
  ...attributes
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 98 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <g filter="url(#filter0_d_373_129)">
        <path
          d="M7.40002 36.1733L8.1778 35.7532C8.95558 35.333 10.5111 34.4927 12.0667 33.9031C13.6222 33.3136 15.1778 32.9747 16.7334 32.8977C18.2889 32.8208 19.8445 33.0057 21.4 32.7271C22.9556 32.4485 24.5111 31.7064 26.0667 28.8021C27.6222 25.8978 29.1778 20.8312 30.7334 18.4617C32.2889 16.0922 33.8445 16.4198 35.4 16.5327C36.9556 16.6455 38.5111 16.5436 40.0667 17.658C41.6222 18.7724 43.1778 21.1031 44.7334 21.9527C46.2889 22.8022 47.8445 22.1706 49.4 22.2907C50.9556 22.4107 52.5111 23.2823 54.0667 21.0935C55.6223 18.9046 57.1778 13.6553 58.7334 12.8591C60.2889 12.063 61.8445 15.72 63.4 16.51C64.9556 17.2999 66.5111 15.2229 68.0667 14.6555C69.6223 14.0881 71.1778 15.0304 72.7334 15.1692C74.2889 15.3081 75.8445 14.6434 77.4 13.5864C78.9556 12.5293 80.5111 11.0799 82.0667 9.39848C83.6223 7.71706 85.1778 5.80361 86.7334 4.62742C88.2889 3.45122 89.8445 3.01227 90.6222 2.79279L91.4 2.57332"
          stroke={color}
          stroke-width="4.2"
        />
        <ellipse cx="76" cy="13.3789" rx="5.6" ry="5.40278" fill={color} />
      </g>
      <defs>
        <filter
          id="filter0_d_373_129"
          x="0.801978"
          y="0.552246"
          width={+width + 0.5479}
          height={+height + 0.5578}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5.6" />
          <feGaussianBlur stdDeviation="2.8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_373_129"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_373_129"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const StatisticNegativeLineChart: React.FC<IconProps> = ({
  width = "98",
  height = "50",
  color = "#1748C5",
  ...attributes
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 98 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <g filter="url(#filter0_d_373_129)">
        <path
          d="M7.40002 36.1733L8.1778 35.7532C8.95558 35.333 10.5111 34.4927 12.0667 33.9031C13.6222 33.3136 15.1778 32.9747 16.7334 32.8977C18.2889 32.8208 19.8445 33.0057 21.4 32.7271C22.9556 32.4485 24.5111 31.7064 26.0667 28.8021C27.6222 25.8978 29.1778 20.8312 30.7334 18.4617C32.2889 16.0922 33.8445 16.4198 35.4 16.5327C36.9556 16.6455 38.5111 16.5436 40.0667 17.658C41.6222 18.7724 43.1778 21.1031 44.7334 21.9527C46.2889 22.8022 47.8445 22.1706 49.4 22.2907C50.9556 22.4107 52.5111 23.2823 54.0667 21.0935C55.6223 18.9046 57.1778 13.6553 58.7334 12.8591C60.2889 12.063 61.8445 15.72 63.4 16.51C64.9556 17.2999 66.5111 15.2229 68.0667 14.6555C69.6223 14.0881 71.1778 15.0304 72.7334 15.1692C74.2889 15.3081 75.8445 14.6434 77.4 13.5864C78.9556 12.5293 80.5111 11.0799 82.0667 9.39848C83.6223 7.71706 85.1778 5.80361 86.7334 4.62742C88.2889 3.45122 89.8445 3.01227 90.6222 2.79279L91.4 2.57332"
          stroke={color}
          stroke-width="4.2"
        />
        <ellipse cx="76" cy="13.3789" rx="5.6" ry="5.40278" fill={color} />
      </g>
      <defs>
        <filter
          id="filter0_d_373_129"
          x="0.801978"
          y="0.552246"
          width={+width + 0.5479}
          height={+height + 0.5578}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5.6" />
          <feGaussianBlur stdDeviation="2.8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_373_129"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_373_129"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
