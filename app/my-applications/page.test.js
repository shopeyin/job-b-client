import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyApplications from "./page";

jest.mock("@/lib/api", () => ({
  getAllApplicationsByUser: jest.fn(),
}));

describe("MyApplications component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page title correctly", async () => {
    require("@/lib/api").getAllApplicationsByUser.mockResolvedValue({
      applications: [],
    });
    render(await MyApplications());
    expect(screen.getByText("My Job Applications")).toBeInTheDocument();
  });

  it("displays a message when there are no applications", async () => {
    require("@/lib/api").getAllApplicationsByUser.mockResolvedValue({
      applications: [],
    });
    render(await MyApplications());
    expect(
      screen.getByText("You haven't applied for any jobs yet.")
    ).toBeInTheDocument();
  });

  it("renders job applications when they exist", async () => {
    const mockApplications = [
      {
        _id: "1",
        job: {
          title: "Software Engineer",
          location: "New York",
          work_arrangement: "Remote",
          contract_type: "Full-time",
        },
        applied_at: "2023-01-01T00:00:00.000Z",
        status: "applied",
        cover_letter: "This is my cover letter",
        resume: "http://example.com/resume.pdf",
      },
      {
        _id: "2",
        job: {
          title: "Product Manager",
          location: "San Francisco",
          work_arrangement: "On-site",
          contract_type: "Part-time",
        },
        applied_at: "2023-02-01T00:00:00.000Z",
        status: "rejected",
      },
    ];

    require("@/lib/api").getAllApplicationsByUser.mockResolvedValue({
      applications: mockApplications,
    });
    render(await MyApplications());

    
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
    expect(
      screen.getByText("New York | Remote | Full-time")
    ).toBeInTheDocument();
    expect(
      screen.getByText("San Francisco | On-site | Part-time")
    ).toBeInTheDocument();
    expect(screen.getByText("applied")).toBeInTheDocument();
    expect(screen.getByText("rejected")).toBeInTheDocument();

    screen.getAllByText(/Applied on:/).forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    expect(screen.getByText(/Applied on:\s*01\/01\/2023/)).toBeInTheDocument();
    expect(screen.getByText(/Applied on:\s*01\/02\/2023/)).toBeInTheDocument();

    expect(screen.getByText("Cover Letter:")).toBeInTheDocument();
    expect(screen.getByText("This is my cover letter")).toBeInTheDocument();
    expect(screen.getByText("View Resume")).toBeInTheDocument();
  });
});
