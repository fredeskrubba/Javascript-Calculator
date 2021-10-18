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

// Object to keep track of all the information passed
const calculatorInfo = {
    inputNumber1: "",
    inputOperator: "",
    inputNumber2: "",
    currentSum: 0,
};

let displayNum = document.querySelector(".display");

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorArray = ["+", "-", "*", "/"];

// create the functions that populate the display
// Check if the button is a number or an operator, by checking if it's in one of the former arrays.
// if it is, update the object first, then update the display.
function changeDisplay(newNum){
    // check if there already is an operator in the object, and if an operator was pressed again.
    // if true, calculate and show the new sum.
    if (operatorArray.includes(calculatorInfo.inputOperator) && operatorArray.includes(newNum)){
        calculate();
        calculatorInfo.inputNumber1 = String(calculatorInfo.currentSum);
        calculatorInfo.inputNumber2 = "";
        calculatorInfo.inputOperator = newNum;2
    // check if the operator has a value, if true, the button pressed goes to inputnumber2
    } else if (numberArray.includes(parseInt(newNum)) && operatorArray.includes(calculatorInfo.inputOperator)){
        calculatorInfo.inputNumber2 += newNum;
        calculatorInfo.currentSum = operate(calculatorInfo.inputOperator, parseInt(calculatorInfo.inputNumber1), parseInt(calculatorInfo.inputNumber2));
        displayNum.textContent = calculatorInfo.inputNumber2;
    // Check if it's the first number pressed
    } else if (numberArray.includes(parseInt(newNum))){
        calculatorInfo.inputNumber1 += newNum;
        calculatorInfo.currentSum = parseInt(calculatorInfo.inputNumber1);
        displayNum.textContent = calculatorInfo.inputNumber1;
    // Check if the button pressed is an operator.
    // set inputnumber1 to currentSum, so you can use the sum after pressing equals.   
    } else if (operatorArray.includes(newNum)){
        calculatorInfo.inputNumber1 = String(calculatorInfo.currentSum);
        calculatorInfo.inputOperator = newNum;
    };
};

// make a nodelist of every button with queryselectorall and convert it to an array.
const buttonList = document.body.querySelectorAll("button");
const buttonArray = Array.from(buttonList);


// A foreach loop that add a click event to every element in the buttonArray array, and calls the changeDisplay function. 
buttonArray.forEach(button => {
    button.addEventListener("click", ()=>{
        changeDisplay(button.textContent);
    });
});


// A function that calls the operate function when the = button is pressed.
function calculate(){
    calculatorInfo.currentSum = operate(calculatorInfo.inputOperator, parseInt(calculatorInfo.inputNumber1), parseInt(calculatorInfo.inputNumber2));
    calculatorInfo.inputNumber1 = "";
    calculatorInfo.inputNumber2 = "";
    calculatorInfo.inputOperator = "";
    return displayNum.textContent = calculatorInfo.currentSum;
};

// Use the info from the calculatorInfo object to do math when = is pressed, then reset the info. 
const equals = document.querySelector(".equalsButton");
equals.addEventListener("click", () => {
    calculate();
});

// make a clear button.
function reset(){
    displayNum.textContent = "Display"
    calculatorInfo.inputNumber1 = "";
    calculatorInfo.inputNumber2 = "";
    calculatorInfo.inputOperator = "";
    calculatorInfo.currentSum = 0;
};

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", ()=>{
    reset();
});

