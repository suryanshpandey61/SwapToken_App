import { ethers } from 'ethers';

export const getProvider = () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
        return new ethers.BrowserProvider((window as any).ethereum);
    }
    throw new Error("No Ethereum provider found");
};

export const getContract = (contractAddress: string, abi: any) => {
    const provider = getProvider();
    //const signer =  provider.getSigner();
    return new ethers.Contract(contractAddress, abi);
};
