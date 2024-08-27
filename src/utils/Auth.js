import {ref} from 'vue'

const isAuthenticated = ref(false)

export function auth() {
  const login = () => {
    isAuthenticated.value = true
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  return {isAuthenticated, login, logout}
}