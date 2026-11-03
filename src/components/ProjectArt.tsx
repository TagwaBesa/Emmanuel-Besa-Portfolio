import type { Project } from '../data/content'

/**
 * Abstract interface placeholders for each project. These are illustrations, not screenshots:
 * swap in real images later by adding an `image` field to the project data.
 */
export function ProjectArt({ kind, title }: { kind: Project['art']; title: string }) {
  const line = { stroke: '#fff', strokeOpacity: 0.16, fill: 'none' }
  const fill = (o: number) => ({ fill: '#fff', fillOpacity: o })
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={`Abstract placeholder illustration for ${title}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f7cff" stopOpacity=".35" />
          <stop offset="1" stopColor="#8b6cf6" stopOpacity=".12" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="#11141b" />
      <rect width="640" height="400" fill={`url(#g-${kind})`} />
      <rect x="48" y="44" width="544" height="312" {...line} />
      <rect x="48" y="44" width="544" height="28" {...fill(0.05)} />
      <circle cx="66" cy="58" r="4" {...fill(0.25)} />
      <circle cx="80" cy="58" r="4" {...fill(0.25)} />
      <circle cx="94" cy="58" r="4" {...fill(0.25)} />

      {kind === 'site' && (
        <>
          <rect x="72" y="96" width="260" height="22" {...fill(0.55)} />
          <rect x="72" y="130" width="190" height="22" {...fill(0.3)} />
          <rect x="72" y="176" width="150" height="30" fill="#4f7cff" />
          <rect x="360" y="96" width="208" height="150" {...fill(0.08)} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={72 + i * 172} y="268" width="156" height="68" {...line} />
          ))}
        </>
      )}
      {kind === 'assets' && (
        <>
          {[0, 1, 2, 3, 4].map((r) => (
            <g key={r}>
              <rect x="72" y={96 + r * 44} width="496" height="34" {...line} />
              <rect x="84" y={108 + r * 44} width="90" height="10" {...fill(0.4)} />
              <rect x="250" y={108 + r * 44} width="120" height="10" {...fill(0.2)} />
              <rect x="470" y={106 + r * 44} width="86" height="14" fill={r % 2 ? '#8b6cf6' : '#4f7cff'} fillOpacity=".7" />
            </g>
          ))}
        </>
      )}
      {kind === 'attendance' && (
        <>
          {Array.from({ length: 5 }, (_, r) =>
            Array.from({ length: 7 }, (_, c) => (
              <rect
                key={`${r}-${c}`}
                x={80 + c * 70}
                y={96 + r * 50}
                width="52"
                height="34"
                {...((r * 7 + c) % 4 === 0 ? { fill: '#4f7cff', fillOpacity: 0.55 } : fill(0.07))}
              />
            )),
          )}
        </>
      )}
      {kind === 'store' && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={72 + i * 126} y="96" width="110" height="140" {...fill(0.08)} />
              <rect x={72 + i * 126} y="246" width="80" height="10" {...fill(0.45)} />
              <rect x={72 + i * 126} y="264" width="48" height="10" fill="#8b6cf6" fillOpacity=".7" />
            </g>
          ))}
          <rect x="72" y="300" width="496" height="36" {...line} />
        </>
      )}
      {kind === 'pos' && (
        <>
          <rect x="72" y="96" width="320" height="240" {...line} />
          {Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 3 }, (_, c) => (
              <rect key={`${r}-${c}`} x={88 + c * 98} y={110 + r * 70} width="84" height="56" {...fill(0.09)} />
            )),
          )}
          <rect x="412" y="96" width="156" height="240" {...fill(0.05)} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="424" y={112 + i * 26} width={110 - i * 12} height="8" {...fill(0.35)} />
          ))}
          <rect x="424" y="296" width="132" height="28" fill="#4f7cff" />
        </>
      )}
      {kind === 'property' && (
        <>
          <path d="M72 336V200l80-64 80 64v136M232 336V164l80-70 80 70v172M392 336V212l70-52 106 52v124" {...line} strokeWidth="1.5" />
          <rect x="72" y="336" width="496" height="2" {...fill(0.3)} />
          <rect x="108" y="248" width="30" height="88" fill="#4f7cff" fillOpacity=".5" />
        </>
      )}
    </svg>
  )
}
