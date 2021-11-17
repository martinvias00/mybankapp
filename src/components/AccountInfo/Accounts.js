import { FcCancel } from "react-icons/fc";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiFillEdit,
  AiOutlineSave,
  AiOutlineSend,
} from "react-icons/ai";
import React, { useState, useEffect } from "react";
import method from "../../localStorageManager";
import EntryForm from "./EntryForm";
const Accounts = ({ OnlistView, setOnlistView, setaccounts2, accounts2 }) => {
  const buttonStyle = {
    width: "50px",
    height: "30px",
    display: "block",
    borderRadius: "5px",
    border: "1px solid #bfbfbf",
    backgroundColor: "#f5f5f5",
  };
  const balerror = "";
  const emailError = "";
  const userError = "";
  const passError = "";

  const [onDelete, setonDelete] = useState(false);
  const [isDisable, setisDisable] = useState(true);
  const [disableInput, setdisableInput] = useState(true);

  const [accounts, setaccounts] = useState(method.getLocalaccounts());
  const [currentAcc, setcurrentAcc] = useState(accounts[0]);
  const [count, setcount] = useState(0);
  const [action, setaction] = useState("");

  const [id1, setid] = useState(0);
  const [name1, setname] = useState("");
  const [username1, setusername] = useState("");
  const [password1, setpassword] = useState("");
  const [email1, setemail] = useState("");
  const [accountNo1, setaccountNo] = useState("");
  const [balance1, setbalance] = useState(0);
  const [newItem, setnewItem] = useState({
    id: 0,
    name: "",
    username: "",
    password: "",
    email: "",
    accountNo: "",
    balance: 0,
  });
  useEffect(() => {
    const { id, name, username, password, email, accountNo, balance } =
      currentAcc;
    setid(id);
    setname(name);
    setusername(username);
    setpassword(password);
    setemail(email);
    setaccountNo(accountNo);
    setbalance(balance);
  }, [currentAcc]);
  useEffect(() => {
    setcurrentAcc(accounts[count]);
  }, [count, accounts]);

  useEffect(() => {
    setcurrentAcc(accounts[0]);
    setcount(0);
    return () => {
      setonDelete(!onDelete);
    };
  }, [onDelete, accounts]);

  useEffect(() => {
    setnewItem({
      id: id1,
      name: name1,
      username: username1,
      password: password1,
      email: email1,
      accountNo: accountNo1,
      balance: balance1,
    });
  }, [
    setnewItem,
    id1,
    name1,
    username1,
    password1,
    email1,
    accountNo1,
    balance1,
  ]);
  const updateData = () => {
    const newobj = {
      id: id1,
      name: name1,
      username: username1,
      password: password1,
      email: email1,
      accountNo: accountNo1,
      balance: balance1,
    };
    const newlist = method.getLocalaccounts().map((item) => {
      if (item.id === id1) {
        return newobj;
      } else {
        return item;
      }
    });
    method.setLocalaccounts(newlist);
  };

  const clearStates = () => {
    setid(0);
    setname("");
    setusername("");
    setpassword("");
    setemail("");
    setaccountNo("");
    setbalance(0);
  };
  const handleSave = (e) => {
    // ifError()
    if (action === "add") {
      if (accounts.find((item) => item.email === newItem.email)) {
        alert("email already exist try different email!");
      } else if (accounts.find((item) => item.username === newItem.username)) {
        alert("username already exist try different username!");
      } else {
        addData(newItem);
      }
    } else if (action === "edit") {
      updateData();
    }
    setaction("");
    setisDisable(!isDisable);
    setdisableInput(!disableInput);
  };
  const handleAdd = (e) => {
    const acc = method.getLocalaccounts();
    setisDisable(!isDisable);
    setdisableInput(!disableInput);

    const lastid = acc[acc.length - 1].id;
    const lastaccountNo = acc[acc.length - 1].accountNo;
    setaccountNo((+lastaccountNo + 1).toString());
    setid(lastid + 1);

    setaction("add");
    setname("");
    setusername("");
    setpassword("");
    setemail("");
    setbalance(0);
  };
  const addData = (newAccount) => {
    method.addLocalaccounts(newAccount);
    setaccounts(method.getLocalaccounts());
    setaccounts2(method.getLocalaccounts());
    clearStates();
  };

  // const [IsRender, setIsRender] = useState(false);
  // const renderMessage = () => {
  //   if (action === "add" || action === "edit") {
  //     return (
  //       <Dialog
  //         title={"Confirm Details"}
  //         description={
  //           <div>
  //             <span>acccountno:{accountNo1}</span>
  //             <br />
  //             <span>name:{name1}</span>
  //             <br />
  //             <span>username: {username1}</span>
  //             <br />
  //             <span>password: {password1}</span>
  //             <br />
  //             <span>email: {email1}</span>
  //             <br />
  //           </div>
  //         }
  //         confirm={"confirm"}
  //         iswarning={false}
  //       />
  //     );
  //   }
  //   if (action === "delete") {
  //     return (
  //       <Dialog
  //         title={"Delete account"}
  //         description={"Are you sure?"}
  //         confirm={"confirm"}
  //         cancel={"cancel"}
  //         iswarning={true}
  //       />
  //     );
  //   }
  //   return null;
  // };
  // setuserError setemailError setbalerror
  // name1  username1 password1 email1 balance1
  // const ifError = () => {
  //   let errorcount = 0;
  //   if (username1 === "") {
  //     setuserError("! Enter first and last names");
  //     errorcount++;
  //   } else {
  //     setuserError("");
  //   }

  //   if (email1 === "") {
  //     setemailError("! Enter email address");
  //     errorcount++;
  //   } else if (accounts.find((user) => user.email === email1)) {
  //     setemailError("! That email is taken. Try another.");
  //     errorcount++;
  //   } else {
  //     setemailError("");
  //   }
  //   if (/[!#$%^&-*()_+]+/.test(balance1)) {
  //     setbalerror(
  //       "! Sorry, only letters(a-z), numbers(0-9),and perids(.)are allowed."
  //     );
  //     errorcount++;
  //   } else {
  //     setbalerror("");
  //   }
  //   if (password1 === "") {
  //     setpassError("! Enter password");
  //     errorcount++;
  //   } else {
  //     setpassError("");
  //   }
  //   if (errorcount > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginLeft: 20,
        }}
      >
        {/* IsRender && renderMessage() */}
        <button
          onClick={(e) => {
            setOnlistView("form");
            e.preventDefault();
          }}
          style={{
            width: "100px",
            height: "50px",
            alignSelf: "left",
            border: "1px gray solid",
          }}
        >
          Form
        </button>
        <button
          onClick={(e) => {
            setOnlistView("list");
            e.preventDefault();
          }}
          style={{
            width: "100px",
            height: "50px",
            alignSelf: "left",
            border: "1px gray solid",
          }}
        >
          List
        </button>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "67vw",
            height: "fit-content",
            backgroundColor: "white",
            marginLeft: "20px",
            borderRadius: "10px",
            boxShadow: " -4px -3px 45px 21px rgba(0,0,0,0.18)",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "space-around",
            }}
          >
            <button
              onClick={(e) => {
                handleAdd(e);
              }}
              disabled={!isDisable}
              style={
                (buttonStyle,
                {
                  marigin: "20px",
                  width: "60px",
                  height: "50px",
                  border: ".5px unset",
                  borderRadius: "10px",
                  margin: "20px",
                })
              }
            >
              <AiOutlineUserAdd size="2em" />
              <span>add</span>
            </button>

            <button
              onClick={(e) => {
                setdisableInput(!disableInput);
                setisDisable(!isDisable);
                setaction("edit");
                e.preventDefault();
              }}
              disabled={!isDisable}
              style={
                (buttonStyle,
                {
                  marigin: "20px",
                  width: "60px",
                  height: "50px",
                  border: ".5px unset",
                  borderRadius: "10px",
                  margin: "20px",
                })
              }
            >
              <AiFillEdit size="2em" />
              <span>edit</span>
            </button>
            <button
              onClick={(e) => {
                handleSave(e);
              }}
              disabled={isDisable}
              style={
                (buttonStyle,
                {
                  marigin: "20px",
                  width: "60px",
                  height: "50px",
                  border: ".5px unset",
                  borderRadius: "10px",
                  margin: "20px",
                })
              }
            >
              <AiOutlineSave size="2em" />
              <span>save</span>
            </button>
            <button
              onClick={(e) => {
                setisDisable(!isDisable);
                setdisableInput(!disableInput);
                action === "add" && setcount(0);
                setaction("");
                clearStates();
                e.preventDefault();
              }}
              disabled={isDisable}
              style={
                (buttonStyle,
                {
                  marigin: "20px",
                  width: "60px",
                  height: "50px",
                  border: ".5px unset",
                  borderRadius: "10px",
                  margin: "20px",
                })
              }
            >
              <FcCancel size="2em" />
              <span>cancel</span>
            </button>

            <button
              onClick={(e) => {
                alert(`Are you sure you want to remove ${name1} account?`);

                setonDelete(!onDelete);
                method.rmLocalaccount(id1);
                setcurrentAcc(
                  accounts[
                    count === accounts.length - 1 ? count - 1 : count + 1
                  ]
                );
                setaccounts(method.getLocalaccounts());
                clearStates();

                e.preventDefault();
              }}
              disabled={!isDisable}
              style={
                (buttonStyle,
                {
                  margin: "20px",
                  width: "60px",
                  height: "50px",
                  border: ".5px unset",
                  borderRadius: "10px",
                  color: "red",
                })
              }
            >
              <AiOutlineUserDelete size="2em" />
              <span>delete</span>
            </button>
          </div>

          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
              alignItems: "center",

              flexDirection: "column",
            }}
          >
            <h1> User Info</h1>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <button
                onClick={(e) => {
                  setcount(count - 1);
                  e.preventDefault();
                }}
                disabled={count === 0 || action !== "" ? true : false}
                style={
                  (buttonStyle,
                  {
                    marginTop: "5px",
                    width: "40px",
                    height: "30px",
                    border: "1px green unset",
                    borderRadius: "5px",
                  })
                }
              >
                <GrLinkPrevious />
              </button>
              <button
                onClick={(e) => {
                  setcount(count + 1);
                  e.preventDefault();
                }}
                disabled={
                  count === accounts.length - 1 || action !== "" ? true : false
                }
                style={
                  (buttonStyle,
                  {
                    margin: "5px",
                    width: "40px",
                    height: "30px",
                    border: "1px green unset",
                    borderRadius: "5px",
                  })
                }
              >
                <GrLinkNext />
              </button>
            </div>

            <EntryForm
              id={id1}
              setid={setid}
              name={name1}
              setname={setname}
              username={username1}
              setusername={setusername}
              password={password1}
              setpassword={setpassword}
              email={email1}
              setemail={setemail}
              accountNo={accountNo1}
              setaccountNo={setaccountNo}
              balance={balance1}
              setbalance={setbalance}
              isDisable={disableInput}
              balerror={balerror}
              emailError={emailError}
              userError={userError}
              passError={passError}
            />
          </div>
        </div>
        <div
          className="container"
          style={{
            width: "27.5vw",
            backgroundColor: "white",
            marginLeft: "20px",
            marginRight: "20px",
            borderRadius: "10px",
            boxShadow: " -4px -3px 45px 21px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            overflowY: "scroll",
            height: "68.5vh",
          }}
        >
          <h4
            style={{
              textAlign: "center",

              paddingBottom: "5px",
            }}
          >
            Last Activity
          </h4>
          {Object.values(method.getLocaltransacs())
            .filter((item) => item.accountNo === accountNo1)
            .map((item) => {
              return (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                    justifySelf: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "space-evenly",
                      alignItems: "stretch",
                      paddingLeft: "30px",
                      color: item.type === "deposit" ? "green" : "red",
                    }}
                  >
                    <span
                      style={{
                        height: "100px",
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.type === "deposit" && <GiPayMoney size="3em" />}
                      {item.type === "withdraw" && (
                        <GiReceiveMoney size="3em" />
                      )}
                      {item.type === "sendmoney" && (
                        <AiOutlineSend size="3em" />
                      )}
                    </span>
                    <article style={{ paddingLeft: "10px" }}>
                      <h5>{item.type.toUpperCase()}</h5>
                      <span>{item.date}</span>
                    </article>
                    <article style={{ paddingLeft: "10px" }}>
                      <h5>{item.accountNo}</h5>
                      <span>{item.name}</span>
                    </article>
                    <span style={{ margin: "20px" }}>₱{item.amount}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
