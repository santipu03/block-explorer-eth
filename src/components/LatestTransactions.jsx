function LatestTransactions(latestTxs) {
  return (
    <div className="tx-container">
      <div className="card-header">Latest Transactions</div>
      <div className="row-container">
        {latestTxs.latestTxs.map((tx, i) => {
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
              <div>{(tx.value.toString() / 10 ** 18).toFixed(4)} ETH</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestTransactions;
