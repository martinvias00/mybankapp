import React from "react";

const UserChart = ({ userActivityList }) => {
  const x = userActivityList[0],
    y = userActivityList[1],
    z = userActivityList[2],
    name = userActivityList[3];
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

        // marginRight: "20px",
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
          <label>W</label>
        </div>
        <div
          className="bar"
          style={{
            position: "relative",
            height: `${x ? x : 0}%`,
          }}
        >
          <span>{x ? x : 0}%</span>
          <label>D</label>
        </div>
        <div
          className="bar"
          style={{
            position: "relative",
            height: `${z ? z : 0}%`,
          }}
        >
          <span>{z ? z : 0}%</span>
          <label>S</label>
        </div>
      </div>
      <span>{name}</span>
    </div>
  );
};

export default UserChart;
