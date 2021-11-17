import { AiFillHome } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { MdSupervisorAccount, MdOutlineAccountCircle } from "react-icons/md";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { GiReceiveMoney, GiExpense, GiPayMoney } from "react-icons/gi";
import { AiOutlineSend } from "react-icons/ai";
import {
  headerStyle,
  upperHeader,
  logoutbtn,
  userProfile,
  lowerHeader,
  buttonWrapper,
  buttonStyle,
} from "./css/CSS";
import React, { useState, useEffect } from "react";
import Accounts from "./AccountInfo/Accounts";
import Transactions from "./Transactions";
import UserList from "./AccountInfo/UserList";
import UserChart from "./UserChart";
import ExpenseChart from "./Expense/ExpenseChart";
import Expense from "./Expense";

const Dashboardhome = ({
  method,
  userState,
  actionbtn,
  setactionbtn,
  setuserState,
}) => {
  const charts = ["all", "users activity", "expense", "daily"];
  const [OnlistView, setOnlistView] = useState("form");
  const [ChartList, setChartList] = useState([]);
  const [onChart, setonChart] = useState("all");
  const [transacs, settransacs] = useState(() => method.getLocaltransacs());
  const [accounts, setaccounts] = useState(() => method.getLocalaccounts());
  useEffect(() => {
    let temp = [];
    accounts.forEach((item) => {
      const result = transacs.filter(
        (transac) => transac.accountNo === item.accountNo
      );
      const newobjt = [...result, item.username];
      temp.push(newobjt);
    });

    setChartList(temp);
  }, [accounts, transacs]);

  const [userActivityList, setuserActivityList] = useState([]);
  const [count, setcount] = useState(0);
  const setlist = (clist) => {
    const listx = clist.map((chartdata) => {
      let a = 0,
        b = 0,
        c = 0,
        sum = 0;

      if (!(chartdata.length < 2)) {
        chartdata.forEach((item) => {
          if (item.type === "deposit") {
            a += parseInt(item.amount);
          } else if (item.type === "withdraw") {
            b += parseInt(item.amount);
          } else if (item.type === "sendmoney") {
            c += parseInt(item.amount);
          }
        });
      }
      sum = a + b + c;
      let za = Math.round(100 * (a / sum));
      let zb = Math.round(100 * (b / sum));
      let zc = Math.round(100 * (c / sum));
      const num = [za, zb, zc, chartdata[chartdata.length - 1]];
      return num;
    });
    return listx;
  };
  useEffect(() => {
    const newlist = setlist(ChartList);
    setuserActivityList(newlist);
  }, [ChartList]);
  return (
    <div>
      <header style={headerStyle}>
        <div style={upperHeader}>
          <div style={userProfile}>
            <MdOutlineAccountCircle size="4em" />
            <h3>{userState.username}</h3>
          </div>

          <button
            onClick={() => {
              method.clearLocalcurrentuser();
              setuserState(() => method.getLocalcurr());
            }}
            style={logoutbtn}
          >
            Logout
          </button>
        </div>

        <div style={lowerHeader} className="navbtns">
          <div style={buttonWrapper} className="homebtnWrapper navitems">
            <button
              style={
                actionbtn === "home"
                  ? { ...buttonStyle, border: "3px #4caf50 groove" }
                  : buttonStyle
              }
              onClick={(e) => {
                e.preventDefault();
                setactionbtn("home");
              }}
            >
              <AiFillHome size="3em" style={{ color: "#4caf50" }} />
            </button>
            <span>home</span>
          </div>

          <div style={buttonWrapper} className="accountsBtnWrapper navitems">
            <button
              style={
                actionbtn === "A"
                  ? { ...buttonStyle, border: "3px #4caf50 groove" }
                  : buttonStyle
              }
              onClick={(e) => {
                e.preventDefault();
                setactionbtn("A");
              }}
            >
              <MdSupervisorAccount size="3em" />
            </button>
            <span>Accounts</span>
          </div>

          <div
            style={buttonWrapper}
            className="transactionsbtnWrapper navitems"
          >
            <button
              style={
                actionbtn === "T"
                  ? { ...buttonStyle, border: "3px #4caf50 groove" }
                  : buttonStyle
              }
              onClick={(e) => {
                e.preventDefault();

                setactionbtn("T");
              }}
            >
              <GrTransaction size="3em" />
            </button>
            <span>Transactions</span>
          </div>

          <div style={buttonWrapper} className="expensebtnWrapper navitems">
            <button
              style={
                actionbtn === "M"
                  ? { ...buttonStyle, border: "3px #4caf50 groove" }
                  : buttonStyle
              }
              onClick={(e) => {
                e.preventDefault();
                setactionbtn("M");
              }}
            >
              <GiExpense size="3em" />
            </button>
            <span>Expense</span>
          </div>
        </div>
      </header>
      {actionbtn === "home" && (
        <main>
          <h2>Wellcome, {userState.username}</h2>
          <div className="dashboardContainer">
            <div className="ChartWrapper">
              <div className="SelectbuttonWrapper">
                <select
                  name="charts"
                  defaultValue={() => "all"}
                  onChange={(e) => {
                    setonChart(e.target.value);
                    if (e.target.value === "users activity") {
                      setlist(ChartList);
                    }
                    e.preventDefault();
                  }}
                  style={
                    (buttonStyle,
                    {
                      width: "100x",
                      height: "20px",
                      borderRadius: "20px",
                      border: "1px black solid",
                      textAlign: "center",
                    })
                  }
                >
                  {charts.map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div style={{ height: "300px" }}>
                <div>
                  {onChart === "users activity" &&
                    userActivityList.length !== 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <UserChart userActivityList={userActivityList[count]} />
                        <div>
                          <button
                            onClick={(e) => {
                              setcount(count - 1);
                              e.preventDefault();
                            }}
                            disabled={count === 0 ? true : false}
                            style={
                              (buttonStyle,
                              {
                                width: "30px",
                                height: "20px",
                                border: ".5px unset",
                                borderRadius: "20px",

                                color: "white",
                                flex: 1,
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
                              count ===
                              (userActivityList
                                ? userActivityList.length - 1
                                : 0)
                                ? true
                                : false
                            }
                            style={
                              (buttonStyle,
                              {
                                width: "30px",
                                height: "20px",
                                border: ".5px unset",
                                borderRadius: "20px",
                              })
                            }
                          >
                            <GrLinkNext />
                          </button>
                        </div>
                      </div>
                    )}
                  {onChart === "expense" && (
                    <ExpenseChart ChartList={ChartList} />
                  )}
                </div>
              </div>
            </div>

            <div className="asideLastActivities">
              <h4 style={{ textAlign: "center" }}>Last Activity</h4>
              {Object.values(method.getLocaltransacs()).map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "space-between",
                      justifySelf: "center",
                      margin: 20,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "space-evenly",
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
        </main>
      )}
      {actionbtn === "A" &&
        (OnlistView === "list" ? (
          <UserList
            OnlistView={OnlistView}
            setOnlistView={setOnlistView}
            accounts2={accounts}
          />
        ) : (
          <Accounts
            OnlistView={OnlistView}
            setOnlistView={setOnlistView}
            setaccounts2={setaccounts}
            accounts2={accounts}
          />
        ))}
      {actionbtn === "T" && (
        <Transactions
          accounts={accounts}
          setaccounts={setaccounts}
          settransacs={settransacs}
        />
      )}
      {actionbtn === "M" && (
        <Expense
          actionbtn={actionbtn}
          accounts={accounts}
          transacs={transacs}
        />
      )}
      <footer></footer>
    </div>
  );
};

export default Dashboardhome;
