import { Alchemy, Network } from "alchemy-sdk";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main";
import Account from "./components/Account";
import Transaction from "./components/Transaction";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();

  return (
    <div className="App">
      <header>
        <Link to={"/"}>Ethereum Block Explorer</Link>
      </header>
      <div className="body">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                blockNumber={blockNumber}
                alchemy={alchemy}
                setBlockNumber={setBlockNumber}
              />
            }
          />
          {/* <Route
            path="/block/:url"
            element={
              <OneBlock
                blockNumber={blockNumber}
                alchemy={alchemy}
                block={block}
                setBlock={setBlock}
              />
            }
          />*/}
          <Route
            path="/transactions/:url"
            element={<Transaction alchemy={alchemy} />}
          />
          <Route
            path="/accounts/:url"
            element={<Account alchemy={alchemy} />}
          />
        </Routes>
      </div>
      <footer>Made with ❤ by santipu</footer>
    </div>
  );
}

export default App;
