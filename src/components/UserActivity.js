import UserChart from "./UserChart";
const UserActivity = ({ ChartList }) => {
  ChartList.map((chartdata, key) => {
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

    return (
      <UserChart
        x={za ? za : 0}
        y={zb ? zb : 0}
        z={zc ? zc : 0}
        name={chartdata[chartdata.length - 1]}
      />
    );
  });
};

export default UserActivity;
