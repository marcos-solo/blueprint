export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 400 500"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="goldGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#E5D8BE" />
                    <stop offset="50%" stop-color="#D4C3A3" />
                    <stop offset="100%" stop-color="#A69477" />
                </linearGradient>
                <linearGradient id="blueGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0E2E5B" />
                    <stop offset="100%" stop-color="#041835" />
                </linearGradient>
            </defs>

            {/* Left Blue "G" Shield segment */}
            <path 
                d="M 60,0 
                   L 60,250 
                   C 60,370 120,460 200,500 
                   L 200,450 
                   C 140,415 110,340 110,250 
                   L 110,230 
                   L 200,230 
                   L 200,180 
                   L 75,180 
                   L 75,0 
                   Z" 
                fill="url(#blueGradLogo)" 
            />

            {/* Top Right Blue bar --> */}
            <path 
                d="M 310,0 
                   L 400,0 
                   L 400,280 
                   L 360,280 
                   L 360,45 
                   L 310,45 
                   Z" 
                fill="url(#blueGradLogo)" 
            />

            {/* Center Gold "T" divider / Gold curve segment --> */}
            <path 
                d="M 90,0 
                   L 295,0 
                   L 295,45 
                   L 260,45 
                   L 260,500 
                   L 240,500 
                   C 330,440 360,350 360,290 
                   L 400,290 
                   C 400,380 340,470 240,500 
                   L 240,500 
                   L 240,45 
                   L 90,45 
                   Z" 
                fill="url(#goldGradLogo)" 
            />
        </svg>
    );
}
