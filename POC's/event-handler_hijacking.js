// Pollute Object.prototype with a malicious event handler
Object.prototype.onclick = function() {
  alert('🚨 Sl0ppyR00t-XSS by x0xr00t: Clickjacking successful!');
};

// Simulate a vulnerable button
const maliciousButton = document.createElement('button');
maliciousButton.textContent = "Click me (XSS Demo)";
document.body.appendChild(maliciousButton);
// Result: Alert triggers on click
