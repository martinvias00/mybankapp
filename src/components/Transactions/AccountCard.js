import Input from "../Input";
const AccountCard = ({ name1, setname1, balance1, setaccountno1, listacc }) => {
  return (
    <div>
      {
        <select
          name="accountno1"
          defaultValue={() => listacc[0]}
          onChange={(e) => {
            setaccountno1(e.target.value);
            e.preventDefault();
          }}
        >
          {listacc.map((item) => (
            <option key={item.accountNo} value={item.accountNo}>
              {item.accountNo}
              {item.name}
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
        text="balance"
        name="balance"
        type="number"
        value={balance1}
        isdiable={true}
        errorMessage=""
      />
    </div>
  );
};

export default AccountCard;
