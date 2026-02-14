import './TransitBranch.css';

function TransitBranch({
  startX,
  startY,
  stations,
  spacing = 80,
  branchLabel,
  branchIndex = 0,
  color = '#148844',
  labelFontSize = 24,
  stationFontSize = 18,
  labelOffset = 60
}) {
  const dotRadius = 6;
  const terminusRadius = 25;
  const terminusOffset = spacing * 0.8;

  const lineStart = startY - terminusOffset;
  const lineEnd = startY + (stations.length - 1) * spacing + terminusOffset;

  return (
    <g
      className="transit-branch"
      style={{
        '--branch-delay': `${branchIndex * 0.14}s`
      }}
    >
      {branchLabel && (
        <text
          className="branch-label"
          x={startX}
          y={lineStart - labelOffset}
          fill="#000000"
          fontSize={labelFontSize}
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontWeight="bold"
          textAnchor="middle"
        >
          {branchLabel.split('\n').map((line, index) => (
            <tspan key={index} x={startX} dy={index === 0 ? 0 : '1.2em'}>
              {line}
            </tspan>
          ))}
        </text>
      )}

      <line
        className="branch-line"
        x1={startX}
        y1={lineStart}
        x2={startX}
        y2={lineEnd}
        style={{
          '--branch-line-length': `${lineEnd - lineStart}`
        }}
        stroke={color}
        strokeWidth={18}
        strokeLinecap="round"
      />

      {stations.map((station, index) => (
        <g key={index} className="station-entry" style={{ '--station-index': index }}>
          <circle
            className="branch-dot"
            cx={startX}
            cy={startY + index * spacing}
            r={dotRadius}
            fill="#ffffff"
            stroke="none"
          />

          <text
            className="branch-station-text"
            x={startX + 30}
            y={startY + index * spacing + 6}
            fill="#000000"
            fontSize={stationFontSize}
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontWeight="normal"
          >
            {station.split('\n').map((line, lineIndex) => (
              <tspan key={lineIndex} x={startX + 30} dy={lineIndex === 0 ? 0 : '1.2em'}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      ))}

      <image
        className="branch-terminal start"
        href="/images/greenNode.svg"
        x={startX - terminusRadius}
        y={lineStart - terminusRadius}
        width={terminusRadius * 2}
        height={terminusRadius * 2}
        preserveAspectRatio="xMidYMid meet"
      />

      <image
        className="branch-terminal end"
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
