import { vi, expect, it } from 'vitest';

vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'mocked' })),
}));