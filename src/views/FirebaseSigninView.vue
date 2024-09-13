<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="siginin">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const adminEmail = "admin@admin.com"

const siginin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      if(data.user.email === adminEmail) {
        alert("welcome Admin")
        router.push("/Admin");
      } else {
        
        alert("user Login successful")
        router.push("/");
      }
      console.log("Firebase Register Successful!");
      console.log("user: ", data.user)
      console.log("userData: ", data)
      
    })
    .catch((error) => {
      console.log(error.code);
    });
};
console.log("current auth: ", getAuth())
</script>