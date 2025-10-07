import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  // Clear all mocks after each test to ensure test isolation
  vi.clearAllMocks();
  cleanup();
});
