import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddUserForm from "@/components/ui/AddUserForm";
import * as actions from "@/lib/actions";

// Mock the entire @/lib/actions module
jest.mock("@/lib/actions", () => ({
  createUserAction: jest.fn(),
}));

describe("AddUserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Add User button", () => {
    render(<AddUserForm />);
    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  it("opens the modal when Add User button is clicked", () => {
    render(<AddUserForm />);
    fireEvent.click(screen.getByText("Add User"));
    expect(screen.getByText("Add New User")).toBeInTheDocument();
  });

  it("closes the modal when Cancel button is clicked", () => {
    render(<AddUserForm />);
    fireEvent.click(screen.getByText("Add User"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Add New User")).not.toBeInTheDocument();
  });

//   it("submits the form with correct data", async () => {
//     // Mock createUserAction to return a successful response
//     actions.createUserAction.mockResolvedValue({
//       status: "success",
//       message: "User created successfully",
//     });

//     render(<AddUserForm />);

//     // Open the modal
//     fireEvent.click(screen.getByText("Add User"));

//     // Fill out the form
//     fireEvent.change(screen.getByPlaceholderText("Enter user name"), {
//       target: { value: "John Doe" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Enter user email"), {
//       target: { value: "john@example.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Password"), {
//       target: { value: "password123" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
//       target: { value: "password123" },
//     });
//     fireEvent.change(screen.getByRole("combobox"), {
//       target: { value: "employer" },
//     });

//     // Submit the form by targeting the submit button specifically
//     fireEvent.click(screen.getByText("Submit"));

   

//     await waitFor(() => {
//       // Check that createUserAction was called with the correct arguments
//       expect(actions.createUserAction).toHaveBeenCalledWith(
//         expect.anything(),
//         expect.any(FormData)
//       );

//       const formDataArg = actions.createUserAction.mock.calls[0][1];
//       expect(formDataArg.get("name")).toBe("John Doe");
//       expect(formDataArg.get("email")).toBe("john@example.com");
//       expect(formDataArg.get("password")).toBe("password123");
//       expect(formDataArg.get("passwordConfirm")).toBe("password123");
//       expect(formDataArg.get("role")).toBe("employer");

//       // Check for success message (adjust this based on how your component displays success)
//       expect(screen.getByText("Success!")).toBeInTheDocument();
//     });
//   });

 
});
