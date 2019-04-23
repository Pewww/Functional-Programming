/* 일급 함수 */
const f1 = function(a) {
  return a * a;
};

const f2 = f1; // 변수에 함수를 담을 수 있다.

function f3(f) {
  return f();
}

console.log(
  f3(function() { // 인자에 함수를 넘겨줄 수 있다.
    return 10;
  })
); // 10

/* addMaker 함수 - 클로저 형태 */
function addMaker(a) {
  return function(b) {
    return a + b;
  };
}

const closureAdd = addMaker(10);
console.log(closureAdd(20)); // 30

/* 다양한 함수를 인자로 받는 또 다른 순수함수 */
function multipleFunc(f1, f2, f3) {
  return f3(f1() + f2());
}

multipleFunc(
  function numberTwo() {return 2;},
  function numberThree() {return 3;},
  function mulTwoNumber(num) {return num ** 3;}
); // 125