import React, { useState, useEffect } from "react";
import method from "../../localStorageManager";
import Input from "../Input";
const Tmoney = ({
  setamount,
  accountno2,
  amount,
  setnewAccounts2,
  balance1,
  settransacs,
}) => {
  const [newAccounts3, setnewAccounts3] = useState([]);

  useEffect(() => {
    setnewAccounts2(newAccounts3);
  }, [newAccounts3, setnewAccounts2]);
  const [accountno1, setaccountno1] = useState("");
  const [name1, setname1] = useState("");
  const listacc = method.getLocalaccounts();

  useEffect(() => {
    const newobj = listacc.filter((item) => item.accountNo === accountno1);
    if (newobj.length !== 0) {
      setname1(newobj[0].name);
    }
  }, [accountno1, listacc]);
  const [hasError, sethasError] = useState(false);
  const [error, seterror] = useState("");

  const negativebal = "Amount cannot be negative";
  const amountOutofBounce = "Sorry, this is more than you can transfer.";
  const balancezero = "Balance is zero or negative..";
  const recieverNull = "reciever is empty";
  const senderNull = "sender is empty";
  useEffect(() => {
    // /
    if (/[-]+/.test(amount)) {
      sethasError(true);
      seterror(negativebal);
    } else if (parseInt(balance1) === 0) {
      if (name1 === "") {
        seterror(recieverNull);
      } else if (accountno2 === "") {
        seterror(senderNull);
      } else if (accountno2 === "" && name1 === "") {
        seterror("empty input");
      } else {
        seterror(balancezero);
      }
    } else if (parseInt(balance1) < parseInt(amount)) {
      seterror(amountOutofBounce);
    } else {
      seterror("");
    }
  }, [amount, hasError, balance1, accountno2,name1]);

  return (
    <div
      className="container"
      style={{
        width: "70%",
        height: "60vh",
        backgroundColor: "white",
        marginLeft: "20px",
        marginRight: "20px",
        borderRadius: "10px",
        boxShadow: " -4px -3px 45px 21px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Send money</h1>
      <label htmlFor="accountno1">reciever:</label>
      {
        <select
          name="accountno1"
          defaultValue={() => method.getLocalaccounts()[0]}
          onChange={(e) => {
            setaccountno1(e.target.value);
            e.preventDefault();
          }}
        >
          {method
            .getLocalaccounts()
            .filter((item) => item.accountNo !== accountno2)
            .map((item) => (
              <option key={item.accountNo} value={item.accountNo}>
                {item.accountNo}
              </option>
            ))}
        </select>
      }
      <Input
        text="name"
        name="name"
        type="text"
        value={name1}
        setState={setname1}
        isdiable={true}
        errorMessage=""
      />
      <Input
        text="amount"
        name="amount"
        type="number"
        value={amount === 0 ? "" : amount}
        setState={setamount}
        isdiable={false}
        errorMessage=""
      />
      {error}
      <button
        onClick={(e) => {
          e.preventDefault();
          const list = method.getLocalaccounts();
          const sender = list.filter(
            (item) => item.accountNo === accountno2
          )[0];
          const reciever = list.filter(
            (item) => item.accountNo === accountno1
          )[0];
          console.log(hasError);
          if (
            sender === undefined ||
            reciever === undefined ||
            /[-]+/.test(amount)
          ) {
            seterror("invalid input");
          } else if (parseInt(sender.balance) < 0) {
            sethasError(true);
          } else if (parseInt(sender.balance) < parseInt(amount)) {
            seterror(amountOutofBounce);
          } else if (parseInt(sender.balance) === 0) {
            seterror(balancezero);
          } else {
            sethasError(false);
            const senderbal = parseInt(sender.balance) - parseInt(amount);
            const recieverbal = parseInt(reciever.balance) + parseInt(amount);

            const sendbal = {
              id: sender.id,
              name: sender.name,
              username: sender.username,
              password: sender.password,
              email: sender.email,
              accountNo: sender.accountNo,
              balance: senderbal,
            };
            const recievebal = {
              id: reciever.id,
              name: reciever.name,
              username: reciever.username,
              password: reciever.password,
              email: reciever.email,
              accountNo: reciever.accountNo,
              balance: recieverbal,
            };

            const ylist = list.map((item) => {
              if (item.id === sender.id) {
                return sendbal;
              } else {
                return item;
              }
            });
            method.setLocalaccounts(ylist);
            console.log(method.getLocalaccounts());
            const xlist = method.getLocalaccounts().map((item) => {
              if (item.id === reciever.id) {
                return recievebal;
              } else {
                return item;
              }
            });
            method.setLocalaccounts(xlist);
            console.log(method.getLocalaccounts());
            setnewAccounts3(method.getLocalaccounts());
            const date1 = new Date().toDateString();
            const newtrasac = {
              employeeId: method.getLocalcurr().id,
              accountNo: sender.accountNo,
              name: sender.name,
              transferto: reciever.accountNo,
              refNo: Math.floor(Math.random() * 10000) + 5112 + "MWX",
              date: date1,
              type: "sendmoney",
              amount: amount,
            };
            const newtrasac2 = {
              employeeId: method.getLocalcurr().id,
              accountNo: reciever.accountNo,
              name: reciever.name,
              recievefrom: sender.accountNo,
              refNo: Math.floor(Math.random() * 10000) + 5112 + "MWX",
              date: date1,
              type: "recievemoney",
              amount: amount,
            };
            method.updateLocaltransacs(newtrasac);
            method.updateLocaltransacs(newtrasac2);
            settransacs(method.getLocaltransacs());
            setamount(0);
          }
        }}
      >
        submit
      </button>
    </div>
  );
};

export default Tmoney;
