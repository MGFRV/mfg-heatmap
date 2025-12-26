const fs = require('fs');

const regions = ["California","Texas","Florida","New York","Illinois","Pennsylvania","Ohio","Georgia"];

let data = [];
for (let i = 1; i <= 100; i++) {
  data.push({
    id: i,
    region: regions[Math.floor(Math.random() * regions.length)],
    available: Math.random() > 0.5
  });
}

function update() {
  data.forEach(d => {
    if (Math.random() < 0.3) d.available = !d.available;
  });

  fs.writeFileSync('map.json', JSON.stringify(data, null, 2));
  console.log('Updated', new Date().toLocaleTimeString());
}

setInterval(update, 15000);
update();
