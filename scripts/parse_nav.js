const fs = require('fs');
const path = 'C:\\Users\\UnknowN\\.gemini\\antigravity-ide\\brain\\bb3be2b8-1762-4d1a-b9a6-8410af037de9\\.system_generated\\steps\\163\\content.md';
const content = fs.readFileSync(path, 'utf-8');

const regex = /<nav[^>]*>([\s\S]*?)<\/nav>/gi;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log('--- FOUND NAV ---');
    const links = [...match[1].matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    links.forEach(l => {
        const text = l[2].replace(/<[^>]+>/g, '').trim();
        console.log(`${text} -> ${l[1]}`);
    });
}
