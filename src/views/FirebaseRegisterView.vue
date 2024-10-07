<template>
  <WebLoader :is-loading="isLoading" />
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import WebLoader from "@/components/WebLoader.vue";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const isLoading = ref(false); 

const register = () => {
  isLoading.value = true;
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Register Successful!");
      console.log("userData: ", data)
      console.log("user: ", data.user)
      alert("Firebase Register Successful!")
      isLoading.value = false;
      router.push("/FireLogin");
    })
    .catch((error) => {
      console.log(error.code);
      isLoading.value = false;
    });
};
</script>