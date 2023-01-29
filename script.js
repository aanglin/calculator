const screen = document.querySelector(".screen");
const container = document.querySelector(".buttons");
let btn = document.getElementById("btn");
let billAmountInput = document.getElementById("bill-amount");
let tipPercentageInput = document.getElementById("tip-percentage");
let tipAmountInput = document.getElementById("tip-amount");
let totalBillInput = document.getElementById("total-bill");
let clearBtn = document.getElementById("clear-btn");
document.getElementById("toggle-button").addEventListener("click", toggleDivs);
document.getElementById("toggle-button1").addEventListener("click", toggleDivs);

var toggleButton = document.getElementById("toggle-button");
if (window.innerWidth < 600) {
  toggleButton.style.display = "block";
} else {
  toggleButton.style.display = "none";
}
window.onresize = function () {
  if (window.innerWidth < 600) {
    toggleButton.style.display = "block";
  } else {
    toggleButton.style.display = "none";
  }
};
function toggleDivs() {
  var calculatorDiv = document.getElementsByClassName("calculator")[0];
  var tipCalcDiv = document.getElementById("tip-calc");
  if (calculatorDiv.style.display === "block") {
    calculatorDiv.style.display = "none";
    tipCalcDiv.style.display = "block";
  } else {
    calculatorDiv.style.display = "block";
    tipCalcDiv.style.display = "none";
  }
}

let calculation = [];
let stringCalculation = "";

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const value = e.target.textContent;
    if (value === "Bill/Tip") {
      screen.textContent = "0";
    } else if (value === "Clear") {
      calculation = [];
      stringCalculation = "";
      screen.textContent = "0";
    } else if (value === "=") {
      stringCalculation = calculation.reduce((acc, cur) => acc + cur);
      let result = new Function("return " + stringCalculation)();
      // Checking to see if the the results has digits after the decimal point. If it does then the first code will run.
      if (result.toString().indexOf(".") != -1) {
        screen.textContent = result.toFixed(5);
        // if it doesn't have digits then it will run this code.
      } else {
        screen.textContent = result;
      }
    } else if (value === "%") {
      let currentNum = "";
      for (let i = calculation.length - 1; i >= 0; i--) {
        if (isNaN(calculation[i]) && calculation[i] !== ".") {
          break;
        }
        currentNum = calculation[i] + currentNum;
      }
      currentNum = parseFloat(currentNum);
      currentNum /= 100;
      calculation.splice(calculation.indexOf(currentNum) + 1);
      calculation.push(currentNum);
      stringCalculation = calculation.reduce((acc, cur) => acc + cur);
      screen.textContent = stringCalculation;
    } else {
      calculation.push(value);
      stringCalculation = calculation.reduce((acc, cur) => acc + cur);
      screen.textContent = stringCalculation;
    }
  }
});

clearBtn.addEventListener("click", function () {
  billAmountInput.value = "";
  tipPercentageInput.value = "";
  tipAmountInput.value = "";
  totalBillInput.value = "";
});

btn.addEventListener("click", function () {
  let billAmount = parseFloat(billAmountInput.value);
  let tipPercentage = parseFloat(tipPercentageInput.value);
  let tipAmount = billAmount * (tipPercentage / 100);
  let totalBill = billAmount + tipAmount;
  tipAmountInput.value = tipAmount.toFixed(2);
  totalBillInput.value = totalBill.toFixed(2);
});

