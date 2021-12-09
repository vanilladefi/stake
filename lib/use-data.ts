const cache: Record<any, any> = {}

export default function useData(key: any, fetcher: any) {
  if (!cache[key]) {
    let data: any
    let promise: any
    cache[key] = () => {
      if (data !== undefined) return data
      if (!promise) promise = fetcher().then((r: any) => (data = r))
      throw promise
    }
  }
  return cache[key]()
}
