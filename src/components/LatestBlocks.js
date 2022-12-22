import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LatestBlocks({ block, alchemy }) {
  const [blocks, setLatestBlocks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let blocksArray = [];
      for (let i = 0; i < 10; i++) {
        const latestBlock = await alchemy.core.getBlock(block - i);
        blocksArray.push(latestBlock);
      }
      setLatestBlocks(blocksArray);
    };

    fetchData();
  }, [alchemy.core, block]);

  return (
    <div className="latest-container">
      <div className="card-header">Latest Blocks</div>
      <div className="row-container">
        {blocks ? (
          blocks.map((block, i) => {
            return (
              <div className="row" key={i}>
                <div className="link">{block.number}</div>
                <div>
                  Miner:{" "}
                  <Link to={"accounts/" + block.miner}>
                    <span className="link">
                      {block.miner.substring(0, 11)}...
                    </span>
                  </Link>
                </div>
                <div>{block.transactions.length} txns</div>
              </div>
            );
          })
        ) : (
          <div className="row">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default LatestBlocks;
