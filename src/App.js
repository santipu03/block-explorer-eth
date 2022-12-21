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

  useEffect(() => {
    const fetchData = async () => {
      const block = await alchemy.core.getBlockNumber();
      setBlockNumber(block);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header>Ethereum Block Explorer</header>
      <div className="body">
        <div className="info-container">
          {blockNumber && (
            <>
              <LatestBlocks block={blockNumber} />{" "}
              <LatestTransactions block={blockNumber} />
            </>
          )}
        </div>
      </div>
      <footer>Made with ❤ by santipu</footer>
    </div>
  );
}

export default App;
