
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page"; 


jest.mock("../lib/api", () => ({
  fetchJobs: jest.fn(),
}));


jest.mock("next/link", () => {
  return ({ children }) => {
    return children;
  };
});


jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
}));


jest.mock("../components/ui/Search", () => {
  return function MockSearch() {
    return <div data-testid="mock-search">Mock Search Component</div>;
  };
});

describe("Home component", () => {
  const mockData = {
    totalPages: 5,
    results: 100,
    data: {
      jobs: [
        {
          _id: "1",
          title: "Software Engineer",
          location: "New York, NY",
          salary: { min: 80000, max: 120000 },
          company: { name: "Tech Corp" },
          contract_type: "Full-time",
          work_arrangement: "Remote",
        },
        {
            _id: "2",
            title: "Data Engineer",
            location: "Edinburgh, UK",
            salary: { min: 30000, max: 100000 },
            company: { name: "ChefShops" },
            contract_type: "Part-time",
            work_arrangement: "Onsite",
          },
      ],
    },
  };

  beforeEach(() => {
    require("../lib/api").fetchJobs.mockResolvedValue(mockData);
  });

  it("renders the home page with job listings", async () => {
    render(await Home({ searchParams: {} }));

   
    expect(screen.getByText("Job Board")).toBeInTheDocument();


    expect(screen.getByTestId("mock-search")).toBeInTheDocument();

   
    expect(screen.getByText("100 results")).toBeInTheDocument();

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("New York, NY")).toBeInTheDocument();
    expect(screen.getByText("$80,000 - $120,000 per year")).toBeInTheDocument();
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("Part-time")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
  });

  it("passes search params to fetchJobs", async () => {
    const searchParams = { query: "developer", location: "remote" };
    render(await Home({ searchParams }));

    expect(require("../lib/api").fetchJobs).toHaveBeenCalledWith(
      "query=developer&location=remote"
    );
  });
});
