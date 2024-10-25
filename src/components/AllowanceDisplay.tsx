import React, { useEffect, useState } from 'react';
import { getContract } from '../utils/web3';
import tokenA_ABI from '../abis/TokenA.json'

interface AllowanceDisplayProps {
    userAddress: string;
    swapContractAddress: string;
    tokenAAddress: string; // Add the address for TokenA
    
}

const AllowanceDisplay: React.FC<AllowanceDisplayProps> = ({ userAddress, swapContractAddress, tokenAAddress }) => {
    const [allowance, setAllowance] = useState<string>('0');

    const fetchAllowance = async () => {
        try {
            const contract = getContract(tokenAAddress, tokenA_ABI); // Ensure correct ABI
            const allowanceAmount = await contract.allowance(userAddress, swapContractAddress);
            setAllowance(allowanceAmount.toString());
        } catch (error) {
            console.error("Error fetching allowance:", error);
        }
    };

    useEffect(() => {
        if (userAddress) {
            fetchAllowance();
        }
    }, [userAddress]);

    return (
        <div>
            <h3>Allowance: {allowance}</h3>
        </div>
    );
};

export default AllowanceDisplay;
