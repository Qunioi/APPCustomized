export const useAssets = () => {
  const getImagePath = (path: string) => {
    const base = import.meta.env.BASE_URL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${base}image/${cleanPath}`.replace(/\/\//g, '/')
  }

  const getFilePath = (path: string) => {
    const base = import.meta.env.BASE_URL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${base}documents/${cleanPath}`.replace(/\/\//g, '/')
  }

  const downloadFile = (filename: string, downloadName?: string) => {
    const filePath = getFilePath(filename)
    const link = document.createElement('a')
    link.href = filePath
    link.download = downloadName || filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    getImagePath,
    getFilePath,
    downloadFile
  }
}