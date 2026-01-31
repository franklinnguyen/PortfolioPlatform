function TransitBranch({
  startX,
  startY,
  stations,
  spacing = 80,
  branchLabel,
  color = '#148844'
}) {
  const dotRadius = 6;
  const terminusRadius = 25;
  const terminusOffset = spacing * 0.8;

  const lineStart = startY - terminusOffset;
  const lineEnd = startY + (stations.length - 1) * spacing + terminusOffset;

  return (
    <g className="transit-branch">
      {branchLabel && (
        <text
          x={startX}
          y={lineStart - 40}
          fill="#000000"
          fontSize="24"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontWeight="bold"
          textAnchor="middle"
        >
          {branchLabel}
        </text>
      )}

      <line
        x1={startX}
        y1={lineStart}
        x2={startX}
        y2={lineEnd}
        stroke={color}
        strokeWidth={18}
        strokeLinecap="round"
      />

      {stations.map((station, index) => (
        <g key={index}>
          <circle
            cx={startX}
            cy={startY + index * spacing}
            r={dotRadius}
            fill="#ffffff"
            stroke="none"
          />

          <text
            x={startX + 30}
            y={startY + index * spacing + 6}
            fill="#000000"
            fontSize="18"
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontWeight="normal"
          >
            {station}
          </text>
        </g>
      ))}

      <image
        href="/images/greenNode.svg"
        x={startX - terminusRadius}
        y={lineStart - terminusRadius}
        width={terminusRadius * 2}
        height={terminusRadius * 2}
        preserveAspectRatio="xMidYMid meet"
      />

      <image
        href="/images/greenNode.svg"
        x={startX - terminusRadius}
        y={lineEnd - terminusRadius}
        width={terminusRadius * 2}
        height={terminusRadius * 2}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}

export default TransitBranch;
