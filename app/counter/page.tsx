'use client';
import { useState } from 'react';
import ButtonComponent from '../components/client/ButtonComponent';

export default function CounterPage() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-600">Counter App</h1>
                
                <div className="text-6xl font-bold text-center text-green-600 mb-8">
                    {count}
                </div>
                {/* className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" */}

                <div className="flex gap-4 justify-center">
                    <ButtonComponent label="Decrement" onClick={decrement} variant="danger" />
                        
                    <ButtonComponent label="Reset" onClick={reset} variant="secondary" />
                        
                    <ButtonComponent label="Increment" onClick={increment} />
                </div>
            </div>
        </div>
    );
}