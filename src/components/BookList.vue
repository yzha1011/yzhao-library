<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }} - {{ book.id }}
        <button @click="selectBook(book.id)">Select</button>
      </li>
    </ul>
  </div>
  <button @click="orderByAscending()">order by ascending</button>
  <button @click="orderByDescending()">order by descending</button>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import db from '../firebase/init.js'

const emit = defineEmits(['selectBook'])
const books = ref([])

const orderByAscending = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1), orderBy('isbn'))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

const orderByDescending = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1),
      orderBy('isbn', 'desc'),
      limit(3)
    )
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

const selectBook = (id) => {
  emit('selectBook', id)
}

const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

fetchBooks()
</script>

<style scoped></style>
