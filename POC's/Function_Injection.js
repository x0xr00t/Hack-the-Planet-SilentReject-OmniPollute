// ======================================================
// 🚨 Sl0ppyR00t Function-injection-Testing PoC 
// Demonstrates prototype pollution via Function injects
// Author   : phoogeveen
// AKA      : x0xr00t 
// =====================================================

// Inject a malicious function into Object.prototype
Object.prototype.execute = function() {
  return "🚨 MALICIOUS FUNCTION INJECTED!";
};

// All objects now inherit the malicious function
console.log({}.execute()); // Output: "🚨 MALICIOUS FUNCTION INJECTED!"
