function LatestBlocks(latestBlocks) {
  return (
    <div className="block-container">
      <div className="card-header">Latest Blocks</div>
      <div className="row-container">
        {latestBlocks.latestBlocks.map((block, i) => {
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
