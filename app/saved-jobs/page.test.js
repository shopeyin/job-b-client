import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SavedJobs from "./page";

jest.mock("../../lib/api", () => ({
  getSavedJobs: jest.fn(),
}));

jest.mock("../../components/ui/JobCard", () => ({
  JobCard: jest.fn(({ job }) => <div data-testid="job-card">{job.title}</div>),
}));

describe("SavedJobs component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the saved jobs page title", async () => {
    require("../../lib/api").getSavedJobs.mockResolvedValue({ savedJobs: [] });

    render(await SavedJobs());

    expect(screen.getByText("Saved Jobs")).toBeInTheDocument();
  });

  it("displays a message when there are no saved jobs", async () => {
    require("../../lib/api").getSavedJobs.mockResolvedValue({ savedJobs: [] });

    render(await SavedJobs());

    expect(
      screen.getByText("You have no saved jobs at the moment.")
    ).toBeInTheDocument();
  });

  it("renders job cards when there are saved jobs", async () => {
    const mockSavedJobs = [
      { _id: "1", job: { title: "Software Engineer" }, savedAt: "2023-01-01" },
      { _id: "2", job: { title: "Product Manager" }, savedAt: "2023-01-02" },
    ];
    require("../../lib/api").getSavedJobs.mockResolvedValue({
      savedJobs: mockSavedJobs,
    });

    render(await SavedJobs());

    expect(
      screen.queryByText("You have no saved jobs at the moment.")
    ).not.toBeInTheDocument();
    expect(screen.getAllByTestId("job-card")).toHaveLength(2);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
  });

  it("handles null savedJobs gracefully", async () => {
    require("../../lib/api").getSavedJobs.mockResolvedValue({
      savedJobs: null,
    });

    render(await SavedJobs());

    expect(
      screen.getByText("You have no saved jobs at the moment.")
    ).toBeInTheDocument();
  });
});
