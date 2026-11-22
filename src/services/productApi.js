const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    let message = `Request gagal dengan status ${response.status}`;
    try {
      const body = await response.json();
      message = body.message || message;
    } catch {
      // Respons error tidak selalu memiliki body JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const productApi = {
  getAll: () => request("/products"),
  create: (product) =>
    request("/products", { method: "POST", body: JSON.stringify(product) }),
  update: (id, product) =>
    request(`/products/${id}`, { method: "PUT", body: JSON.stringify(product) }),
  remove: (id) => request(`/products/${id}`, { method: "DELETE" }),
  reset: () => request("/products/reset", { method: "POST" })
};

export { API_URL };
