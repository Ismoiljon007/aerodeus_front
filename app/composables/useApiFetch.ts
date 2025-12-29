export async function apiFetch<T>(
  url: string,
  options: any = {},
  headers: any = {},
) {
  try {
    const config = useRuntimeConfig();
    const { locale } = useI18n();
    const mergedParams = {
      ...(options?.params ?? {}),
      lang: locale.value,
    };

    return await $fetch<T>(`${config.public.apiBase}${url}`, {
      ...options,
      params: mergedParams,
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
