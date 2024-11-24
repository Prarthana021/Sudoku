import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./App";

describe("Home Component", () => {
  it("should render without crashing", () => {
    render(<Home />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("footerToolbar")).toBeInTheDocument();
  });
});
