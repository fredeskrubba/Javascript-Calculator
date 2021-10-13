// Functions for adding, subtracting, multiplying and dividing.
function add(num1, num2){
    return num1 + num2
};

function subtract(num1, num2){
    return num1 - num2
};

function multiply(num1, num2){
    return num1 * num2
};

function divide(num1, num2){
    return num1 / num2
};

// Make an operate function that takes 2 number and an operator, and fires one of the previous functions

function operate(operator, opNum1, opNum2){
    if (operator === "+"){
        return add(opNum1, opNum2);
    } else if (operator === "-"){
        return subtract(opNum1, opNum2)
    } else if (operator === "*"){
        return multiply(opNum1, opNum2)
    } else {
        return divide(opNum1, opNum2)
    }
};

// create the functions that populate the display

// Object to keep track of all the information passed
const calculatorInfo = {
    inputNumber1: 0,
    inputOperator: "",
    inputNumber2: 0,
    currentSum: 0,
};

let displayNum = document.querySelector(".display");

let numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let operatorArray = ["+", "-", "*", "/"];

// Check if the button is a number or an operator, by checking if it's in the former arrays.
// if it is, update the object first, then update the display.
function changeDisplay(newNum){
    if (numberArray.includes(parseInt(newNum)) && operatorArray.includes(calculatorInfo.inputOperator)){
        calculatorInfo.inputNumber2 = parseInt(newNum);
    } else if (numberArray.includes(parseInt(newNum))){
        calculatorInfo.inputNumber1 = parseInt(newNum);
    } else if (operatorArray.includes(newNum)){
        calculatorInfo.inputOperator = newNum;
    };
    return displayNum.textContent = newNum;
};

// make a nodelist of every button with queryselectorall and convert it to an array.
// buttons with numbers
let buttonList = document.body.querySelectorAll("button");
let buttonArray = Array.from(buttonList);


// A foreach loop that add a click event to every element in the buttonArray array, and calls the changeDisplay function. 
buttonArray.forEach(button => {
    button.addEventListener("click", ()=>{
        changeDisplay(button.textContent);
    });
});


// A function that calls the operate function when the = button is pressed.
function calculate(){
    calculatorInfo.currentSum = operate(calculatorInfo.inputOperator, calculatorInfo.inputNumber1, calculatorInfo.inputNumber2);
    return displayNum.textContent = calculatorInfo.currentSum;
};

// function that resets the calculatorInfo object so you can do math again.
function reset(){
    calculatorInfo.inputNumber1 = 0;
    calculatorInfo.inputNumber2 = 0;
    calculatorInfo.inputOperator = "";
};

const equals = document.querySelector(".equalsButton");
equals.addEventListener("click", ()=> {
    calculate();
    reset();
});

