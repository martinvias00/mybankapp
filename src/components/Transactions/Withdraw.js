import method from "../../localStorageManager";
import Input from "../Input";
const Withdraw = ({
  setamount,
  accountno1,
  amount,
  balance1,
  error,
  seterror,
  settransacs,
}) => {
  const amountOutofBounce =
    "Sorry, this is more than you can withdraw right now.";
  const balancezero = "Account remaining balance is zero ..";

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
      <h1>Withdraw</h1>
      <Input
        text="amount"
        name="amount"
        type="number"
        value={amount === 0 ? "" : amount}
        setState={setamount}
        isdiable={false}
        errorMessage={""}
      />
      <span>{error}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (error === "") {
            const newobjt = method
              .getLocalaccounts()
              .filter((item) => item.accountNo === accountno1);
            if (newobjt.length !== 0) {
              const oldList = method.getLocalaccounts();
              const list1 = newobjt[0];

              if (oldList.balance < amount) {
                seterror(amountOutofBounce);
              } else if (oldList.balance === 0) {
                seterror(balancezero);
              } else {
                const newbalance =
                  parseInt(newobjt[0].balance) - parseInt(amount);
                const nobjt = {
                  id: list1.id,
                  name: list1.name,
                  username: list1.username,
                  password: list1.password,
                  email: list1.email,
                  accountNo: list1.accountNo,
                  balance: newbalance,
                };
                const xlist = oldList.map((item) => {
                  if (item.id === list1.id) {
                    return nobjt;
                  } else {
                    return item;
                  }
                });
                method.setLocalaccounts(xlist);

                const date1 = new Date().toDateString();
                const newtrasac = {
                  employeeId: method.getLocalcurr().id,
                  accountNo: newobjt[0].accountNo,
                  name: newobjt[0].name,
                  transferto: "",
                  refNo: Math.floor(Math.random() * 500) + 5012 + "MWX",
                  date: date1,
                  type: "withdraw",
                  amount: amount,
                };
                method.updateLocaltransacs(newtrasac);
                settransacs(method.getLocaltransacs());
                setamount(0);
              }
            }
          }
        }}
      >
        submit
      </button>
    </div>
  );
};

export default Withdraw;
