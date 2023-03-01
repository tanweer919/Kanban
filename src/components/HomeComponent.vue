<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoardStore } from 'src/store/board'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdditionPlaceholder from './base/AdditionPlaceholder.vue'
import NewBoardModal from './NewBoardModal.vue'

let boardStore = useBoardStore()
const { boards} = storeToRefs(boardStore)
const showCreateModal = ref(false)
function showModal() {
  showCreateModal.value = true
}
function hideModal() {
  showCreateModal.value = false
}

const router = useRouter()

function goToBoard(index: number) {
  boardStore.$patch(state => {
    state.selectedBoardIndex = index
  })
  router.push('/board')
}

function deleteBoard(id: string) {
  boardStore.$patch(state => {
    const boards = state.boards.filter((e) => e.id !== id)
    state.boards = boards
  })
  boardStore.save()
}
</script>

<template>
  <div class="h-screen p-6 pt-12 -mt-5 flex gap-8">
    <div
      v-for="(board, i) in boards"
      :key="i"
      class="flex justify-start gap-4"
    >
    <div class="flex flex-col w-60 shadow-lg cursor-pointer" @click="goToBoard(i)">
      <div class="bg-[#deeffa] text-[#000] w-full p-4 flex justify-center items-center"><div class="flex-1 flex justify-center">{{ board.name }}</div><span class="text-sm cursor-pointer" @click.stop @click="$event => deleteBoard(board.id)">Delete</span></div>
      <div class="w-full p-4 h-[40vh] flex flex-col justify-center items-center">
        <span class="text-xl">Total stages: {{ board.stages.length }}</span>
        <span class="text-[#808080]">Click to open the board</span>
      </div>
    </div>
  </div>
  <addition-placeholder @click="showModal"/>
  </div>
  <new-board-modal v-show="showCreateModal" @close-modal="hideModal"/>
</template>
