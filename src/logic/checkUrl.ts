
export const isValidUrl = (url: string | undefined | null) => {
  try {
    if (url == null) {
      return false
    }

    new URL(url)
    return true
  } catch(error) {
    return false
  }
}