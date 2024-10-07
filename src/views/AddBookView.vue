<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    <book-list @selectBook="handleSelectBook"></book-list>
    <update-book :selectedBookId="selectedBookId"></update-book>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import db from '../firebase/init.js'
// import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'
import UpdateBook from '@/components/UpdateBook.vue'
import axios from 'axios'

const isbn = ref('')
const name = ref('')
const selectedBookId = ref('')
// const error = ref(null)

const handleSelectBook = (id) => {
  selectedBookId.value = id
  console.log(selectedBookId.value)
}

const addBook = async () => {
  try {
    const response = await axios.post('https://addbook-uu2iump73a-uc.a.run.app', {
      isbn: Number(isbn.value),
      name: name.value
    })
    alert('Add Book Success')
    // count.value = response.data.count
    console.log('response', response.data)
    // error.value = null
  } catch (err) {
    console.error('Error fetching book count:', err)
  }
}
</script>

<style scoped></style>
