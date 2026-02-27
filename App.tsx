import { useMemo, useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Input } from './input';

type Operator = '+' | '-' | '×' | '÷' | null;

function App() {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForNextNumber, setWaitingForNextNumber] = useState(false);

  const clear = () => {
    setDisplay('0');
    setStoredValue(null);
    setOperator(null);
    setWaitingForNextNumber(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForNextNumber) {
      setDisplay(digit);
      setWaitingForNextNumber(false);
      return;
    }

    setDisplay(prev => (prev === '0' ? digit : `${prev}${digit}`));
  };

  const inputDecimal = () => {
    if (waitingForNextNumber) {
      setDisplay('0.');
      setWaitingForNextNumber(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(prev => `${prev}.`);
    }
  };

  const toggleSign = () => {
    if (display === '0') return;
    setDisplay(prev => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
  };

  const percent = () => {
    const current = Number(display);
    setDisplay(String(current / 100));
  };

  const calculate = (left: number, right: number, op: Exclude<Operator, null>) => {
    switch (op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '×':
        return left * right;
      case '÷':
        return right === 0 ? NaN : left / right;
      default:
        return right;
    }
  };

  const handleOperator = (nextOperator: Exclude<Operator, null>) => {
    const inputValue = Number(display);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator && !waitingForNextNumber) {
      const result = calculate(storedValue, inputValue, operator);
      setDisplay(Number.isNaN(result) ? 'Error' : String(result));
      setStoredValue(result);
    }

    setOperator(nextOperator);
    setWaitingForNextNumber(true);
  };

  const equals = () => {
    if (operator === null || storedValue === null) return;

    const inputValue = Number(display);
    const result = calculate(storedValue, inputValue, operator);

    setDisplay(Number.isNaN(result) ? 'Error' : String(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForNextNumber(true);
  };

  const activeOperator = useMemo(() => operator, [operator]);

  const calculatorButtons: Array<Array<{ label: string; onClick: () => void; className?: string; variant?: 'default' | 'secondary' | 'outline' }>> = [
    [
      { label: 'AC', onClick: clear, variant: 'secondary' },
      { label: '±', onClick: toggleSign, variant: 'secondary' },
      { label: '%', onClick: percent, variant: 'secondary' },
      { label: '÷', onClick: () => handleOperator('÷'), variant: activeOperator === '÷' ? 'default' : 'outline' },
    ],
    [
      { label: '7', onClick: () => inputDigit('7') },
      { label: '8', onClick: () => inputDigit('8') },
      { label: '9', onClick: () => inputDigit('9') },
      { label: '×', onClick: () => handleOperator('×'), variant: activeOperator === '×' ? 'default' : 'outline' },
    ],
    [
      { label: '4', onClick: () => inputDigit('4') },
      { label: '5', onClick: () => inputDigit('5') },
      { label: '6', onClick: () => inputDigit('6') },
      { label: '-', onClick: () => handleOperator('-'), variant: activeOperator === '-' ? 'default' : 'outline' },
    ],
    [
      { label: '1', onClick: () => inputDigit('1') },
      { label: '2', onClick: () => inputDigit('2') },
      { label: '3', onClick: () => inputDigit('3') },
      { label: '+', onClick: () => handleOperator('+'), variant: activeOperator === '+' ? 'default' : 'outline' },
    ],
    [
      { label: '0', onClick: () => inputDigit('0'), className: 'col-span-2' },
      { label: '.', onClick: inputDecimal },
      { label: '=', onClick: equals, variant: 'secondary' },
    ],
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Calculator</CardTitle>
            <CardDescription>Built with the existing UI components.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={display} readOnly className="h-14 text-right text-2xl font-semibold" aria-label="Calculator display" />
            <div className="grid grid-cols-4 gap-2">
              {calculatorButtons.flat().map(button => (
                <Button
                  key={button.label}
                  onClick={button.onClick}
                  variant={button.variant ?? 'default'}
                  className={`h-12 text-lg ${button.className ?? ''}`.trim()}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default App;
