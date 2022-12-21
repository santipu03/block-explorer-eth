import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function LatestBlocks(block) {
  const [blocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let blocksArray = [];
      for (let i = 0; i < 10; i++) {
        const latestBlock = await alchemy.core.getBlock(block.block - i);
        blocksArray.push(latestBlock);
      }
      setLatestBlocks(blocksArray);
    };

    fetchData();
  }, []);

  return (
    <div className="block-container">
      <div className="card-header">Latest Blocks</div>
      <div className="row-container">
        {blocks?.map((block, i) => {
          return (
            <div className="row" key={i}>
              <div className="link">{block.number}</div>
              <div>
                Miner:{" "}
                <span className="link">{block.miner.substring(0, 11)}...</span>
              </div>
              <div>{block.transactions.length} txns</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestBlocks;
