

const Svg = function({ size = 20, children }){
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
};

export const BoxIcon = function({ size }){
    return (
        <Svg size={size}>
            <path d="M21 8l-9-5-9 5 9 5 9-5z" />
            <path d="M3 8v8l9 5 9-5V8" />
            <path d="M12 13v8" />
        </Svg>
    );
};

export const UserIcon = function({ size }){
    return (
        <Svg size={size}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
        </Svg>
    );
};

export const TruckIcon = function({ size }){
    return (
        <Svg size={size}>
            <path d="M3 6h11v10H3z" />
            <path d="M14 10h4l3 3v3h-7z" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
        </Svg>
    );
};

export const PlaneIcon = function({ size }){
    return (
        <Svg size={size}>
            <path d="M21 3L3 10l7 3 3 7 8-17z" />
        </Svg>
    );
};

export const LockIcon = function({ size }){
    return (
        <Svg size={size}>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 018 0v3" />
        </Svg>
    );
};

export const HeadsetIcon = function({ size }){
    return (
        <Svg size={size}>
            <path d="M4 14v-2a8 8 0 0116 0v2" />
            <rect x="3" y="14" width="4" height="6" rx="2" />
            <rect x="17" y="14" width="4" height="6" rx="2" />
        </Svg>
    );
};

export const ChevronIcon = function({ size }){
    return (
        <Svg size={size}>
            <path d="M6 9l6 6 6-6" />
        </Svg>
    );
};

export const CheckIcon = function({ size }){
    return (
        <Svg size={size}>
            <path d="M5 12l5 5 9-10" />
        </Svg>
    );
};