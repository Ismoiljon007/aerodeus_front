export async function apiFetch<T>(
  url: string,
  options: any = {},
  headers: any = {},
) {
  try {
    const config = useRuntimeConfig();

    return await $fetch<T>(`${config.public.apiBase}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        ...headers,
      },
    });
  } catch (error: any) {
    if (error.response) {
      console.error('Response error:', error.response);
    }

    throw error;
  }
}
