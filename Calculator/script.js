// basic calculator functions.
function addition(num1, num2){
    return num1 + num2
};

function subtraction(num1, num2){
    return num1 - num2
};

function multiply(num1, num2){
    return num1*num2
};

function divide(num1, num2){
    return num1 / num2
};

// function that calls the former functions.
function operate(operator, num1, num2){
    switch (operator){
        case "+":
            return addition(num1, num2);
            break;
        case "-":
            return subtraction(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
    }
}
let button1 = document.body.querySelector("button");
let displayValue = document.body.querySelector(".display");


// function for displaying pressed numbers.
function displayInput(button){
    displayValue.textContent = "";
    displayValue.textContent += button.textContent;
};

// make a nodelist of every button with queryselectorall and convert it to an array.
let buttonList = document.body.querySelectorAll("button");
let buttonArray = Array.from(buttonList);

// loop through every array element and add a click event that fires the displayInput function.
// remember to define a new function, that only has the displayInput event, so it doesnøt fire on page load.

buttonArray.forEach(element => {
    element.addEventListener("click", () => {
        displayInput(element);
    });
});


