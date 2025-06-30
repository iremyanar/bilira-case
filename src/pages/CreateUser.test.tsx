import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateUser from "./CreateUser";

const Wrapper = () => (
  <BrowserRouter>
    <CreateUser />
  </BrowserRouter>
);

describe("CreateUser Page", () => {
  test("renders form inputs and submit button", () => {
    render(<Wrapper />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
