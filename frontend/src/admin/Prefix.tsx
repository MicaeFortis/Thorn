export interface Prefix {
    id?: number,
    name: string,
      additionalValue: number,
      statistic: string,
}

export function getEmptyPrefix(): Prefix {
    return {
      name: '',
      additionalValue: 0,
      statistic: '',
    }
}