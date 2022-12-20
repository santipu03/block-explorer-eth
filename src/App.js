import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";
import LatestTransactions from "./components/LatestTransactions";
import LatestBlocks from "./components/LatestBlocks";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [latestTx, setLatestTx] = useState();

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
  }

  async function getLatestBlock() {
    const latestBlock = await alchemy.core.getBlockWithTransactions(
      blockNumber
    );
    setLatestTx(latestBlock.transactions.slice(0, 10));
  }

  useEffect(() => {
    getBlockNumber();
    getLatestBlock();
  }, []);

  return (
    <div className="App">
      <header>Ethereum Block Explorer</header>
      <div className="body">
        <div className="info-container">
          <div className="general-info-container">
            Block Number: {blockNumber}
          </div>
          <LatestBlocks />
          <LatestTransactions />
        </div>
      </div>
      <footer>Made with ❤ by santipu</footer>
    </div>
  );
}

export default App;
