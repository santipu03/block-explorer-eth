import { Utils } from "alchemy-sdk";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Account({ alchemy }) {
  const { url } = useParams();
  const [account, setAccount] = useState(null);
  const [latestTx, setLatestTx] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const balance = Utils.formatEther(
        await alchemy.core.getBalance(url, "latest")
      );
      console.log(url);
      const transfers = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        excludeZeroValue: true,
        fromAdress: "0xc15C5736Fb8DFFd4553fd5FbCaa7C95400D63a06",
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
      });
      console.log(transfers);
      setAccount(balance);
      setLatestTx(transfers.transfers.slice(transfers.transfers.length - 15));
    };
    fetchData();
  }, [alchemy.core, url]);

  return (
    <div className="App">
      <h1>
        <strong>Account Details</strong>
      </h1>
      <div className="main">
        <div className="card">
          <strong>Address:</strong>&nbsp;{url}
        </div>
        <div className="card">
          <strong>Balance:</strong>&nbsp;{account}&nbsp; ETH
        </div>
      </div>
      <h3>Latest Address Transactions: </h3>
      <div className="row-container txns-container">
        {!latestTx ? (
          <div className="row">Loading...</div>
        ) : (
          latestTx.map((tx, i) => {
            return (
              <div className="row" key={i}>
                <div>
                  <Link to={"/transactions/" + tx.hash}>
                    {tx.hash.substring(0, 11)}...
                  </Link>
                </div>
                <div>
                  Block:{" "}
                  <Link to={"/block/" + parseInt(tx.blockNum).toString()}>
                    {parseInt(tx.blockNum).toString()}
                  </Link>
                </div>
                <div>From: {tx.from.substring(0, 11)}...</div>
                <div>
                  To:{" "}
                  <Link to={"/accounts/" + tx.to}>
                    {tx.to.substring(0, 11)}...
                  </Link>
                </div>
                <div className="value">
                  {tx.value.toString() !== "0"
                    ? parseInt(tx.value.toString()).toFixed(5)
                    : tx.value.toString()}{" "}
                  ETH
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Account;
