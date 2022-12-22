import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
        <div className="single-tx-container">Loading...</div>
      ) : (
        <div className="single-tx-container">
          <h2>Transaction Details</h2>
          {console.log(tx)}
          <div>Hash: {tx.transactionHash}</div>
          <div>
            From: <Link to={"/accounts/" + tx.from}>{tx.from}</Link>
          </div>
          <div>
            To: <Link to={"/accounts/" + tx.to}>{tx.to}</Link>
          </div>
          <div>
            Block: <Link to={"/block/" + tx.blockNumber}>{tx.blockNumber}</Link>
          </div>
          <div>Status: {tx.status}</div>
          <div>Confirmations: {tx.confirmations}</div>

          <h3>Gas</h3>
          <div>Gas Used: {tx.gasUsed.toString()} Wei</div>
          <div>
            Cumulative Gas Used: {parseInt(tx.cumulativeGasUsed.toString())} Wei
          </div>
          <div>
            Effective Gas Price:{" "}
            {parseInt(tx.effectiveGasPrice.toString()) / 10 ** 9} Gwei
          </div>

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
        </div>
      )}
    </div>
  );
}

export default Transaction;
