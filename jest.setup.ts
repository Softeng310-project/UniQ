import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

class MockHeaders {
  private readonly map = new Map<string, string>();

  constructor(init?: HeadersInit) {
    if (!init) return;

    if (Array.isArray(init)) {
      for (const [key, value] of init) {
        this.set(key, value as string);
      }
    } else if (init instanceof MockHeaders) {
      init.map.forEach((value, key) => this.map.set(key, value));
    } else {
      Object.entries(init).forEach(([key, value]) => this.set(key, String(value)));
    }
  }

  set(name: string, value: string) {
    this.map.set(name.toLowerCase(), value);
  }

  append(name: string, value: string) {
    this.set(name, value);
  }

  get(name: string) {
    return this.map.get(name.toLowerCase()) ?? null;
  }

  delete(name: string) {
    this.map.delete(name.toLowerCase());
  }

  *entries(): IterableIterator<[string, string]> {
    for (const [key, value] of this.map.entries()) {
      yield [key, value];
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

class MockResponse {
  private readonly bodyText: string;
  readonly status: number;
  readonly headers: MockHeaders;

  constructor(body?: BodyInit | null, init?: ResponseInit) {
    this.bodyText = typeof body === 'string' ? body : body ? JSON.stringify(body) : '';
    this.status = init?.status ?? 200;
    this.headers = init?.headers instanceof MockHeaders ? init.headers : new MockHeaders(init?.headers);
  }

  async json() {
    return this.bodyText ? JSON.parse(this.bodyText) : undefined;
  }

  async text() {
    return this.bodyText;
  }

  static json(body: unknown, init?: ResponseInit) {
    const headers = new MockHeaders(init?.headers);
    headers.set('content-type', 'application/json');
    return new MockResponse(JSON.stringify(body), { ...init, headers });
  }
}

beforeEach(() => {
  global.fetch = jest.fn() as unknown as typeof fetch;
});

afterEach(() => {
  jest.clearAllMocks();
});

// Provide minimal web API polyfills for server-side modules.
// @ts-expect-error simplified polyfills for tests
globalThis.Response = MockResponse;
// @ts-expect-error simplified polyfills for tests
globalThis.Headers = MockHeaders;

// Polyfill TextEncoder/TextDecoder for jose
// @ts-expect-error util encoders assignment
globalThis.TextEncoder = TextEncoder;
// @ts-expect-error util decoders assignment
globalThis.TextDecoder = TextDecoder;
