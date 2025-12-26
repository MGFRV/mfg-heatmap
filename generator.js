const fs = require('fs');

const regions = ["California","Texas","Florida","New York","Illinois","Pennsylvania","Ohio","Georgia"];

let data = [];

try {
  data = JSON.parse(fs.readFileSync('map.json','utf8'));
} catch {
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      region: regions[Math.floor(Math.random() * regions.length)],
      available: Math.random() > 0.5
    });
  }
}

let changed = false;

data.forEach(d => {
  if (Math.random() < 0.2) {
    d.available = !d.available;
    changed = true;
  }
});

if (!changed) {
  const i = Math.floor(Math.random() * data.length);
  data[i].available = !data[i].available;
}

fs.writeFileSync('map.json', JSON.stringify(data, null, 2));
console.log('map.json updated');
