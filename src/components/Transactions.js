import React, { useState, useEffect } from "react";
import Withdraw from "./Transactions/Withdraw";
import Deposit from "./Transactions/Deposit";
import Tmoney from "./Transactions/Tmoney";
import AccountCard from "./Transactions/AccountCard";
import method from "../localStorageManager";
const Transactions = ({ setaccounts, settransacs }) => {
  const [action, setaction] = useState("deposit");
  const [newAccounts2, setnewAccounts2] = useState(method.getLocalaccounts());
  useEffect(() => {
    setaccounts(newAccounts2);
  }, [newAccounts2, setaccounts]);

  const [listacc, setlistacc] = useState(() => method.getLocalaccounts());
  const [name1, setname1] = useState("");

  const [accountno1, setaccountno1] = useState("");
  const [balance1, setbalance] = useState(0);

  const [amount, setamount] = useState(0);

  useEffect(() => {
    setlistacc(method.getLocalaccounts());
  }, [amount, balance1]);

  useEffect(() => {
    const newobj = listacc.filter((item) => item.accountNo === accountno1);
    if (newobj.length !== 0) {
      setname1(newobj[0].name);
      setbalance(newobj[0].balance);
    }
  }, [accountno1, listacc, amount, setbalance]);

  useEffect(() => {
    setaction(action);
  }, [action]);

  const [error, seterror] = useState("");
  const negativebal = "Amount cannot be negative";
  const amountOutofBounce =
    "Sorry, this is more than you can withdraw right now. Please enter lower amount.";
  useEffect(() => {
    // /
    if (/[-]+/.test(amount)) {
      seterror(negativebal);
    } else if (parseInt(balance1) < parseInt(amount)) {
      console.log(balance1);
      console.log(amount);
      seterror(amountOutofBounce);
    } else {
      seterror("");
    }
  }, [amount, seterror, accountno1, balance1, action]);
  return (
    <div style={{ display: "flex" }}>
      <div
        className="container"
        style={{
          width: "30%",
          height: "60vh",
          backgroundColor: "white",
          marginLeft: "20px",
          borderRadius: "10px",
          boxShadow: " -4px -3px 45px 21px rgba(0,0,0,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            margin: "50px",
            justifyContent: "space-evenly",
            marginBottom: "100px",
          }}
        >
          <select
            name="accountno1"
            defaultValue={() => "deposit"}
            onChange={(e) => {
              setaction(e.target.value);
              e.preventDefault();
            }}
          >
            <option key={1} value={"deposit"}>
              Deposit
            </option>
            <option key={2} value={"withdraw"}>
              Withdraw
            </option>

            <option key={3} value={"sendmoney"}>
              Send Money
            </option>
          </select>
        </div>

        <AccountCard
          name1={name1}
          setname1={setname1}
          balance1={balance1}
          setaccountno1={setaccountno1}
          amount={amount}
          newAccounts2={newAccounts2}
          listacc={listacc}
        />
      </div>
      {action === "withdraw" && (
        <Withdraw
          setamount={setamount}
          accountno1={accountno1}
          amount={amount}
          balance1={balance1}
          error={error}
          settransacs={settransacs}
        />
      )}
      {action === "deposit" && (
        <Deposit
          amount={amount}
          setamount={setamount}
          accountno1={accountno1}
          settransacs={settransacs}
        />
      )}
      {action === "sendmoney" && (
        <Tmoney
          amount={amount}
          setamount={setamount}
          accountno2={accountno1}
          setaccountno2={setaccountno1}
          setnewAccounts2={setnewAccounts2}
          setbalance={setbalance}
          balance1={balance1}
          settransacs={settransacs}
        />
      )}
    </div>
  );
};

export default Transactions;
