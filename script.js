const resultInput = document.getElementById('result');

function appendNumber(number) {
    // Prevent multiple decimals in the same number segment
    const lastNumber = resultInput.value.split(/[\+\-\*\/%]/).pop();
    if (number === '.' && lastNumber.includes('.')) return;

    resultInput.value += number;
}

function appendOperator(operator) {
    if (resultInput.value === '') return; // Block starting with an operator
    
    const lastChar = resultInput.value.slice(-1);
    if (isOperator(lastChar)) return; // Prevent two operators in a row

    resultInput.value += operator;
}

function clearResult() {
    resultInput.value = '';
}

function deleteLast() {
    resultInput.value = resultInput.value.slice(0, -1);
}

function calculateResult() {
    try {
        const expression = resultInput.value;

        // Reject unsafe characters  
        if (!/^[0-9+\-*/%.]+$/.test(expression)) {
            resultInput.value = "Error";
            return;
        }

        // Safe evaluation using Function constructor
        const answer = Function("return " + expression)();
        resultInput.value = answer;
    } catch (error) {
        resultInput.value = 'Error';
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}
