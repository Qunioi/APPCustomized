export const useImagePath = () => {
  const getImagePath = (path: string) => {
    const base = import.meta.env.BASE_URL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${base}image/${cleanPath}`.replace(/\/\//g, '/')
  }

  return {
    getImagePath
  }
}