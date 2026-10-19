

import "../stylings/TrackingMap.css"



const trackingData = {
  locations: [
    {
      id: 1,
      city: "Miami",
      country: "USA",
      x: 12,
      y: 80,
      labelX: 10,
      labelY: 88,
    },
    {
      id: 2,
      city: "Atlanta",
      country: "USA",
      x: 42,
      y: 48,
      labelX: 36,
      labelY: 62,
    },
    {
      id: 3,
      city: "Chicago",
      country: "",
      x: 59,
      y: 37,
      labelX: 61,
      labelY: 29,
    },
    {
      id: 4,
      city: "Toronto",
      country: "Canada",
      x: 78,
      y: 19,
      labelX: 81,
      labelY: 13,
    },
  ],
};

const TrackingMap = function() {
  const locations = trackingData.locations;

  return (
    <div className="tracking-map">
      {/* Background map */}
      <svg
        className="tracking-map__background"
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mapBackground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#073743" />
            <stop offset="100%" stopColor="#001d27" />
          </linearGradient>

          <pattern
            id="mapGrid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="#168093"
              strokeWidth="0.5"
              opacity="0.2"
            />
          </pattern>

          <filter id="routeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="400" height="220" fill="url(#mapBackground)" />

        <rect width="400" height="220" fill="url(#mapGrid)" />

        {/* Stylized North American landmass */}
        <g
          fill="#0c4855"
          stroke="#176071"
          strokeWidth="1"
          opacity="0.8"
        >
          <path d="M0 0 H400 V30 L378 35 367 49 347 53 339 67 320 74 310 92 290 97 280 114 259 121 248 140 230 146 221 162 202 166 192 184 175 192 159 216 141 220 H0 Z" />

          <path d="M0 18 L25 24 40 45 58 48 71 67 90 73 97 92 119 101 130 118 151 123 165 145 183 151 194 168 185 187 169 201 155 220 H0 Z" />

          <path d="M80 0 L95 14 91 31 110 41 119 60 142 66 151 83 174 90 185 109 207 112 221 130 243 135 255 154 278 159 289 178 315 182 329 201 350 206 364 220 H400 V0 Z" />
        </g>

        {/* Subtle geographic details */}
        <g
          fill="none"
          stroke="#238092"
          strokeWidth="1"
          opacity="0.35"
        >
          <path d="M15 50 L85 82 121 76 145 99 180 95 211 122 244 117 276 139 322 132 370 159" />
          <path d="M42 12 L64 51 58 82 91 111 103 147 133 166 145 199" />
          <path d="M142 0 L158 32 145 52 166 77 160 106 183 133" />
          <path d="M236 0 L225 28 242 54 229 80 252 102 244 128" />
          <path d="M330 0 L319 29 339 48 320 70 336 91 325 118" />
          <path d="M0 120 L40 113 67 133 96 128 119 149 155 145" />
        </g>
      </svg>

      {/* Route and locations */}
      <svg
        className="tracking-map__route"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-label="Shipment route from Miami to Toronto"
      >
        <defs>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          className="tracking-map__route-glow"
          d="M 12,80 Q 27,62 42,48 T 59,37 T 78,19"
          filter="url(#lineGlow)"
        />

        <path
          className="tracking-map__route-line"
          d="M 12,80 Q 27,62 42,48 T 59,37 T 78,19"
        />

        {locations.map((location) => (
          <circle
            key={location.id}
            className="tracking-map__marker"
            cx={location.x}
            cy={location.y}
            r="1.8"
          />
        ))}
      </svg>

      {/* Editable city labels */}
      {locations.map((location) => (
        <div
          key={location.id}
          className="tracking-map__location"
          style={{
            left: `${location.labelX}%`,
            top: `${location.labelY}%`,
          }}
        >
          <span className="tracking-map__city">{location.city}</span>

          {location.country && (
            <span className="tracking-map__country">
              {location.country}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}



export default TrackingMap;