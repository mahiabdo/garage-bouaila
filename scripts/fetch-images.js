/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const images = {
  'hero': [
    // cinematic garage workshop
    'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=1600&q=80'
  ],
  'vehicles': [
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80'
  ],
  'services': [
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517976487492-0c9c6a3e6c6e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542362567-3d3a4d6b8c2b?auto=format&fit=crop&w=1200&q=80'
  ],
  'garage': [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80'
  ],
  'before-after': [
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1549921296-3f1a5f5d3f9c?auto=format&fit=crop&w=1200&q=80'
  ]
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error('Failed to get ' + url + ' (status ' + res.statusCode + ')'));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public', 'images');
  ensureDir(publicDir);

  for (const [folder, urls] of Object.entries(images)) {
    const dir = path.join(publicDir, folder);
    ensureDir(dir);
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const ext = '.jpg';
      const dest = path.join(dir, `${folder}-${i + 1}${ext}`);
      try {
        console.log('Downloading', url, '→', dest);
        await download(url, dest);
      } catch (err) {
        console.error('Failed to download', url, err.message);
      }
    }
  }
  console.log('Done. Images saved under public/images/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
