const calculator = document.querySelector('.calc');
const display = document.querySelector('.calc-screen');
const keys = document.querySelector('.calc-keys');

function calculate (n1, operator, n2) {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}

// Checking that the click event was on a button in the Calculator Keys section
keys.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        // Storing the event target ie: The button
        const key = e.target;
        // Storing the button data-action inside a variable
        const action = key.dataset.action;
        // Storing the buttons text content inside a variable
        const keyContent = key.textContent;
        // Storing the Calculator screen displays text content inside a variable
        const displayedNumber = display.textContent;
        // Storing the previous key type operator
        const previousKeyType = calculator.dataset.previousKeyType;

        // Removes the depressed key class through a forEach loop
        Array.from(key.parentNode.children)
            .forEach(function(k) {
                k.classList.remove('is-depressed');
            })

        if (!action) {
            if (displayedNumber === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNumber + keyContent;
            }
        }
        else if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed');

            // Adding a custom attribute
            calculator.dataset.previousKeyType = 'operator';

            // Grabbing the first value and pressed operator value
            calculator.dataset.firstValue = displayedNumber;
            calculator.dataset.operator = action;
        }
        else if (action === 'decimal') {
            display.textContent = displayedNumber + '.';
        }
        else if (action === 'clear') {
            display.textContent = '';
        }
        else if (action === 'clearall') {
            display.textContent = '';
        }
        else if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNumber;

            display.textContent = calculate(firstValue, operator, secondValue);
        }
    }
})