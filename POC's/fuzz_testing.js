// ============================================
// 🚨 Sl0ppyR00t Fuzz-Testing PoC 
// Demonstrates prototype pollution via fuzz payloads
// Author   : phoogeveen
// AKA      : x0xr00t 
// ============================================

// --- Method 1: Direct Prototype Pollution (Works in Non-Strict Mode) ---
console.log("🔍 Before fuzz-testing:");
console.log("  {}.fuzzProperty =", {}.fuzzProperty); // undefined
console.log("  {}.secretToken =", {}.secretToken);   // undefined

// Define the fuzz payload
const fuzzPayload = {
  fuzzProperty: "🚨 Fuzz test success: Injected by Sl0ppyR00t x0xr00t",
  secretToken: "STOLEN_BY_Sl0ppyR00t_x0xr00t"
};

// Pollute Object.prototype directly (modern engines block __proto__ assignments)
for (const key in fuzzPayload) {
  Object.prototype[key] = fuzzPayload[key];
}

console.log("\n💥 After fuzz-testing (Direct Pollution):");
console.log("  {}.fuzzProperty =", {}.fuzzProperty); // Now shows the injected value
console.log("  {}.secretToken =", {}.secretToken);   // Now shows the injected value

// --- Method 2: Using Object.setPrototypeOf (Alternative) ---
console.log("\n🔍 Before setPrototypeOf fuzz-testing:");
const testObject = {};
console.log("  testObject.fuzzProperty =", testObject.fuzzProperty); // undefined

// Create a polluted object
const pollutedProto = {};
for (const key in fuzzPayload) {
  pollutedProto[key] = fuzzPayload[key];
}

// Set the prototype of testObject to the polluted object
Object.setPrototypeOf(testObject, pollutedProto);

console.log("\n💥 After setPrototypeOf fuzz-testing:");
console.log("  testObject.fuzzProperty =", testObject.fuzzProperty); // Injected value
console.log("  testObject.secretToken =", testObject.secretToken);   // Injected value

// --- Method 3: Classic __proto__ Pollution (Legacy Browsers/Node.js) ---
console.log("\n🔍 Testing __proto__ pollution (legacy environments):");
const legacyPayload = {
  "__proto__": {
    legacyFuzz: "🚨 Legacy fuzz test: Injected by Sl0ppyR00t x0xr00t"
  }
};

const legacyTest = {};
Object.assign(legacyTest, legacyPayload); // Works in older JS engines

console.log("  {}.legacyFuzz =", {}.legacyFuzz); // May show in legacy environments

// --- Method 4: Constructor Prototype Pollution (Modern Engines) ---
console.log("\n🔍 Testing constructor.prototype pollution:");
function VulnerableConstructor() {}
VulnerableConstructor.prototype.fuzzProperty = "🚨 Constructor fuzz: Injected by Sl0ppyR00t x0xr00t";

const vulnerableInstance = new VulnerableConstructor();
console.log("  vulnerableInstance.fuzzProperty =", vulnerableInstance.fuzzProperty); // Injected
console.log("  {}.fuzzProperty =", {}.fuzzProperty); // Not polluted (scoped to constructor)
