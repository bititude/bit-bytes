/// <reference types="vite/client" />

export const apiEndPoint = (path: string) => {
  return import.meta.env.VITE_API_BASE_URL + path;
};
