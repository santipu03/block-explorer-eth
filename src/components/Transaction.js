import { Utils } from "alchemy-sdk";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Transaction({ alchemy }) {
  const { url } = useParams();
  const [tx, setTx] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const txReceipt = await alchemy.core.getTransactionReceipt(url);
      setTx(txReceipt);
    };
    fetchData();
  }, [alchemy.core, url]);

  function toogleLog(e) {
    const collapsible = e.target.nextElementSibling;
    if (collapsible.style.display === "flex") {
      collapsible.style.display = "none";
    } else {
      collapsible.style.display = "flex";
    }
  }

  return (
    <div>
      {!tx ? (
        <div className="tx-container">Loading...</div>
      ) : (
        <div className="tx-container">
          <h2>Tx: {tx.transactionHash}</h2>
          <div>From: {tx.from}</div>
          <div>To: {tx.to}</div>
          <div>Hash: {tx.transactionHash}</div>
          <h3>Gas</h3>
          <div>Gas Used: {Utils.formatEther(tx.gasUsed.toString())} ETH</div>
          <div>
            Cumulative Gas Used:{" "}
            {Utils.formatEther(tx.cumulativeGasUsed.toString())} ETH
          </div>
          <div>
            Effective Gas Price:{" "}
            {Utils.formatEther(tx.effectiveGasPrice.toString())} ETH
          </div>
          <h3>Block</h3>
          <div>Block Hash: {tx.blockHash}</div>
          <div>Block Number: {tx.blockNumber}</div>
          <div>Confirmations: {tx.confirmations}</div>
          <h3>Logs</h3>
          <div className="logs-container">
            {tx.logs.length > 0 ? (
              tx.logs.map((log, i) => {
                return (
                  <div key={i} className="log-item">
                    <div onClick={(e) => toogleLog(e)} className="log-hash">
                      + &nbsp;&nbsp;Log Index: {log.logIndex}
                    </div>
                    <div className="collapsible">
                      <div>Adress: {log.address}</div>
                      <div>Data: {log.data}</div>
                      <div>
                        Topics:{" "}
                        <ol>
                          {log.topics.length > 0 ? (
                            log.topics.map((topic, i) => {
                              return <li key={i}>{topic}</li>;
                            })
                          ) : (
                            <div>No topics</div>
                          )}
                        </ol>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No Logs</div>
            )}
          </div>
          <h3>Other</h3>
          <div>Status: {tx.status}</div>
          <div>Transaction Index: {tx.transactionIndex}</div>
          <div>Type: {tx.type}</div>

          {console.log(tx)}
        </div>
      )}
    </div>
  );
}

export default Transaction;
