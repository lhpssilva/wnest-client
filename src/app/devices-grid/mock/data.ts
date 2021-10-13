export interface Device {
  id: number,
  category: string,
  color: string,
  partNumber: number
}

export const deviceListMock: Array<Device> = [
  {
    id: 1,
    category: 'smartphone',
    color: 'white',
    partNumber: 2
  },
  {
    id: 2,
    category: 'smartphone',
    color: 'black',
    partNumber: 5
  },
  {
    id: 3,
    category: 'Notebook',
    color: 'gray',
    partNumber: 2
  },
  {
    id: 4,
    category: 'Smartwatch',
    color: 'black',
    partNumber: 1
  },
  {
    id: 5,
    category: 'Monitor',
    color: 'black',
    partNumber: 0
  },
  {
    id: 6,
    category: 'Monitor',
    color: 'white',
    partNumber: 0
  },
  {
    id: 7,
    category: 'Smartwatch',
    color: 'green',
    partNumber: 1
  }
];