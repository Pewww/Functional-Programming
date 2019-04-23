/*
 * PLUS - 순수 함수는 평가 시점에 따라 로직이 결정되지 않는다.
 * 즉, 언제든 동일하다.
 */

/* 순수 함수 예시 */
function add(a, b) {
  return a + b;
}

console.log(add(10, 5)); // 15

/* 순수 함수 X - c(외부 상태)의 값이 변함에 따라 Output도 달라질 수 있음. */
let c = 10;

function notPureAdd(a, b) {
  return a + b + c;
}

console.log(notPureAdd(10, 5)); // 25
c = 20;
console.log(notPureAdd(10, 5)); // 35

/* 순수 함수 O - c가 상수(불변)라면, 아래 add함수는 순수함수가 됨. */
const NUMBER_C = 10;

function pureAdd(a, b) {
  return a + b + NUMBER_C;
}

console.log(pureAdd(10, 5)); // 25
NUMBER_C = 20; // Uncaught TypeError: Assignment to constant variable.
console.log(pureAdd(10, 5)); // 25

/* 순수 함수 X - 부수 효과를 일으킴. (외부 상태를 변경하고 있음.) */
let num = 10;

function additionalEffectAdd(a, b) {
  num = b;
  return a + b;
}

console.log(num); // Before: 10
console.log(additionalEffectAdd(10, 5)); // 15
console.log(num); // After: 5

/* 순수 함수 X - 부수 효과를 일으킴. (인자 상태를 변경하고 있음.) */
const obj = {a: 1};

function additionalEffectObj(o, val) {
  o.a += val;
}

console.log(obj.a); // 1
additionalEffectObj(obj, 10);
console.log(obj.a); // 11

/* 순수 함수 O - 인자의 값을 참조만 할 뿐, 그 상태를 변경하진 않음. */
const obj2 = {a: 1};

function pureObjAdd(o, val) {
  return {a: o.a + val};
}

console.log(obj2.a); // 1
pureObjAdd(obj2, 10); // {a: 11}
console.log(obj2.a); // 1