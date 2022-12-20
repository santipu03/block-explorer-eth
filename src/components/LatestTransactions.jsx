function LatestTransactions(latestTx) {
  return (
    <div className="tx-container">
      <div className="card-header">Latest Transactions</div>
      <div className="row-container">
        {console.log(latestTx.latestTx)}
        {latestTx.latestTx.map((tx, i) => {
          return (
            <div className="row" key={i}>
              <div>{tx.hash.substring(0, 11)}...</div>
              <div>
                <div>From {tx.from.substring(0, 11)}...</div>
                <div>To {tx.to.substring(0, 11)}...</div>
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
