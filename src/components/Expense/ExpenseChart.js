import React from "react";

const ExpenseChart = ({ ChartList }) => {
  const datalist = ChartList.map((chartdata) => {
    let a = 0,
      b = 0,
      sum = 0;

    if (!(chartdata.length < 2)) {
      chartdata.forEach((item) => {
        if (item.type === "deposit") {
          a += parseInt(item.amount);
        } else if (item.type === "withdraw") {
          b += parseInt(item.amount);
        } else if (item.type === "sendmoney") {
          b += parseInt(item.amount);
        }
      });
    }
    sum = a + b;
    let za = Math.round(100 * (a / sum));
    let zb = Math.round(100 * (b / sum));
    return [za, zb];
  }).filter((x) =>x[0]);
  console.log(datalist);
  let a = 0,
    b = 0;
  for (let i = 0; i < datalist.length; i++) {
    a += datalist[i][0];
    b += datalist[i][1];
  }
  const sum = a + b;
  const x = Math.round(100 * (a / sum));
  const y = Math.round(100 * (b / sum));
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
            height: `${x}%`,
          }}
        >
          <span>{x}%</span>
          <label>Income</label>
        </div>

        <div
          className="bar"
          style={{
            position: "relative",
            height: `${y}%`,
          }}
        >
          <span>{y}%</span>
          <label>Expense</label>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
