<template>
  <div id="app">
    <h1>Book Count</h1>
    <button @click="getBookCount">Get book count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getAuth } from 'firebase/auth'

const getIdToken = async () => {
  const user = getAuth().currentUser
  if (user) {
    return await user.getIdToken()
  } else {
    throw new Error('User not authenticated')
  }
}

// 定义 count 和 error 作为响应式引用
const count = ref(null)
const error = ref(null)

// 异步获取书籍数量的函数
const getBookCount = async () => {
  try {
    const token = await getIdToken() // 假设你有一个函数获取 ID Token

    const response = await axios.get('https://countbooks-uu2iump73a-uc.a.run.app', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    count.value = response.data.count
    error.value = null
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = err
    count.value = null
  }
}
</script>

<style scoped></style>
