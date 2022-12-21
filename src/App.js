import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";
import LatestTransactions from "./components/LatestTransactions";
import LatestBlocks from "./components/LatestBlocks";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [latestTxs, setLatestTxs] = useState([]);
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [fetchBlockStatus, setFetchBlockStatus] = useState(false);

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
    if (blockNumber && !fetchBlockStatus) {
      let blocksArray = [];
      for (let i = 0; i < 10; i++) {
        const latestBlock = await alchemy.core.getBlock(blockNumber - i);
        blocksArray.push(latestBlock);
      }
      setLatestBlocks(blocksArray);
      setFetchBlockStatus(true);
    }
  }

  async function getLastBlock() {
    const latestBlock = await alchemy.core.getBlockWithTransactions(
      blockNumber
    );
    setLatestTxs(latestBlock.transactions.slice(0, 10));
  }

  useEffect(() => {
    getLastBlock();
  }, []);

  useEffect(() => {
    getBlockNumber();
  });

  return (
    <div className="App">
      <header>Ethereum Block Explorer</header>
      <div className="body">
        <div className="info-container">
          <div className="general-info-container">
            Block Number: {blockNumber}
          </div>
          <LatestBlocks latestBlocks={latestBlocks} />
          <LatestTransactions latestTxs={latestTxs} />
        </div>
      </div>
      <footer>Made with ❤ by santipu</footer>
    </div>
  );
}

export default App;
