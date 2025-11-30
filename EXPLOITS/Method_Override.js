//===========================
//  Author Patrick Hoogeveen 
//  AKA x0xr00t
//
//===========================

// Override Array.prototype.toString
Array.prototype.toString = function() {
  return "🚨 ARRAY METHOD HIJACKED!";
};

const testArray = [1, 2, 3];
console.log(testArray.toString()); // Output: "🚨 ARRAY METHOD HIJACKED!"
