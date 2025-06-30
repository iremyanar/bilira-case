import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Input from "./Input";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

const Wrapper = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  return (
    <Input
      label="Email"
      {...register("email", { required: "Please input your email" })}
      error={errors.email}
    />
  );
};

test("renders input with label", () => {
  render(<Wrapper />);
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
});

test("shows error when input is empty", async () => {
  render(<Wrapper />);
  const emailInput = screen.getByLabelText("Email");

  fireEvent.blur(emailInput);

  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(/please input your email/i)
  );
});

test("shows correct placeholder", () => {
  render(<Input label="Email" placeholder="Enter your email" />);
  const input = screen.getByPlaceholderText("Enter your email");
  expect(input).toBeInTheDocument();
});

test('renders password input when type is "password"', () => {
  render(<Input label="Password" type="password" />);
  const input = screen.getByLabelText("Password");
  expect(input).toHaveAttribute("type", "password");
});

test("renders input with defaultValue", () => {
  render(<Input label="Name" defaultValue="İrem" />);
  const input = screen.getByDisplayValue("İrem");
  expect(input).toBeInTheDocument();
});

test("renders checkbox input with label", () => {
  render(<Input label="Accept Terms" type="checkbox" />);
  const checkbox = screen.getByLabelText("Accept Terms");
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute("type", "checkbox");
});

test("applies custom className", () => {
  render(<Input label="Username" className="custom-class" />);
  const input = screen.getByLabelText("Username");
  expect(input).toHaveClass("custom-class");
});

