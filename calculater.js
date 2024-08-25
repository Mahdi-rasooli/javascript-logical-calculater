class Calculater {

    currentNumber;
    prevoiusNumber;
    prevoiusButtonText;
    currentButtonText;
    operation;


    constructor(currentButtonText, prevoiusButtonText) {
        this.currentButtonText = currentButtonText;
        this.prevoiusButtonText = prevoiusButtonText;
        this.clear()
    }


    clear() {
        this.currentNumber = ''
        this.prevoiusNumber = ''
        this.operation = undefined;
    }

    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }

    addNumber(number) {
        if (number === '.' && this.currentNumber.includes('.')) return
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

    addOperation(operation) {
        if (this.currentNumber === '') return
        if (this.prevoiusNumber !== '') {
            this.compute()
        }
        this.operation = operation;
        this.prevoiusNumber = this.currentNumber;
        this.currentNumber = '';
    }

    compute() {
        let result;

        const prev = parseFloat(this.prevoiusNumber);
        const current = parseFloat(this.currentNumber);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {

            case '+':
                result = prev + current;
                break
            case '-':
                result = prev - current;
                break
            case '*':
                result = prev * current;
                break
            case '/':
                result = prev / current;
                break
            case '%':
                result = (prev * current) / 100;
                break

            default : return    
        }

        this.currentNumber = result;
        this.operation = undefined;
        this.prevoiusNumber = ''
    }

    displayValues() {
        this.currentButtonText.innerText = this.currentNumber;
        this.prevoiusButtonText.innerText = `${this.prevoiusNumber} ${this.operation || ''}`;
    }
};




const numberBtn = document.querySelectorAll('[data-number-btn]');
const operationBtn = document.querySelectorAll('[data-operator-btn]');
const prevoiusButtonText = document.querySelector('[data-prevoius-number]');
const currentButtonText = document.querySelector('[data-current-number]');
const clearAllBtn = document.querySelector('[data-clearAll-btn]');
const deleteBtn = document.querySelector('[data-delete-btn]');
const result = document.querySelector('[data-result]');

const calculater = new Calculater(currentButtonText, prevoiusButtonText);


numberBtn.forEach((button) => {
    button.addEventListener('click', () => {
        calculater.addNumber(button.innerText);
        calculater.displayValues();
    })
});


operationBtn.forEach((button) => {
    button.addEventListener('click', () => {
        calculater.addOperation(button.innerText);
        calculater.displayValues();
    })
});

deleteBtn.addEventListener('click', () => {
    calculater.delete();
    calculater.displayValues();
});

clearAllBtn.addEventListener('click', () => {
    calculater.clear();
    calculater.displayValues();
});

result.addEventListener('click', () => {
    calculater.compute();
    calculater.displayValues();
});
