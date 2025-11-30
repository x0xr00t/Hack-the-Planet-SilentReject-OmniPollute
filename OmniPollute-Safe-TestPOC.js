// ============================================
//  Prototype Pollution PoC (Safe Demo)
//  Author Patrick Hoogeveen 
//  AKA x0xr00t
//
//  Purpose: Demonstrate vulnerabilities detected in the scan
//  Note: For responsible disclosure only
// ============================================

// --- Logging Function ---
function log(message, style = "") {
    console.log(message, style);
}

// --- ASCII Art ---
log("%c\n" +
"🚨 Prototype Pollution Proof of Concept 🚨\n" +
"  ⚡ Demonstrating Detected Vulnerabilities ⚡\n" +
"      👑 For Responsible Disclosure Only 👑\n",
"color: #ffd166; font-family: monospace;");

// ========== VULNERABILITY DEMONSTRATIONS ==========

// --- 1. Function Injection ---
log("\n%c💉 Function Injection (18 issues detected):", "color: #ef476f; font-weight: bold;");

// Before pollution
const testObject1 = {};
log("  Before: testObject1.execute =", testObject1.execute);

// Pollute with a function
Object.prototype.execute = function() {
    return "🚨 MALICIOUS FUNCTION INJECTED!";
};

log("  After: testObject1.execute() =", testObject1.execute());
log("  After: {}.execute() =", {}.execute());

// --- 2. Method Overrides ---
log("\n%c🔄 Method Overrides (14 issues detected):", "color: #ef476f; font-weight: bold;");

// Before pollution
const testArray = [1, 2, 3];
log("  Before: testArray.toString() =", testArray.toString());

// Override Array.prototype.toString
Array.prototype.toString = function() {
    return "🚨 ARRAY METHOD OVERRIDDEN!";
};

log("  After: testArray.toString() =", testArray.toString());

// --- 3. Fuzz Test Successes ---
log("\n%c🎲 Fuzz Test Successes (8 issues detected):", "color: #ef476f; font-weight: bold;");

// Simulate fuzz testing
const fuzzPayload = {
    "__proto__": {
        "fuzzProperty": "🚨 FUZZ TEST SUCCESS: Property injected!"
    }
};

// Test object
const testObject2 = {};
Object.assign(testObject2, fuzzPayload);

log("  Fuzz Result: {}.fuzzProperty =", {}.fuzzProperty);

// --- 4. Property Shadowing ---
log("\n%c👻 Property Shadowing (2 issues detected):", "color: #ef476f; font-weight: bold;");

// Before shadowing
const shadowObject = { toString: function() { return "Original toString"; } };
log("  Before: shadowObject.toString() =", shadowObject.toString());

// Shadow the toString method
shadowObject.toString = function() { return "🚨 PROPERTY SHADOWED!"; };
log("  After: shadowObject.toString() =", shadowObject.toString());

// ========== IMPACT SUMMARY ==========
log("\n%c📌 Impact Summary:", "color: #ef476f; font-weight: bold;");
log("  - Function Injection: Attackers can inject malicious functions into prototypes.");
log("  - Method Overrides: Built-in methods (e.g., toString) can be overridden globally.");
log("  - Fuzz Testing: Random properties can be injected into Object.prototype.");
log("  - Property Shadowing: Object properties can be shadowed to hide malicious behavior.");

// ========== MITIGATION ==========
log("\n%c🛡️ Mitigation:", "color: #06d6a0; font-weight: bold;");
log("  - Freeze Object.prototype: `Object.freeze(Object.prototype);`");
log("  - Avoid Object.assign() with untrusted input.");
log("  - Use Map/WeakMap for untrusted data.");
log("  - Validate and sanitize all user-controlled input.");
