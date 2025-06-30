import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SubmittedUser from "./SubmittedUser";

const mockUserData = {
  fullName: "Irem Yanar",
  email: "iremxyanar@gmail.com",
  password: "irem123",
  rememberMe: true,
};

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={[{ pathname: "/submitted", state: mockUserData }]}>
      <Routes>
        <Route path="/submitted" element={<SubmittedUser />} />
      </Routes>
    </MemoryRouter>
  );

describe("SubmittedUser page", () => {
  test("renders submitted page title", () => {
    renderWithRouter();
    expect(
      screen.getByText((content) => content.includes("User Card"))
    ).toBeInTheDocument();
  });

  test("displays submitted user data", () => {
    renderWithRouter();
    expect(screen.getByText("Irem Yanar")).toBeInTheDocument();
    expect(screen.getByText("iremxyanar@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("irem123")).toBeInTheDocument();
  });

  test("shows Remember Me: Yes if selected", () => {
    renderWithRouter();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

});
