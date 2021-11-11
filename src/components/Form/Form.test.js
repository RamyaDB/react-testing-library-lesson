import Form from "./Form";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

it("Should render the form", () => {
  // 1. Arrange
  render(<Form />);

  // 2. Act -- passing the name attribute from Form component
  const form = screen.getByRole("form");

  // 3.Assert
  expect(form).toBeInTheDocument();
})

it("Shound render the basic input fields", () => {
  // 1.Arrange
  render(<Form />);

  // 2.Act
  // getBy..
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  // const emailInput = screen.getByRole("textbox", { name: /email/i });
  const emailInput = screen.getByPlaceholderText(/e.g. test@test.com/i);
  // console.log(nameInput);
  
  // 3. Assert
  expect(emailInput).toBeInTheDocument();
  expect(nameInput).toBeTruthy();

  // getAllBy...
  const inputs = screen.getAllByRole("textbox");
  inputs.forEach(input => {
    expect(input).toBeInTheDocument();
  })
})
  
  it("should not render error message on load", () => {
    render(<Form />);
    const errorMessage = screen.queryByText(/Sorry something went wrong/i);
    // console.log(errorMessage);
    // 2 ways of doing the same thing, both not required
    expect(errorMessage).toBeFalsy();
    expect(errorMessage).not.toBeInTheDocument();
  })

  it("should not render success message on load", () => {
    render(<Form />);
    const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i);
    // console.log(successMessage);
    // 2 ways of doing the same thing, both not required
    expect(successMessage).toBeFalsy();
    expect(successMessage).not.toBeInTheDocument();
  })

  it("should not submit the form with invalid fields", () => {
    //Arrange
    render(<Form />);

    //Act
    const nameInput = screen.getByRole("textbox", {name: /name/i});
    userEvent.type(nameInput, "ramya");
    // console.log(nameInput);

    const emailInput = screen.getByRole("textbox", {name: /email/i});
    userEvent.type(emailInput, "notvalidemail");

    const button=screen.getByRole("button", {name: /sign in/i});
    userEvent.click(button);

    //Assert
    //Error message should be shown
    //Success message should not be shown
    const errorMessage = screen.queryByText(/Sorry something went wrong/i);    
    expect(errorMessage).toBeTruthy();

    const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i);    
    expect(successMessage).not.toBeInTheDocument();
    
  })