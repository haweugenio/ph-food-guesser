interface CompassIconProps {
  direction?: number;
}

const CompassIcon = ({ direction = 0 }: CompassIconProps) => {
  return (
    <span className="relative overflow-visible">
      {/* Cardinal Directions */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="1.5em"
        height="1.5em"
        className="absolute left-0 top-0 mr-1 inline"
        fill="#AAAAAA"
      >
        <text x="100" y="55" className="text-[5rem]">
          N
        </text>
        <text x="110" y="255" className="text-[5.5rem]">
          S
        </text>
        <text x="10" y="155" className="text-[5rem]">
          W
        </text>
        <text x="200" y="155" className="text-[5.5rem]">
          E
        </text>
      </svg>

      {/* Dynamic Compass Needle */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="1.5em"
        height="1.5em"
        className="mr-1 inline"
        fill="#b91c1c"
      >
        <g transform="translate(1.4 1.4) scale(2.81 2.81)">
          <path
            d="M 55.082 45 c 0 -0.073 -0.011 -0.146 -0.019 -0.219 c -0.009 -0.079 -0.016 -0.157 -0.034 -0.234 c -0.004 -0.019 -0.003 -0.038 -0.008 -0.056 l -8.088 -30.686 c -0.231 -0.878 -1.025 -1.49 -1.934 -1.49 s -1.703 0.612 -1.934 1.49 L 34.978 44.49 c -0.005 0.019 -0.004 0.039 -0.008 0.058 c -0.018 0.076 -0.024 0.153 -0.033 0.231 c -0.008 0.074 -0.019 0.147 -0.019 0.221 c 0 0.074 0.011 0.147 0.019 0.221 c 0.009 0.078 0.015 0.155 0.033 0.231 c 0.004 0.019 0.003 0.039 0.008 0.058 l 10.022 0.49 C 55.071 45.146 55 46 55.082 45 z z"
            transform={`rotate(${direction} 45 45)`}
            strokeLinecap="round"
          />
        </g>
      </svg>
    </span>
  );
};

export default CompassIcon;
