import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import Checkout from "./checkout";

describe("Checkout test", () => {
  test("user types in their address and checks out", async () => {
    render(<Checkout />);
    const addressBox = screen.getByRole("textbox", { name: /address/i });
    fireEvent.focus(addressBox);
    fireEvent.change(addressBox, { target: { value: "Omar" } });
    expect(screen.getByDisplayValue("Omar")).toBeInTheDocument();

    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
    await fireEvent.click(checkoutBtn);
    expect(checkoutBtn).toBeDisabled();

    const checkoutSuccessful = await screen.findByText("checkout successful");
    expect(checkoutSuccessful).toBeInTheDocument();
    expect(checkoutBtn).toBeEnabled();
  });

  test("user types in their address and try to checkout but fails", async () => {
    render(<Checkout />);
    const addressBox = screen.getByRole("textbox", { name: /address/i });
    fireEvent.change(addressBox, { target: { value: "$mar" } });
    expect(screen.getByDisplayValue("$mar")).toBeInTheDocument();

    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
    await fireEvent.click(checkoutBtn);
    expect(checkoutBtn).toBeDisabled();

    const checkoutFailed = await screen.findByText("failed, please try again later");
    expect(checkoutFailed).toBeInTheDocument();
    expect(checkoutBtn).toBeEnabled();
  })
});
