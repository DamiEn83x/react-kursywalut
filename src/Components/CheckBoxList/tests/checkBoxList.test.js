import React from "react";

import CheckBoxList from "../CheckBoxList";
import { render, fireEvent, cleanup } from "@testing-library/react";

describe("CheckBoxList component tests", () => {
  it("renders without crashing", () => {
    const renderer = render(<CheckBoxList />);
  });
});
