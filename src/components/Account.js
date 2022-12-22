import { Utils } from "alchemy-sdk";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Account({ alchemy }) {
  const { url } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const balance = Utils.formatEther(
        await alchemy.core.getBalance(url, "latest")
      );
      setAccount(balance);
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
          <strong>Account Address:</strong>&nbsp;{url}
        </div>
        <div className="card">
          <strong>Balance:</strong>&nbsp;{account}&nbsp; ETH
        </div>
      </div>
    </div>
  );
}

export default Account;
