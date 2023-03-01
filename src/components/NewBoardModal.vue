<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Board } from 'src/models/board'
import { useBoardStore } from 'src/store/board'
import { v4 } from 'uuid'
import { ref, defineEmits } from 'vue'

const emit = defineEmits<{
  (eventName: 'closeModal') : void,
}>()
let boardStore = useBoardStore()
const { boards } = storeToRefs(boardStore)
const boardName = ref('')
const error = ref('')
function addBoard() {
  if(boards.value.find((board) => board.name.localeCompare(boardName.value, undefined, {sensitivity: 'accent'}) === 0)) {
    error.value = 'Board name should be unique'
    return
  }
  const newBoard: Board = {
    id: v4(),
    name: boardName.value,
    stages: [
      { name: 'To Do', items: [] },
      { name: 'In Progress', items: [] },
      { name: 'Done', items: [] },
    ],
  }
  boardStore.$patch(state => {
    const boards = [...state.boards]
    boards.push(newBoard)
    state.boards = boards
    state.selectedBoardIndex = -1
  })
  boardStore.save()
  emit('closeModal')
}
</script>
<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto bg-[#00000033]">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-[#fff]">
          <div class="bg-white pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 id="modal-title" class="text-base font-semibold leading-6 text-gray-900">Create new board</h3>
                <div class="mt-2">
                  <input v-model="boardName" class="p-2 w-full text-[#000] border-2 placeholder-gray rounded-md" placeholder="Name of the board"/>
                </div>
                <span v-show="error !== ''" class="text-[#ff0000] text-base flex-1">{{ error }}</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center">
            <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="addBoard">Create</button>
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="$emit('closeModal')">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
