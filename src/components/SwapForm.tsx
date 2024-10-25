import React, { useState } from 'react';
import { useToken } from '../hooks/useToken';

const SwapForm: React.FC = () => {
    const [amountA, setAmountA] = useState('');
    const { swapTokens } = useToken();

    const handleSwap = async () => {
        await swapTokens(amountA);
        setAmountA('');
    };

    return (
        <div>
            <h2>Swap Tokens</h2>
            <input
                type="text"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
                placeholder="Amount of TokenA"
            />
            <button onClick={handleSwap}>Swap</button>
        </div>
    );
};

export default SwapForm;
