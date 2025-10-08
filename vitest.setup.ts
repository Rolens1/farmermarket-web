import * as React from "react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// --- Router mocks ---
// Pages Router (next/router):
vi.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/",
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// App Router (next/navigation):
vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
  };
});

// next/image mock so it behaves like a normal <img />
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: unknown) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return React.createElement(
      "img",
      props as React.ImgHTMLAttributes<HTMLImageElement>
    );
  },
}));

// Mock next/link to behave like a regular anchor tag in tests
vi.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      return React.createElement("a", props, children);
    },
  };
});

// Removed Jest global mocks as they are incompatible with Vitest. Use `vi` directly for mocking in tests.
