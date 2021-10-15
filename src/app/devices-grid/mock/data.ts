export interface Device {
  id: number,
  categoryId: number,
  color: string,
  partNumber: number,
  name: string
}

export interface Category {
  id: number,
  name: string
}

export const categoryListMock: Array<Category> = [
  {
    id: 1,
    name: 'Smartphone'
  }
]
