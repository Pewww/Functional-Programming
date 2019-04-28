const users = [
  {id: 1, name: 'A', age: 36},
  {id: 2, name: 'B', age: 32},
  {id: 3, name: 'C', age: 32},
  {id: 4, name: 'D', age: 27},
  {id: 5, name: 'E', age: 25},
  {id: 6, name: 'F', age: 26},
  {id: 7, name: 'G', age: 31},
  {id: 8, name: 'H', age: 23},
  {id: 9, name: 'I', age: 20},
  {id: 10, name: 'J', age: 41}
];

// 1. 명령형 코드
  // 1-1. 30세 이상인 users를 거른다.
  const tempUsers = [];

  for (let i = 0, userLeng = users.length; i < userLeng; i++) {
    users[i].age >= 30 && tempUsers.push(users[i]);
  }
  console.log('tempUsers', tempUsers);

  // 1-2. 30세 이상인 users의 name을 수집한다.
  const names = [];

  for (let i = 0, tempLeng = tempUsers.length; i < tempLeng; i++) {
    names.push(tempUsers[i].name);
  }
  console.log('names', names);

  // 1-3. 30세 미만인 users를 거른다.
  const underThirtyUsers = [];

  for (let i = 0, userLeng = users.length; i < userLeng; i++) {
    users[i].age < 30 && underThirtyUsers.push(users[i]);
  }
  console.log('underThirtyUsers', underThirtyUsers);

  // 1-4. 30세 미만인 users의 age를 수집한다.
  const ages = [];

  for (let i = 0, underLeng = underThirtyUsers.length; i < underLeng; i++) {
    ages.push(underThirtyUsers[i].age);
  }
  console.log('ages', ages);

// 2. _filter, _.map 으로 리팩토링
  // 함수형 프로그래밍의 특징: 다형성이 높고, 관심사가 분리된다. 재사용성도 UP
  // 2-1. _filter - Array.prototype.filter과 동일하게 생각
  function _filter(list, predicate) {
    if (!Array.isArray(list)) {
      return [];
    }

    if (typeof predicate !== 'function') {
      return list;
    }

    const newList = [];

    for (let idx = 0, listLeng = list.length; idx < listLeng; idx++) {
      if (predicate(list[idx], idx, list)) {
        newList.push(list[idx]);
      }
    }

    return newList;
  }

  // 2-2. _map - Array.prototype.map과 동일하게 생각
  function _map(list, predicate) {
    if (!Array.isArray(list)) {
      return [];
    }

    if (typeof predicate !== 'function') {
      return list;
    }

    const newList = [];

    for (let idx = 0, listLeng = list.length; idx < listLeng; idx++) {
      newList.push(
        predicate(list[idx], idx, list)
      );
    }

    return newList;
  }

// Example Code - 아까와 같이 30세 미만의 users를 거를 때
  // A. With Anonymous Function
  const underThirtyUsers2 = _filter(users, function(user) {
    return user.age < 30
  });

  // B. With Arrow Function
  const underThirtyUsers3 = _filter(users, user => user.age < 30);

  // C. With Arrow Function + Destructuring
  const underThirtyUsers4 = _filter(users, ({age}) => age < 30);

// Example Code2 - 30세 미만인 users에 대한 name을 수집할 때 (B)
  const namesOfUnderThirtyUsers = _map(
    _filter(users, user => user.age < 30),
    user => user.name
  ); // ['D', 'E', 'F', 'H', 'I']