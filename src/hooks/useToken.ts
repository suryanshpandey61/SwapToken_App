import { useState, useEffect } from 'react';
import { getContract } from '../utils/web3';
import TokenSwapABI from '../abis/TokenSwap.json'; // Assuming you have the ABI JSON file
import { ethers } from 'ethers';

const TOKEN_SWAP_ADDRESS = '0x85Dd45261c8F9195957153Bf75F477A053575D28';

export const useToken = () => {
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const swapContract = getContract(TOKEN_SWAP_ADDRESS, TokenSwapABI);
        setContract(swapContract);
    }, []);

    const swapTokens = async (amountA: string) => {
        if (!contract) return;
        const tx = await contract.swap(ethers.parseUnits(amountA, 18));
        await tx.wait();
    };

    return {
        contract,
        swapTokens,
    };
};
