<template>
  <div v-if="selectedBookId">
    <h1>Update Book</h1>
    <form @submit.prevent="updateBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Update Book</button>
    </form>
    <button @click="removeBook">Remove Book</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore'
import db from '../firebase/init.js'

const props = defineProps(['selectedBookId'])
const isbn = ref('')
const name = ref('')

watch(
  () => props.selectedBookId,
  (newId) => {
    if (newId) {
      getBook(newId)
    }
  }
)

const getBook = async (id) => {
  try {
    const docRef = doc(db, 'books', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      isbn.value = docSnap.data().isbn
      name.value = docSnap.data().name
    } else {
      console.log('No such document')
    }
  } catch (error) {
    console.error('Error getting book: ', error)
  }
}

const updateBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    await setDoc(doc(db, 'books', props.selectedBookId), {
      isbn: isbnNumber,
      name: name.value
    })

    isbn.value = ''
    name.value = ''
    alert('Book updated successfully!')
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}

const removeBook = async () => {
  try {
    await deleteDoc(doc(db, 'books', props.selectedBookId))
    isbn.value = ''
    name.value = ''
    alert('Book removed successfully!')
  } catch (error) {
    console.error('Error removing book: ', error)
  }
}
</script>

<style scoped></style>
