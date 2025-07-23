<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  error.value = '';
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email: email.value, password: password.value });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    if (res.data.user.role === 'admin') router.push('/admin');
    else if (res.data.user.role === 'TL') router.push('/tl');
    else router.push('/employee');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed';
  }
};
</script>

<style scoped>
.login-container {
  max-width: 350px;
  margin: 60px auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
}
input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 0.5rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style> 