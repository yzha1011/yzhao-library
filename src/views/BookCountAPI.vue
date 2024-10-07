<template>
  <pre>{{ jsonData }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
// import { getAuth } from 'firebase/auth'
import { onMounted } from 'vue';




const jsonData = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {

    const response = await axios.get('https://countbooks-uu2iump73a-uc.a.run.app', {
    })
    jsonData.value = response.data
    error.value = null
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = err
    // count.value = null
  }
}

onMounted(getBookCount)
</script>

<style scoped></style>
