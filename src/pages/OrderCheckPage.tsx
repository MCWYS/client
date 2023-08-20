import { RadioGroup, Radio } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

export default function OrderCheckPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        height: "100vh",
      }}
    >
      <img
        src="/orderCheck.png"
        alt="orderCheck"
        style={{ width: 402, marginTop: 120, marginBottom: 24 }}
      />
      <RadioGroup>
        <Radio
          value="buenos-aires"
          description="I have purchased multi-use container before"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Bring your own container</span>
            <img src="/svg/sprout.png" alt="sprout" />
          </div>
        </Radio>
        <Radio
          value="sydney"
          description="I’ll purchase multi-use container for ecosystem"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Buy your own multi-use container</span>
            <img src="/svg/sprout.png" alt="sprout" />
          </div>
        </Radio>
        <Radio value="london" description="Maybe next time...">
          I’ll use disposable container
        </Radio>
      </RadioGroup>
      <NavLink
        to="/walking"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src="/orderCheckBottomButton.png"
          style={{ position: "absolute", height: "156px", bottom: 0 }}
        />
      </NavLink>
    </div>
  );
}
