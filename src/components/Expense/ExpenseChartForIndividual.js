import React from "react";
const ExpenseChartForIndividual = ({ ChartList }) => {
  let expense = parseInt(ChartList[0]);
  let bal = parseInt(ChartList[1]);
  let xsum = expense + bal;

  // let accNum = ChartList[2];
  // const data = () => {
  //   const transacsInbank = method
  //     .getLocaltransacs()
  //     .filter((item) => item.accountNo === accNum);
  //   let a = 0,
  //     b = 0,
  //     sum = 0;

  //   if (transacsInbank) {
  //     transacsInbank.forEach((item) => {
  //       if (item.type === "deposit") {
  //         a += parseInt(item.amount);
  //       } else if (item.type === "withdraw") {
  //         b += parseInt(item.amount);
  //       } else if (item.type === "sendmoney") {
  //         b += parseInt(item.amount);
  //       }
  //     });
  //   }

  //   b += expense;
  //   sum = a + b;
  //   let za = Math.round(100 * (a / sum));
  //   let zb = Math.round(100 * (b / sum));
  //   list.push([za, zb]);
  // };
  let x = Math.round(100 * (expense / xsum));
  let y = Math.round(100 * (bal / xsum));
  return (
    <div
      style={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifySelf: "safe center",
        alignSelf: "safe center",
        textAlign: "center",
        marginLeft: "20px",
      }}
    >
      <div className="chart">
        <div
          className="bar"
          style={{
            position: "relative",
            height: `${y ? y : 0}%`,
          }}
        >
          <span>{y ? y : 0}%</span>
          <label>balance</label>
        </div>

        <div
          className="bar"
          style={{
            position: "relative",
            height: `${x ? x : 0}%`,
          }}
        >
          <span>{x ? x : 0}%</span>
          <label>Expense</label>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChartForIndividual;
