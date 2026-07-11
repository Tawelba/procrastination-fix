import fs from 'node:fs';

const createOgImage = () => {
    // Create canvas data
    const width = 1200;
    const height = 630;

    // SVG as string
    const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
            <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.2"/>
            </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-gradient)"/>
        <circle cx="200" cy="500" r="200" fill="rgba(255,255,255,0.05)"/>
        <circle cx="1000" cy="150" r="150" fill="rgba(255,255,255,0.05)"/>
        <circle cx="300" cy="200" r="100" fill="rgba(255,255,255,0.05)"/>
        <circle cx="900" cy="550" r="120" fill="rgba(255,255,255,0.05)"/>
        <g filter="url(#shadow)">
            <text x="50%" y="40%" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">
                Stop Procrastinating
            </text>
            <text x="50%" y="50%" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="normal" fill="white" text-anchor="middle">
                For Good
            </text>
            <text x="50%" y="58%" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="normal" fill="rgba(255,255,255,0.95)" text-anchor="middle">
                Simple 3-Step System
            </text>
            <line x1="400" y1="65%" x2="800" y2="65%" stroke="rgba(255,255,255,0.6)" stroke-width="4"/>
            <text x="50%" y="75%" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="600" fill="white" text-anchor="middle">
                7-Day Challenge
            </text>
        </g>
        <text x="50%" y="92%" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="rgba(255,255,255,0.8)" text-anchor="middle">
            Procrastination Fix
        </text>
    </svg>`;

    // Write SVG to file
    fs.writeFileSync('og-image.svg', svg.trim());
    console.log('✅ og-image.svg created successfully!');
    console.log('   To convert to JPG, use: convert og-image.svg og-image.jpg');
    console.log('   Or online: https://cloudconvert.com/svg-to-jpg');
};

createOgImage();
