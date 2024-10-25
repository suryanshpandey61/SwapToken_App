import React, { useEffect, useState } from 'react';
import ApproveForm from '../components/ApproveForm';
import SwapForm from '../components/SwapForm';
import AllowanceDisplay from '../components/AllowanceDisplay';
import { getProvider } from '../utils/web3';

const Home: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAddress = async () => {
        const provider = getProvider();

        try {
            setIsLoading(true); // Start loading state
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setUserAddress(address);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching user address:", error);
            if (error.message.includes("Already processing eth_requestAccounts")) {
                setError("You're already in the process of connecting your wallet. Please wait.");
            } else {
                setError("Failed to fetch user address. Please allow access to your accounts.");
            }
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div>
            <h1>Token Swap</h1>
            <button onClick={fetchAddress} disabled={isLoading || !!userAddress}>
                {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userAddress && (
                <>
                    <AllowanceDisplay 
                        userAddress={userAddress} 
                        swapContractAddress="0x85Dd45261c8F9195957153Bf75F477A053575D28" 
                        tokenAAddress="0x6fccD170e12f9006bF59492ab99c9595436e8A9C" // Add the correct token address
                    />
                    <ApproveForm />
                    <SwapForm />
                </>
            )}
        </div>
    );
};

export default Home;
