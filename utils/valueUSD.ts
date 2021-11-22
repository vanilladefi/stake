export default function valueUSD(value: string): string {
  let localeString = (Number(value) ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  if (Number(value) < 0.01) {
    localeString = '<$0.01'
  }
  return localeString
}