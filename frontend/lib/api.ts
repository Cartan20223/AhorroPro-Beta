export interface Envelope {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  currency: "EUR" | "COP";
  completed: boolean;
  created_at: string;
}

export interface Balance {
  eur: number;
  cop: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserProfile extends User {
  balances: { currency: "EUR" | "COP"; balance: number }[];
}

export interface ApiError {
  error: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = "http://localhost:5000/api") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const errorBody = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new ApiClientError(
        (errorBody as ApiError).error || (errorBody as ApiError).message || `HTTP ${response.status}`,
        response.status
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  // Auth
  async login(email: string, password: string): Promise<User> {
    return this.request<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    return this.request<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>("/auth/logout", {
      method: "POST",
    });
  }

  // Envelopes
  async getEnvelopes(): Promise<Envelope[]> {
    return this.request<Envelope[]>("/envelopes");
  }

  async getEnvelope(id: string): Promise<Envelope> {
    return this.request<Envelope>(`/envelopes/${id}`);
  }

  async createEnvelope(data: {
    name: string;
    target_amount: number;
    currency: "EUR" | "COP";
  }): Promise<Envelope> {
    return this.request<Envelope>("/envelopes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async depositEnvelope(
    id: string,
    data: { amount: number; source: "manual" | "balance" }
  ): Promise<Envelope> {
    return this.request<Envelope>(`/envelopes/${id}/deposit`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Balance
  async getBalance(): Promise<Balance> {
    return this.request<Balance>("/balance");
  }

  async depositBalance(
    data: { amount: number; currency: "EUR" | "COP" }
  ): Promise<Balance> {
    return this.request<Balance>("/balance/deposit", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Profile
  async getProfile(): Promise<UserProfile> {
    return this.request<UserProfile>("/user/profile");
  }
}

export class ApiClientError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

export const api = new ApiClient(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
);
