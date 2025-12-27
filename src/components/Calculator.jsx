import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, operator, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstNum, op, secondNum) => {
    if (op === '+') return firstNum + secondNum;
    if (op === '-') return firstNum - secondNum;
    if (op === '*') return firstNum * secondNum;
    if (op === '/') {
      if (secondNum === 0) {
        alert("Error: Division by zero is not allowed.");
        clearAll();
        return 0; // Or some error state
      }
      return firstNum / secondNum;
    }
    return secondNum;
  };

  const performCalculation = () => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null || operator === null) {
      return;
    }
    if (waitingForSecondOperand) {
      // If equals is pressed right after an operator, use the first operand as the second operand
      const result = calculate(firstOperand, operator, firstOperand);
      setDisplayValue(String(result));
      setFirstOperand(result);
      setWaitingForSecondOperand(false);
      return;
    }

    const result = calculate(firstOperand, operator, inputValue);
    setDisplayValue(String(result));
    setFirstOperand(result); // The result becomes the new firstOperand for chained operations
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue(prev => (parseFloat(prev) * -1).toString());
  };

  const applyPercentage = () => {
    setDisplayValue(prev => (parseFloat(prev) / 100).toString());
  };

  const commonBtnClass = "bg-gray-700 text-white";
  const operatorBtnClass = "bg-orange-500 text-white hover:bg-orange-600";
  const functionBtnClass = "bg-gray-600 text-white";
  const equalsBtnClass = "bg-orange-500 text-white hover:bg-orange-600 col-span-2"; // Span 2 columns

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl p-4 w-96">
      <Display value={displayValue} />
      <div className="grid grid-cols-4 gap-2">
        <Button label="AC" onClick={clearAll} className={functionBtnClass} />
        <Button label="+/-" onClick={toggleSign} className={functionBtnClass} />
        <Button label="%" onClick={applyPercentage} className={functionBtnClass} />
        <Button label="÷" onClick={() => handleOperator('/')} className={operatorBtnClass} />

        <Button label="7" onClick={() => inputDigit(7)} className={commonBtnClass} />
        <Button label="8" onClick={() => inputDigit(8)} className={commonBtnClass} />
        <Button label="9" onClick={() => inputDigit(9)} className={commonBtnClass} />
        <Button label="×" onClick={() => handleOperator('*')} className={operatorBtnClass} />

        <Button label="4" onClick={() => inputDigit(4)} className={commonBtnClass} />
        <Button label="5" onClick={() => inputDigit(5)} className={commonBtnClass} />
        <Button label="6" onClick={() => inputDigit(6)} className={commonBtnClass} />
        <Button label="-" onClick={() => handleOperator('-')} className={operatorBtnClass} />

        <Button label="1" onClick={() => inputDigit(1)} className={commonBtnClass} />
        <Button label="2" onClick={() => inputDigit(2)} className={commonBtnClass} />
        <Button label="3" onClick={() => inputDigit(3)} className={commonBtnClass} />
        <Button label="+" onClick={() => handleOperator('+')} className={operatorBtnClass} />

        <Button label="0" onClick={() => inputDigit(0)} className={`${commonBtnClass} col-span-2`} />
        <Button label="." onClick={inputDecimal} className={commonBtnClass} />
        <Button label="=" onClick={performCalculation} className={equalsBtnClass} />
      </div>
    </div>
  );
}

export default Calculator;
