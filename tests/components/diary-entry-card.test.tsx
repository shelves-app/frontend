import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { DiaryEntryCard } from "@/components/diary/diary-entry-card";
import type { DiaryEntry } from "@/lib/types";

const baseEntry: DiaryEntry = {
  id: "ub-1",
  userId: "user-1",
  bookId: "book-1",
  status: "read",
  rating: "4.5",
  startedAt: "2024-01-01T00:00:00.000Z",
  finishedAt: "2024-01-15T00:00:00.000Z",
  currentPage: null,
  currentPercent: null,
  format: "physical",
  edition: null,
  tags: ["fantasy", "book-club"],
  privateNotes: "Really enjoyed this one. Great worldbuilding.",
  isReread: false,
  createdAt: "2024-01-15T00:00:00.000Z",
  updatedAt: "2024-01-15T00:00:00.000Z",
  book: {
    id: "book-1",
    title: "The Name of the Wind",
    coverUrl: "/cover.jpg",
  },
};

describe("DiaryEntryCard", () => {
  it("should render book title", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.getByText("The Name of the Wind")).toBeInTheDocument();
  });

  it("should render star rating", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("should render date range", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.getByText(/Jan 1, 2024/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 15, 2024/)).toBeInTheDocument();
  });

  it("should render format badge", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.getByText("Physical")).toBeInTheDocument();
  });

  it("should render status badge", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.getByText("Read")).toBeInTheDocument();
  });

  it("should render tags", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.getByText("fantasy")).toBeInTheDocument();
    expect(screen.getByText("book-club")).toBeInTheDocument();
  });

  it("should render review snippet", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.getByText(/Really enjoyed this one/)).toBeInTheDocument();
  });

  it("should show reread badge when isReread is true", () => {
    render(<DiaryEntryCard entry={{ ...baseEntry, isReread: true }} />);

    expect(screen.getByText("Reread")).toBeInTheDocument();
  });

  it("should not show reread badge when isReread is false", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.queryByText("Reread")).not.toBeInTheDocument();
  });

  it("should show DNF status badge", () => {
    render(
      <DiaryEntryCard entry={{ ...baseEntry, status: "did_not_finish" }} />,
    );

    expect(screen.getByText("DNF")).toBeInTheDocument();
  });

  it("should show edit button when onEdit is provided", () => {
    const onEdit = vi.fn();
    render(<DiaryEntryCard entry={baseEntry} onEdit={onEdit} />);

    const editButton = screen.getByLabelText("Edit entry");
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(baseEntry);
  });

  it("should not show edit button when onEdit is not provided", () => {
    render(<DiaryEntryCard entry={baseEntry} />);

    expect(screen.queryByLabelText("Edit entry")).not.toBeInTheDocument();
  });

  it("should show only started date when no finished date", () => {
    render(<DiaryEntryCard entry={{ ...baseEntry, finishedAt: null }} />);

    expect(screen.getByText(/Started Jan 1, 2024/)).toBeInTheDocument();
  });

  it("should handle entries without rating", () => {
    render(<DiaryEntryCard entry={{ ...baseEntry, rating: null }} />);

    expect(screen.queryByText("4.5")).not.toBeInTheDocument();
  });
});
