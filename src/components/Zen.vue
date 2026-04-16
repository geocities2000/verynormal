<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { convertToDuration } from '../utils'

import chimeHigh from '../assets/chime-high.mp3'

// const props = defineProps<{
//     start: number,
//     now: number
// }>()

// data
const startDt = ref(performance.now())
const duration = ref(0 * 60 * 1000)
const elapsed = ref(0)
const paused = ref(false)
let handle: number

const chime = new Audio(chimeHigh)

// methods
const update = () => {
    elapsed.value = performance.now() - startDt.value
    if (elapsed.value >= duration.value) {
        chime.play()
        elapsed.value = duration.value
        cancelAnimationFrame(handle)
    } else {
        handle = requestAnimationFrame(update)
    }
}

const startTimer = (newDurationMin: number) => {
    chime.play()
    duration.value = (newDurationMin * 60 * 1000)
    elapsed.value = 0
    startDt.value = performance.now()
    update()
}

const stopTimer = () => {
    elapsed.value = 0
    duration.value = 0
    cancelAnimationFrame(handle)
}

const pauseTimer = () => {
    paused.value = true
    cancelAnimationFrame(handle)
}

const unpauseTimer = () => {
    paused.value = false
    startDt.value = performance.now() - elapsed.value
    handle = requestAnimationFrame(update)
}

// computed 
const progressRate = computed(() => {
    return Math.min(elapsed.value / duration.value, 1)
})

// events
onUnmounted(() => {
  cancelAnimationFrame(handle)
})

</script>

<template>
    <div v-if="duration">
        <progress :value="progressRate"></progress>
        <h1>{{convertToDuration(elapsed)}} / {{convertToDuration(duration)}}</h1>
    </div>
    <button @click="startTimer(15)">Start (15)</button>
    <button v-if=!paused @click="pauseTimer">Pause</button>
    <button v-else @click="unpauseTimer">Unpause</button>
    <button @click="stopTimer">Stop</button>
</template>