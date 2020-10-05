import React from "react";

import MyBootstrapDatePicker from "../MyBootstrapDatePicker";
import { render, fireEvent } from "@testing-library/react";

describe("CheckBoxList component tests", () => {
  it("renders without crashing", () => {
    const renderer = render(<MyBootstrapDatePicker />);
  });
});
