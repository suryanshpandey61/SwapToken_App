import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../utils/web3';
import TokenAABI from '../abis/TokenA.json'; // ABI for TokenA
import { useToken } from '../hooks/useToken';

const TokenA_ADDRESS = '0x6fccD170e12f9006bF59492ab99c9595436e8A9C';

const ApproveForm: React.FC = () => {
    const [amount, setAmount] = useState('');
    const { contract } = useToken();

    const approve = async () => {
        if (!amount || !contract) return;

        const tokenAContract = getContract(TokenA_ADDRESS, TokenAABI);
        const tx = await tokenAContract.approve(contract.address, ethers.parseUnits(amount, 18));
        await tx.wait();
    };

    return (
        <div>
            <h2>Approve TokenA</h2>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount of TokenA"
            />
            <button onClick={approve}>Approve</button>
        </div>
    );
};

export default ApproveForm;
