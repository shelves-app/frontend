import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { ProfileTabs } from "@/components/profile/profile-tabs";

describe("ProfileTabs", () => {
  it("should render all 5 tabs", () => {
    render(<ProfileTabs username="testuser" />);

    expect(screen.getByText("Read")).toBeInTheDocument();
    expect(screen.getByText("Currently Reading")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Lists")).toBeInTheDocument();
    expect(screen.getByText("Want to Read")).toBeInTheDocument();
  });

  it("should show Read tab content by default", () => {
    render(<ProfileTabs username="testuser" />);

    expect(
      screen.getByText("testuser's read books will appear here."),
    ).toBeInTheDocument();
  });

  it("should switch to Reviews tab on click", () => {
    render(<ProfileTabs username="testuser" />);

    fireEvent.click(screen.getByText("Reviews"));

    expect(
      screen.getByText("testuser's reviews will appear here."),
    ).toBeInTheDocument();
  });

  it("should switch to Currently Reading tab on click", () => {
    render(<ProfileTabs username="booklover" />);

    fireEvent.click(screen.getByText("Currently Reading"));

    expect(
      screen.getByText(
        "Books booklover is currently reading will appear here.",
      ),
    ).toBeInTheDocument();
  });

  it("should switch to Want to Read tab on click", () => {
    render(<ProfileTabs username="reader" />);

    fireEvent.click(screen.getByText("Want to Read"));

    expect(
      screen.getByText("Books reader wants to read will appear here."),
    ).toBeInTheDocument();
  });
});
