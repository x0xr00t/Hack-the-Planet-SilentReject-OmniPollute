/*
 * ============================================
 * 🚨 Sl0ppyR00t-ProtoPollution (Final Version)
 * 🔬 Demonstrates ALL prototype pollution effects
 * 📝 Author: Patrick Hoogeveen (x0xr00t)
 * 💻 Works in: Browser Console & Node.js
 * 🔥 NO RECURSION - Safe and Complete
 * ============================================
 */

// ========== INITIALIZATION ==========
console.log("%c\n" +
"🔥🔥🔥 S L 0 P P Y R 0 0 T - P R O T O T Y P E   P O L L U T I O N 🔥🔥🔥\n" +
"💀 FINAL DEMO VERSION - NO RECURSION - FULLY WORKING 💀\n" +
"👑 By x0xr00t | For Educational Purposes Only 👑\n",
"color: #ff0000; font-family: monospace; font-weight: bold;");

// ========== UTILITY FUNCTIONS ==========
const logSection = (title) => {
    console.log(`\n%c${title}`, "color: #ff00aa; font-weight: bold; background: #333; padding: 2px 5px; border-radius: 3px;");
};

const logResult = (label, value) => {
    console.log(`  %c${label}:`, "color: #00ff88; font-weight: bold;", value);
};

// ========== 1. BASIC PROTOTYPE POLLUTION ==========
logSection("1️⃣ BASIC PROTOTYPE POLLUTION");

Object.defineProperty(Object.prototype, 'polluted', {
    value: "🚨 [SL0PPYR00T] This property exists on ALL objects!",
    enumerable: true,
    configurable: true,
    writable: true
});

const testObj1 = {};
logResult("Empty object has polluted property", testObj1.polluted);
logResult("Property exists on Object.prototype", Object.prototype.hasOwnProperty('polluted'));

// ========== 2. FUNCTION INJECTION ==========
logSection("2️⃣ FUNCTION INJECTION");

Object.defineProperty(Object.prototype, 'maliciousFunc', {
    value: function() {
        return "🚨 [SL0PPYR00T] MALICIOUS FUNCTION EXECUTED!";
    },
    enumerable: true,
    configurable: true,
    writable: true
});

const testObj2 = {};
logResult("Injected function exists", !!testObj2.maliciousFunc);
logResult("Function execution result", testObj2.maliciousFunc());

// ========== 3. METHOD OVERRIDE ==========
logSection("3️⃣ METHOD OVERRIDE");

const originalToString = Object.prototype.toString;
Object.defineProperty(Object.prototype, 'toString', {
    value: function() {
        return `🚨 [SL0PPYR00T] ${this.constructor.name} method overridden!`;
    },
    enumerable: false,
    configurable: true,
    writable: true
});

const testArray = [1, 2, 3];
logResult("Array toString overridden", testArray.toString());

// Restore original
Object.defineProperty(Object.prototype, 'toString', {
    value: originalToString,
    enumerable: false,
    configurable: true,
    writable: true
});

// ========== 4. CONFIGURATION POLLUTION ==========
logSection("4️⃣ CONFIGURATION POLLUTION");

// Original config
const appConfig = {
    security: {
        requireAuth: true,
        maxAttempts: 5
    }
};

logResult("Original requireAuth", appConfig.security.requireAuth);

// Simulate unsafe merge without recursion
const maliciousConfig = {
    security: {
        requireAuth: false,
        maxAttempts: 9999
    },
    backdoor: "🚨 [SL0PPYR00T] CONFIG POLLUTED!"
};

// Simulate the pollution that would happen with unsafe merge
Object.defineProperty(Object.prototype, 'backdoor', {
    value: maliciousConfig.backdoor,
    enumerable: true,
    configurable: true,
    writable: true
});

Object.defineProperty(appConfig.security, 'requireAuth', {
    value: maliciousConfig.security.requireAuth,
    enumerable: true,
    configurable: true,
    writable: true
});

Object.defineProperty(appConfig.security, 'maxAttempts', {
    value: maliciousConfig.security.maxAttempts,
    enumerable: true,
    configurable: true,
    writable: true
});

logResult("Polluted requireAuth", appConfig.security.requireAuth);
logResult("Global pollution check", {}.backdoor);

// ========== 5. DOM-XSS SIMULATION ==========
if (typeof document !== 'undefined') {
    logSection("5️⃣ DOM-XSS SIMULATION");

    // Safe DOM manipulation demo
    const testDiv = document.createElement('div');
    testDiv.style.color = 'red';
    testDiv.style.fontWeight = 'bold';
    testDiv.textContent = '🚨 [SL0PPYR00T] DOM-XSS DEMO (Simulated)';

    document.body.appendChild(testDiv);
    logResult("DOM-XSS visible", "Check above - red warning should be visible");

    // Clean up
    setTimeout(() => {
        document.body.removeChild(testDiv);
    }, 3000);
} else {
    logSection("5️⃣ DOM-XSS SIMULATION (Node.js)");
    logResult("Environment", "Node.js (DOM not available - would work in browser)");
}

// ========== 6. AUTHENTICATION BYPASS ==========
logSection("6️⃣ AUTHENTICATION BYPASS");

function User(role) {
    this.role = role;
    this.isAdmin = false;
}

// Pollute prototype
Object.defineProperty(Object.prototype, 'isAdmin', {
    value: true,
    enumerable: true,
    configurable: true,
    writable: true
});

const regularUser = new User("user");
logResult("User isAdmin (should be false)", regularUser.isAdmin);
logResult("Authentication bypassed", regularUser.isAdmin === true);

// ========== 7. PERSISTENT BACKDOOR ==========
logSection("7️⃣ PERSISTENT BACKDOOR");

Object.defineProperty(Object.prototype, 'sl0ppyBackdoor', {
    value: {
        version: "1.0",
        installed: new Date().toISOString(),
        execute: function(cmd) {
            return `🚨 [SL0PPYR00T] Would execute: ${cmd}`;
        }
    },
    enumerable: true,
    configurable: true,
    writable: true
});

const anyObject = {};
logResult("Backdoor exists", !!anyObject.sl0ppyBackdoor);
logResult("Backdoor execution", anyObject.sl0ppyBackdoor.execute("whoami"));

// ========== 8. PROTOTYPE CHAIN POLLUTION ==========
logSection("8️⃣ PROTOTYPE CHAIN POLLUTION");

function Admin() {}
Admin.prototype = Object.create(User.prototype);

const admin = new Admin();
logResult("Admin inherits pollution", admin.isAdmin === true);
logResult("Admin has backdoor", !!admin.sl0ppyBackdoor);

// ========== IMPACT SUMMARY ==========
logSection("📌 IMPACT SUMMARY");

const impacts = [
    "✅ All objects inherit malicious properties",
    "✅ Functions can be injected globally",
    "✅ Methods can be overridden (toString, valueOf)",
    "✅ Configuration settings compromised",
    "✅ DOM-XSS possible in browser environments",
    "✅ Authentication can be bypassed",
    "✅ Persistent backdoors possible",
    "✅ Prototype chain affected"
];

impacts.forEach(impact => console.log(`  ${impact}`));

// ========== MITIGATION STRATEGIES ==========
logSection("🛡️ MITIGATION STRATEGIES");

const mitigations = [
    "Object.freeze(Object.prototype)",
    "Use Object.create(null) for sensitive objects",
    "Avoid Object.assign() with untrusted input",
    "Implement input validation/sanitization",
    "Use Map/WeakMap for untrusted data",
    "Enable Node.js --disable-proto flags",
    "Regular security audits",
    "Implement CSP headers (for DOM-XSS)"
];

mitigations.forEach(mitigation => console.log(`  🔒 ${mitigation}`));

// ========== CLEANUP ==========
logSection("🧹 CLEANUP");

const propertiesToClean = [
    'polluted', 'maliciousFunc', 'backdoor',
    'sl0ppyBackdoor', 'isAdmin'
];

propertiesToClean.forEach(prop => {
    if (Object.prototype.hasOwnProperty(prop)) {
        delete Object.prototype[prop];
    }
});

// Restore any modified built-ins
if (appConfig.security) {
    appConfig.security.requireAuth = true;
    appConfig.security.maxAttempts = 5;
}

console.log("%c✅ Demo completed successfully!", "color: #00ff88; font-weight: bold;");
console.log("%c📢 All demonstrations worked without recursion!", "color: #00ff88;");
console.log("%c💡 Remember: This is for educational purposes only.", "color: #00ff88;");
