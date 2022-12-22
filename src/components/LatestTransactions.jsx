import { useEffect, useState } from "react";

function LatestTransactions({ block, alchemy }) {
  const [txs, setLatestTxs] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const latestBlock = await alchemy.core.getBlockWithTransactions(block);
      console.log(latestBlock);
      setLatestTxs(latestBlock.transactions.slice(0, 10));
    };

    fetchData();
  }, [alchemy.core, block]);

  return (
    <div className="tx-container">
      <div className="card-header">Latest Transactions</div>
      <div className="row-container">
        {txs?.map((tx, i) => {
          return (
            <div className="row" key={i}>
              <div>{tx.hash.substring(0, 11)}...</div>
              <div>
                <div>
                  From{" "}
                  <span className="link">{tx.from.substring(0, 11)}...</span>
                </div>
                <div>
                  To{" "}
                  {tx.to === null ? (
                    <div className="link">0x000000000</div>
                  ) : (
                    <span className="link">{tx.to.substring(0, 11)}</span>
                  )}
                  ...
                </div>
              </div>
              <div className="value">
                {tx.value.toString() !== "0"
                  ? (tx.value.toString() / 10 ** 18).toFixed(5)
                  : tx.value.toString() / 10 ** 18}{" "}
                ETH
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestTransactions;
