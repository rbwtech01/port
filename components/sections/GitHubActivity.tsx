"use client";

import { Component, type ReactNode, useState } from "react";
import dynamic from "next/dynamic";

type GitHubActivityProps = {
  username: string;
  isDark: boolean;
};

type CalendarErrorBoundaryProps = {
  children: ReactNode;
  onRetry: () => void;
};

type CalendarErrorBoundaryState = {
  hasError: boolean;
};

function CalendarSkeleton() {
  return (
    <div
      aria-label="Loading GitHub contributions"
      aria-busy="true"
      className="min-w-[840px] animate-pulse space-y-4 py-2"
      role="status"
    >
      <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {Array.from({ length: 371 }, (_, index) => (
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-sm bg-zinc-200 dark:bg-zinc-800"
            key={index}
          />
        ))}
      </div>
      <div className="h-4 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

const GitHubCalendar = dynamic(
  () =>
    import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false, loading: CalendarSkeleton },
);

class CalendarErrorBoundary extends Component<
  CalendarErrorBoundaryProps,
  CalendarErrorBoundaryState
> {
  state: CalendarErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): CalendarErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-200 bg-white px-6 text-center dark:border-white/10 dark:bg-white/[0.03]"
          role="alert"
        >
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            GitHub activity couldn&apos;t be loaded right now. Please check your
            connection and try again.
          </p>
          <button
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={this.props.onRetry}
            type="button"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function GitHubActivity({
  username,
  isDark,
}: GitHubActivityProps) {
  const [retryCount, setRetryCount] = useState(0);

  return (
    <section
      aria-labelledby="github-activity-heading"
      className="scroll-mt-24 border-t border-zinc-200 px-5 py-24 dark:border-white/10 sm:px-8 lg:px-12"
      id="github"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              Open source
            </p>
            <h2
              className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl"
              id="github-activity-heading"
            >
              Code. Create. Contribute.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
            A little consistency goes a long way. Here&apos;s a glimpse of my
            open-source activity and coding journey.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 sm:p-8 dark:border-white/10 dark:bg-white/[0.02]">
          <div
            aria-label="GitHub contribution calendar. Scroll horizontally to view all weeks."
            className="overflow-x-auto overscroll-x-contain pb-3"
            role="region"
            tabIndex={0}
          >
            <div className="min-w-[840px] py-2 sm:min-w-0">
              <CalendarErrorBoundary
                key={retryCount}
                onRetry={() => setRetryCount((count) => count + 1)}
              >
                <GitHubCalendar
                  colorScheme={isDark ? "dark" : "light"}
                  labels={{
                    totalCount: "{{count}} contributions in the last year",
                  }}
                  showMonthLabels
                  showWeekdayLabels={["mon", "wed", "fri"]}
                  theme={{
                    light: [
                      "#ebedf0",
                      "#9be9a8",
                      "#40c463",
                      "#30a14e",
                      "#216e39",
                    ],
                    dark: [
                      "#161b22",
                      "#0e4429",
                      "#006d32",
                      "#26a641",
                      "#39d353",
                    ],
                  }}
                  throwOnError
                  tooltips={{
                    activity: {
                      text: (activity) =>
                        `${activity.count} contribution${activity.count === 1 ? "" : "s"} on ${activity.date}`,
                    },
                    colorLegend: {
                      text: (level) =>
                        level === 0 ? "No contributions" : `Activity level ${level}`,
                    },
                  }}
                  username={username}
                  year="last"
                />
              </CalendarErrorBoundary>
            </div>
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-5 dark:border-white/10">
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:text-zinc-200 dark:hover:text-blue-400"
              href={`https://github.com/${username}`}
              rel="noreferrer"
              target="_blank"
            >
              View GitHub profile
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 4h6v6m-1-5-9 9"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <path
                  d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
