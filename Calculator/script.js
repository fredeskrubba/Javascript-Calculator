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
    // decimal 1 and 2 is to track if there's already been inserted a . in inputnumber1, and inputnumber2.
    decimal1: false,
    decimal2: false,
    lastInput: "",
};

const displayNum = document.querySelector(".display");

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
        calculatorInfo.inputOperator = newNum;
    // check if the operator is empty, if it is, add . to inputnumber1 and update decimal1 to be true, so they can't add another.
    } else if (newNum === "." && calculatorInfo.inputOperator === "" && calculatorInfo.decimal1 === false){
        calculatorInfo.inputNumber1 += ".";
        displayNum.textContent = calculatorInfo.inputNumber1;
        calculatorInfo.decimal1 = true;
    // if inputoperator is not empty, add . to inputnumber 2 and change decimal2 to true, this time.
    } else if (newNum === "." && calculatorInfo.inputOperator !== "" && calculatorInfo.decimal2 === false){
        calculatorInfo.inputNumber2 += ".";
        displayNum.textContent = calculatorInfo.inputNumber2;
        calculatorInfo.decimal2 = true;
    // check if the operator has a value, if true, the button pressed goes to inputnumber2
    } else if (numberArray.includes(parseFloat(newNum)) && operatorArray.includes(calculatorInfo.inputOperator)){
        calculatorInfo.inputNumber2 += newNum;
        calculatorInfo.currentSum = operate(calculatorInfo.inputOperator, parseFloat(calculatorInfo.inputNumber1), parseFloat(calculatorInfo.inputNumber2));
        displayNum.textContent = calculatorInfo.inputNumber2;
    // Check if it's the first number pressed.
    } else if (numberArray.includes(parseFloat(newNum))){
        calculatorInfo.inputNumber1 += newNum;
        calculatorInfo.currentSum = parseFloat(calculatorInfo.inputNumber1);
        displayNum.textContent = calculatorInfo.inputNumber1;
    // Check if the button pressed is an operator.
    // set inputnumber1 to currentSum, so you can use the sum after pressing equals.   
    } else if (operatorArray.includes(newNum)){
        calculatorInfo.inputNumber1 = String(calculatorInfo.currentSum);
        calculatorInfo.inputOperator = newNum;
        displayNum.textContent = calculatorInfo.inputOperator;
    };
};

// make a nodelist of every button with queryselectorall and convert it to an array.
const buttonList = document.body.querySelectorAll("button");
const buttonArray = Array.from(buttonList);


// A foreach loop that add a click event to every element in the buttonArray array, and calls the changeDisplay function. 
buttonArray.forEach(button => {
    button.addEventListener("click", ()=>{
        changeDisplay(button.textContent);
        calculatorInfo.lastInput = button.textContent;
    });
});


// A function that calls the operate function when the = button is pressed.
// toFixed rounds up the currentSum to 2 decimals.
function calculate(){
    // Write a rude message and reset the calculator if the user tries to divide by 0.
    if (calculatorInfo.inputOperator === "/" && parseInt(calculatorInfo.inputNumber2) === 0){
        reset();
        return displayNum.textContent = "Fuck you";
    } else {
        // make sure inputnumber 2 isn't an empty string.
        // if you calculate with an empty string at inputnumber2, you'll get an NaN error.
        if (calculatorInfo.inputNumber2 === ""){
            return calculatorInfo.inputNumber2 = "";
        } else {
            calculatorInfo.currentSum = operate(calculatorInfo.inputOperator, parseFloat(calculatorInfo.inputNumber1), parseFloat(calculatorInfo.inputNumber2));
            calculatorInfo.inputNumber1 = String(calculatorInfo.currentSum);
            calculatorInfo.inputNumber2 = "";
            calculatorInfo.inputOperator = "";
            calculatorInfo.decimal1 = false;
            calculatorInfo.decimal2 = false;
            // If statement that checks if current sum has decimals, if it does, round up to three, otherwise show the number as normal.
            // modulos is used to check.
            if (calculatorInfo.currentSum % 1 !== 0){
                calculatorInfo.currentSum = calculatorInfo.currentSum.toFixed(2);
            }
            return displayNum.textContent = calculatorInfo.currentSum;
        }
    };
};

// Use the info from the calculatorInfo object to do math when = is pressed, then reset the info. 
const equals = document.querySelector(".equalsButton");
equals.addEventListener("click", () => {
    if (calculatorInfo.inputOperator === "" || calculatorInfo.inputNumber2 === ""){
        // This is empty because you can't calculate if you don't have an operator or a num2.
    } else {
        calculate();
        calculatorInfo.inputNumber1 = "";
    }
});

// make a clear button.
function reset(){
    displayNum.textContent = "Display"
    calculatorInfo.inputNumber1 = "";
    calculatorInfo.inputNumber2 = "";
    calculatorInfo.inputOperator = "";
    calculatorInfo.currentSum = 0;
    calculatorInfo.decimal1 = false;
    calculatorInfo.decimal2 = false;

};

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", ()=>{
    reset();
});

// Make a backspace button.
const backspace = document.querySelector(".erase");

function backspaceFunction(){
    if (calculatorInfo.currentSum === "" || calculatorInfo.currentSum === 0){
        displayNum.textContent = "Display";
        reset();
    } else if(calculatorInfo.inputNumber1 != "" && calculatorInfo.inputOperator === ""){
        calculatorInfo.inputNumber1 = String(calculatorInfo.inputNumber1).substring(0, calculatorInfo.inputNumber1.length -1);
        if (calculatorInfo.inputNumber1 === ""){
            calculatorInfo.currentSum = 0;
        } else {
            calculatorInfo.currentSum = parseInt(calculatorInfo.inputNumber1);
        }
        displayNum.textContent = calculatorInfo.currentSum;
    } else if (calculatorInfo.inputOperator != "" && calculatorInfo.inputNumber2 === ""){
        calculatorInfo.inputOperator = "";
    } else if (calculatorInfo.inputNumber1 != "" && calculatorInfo.inputOperator != ""){
        calculatorInfo.inputNumber2 = calculatorInfo.inputNumber2.substring(0, calculatorInfo.inputNumber2.length -1);
        displayNum.textContent = calculatorInfo.inputNumber2;
        if (calculatorInfo.inputNumber2 === ""){
            calculatorInfo.currentSum = calculatorInfo.inputNumber1;
        }
    }
};

backspace.addEventListener("click", ()=>{
    if (calculatorInfo.currentSum === 0){
        displayNum.textContent = "Display";
    } else {
        backspaceFunction();
    }
});