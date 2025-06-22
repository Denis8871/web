// 1
function seconds(total) {
    return total % 60
  }
console.log("1. seconds(125): ", seconds(125))

// 2
function perimeter(side, count) {
  return side * count;
}
console.log("2. perimeter(4, 6): ", perimeter(4, 6))

// 3
function fizzbuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) console.log("fizzbuzz");
        else if (i % 3 === 0) console.log("fizz");
        else if (i % 5 === 0) console.log("buzz");
        else console.log(i);
    }
}
console.log("3. fizzbuzz до 15:");
fizzbuzz(15);

// 4
function Calculate(a, b, c) {
  console.log("4. Calculate(3, 6, 9): ", (a + b + c) / 3);
}
Calculate(3, 6, 9);

// 5
function isDivisible_if(n, x, y) {
  if (n % x === 0 && n % y === 0) {
      console.log("5.1. if: Yes");
  } else {
      console.log("5.1. if: No");
  }
}
function isDivisible_ternary(n, x, y) {
  console.log("5.2. ternary: ", (n % x === 0 && n % y === 0) ? "Yes" : "No");
}
function isDivisible_without_if_ternary(n, x, y) {
  console.log("5.3. if and ternary: ", !(n % x || n % y));
}
isDivisible_if(30, 5, 3);
isDivisible_ternary(30, 5, 3);
isDivisible_without_if_ternary(30, 5, 3);

// 6
function analyzeArray(arr) {
  let max = Math.max(...arr);
  let min = Math.min(...arr);
  let sum = arr.reduce((a, b) => a + b, 0);
  let avg = sum / arr.length;
  let odd = arr.filter(x => x % 2 !== 0);
  console.log("6. Масив:", arr);
  console.log("Максимум:", max);
  console.log("Мінімум:", min);
  console.log("Сума:", sum);
  console.log("Середнє:", avg);
  console.log("Непарні:", odd);
}
analyzeArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

// 7
function modifyMatrix(matrix) {
  for (let i = 0; i < 5; i++) {
      if (matrix[i][i] < 0) matrix[i][i] = 0;
      else if (matrix[i][i] > 0) matrix[i][i] = 1;
  }
  console.log("7. Модифікована матриця:");
  console.table(matrix);
}

let matrix = [
  [-1, 2, 3, 4, 5],
  [6, 7, -8, 9, 10],
  [11, 12, -13, 14, 15],
  [16, 17, 18, 19, -20],
  [21, 22, 23, 24, 25]
];
modifyMatrix(matrix);

// 8
function Add(a, b) {
  console.log("8. Сума:", a + b);
}
function Sub(a, b) {
  console.log("8. Різниця:", a - b);
}
function Mul(a, b) {
  console.log("8. Добуток:", a * b);
}
function Div(a, b) {
  if (b === 0) {
      console.log("8. Ділення на нуль неможливе");
  } else {
      console.log("8. Частка:", a / b);
  }
}
let a = 10, b = 2, op = "Div";
if (op === "Add") Add(a, b);
  else if (op === "Sub") Sub(a, b);
  else if (op === "Mul") Mul(a, b);
  else if (op === "Div") Div(a, b);

// 9
function analyzeNumber(num) {
  console.log("9. Число:", num);
  console.log("Позитивне:", num >= 0);

  let isPrime = true;
  if (num <= 1) isPrime = false;
  else {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
  }
  console.log("Просте:", isPrime);

  [2, 3, 5, 6, 9].forEach(x => console.log(`Ділиться на ${x}:`, num % x === 0));
}

analyzeNumber(30);

// 10
function transformArray(arr) {
  return arr.reverse().map(el => typeof el === 'number' ? el * el : el);
}
console.log("10. Трансформований масив:", transformArray([1, "a", 2, "b", 3]));

// 11
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
console.log("11. Масив без дублікатів:", removeDuplicates([1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6]));