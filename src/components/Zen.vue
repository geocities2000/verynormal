<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

// const props = defineProps<{
//     start: number,
//     now: number
// }>()

// data
const startDt = ref(performance.now())
const duration = ref(15 * 60 * 1000)
const elapsed = ref(0)
let handle: number

// methods
const update = () => {
    elapsed.value = performance.now() - startDt.value
    if (elapsed.value >= duration.value) {
        elapsed.value = duration.value
        cancelAnimationFrame(handle)
    } else {
        handle = requestAnimationFrame(update)
    }
}

const startTimer = () => {
    elapsed.value = 0
    startDt.value = performance.now()
    update()
}

// const stopTimer = () => {
//     elapsed.value = 0
//     cancelAnimationFrame(handle)
// }

// computed 
const progressRate = computed(() => {
    return Math.min(elapsed.value / duration.value, 1)
})
const dispTimer = computed(() => {
    return (elapsed.value / 1000).toFixed(2)
})

// events
onUnmounted(() => {
  cancelAnimationFrame(handle)
})

</script>

<template>
    <p>
        <progress :value="progressRate"></progress>
        <h1>{{dispTimer}}</h1>
    </p>
    <button @click="startTimer">Start</button>
</template>