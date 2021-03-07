class Calculator {
    constructor(pre, current) {
        this.previousBtn = pre;
        this.currentBtn = current;
        this.clear()
    }

    clear() {
        this.previous = ''
        this.current = ''
        this.operation = undefined
    }

    delete() {
        this.current = this.current.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.current === '') return

        if (this.previous !== '') {
            this.compute()
        }
        this.operation = operation;
        // this.current = this.current + operation;
        this.previous = this.current;
        this.current = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previous)
        const cur = parseFloat(this.current)

        if (isNaN(prev) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                break
            case '*':
                computation = prev * cur
                break
            case ':':
                computation = prev / cur
                break
            default:
                return
        }

        this.current = computation;
        this.operation = undefined;
        this.previous = ''
    }

    getDisplayNumber(number) {

        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''

        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        this.currentBtn.innerText = this.getDisplayNumber(this.current);

        if (this.operation != null) {
            this.previousBtn.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
        } else {
            this.previousBtn.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');

const operationButtons = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousButton = document.querySelector('[data-previous-operand]')
const currentButton = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousButton, currentButton)

console.log(currentButton.innerText)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
