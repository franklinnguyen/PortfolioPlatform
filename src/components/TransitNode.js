function TransitNode({ x, y, label, useImage = true, color = '#148844' }) {
  if (useImage) {
    return (
      <g>
        <image
          href="/images/greenNode.svg"
          x={x - 25}
          y={y - 25}
          width="50"
          height="50"
          preserveAspectRatio="xMidYMid meet"
        />

        <text
          x={x + 40}
          y={y + 6}
          fill="#000000"
          fontSize="18"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontWeight="normal"
        >
          {label}
        </text>
      </g>
    );
  }

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={25}
        fill="#ffffff"
        stroke={color}
        strokeWidth={12}
      />
      <text
        x={x + 40}
        y={y + 6}
        fill="#000000"
        fontSize="18"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="normal"
      >
        {label}
      </text>
    </g>
  );
}

export default TransitNode;
