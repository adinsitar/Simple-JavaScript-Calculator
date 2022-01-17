let display = document.querySelector(".content");
let buttons = document.querySelectorAll(".btn");
let operations = document.querySelectorAll(".btn-operation");
let clear = document.querySelector("#delete");
let equal = document.querySelector(".equal");

const displayContent = {
  displayValue: "0",
  firstNum: null,
  waitingSecondNum: false,
  operator: null,
};

const updateDisplay = () => {
  display.value = displayContent.displayValue;
};
updateDisplay();

operations.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("btn-operation")) {
      chooseOperator(target.value);
      updateDisplay();
    }
  });
});

buttons.forEach((num) => {
  num.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("btn")) {
      inputNum(target.value);
      updateDisplay();
      return;
    }
  });
});

clear.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("clear-all")) {
    clearAllInputs();
    updateDisplay();
    return;
  }
});

const inputNum = (num) => {
  const { displayValue, waitingSecondNum } = displayContent;

  if (waitingSecondNum === true) {
    displayContent.displayValue = num;
    displayContent.waitingSecondNum = false;
  } else {
    displayContent.displayValue =
      displayValue === "0" ? num : displayValue + num;
  }
};

const chooseOperator = (selectedOperator) => {
  const { firstNum, displayValue, operator } = displayContent;

  const inputValue = parseInt(displayValue);

  if (operator && displayContent.waitingSecondNum) {
    displayContent.operator = selectedOperator;
    return;
  }

  if (firstNum === null && !isNaN(inputValue)) {
    displayContent.firstNum = inputValue;
  } else if (operator) {
    const result = calculate(firstNum, inputValue, operator);
    displayContent.displayValue = String(result);
    displayContent.firstNum = result;
  }

  displayContent.waitingSecondNum = true;
  displayContent.operator = selectedOperator;
};

const calculate = (firstNum, secondNum, operator) => {
  if (operator === "+") {
    return firstNum + secondNum;
  } else if (operator === "-") {
    return firstNum - secondNum;
  } else if (operator === "*") {
    return firstNum * secondNum;
  } else if (operator === "/") {
    return firstNum / secondNum;
  }
  return secondNum;
};

function clearAllInputs() {
  displayContent.displayValue = "0";
  displayContent.firstNum = null;
  displayContent.waitingSecondNum = false;
  displayContent.operator = null;
}

equal.addEventListener("click", function () {
  chooseOperator();
  updateDisplay();
});
