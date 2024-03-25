import Medusa from "@medusajs/medusa-js";
import { QueryClient } from "@tanstack/react-query";

// Defaults to standard port for Medusa server
export let MEDUSA_BACKEND_URL = "http://localhost:9000";

if (import.meta.env.VITE_BASE_URL) {
  MEDUSA_BACKEND_URL = import.meta.env.VITE_BASE_URL;
}

export const medusaClient = new Medusa({
  maxRetries: 3,
  baseUrl: MEDUSA_BACKEND_URL,
  // apiKey: import.meta.env.VITE_APIKEY,
  customHeaders: {
    "x-no-compression": true,
  },
  // publishableApiKey: import.meta.env.VITE_PUBLISHABLE_APIKEY
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      retry: 1,
    },
  },
});

const REVALIDATE_WINDOW = import.meta.env.VITE_REVALIDATE_WINDOW || 60 * 30; // 30 minutes

export default async function medusaRequest(
  method: string,
  path = "",
  payload?: {
    query?: Record<string, any>;
    body?: Record<string, any>;
  },
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      // "x-publishable-key": MEDUSA_API_KEY,
    },
    // next: {
    //   revalidate: parseInt(REVALIDATE_WINDOW.toString()),
    //   tags: ["medusa_request"],
    // },
  };

  if (payload?.body) {
    options.body = JSON.stringify(payload.body);
  }

  if (payload?.query) {
    const params = objectToURLSearchParams(payload.query!).toString();
    path = `${path}?${params}`;
  }

  const limit = payload?.query?.limit || 100;
  const offset = payload?.query?.offset || 0;

  try {
    const result = await fetch(`${MEDUSA_BACKEND_URL}/admin${path}`, options);
    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    const nextPage = offset + limit;

    body.nextPage = body.count > nextPage ? nextPage : null;

    return {
      status: result.status,
      ok: result.ok,
      body,
    };
  } catch (error: any) {
    throw {
      error: error.message,
    };
  }
}

export function objectToURLSearchParams(
  obj: Record<string, any>,
): URLSearchParams {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((value: any) => {
        params.append(`${key}[]`, value);
      });
    } else {
      params.append(key, obj[key]);
    }
  }

  return params;
}
