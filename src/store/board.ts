import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Board, Stage, Item } from '../models/board'
import { v4 } from 'uuid'
const wrapAttempt = (func: () => void) => {
  try {
    func()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const useBoardStore = defineStore('board', () => {
  const firstBoard: Board = {
    id: v4(),
    name: 'Board 1',
    stages: [
      { name: 'To Do', items: [] },
      { name: 'In Progress', items: [] },
      { name: 'Done', items: [] },
    ],
  }
  const boards = ref<Board[]>([firstBoard])
  const selectedBoardIndex = ref<number>(0)
  const selectedStageIndex = ref<number>(-1)
  const selectedItemIndex = ref<number>(-1)
  const selectedItem = ref<Item | null>(null)
  const ready = ref<boolean>(false)

  function fetch() {
    ready.value = false
    return wrapAttempt(() => {
      const stored = localStorage.getItem('tavle-boards')
      if (stored != null) boards.value = <Board[]>JSON.parse(stored)
      ready.value = true
    })
  }

  function save() {
    return wrapAttempt(() => {
      localStorage.setItem('tavle-boards', JSON.stringify(boards.value))
    })
  }

  function selectItemById(id: string, index: number) {
    boards.value[index].stages.forEach((s, i) => {
      const foundItem = <Item>s.items.find((i) => i.id == id)
      if (foundItem) {
        selectedStageIndex.value = i
        selectedItemIndex.value = s.items.indexOf(foundItem)
        selectedItem.value = foundItem
        return foundItem
      }
    })
  }

  return {
    boards,
    selectedBoardIndex,
    selectedStageIndex,
    selectedItemIndex,
    selectedItem,
    ready,
    fetch,
    save,
    selectItemById,
  }
})
