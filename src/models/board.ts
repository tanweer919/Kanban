export type Board = {
  id: string
  name: string
  stages: Stage[]
}

export type Stage = {
  name: string
  items: Item[]
}

export type Item = {
  id: string
  name: string
  desc: string
  color: string
  updated: number
  created: number
}
