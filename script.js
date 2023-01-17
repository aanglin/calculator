const screen = document.querySelector('.screen');
const container = document.querySelector('.buttons');

let calculation = [];
let stringCalculation = "";

container.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        const value = e.target.textContent;
        if (value === "CLEAR") {
            calculation = [];
            stringCalculation = "";
            screen.textContent = '0';
        } else if (value === "=") {
            stringCalculation = calculation.reduce((acc, cur) => acc + cur);
            let result = new Function('return ' + stringCalculation)();
            // Checking to see if the the answer has digits after the decimal point. If it does then the first code will run.
            if (result.toString().indexOf(".") != -1) {
                screen.textContent = (result).toFixed(5);
                // if it doesn't have digits then it will run this code.
            } else {
                screen.textContent = result;
            }
        } else {
            calculation.push(value);
            stringCalculation = calculation.reduce((acc, cur) => acc + cur);
            screen.textContent = stringCalculation;
        }
    }
});

// The time complexity of the above code is O(1) , this is because regardless of the number of buttons or actions performed on them, the code only performs a constant number of operations each time a button is clicked.

// When a button is clicked, the event listener is triggered, the event listener checks the tagName of the clicked element, if it is a button, the event listener proceeds with the calculations, update the screen and concatenates the value of the button. All these operations are constant time operations and do not depend on the number of buttons or the number of times the button is clicked.

// In addition, the method used to attach the event listener is efficient, it attaches a single event listener to the container element, which improves performance. This makes the code more efficient as it doesn't need to attach an event listener to every button.