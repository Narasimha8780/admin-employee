<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <input v-model="name" type="text" placeholder="First Name" required />
      <input v-model="lastName" type="text" placeholder="Last Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <select v-model="role" required>
        <option disabled value="">Select Role</option>
        <option value="TL">Team Lead</option>
        <option value="employee">Employee</option>
      </select>
      <select v-if="role === 'employee'" v-model="teamLeadId" required>
        <option disabled value="">Select Team Lead</option>
        <option v-for="tl in tls" :key="tl._id" :value="tl._id">{{ tl.name }} {{ tl.lastName }}</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <router-link to="/">Login</router-link></p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const role = ref('');
const teamLeadId = ref('');
const tls = ref([]);
const error = ref('');
const success = ref('');
const router = useRouter();

watch(role, async (newRole) => {
  if (newRole === 'employee') {
    const res = await axios.get('http://localhost:5000/api/users/tls', { headers: { Authorization: '' } });
    tls.value = res.data;
  }
});

const signup = async () => {
  error.value = '';
  success.value = '';
  try {
    await axios.post('http://localhost:5000/api/auth/signup', {
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      role: role.value,
      teamLeadId: role.value === 'employee' ? teamLeadId.value : null
    });
    success.value = 'Registration successful! You can now login.';
    setTimeout(() => router.push('/'), 1500);
  } catch (err) {
    error.value = err.response?.data?.message || 'Signup failed';
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 350px;
  margin: 60px auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
}
input, select {
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
.success {
  color: green;
  margin-top: 1rem;
}
</style> 