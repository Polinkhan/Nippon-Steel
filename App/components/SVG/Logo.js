import * as React from "react";
import Svg, {
  Rect,
  G,
  RadialGradient,
  Stop,
  Path,
  LinearGradient,
} from "react-native-svg";

const Logo = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      viewBox="0 0 1000 1000"
      {...props}
    >
      <Rect width="100%" height="100%" fill="#f2f2f2" />
      <G transform="translate(488.547 608.683) scale(14.8206)">
        <RadialGradient
          id="a"
          gradientUnits="userSpaceOnUse"
          cx={23.9559}
          cy={27.8969}
          r={26.0045}
          fx={23.9559}
          fy={27.8969}
        >
          <Stop offset="0%" stopColor="#00a7ea" stopOpacity={1} />
          <Stop
            offset="13.450000000000001%"
            stopColor="#029fe5"
            stopOpacity={1}
          />
          <Stop offset="33.75%" stopColor="#068bd5" stopOpacity={1} />
          <Stop offset="58.37%" stopColor="#0d69bd" stopOpacity={1} />
          <Stop offset="86.13%" stopColor="#173a9b" stopOpacity={1} />
          <Stop offset="100%" stopColor="#1d2088" stopOpacity={1} />
        </RadialGradient>
        <Path
          style={{
            isCustomFont: "none",
            fontFileUrl: "none",
          }}
          transform="translate(-18.779 -33.718)"
          d="M36.893 28.85A18.73 18.73 0 10.7 38.509c2.668 9.996 13.026 16.265 22.926 13.263 9.525-2.888 15.934-12.931 13.266-22.922z"
          strokeLinecap="butt"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeDashoffset={0}
          strokeLinejoin="miter"
          strokeMiterlimit={4}
          fill="url(#a)"
          fillRule="nonzero"
          opacity={1}
        />
      </G>
      <G transform="translate(500 500) scale(14.8206)">
        <LinearGradient
          id="b"
          gradientUnits="userSpaceOnUse"
          x1={23.6671}
          y1={19.9842}
          x2={4.5855}
          y2={56.2567}
        >
          <Stop
            offset="1.1199999999999999%"
            stopColor="#d1000e"
            stopOpacity={1}
          />
          <Stop offset="47.75%" stopColor="#e60012" stopOpacity={1} />
          <Stop offset="100%" stopColor="#eb6135" stopOpacity={1} />
        </LinearGradient>
        <Path
          style={{
            isCustomFont: "none",
            fontFileUrl: "none",
          }}
          transform="translate(-19.552 -26.385)"
          d="M33.094 16.01c-2.084 1.685-21.29 11.873-25.977 24.755-3.232 8.882 6.494 12.547 14.973 11.402 0 0-27.1 5.469-21.268-16.526C6.22 15.287 39.104 0 39.104 0z"
          strokeLinecap="butt"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeDashoffset={0}
          strokeLinejoin="miter"
          strokeMiterlimit={4}
          fill="url(#b)"
          fillRule="nonzero"
          opacity={1}
        />
      </G>
    </Svg>
  );
};

export default Logo;
