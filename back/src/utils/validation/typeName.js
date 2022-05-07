const typeName = (variable) => {
  // slice하여 String, RegExp 처럼 이름만 뽑아낸다.
  return Object.prototype.toString.call(variable).slice(8, -1);
}

// 예시 리스트
// Object.prototype.toString.call('');             // [object String]
// Object.prototype.toString.call(new String());   // [object String]
// Object.prototype.toString.call(1);              // [object Number]
// Object.prototype.toString.call(new Number());   // [object Number]
// Object.prototype.toString.call(NaN);            // [object Number]
// Object.prototype.toString.call(Infinity);       // [object Number]
// Object.prototype.toString.call(true);           // [object Boolean]
// Object.prototype.toString.call(undefined);      // [object Undefined]
// Object.prototype.toString.call();               // [object Undefined]
// Object.prototype.toString.call(null);           // [object Null]
// Object.prototype.toString.call([]);             // [object Array]
// Object.prototype.toString.call({});             // [object Object]
// Object.prototype.toString.call(new Date());     // [object Date]
// Object.prototype.toString.call(Math);           // [object Math]
// Object.prototype.toString.call(/test/i);        // [object RegExp]
// Object.prototype.toString.call(function () {}); // [object Function]
// Object.prototype.toString.call(async function () {}); // [object AsyncFunction]
// Object.prototype.toString.call(document);       // [object HTMLDocument]
// Object.prototype.toString.call(argument);       // [object Arguments]
// Object.prototype.toString.call(undeclared);     // ReferenceError

export { typeName };