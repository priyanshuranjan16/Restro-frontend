const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if ((data as any).success !== undefined && (data as any).data !== undefined) {
      return (data as any).data as T;
    }
    return data as T;
  } catch (error: any) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const errorMessage = `Unable to connect to the server. Please ensure the backend is running at ${API_BASE_URL}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
}

export default apiRequest;


