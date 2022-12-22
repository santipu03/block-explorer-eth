import LatestTransactions from "./LatestTransactions";
import { useEffect } from "react";

import LatestBlocks from "./LatestBlocks";

function Main({ blockNumber, alchemy, setBlockNumber }) {
  useEffect(() => {
    const fetchData = async () => {
      const block = await alchemy.core.getBlockNumber();
      setBlockNumber(block);
    };

    fetchData();
  }, []);

  return (
    <div className="info-container">
      {blockNumber && (
        <>
          <LatestBlocks block={blockNumber} alchemy={alchemy} />{" "}
          <LatestTransactions block={blockNumber} alchemy={alchemy} />
        </>
      )}
    </div>
  );
}

export default Main;
