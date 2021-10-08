// 1. 생성자 함수 만들기
// ㄴ 생성자 함수와 일반 함수 생성의 기술적 차이는 없음
// ㄴ 특징: 대문자로 시작, new 사용하여 실행
function User(name) {
  this.name = name;
  this.isAdmin = false;

  this.sayHi = function () {
    alert("My name is: " + this.name);
  };
}

let user = new User("Ryon");

alert("유저 이름 : " + user.name); // 결과: Ryon
alert("유저 권한 : " + user.isAdmin); // 결과: false
user.sayHi(); // 결과: My name is: Ryon

// 2. 생성자 함수 내부 동작 원리
function User2(name) {
  // 1) 빈 객체가 암시적 생성
  // this = {};

  // 2) 새로운 프로퍼티를 this에 추가
  this.name = name;
  this.isAdmin = false;

  // 3) this의 암시적 변환
  // return this;
}

let user2 = new User2("Apche");

// 4) 위 방식은 객체 리터럴 문법으로 만드는 것과 같음
//   let user2 = {
//       name: "Apche",
//       isAdmin: false
//   }


// 3. 익명함수로 만들기
// ㄴ 재사용할 필요가 없고 복잡한 객체 일 때 사용
let user3 = new (function () {
  this.name = "Mory";
  this.isAdmin = false;

  // 지역 변수, 로직, 구문 등의 코드 작성.
})();


// 4. new.target 이란?
// ㄴ new 와 같이 사용하여 해당 함수 자체를 반환 (자주 사용X)
function User4() {
  alert(new.target);
}

User4(); // undefined
new User4(); // function User {...}


// 5. new.target 사용하기
function User5(name) {
  if(!new.target) {
      return new User5(name);
  }
  this.name = name;
}
let john = User5("John"); // User5 함수 내용에 의해 new를 쓴 것처럼 변환
alert(john.name);


// 6. 생성자 함수에서 return 사용하기
// ㄴ 생성자 함수는 자동으로 this 반환. 따라서, return문 사용X
// ㄴ 리턴을 한다면?
// 6-1. 객체 반환
function BigUser() {
  this.name = "Bee";

  return { name: "Ant" }; // this가 아닌 새로운 객체 반환
}
alert(new BigUser().name); // 결과: Ant

// 6-2. 원시형 반환
function SmallUser() {
  this.name = "Bee";

  return; // this를 반환
}
alert(new SmallUser().name); // 결과: Bee

// 6-3. 빈 값 반환
function NoneUser() {
  this.name = "Bee";
  return;
}
alert(new NoneUser().name); // 결과: Bee


// 7. 생성자 내 메서드
// ㄴ 매개변수를 이용하여 객체 내부 유연하게 구성
function FinalUser(name) {
  this.name = name;
  this.sayHi = function() {
      alert("제 이름은 " + this.name + "입니다.");
  };
}

let con = new FinalUser("콘");
con.sayHi(); // 결과: 제 이름은 콘입니다.

// ------------------------------------------
// 과제
// 1. 함수 두 개로 동일한 객체 만들기
let obj = {};

function A() {
  return obj;
}

function B() {
  return obj;
}

let a = new A();
let b = new B();

alert(a == b); // 결과: true (두 함수 모두 this 대신 동일한 객체를 반환하면 같아진다)

// 2. 계산기 만들기
function Calculator() {
  let numObj = {
    num1: 0,
    num2: 0,
  };

  this.read = function () {
    numObj.num1 = +prompt("첫 번째 숫자를 입력하세요 ", "");
    numObj.num2 = +prompt("두 번째 숫자를 입력하세요 ", "");
    return numObj;
  };

  this.sum = function () {
    return numObj.num1 + numObj.num2;
  };

  this.mul = function () {
    return numObj.num1 * numObj.num2;
  };
}

let calculator = new Calculator();
calculator.read();
alert("Sum= " + calculator.sum());
alert("Mul= " + calculator.mul());

// numObj 객체 생성없이 만들기
function Calculator2() {
  this.read = function () {
    this.num1 = +prompt("첫 번째 숫자를 입력하세요 ", "");
    this.num2 = +prompt("두 번째 숫자를 입력하세요 ", "");
  };

  this.sum = function () {
    return this.num1 + this.num2;
  };

  this.mul = function () {
    return this.num1 * this.num2;
  };
}

let calculator2 = new Calculator2();
calculator2.read();
alert("Sum= " + calculator2.sum());
alert("Mul= " + calculator2.mul());

// 3. 누산기 만들기
function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function () {
    this.value += +prompt("숫자 입력: ", "");
  };
}

let accumulator = new Accumulator(1);

accumulator.read();
accumulator.read();

alert(accumulator.value);
