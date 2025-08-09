import axios from "axios";

export type UserProfile = {
  id: string;
  email: string;
  name?: string;
  is_member: boolean;
  membership_date?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

const TOKEN_KEY = "token";

export const saveToken = (token: string) => {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
};

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function register(email: string, password: string, name?: string) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok)
    throw new Error((await res.json()).error || "Registration failed");
  const data = await res.json();
  if (data.token) saveToken(data.token);
  return data as {
    token: string;
    user: { id: string; email: string; name?: string; is_member: boolean };
  };
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Login failed");
  const data = await res.json();
  if (data.token) saveToken(data.token);
  return data as {
    token: string;
    user: {
      id: string;
      email: string;
      name?: string;
      is_member: boolean;
      is_verified: boolean;
    };
  };
}

export async function verifyEmail(token: string, email: string) {
  const res = await fetch(`${BASE_URL}/api/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, email }),
  });
  if (!res.ok)
    throw new Error((await res.json()).error || "Verification failed");
  return (await res.json()) as { message: string };
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Request failed");
  return (await res.json()) as { message: string };
}

export async function resetPassword(
  token: string,
  email: string,
  newPassword: string
) {
  const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, email, newPassword }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Reset failed");
  return (await res.json()) as { message: string };
}

export async function resendVerification(email: string) {
  const res = await fetch(`${BASE_URL}/api/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Request failed");
  return (await res.json()) as { message: string };
}

export async function logout() {
  try {
    await fetch(`${BASE_URL}/api/auth/logout`, { method: "POST" });
  } catch {}
  removeToken();
}

export async function getProfile(): Promise<UserProfile> {
  const headers = new Headers({ "Content-Type": "application/json" });
  const auth = authHeaders();
  if (auth && auth.Authorization) {
    headers.set("Authorization", auth.Authorization);
  }
  const res = await fetch(`${BASE_URL}/api/users/profile`, {
    headers,
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  const data = await res.json();
  const u = data.user || {};
  return {
    id: u.id || u._id,
    email: u.email,
    name: u.name,
    is_member: u.is_member,
    membership_date: u.membership_date,
  } as UserProfile;
}

export async function getMembership(): Promise<{
  is_member: boolean;
  membership_date?: string | null;
}> {
  const headers = new Headers({ "Content-Type": "application/json" });
  const auth = authHeaders();
  if (auth && auth.Authorization) {
    headers.set("Authorization", auth.Authorization);
  }
  const res = await fetch(`${BASE_URL}/api/users/membership`, {
    method: "GET",
    headers,
  });
  if (!res.ok) throw new Error("Failed to fetch membership");
  return (await res.json()) as {
    is_member: boolean;
    membership_date?: string | null;
  };
}

export async function createCheckoutSession(userId: string, email: string) {
  const headers = new Headers({ "Content-Type": "application/json" });
  const auth = authHeaders();
  if (auth && auth.Authorization) {
    headers.set("Authorization", auth.Authorization);
  }
  const res = await fetch(`${BASE_URL}/api/create-checkout-session`, {
    method: "POST",
    headers,
    body: JSON.stringify({ userId, email }),
  });
  if (!res.ok) throw new Error("Failed to create checkout session");
  return (await res.json()) as { sessionId: string; url?: string };
}

export async function verifyPayment(sessionId: string) {
  const headers = new Headers({ "Content-Type": "application/json" });
  const auth = authHeaders();
  if (auth && auth.Authorization) {
    headers.set("Authorization", auth.Authorization);
  }
  const res = await fetch(`${BASE_URL}/api/verify-payment/${sessionId}`, {
    headers,
  });
  if (!res.ok) throw new Error("Failed to verify payment");
  return (await res.json()) as { success: boolean; message?: string };
}
