const fs = require('fs');
const { exec } = require('child_process');

const regions = ["California","Texas","Florida","New York","Illinois","Pennsylvania","Ohio","Georgia"];

let data = [];
for (let i = 1; i <= 100; i++) {
  data.push({
    id: i,
    region: regions[Math.floor(Math.random() * regions.length)],
    available: Math.random() > 0.5
  });
}

function updateData() {
  data.forEach(d => {
    if (Math.random() < 0.3) d.available = !d.available;
  });

  fs.writeFileSync('map.json', JSON.stringify(data, null, 2));
  console.log('Updated map.json');
}

function gitPush() {
  exec('git add map.json && git commit -m "auto update" && git push', (err, stdout, stderr) => {
    if (err) {
      console.error('Git error:', err.message);
    } else {
      console.log('Pushed to GitHub');
    }
  });
}

setInterval(() => {
  updateData();
  gitPush();
}, 15000);

updateData();
gitPush();
