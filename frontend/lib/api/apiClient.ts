import { config } from '../config';

type FetchOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
};

export async function apiClient<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  // Asegurarse de que la endpoint no comience con '/' para evitar doble barra
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Construir la URL completa
  const url = `${config.apiUrl}/${normalizedEndpoint}`;
  
  // Opciones por defecto para fetch
  const fetchOptions: RequestInit = {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...(options?.body && { body: JSON.stringify(options.body) }),
  };

  try {
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}