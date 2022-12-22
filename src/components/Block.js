import { Utils } from "alchemy-sdk";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Block({ blockNumber, alchemy }) {
  const { url } = useParams();
  const [block, setBlock] = useState(null);

  function toggleTx(e) {
    const collapsible = e.target.nextElementSibling;
    if (collapsible.style.display === "flex") {
      collapsible.style.display = "none";
    } else {
      collapsible.style.display = "flex";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const blockResponse = await alchemy.core.getBlockWithTransactions(
        parseInt(url)
      );
      setBlock(blockResponse);
    };
    fetchData();
  }, [alchemy.core, url]);

  return (
    <div>
      {!block ? (
        <div>Loading...</div>
      ) : (
        <div className="block-container">
          {console.log(block)}
          <h2>Block: {block.number}</h2>
          <Link to={"/block/" + (block.number - 1)}>
            <button>Previous</button>
          </Link>
          <Link to={"/block/" + (block.number + 1)}>
            <button>Next</button>
          </Link>
          <div>Fee Recipient {block.miner}</div>
          <div>Gas Used: {block.gasUsed.toString()}</div>
          <div>Gas Limit: {block.gasLimit.toString()} </div>
          <div>
            Base Fee Per Gas:{" "}
            {Utils.formatEther(block.baseFeePerGas.toString())} ETH
          </div>
          <div>Hash: {block.hash}</div>
          <div>Parent Hash: {block.parentHash}</div>
          <div className="log-hash" onClick={(e) => toggleTx(e)}>
            Transactions: {block.transactions.length}
          </div>
          <div className="collapsible">
            {block.transactions.map((tx, i) => {
              return (
                <Link to={"/transactions/" + tx.hash} key={i}>
                  <div className="tx-item">Hash: {tx.hash}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Block;
