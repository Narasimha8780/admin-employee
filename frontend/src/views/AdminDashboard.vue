<template>
  <div class="dashboard-container">
    <h2>Admin Dashboard</h2>
    <div class="charts">
      <div class="chart-placeholder">[Pie/Bar Chart Placeholder]</div>
    </div>
    <h3>All Users</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);

onMounted(async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:5000/api/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  users.value = res.data;
});
</script>

<style scoped>
.dashboard-container {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #eee;
  padding: 0.5rem;
  text-align: left;
}
.charts {
  margin-bottom: 2rem;
}
.chart-placeholder {
  height: 200px;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 1.2rem;
}
</style> 