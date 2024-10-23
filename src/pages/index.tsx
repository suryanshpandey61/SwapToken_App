import ConnectWallet from '../components/ConnectWallet'
import { useState } from 'react';

const Home: React.FC = () => {
    const [address, setAddress] = useState<string>('');
  return (
    <div>
      <h1>Welcome to My TokenSwap  App</h1>
      <ConnectWallet setAddress={setAddress} />
    </div>
  );
};

export default Home;
