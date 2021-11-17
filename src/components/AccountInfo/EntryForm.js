import React from "react";
import Input from "../Input";
const EntryForm = ({
  name,
  setname,
  username,
  setusername,
  password,
  setpassword,
  email,
  setemail,
  accountNo,
  setaccountNo,
  balance,
  setbalance,
  isDisable,
  balerror,
  emailError,
  userError,
  passError,
}) => {
  return (
    <form>
      <div style={{ display: "flex-inline" }}>
        <Input
          text="Account no"
          name="accountNo"
          type="text"
          value={accountNo}
          setState={setaccountNo}
          isdiable={true}
          style={{ width: "250px" }}
          errorMessage={""}
          inputStyle={{ width: "430px", height: "30px" }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Input
            text="Balance"
            name="balance"
            type="text"
            value={balance < 0 ? 0 : balance}
            setState={setbalance}
            isdiable={isDisable}
            errorMessage={balerror}
          />
          <Input
            text="Name"
            name="name"
            type="text"
            value={name}
            setState={setname}
            isdiable={isDisable}
            errorMessage={""}
          />
        </div>
      </div>

      <Input
        text={"Email"}
        name={"Email"}
        type="email"
        value={email}
        isdiable={isDisable}
        setState={setemail}
        inputStyle={{ width: "430px", height: "30px" }}
        errorMessage={emailError}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Input
          text="Username"
          name="username"
          type="text"
          value={username}
          setState={setusername}
          isdiable={isDisable}
          errorMessage={userError}
        />
        <Input
          text="password"
          name="password"
          type="password"
          value={password}
          setState={setpassword}
          isdiable={isDisable}
          errorMessage={passError}
        />
      </div>
    </form>
  );
};

export default EntryForm;
