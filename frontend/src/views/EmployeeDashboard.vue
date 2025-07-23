<template>
  <div class="dashboard-container">
    <h2>Employee Dashboard</h2>
    <div class="charts">
      <div class="chart-placeholder">[Your Activity Chart Placeholder]</div>
    </div>
    <h3>My Activity Logs</h3>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Screen Time (min)</th>
          <th>Idle Time (min)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in activity" :key="log._id">
          <td>{{ new Date(log.date).toLocaleDateString() }}</td>
          <td>{{ log.screenTime }}</td>
          <td>{{ log.idleTime }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="simulateActivity">Simulate Activity (Demo)</button>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const activity = ref([]);
const msg = ref('');

const fetchActivity = async () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.get(`http://localhost:5000/api/activity/${user._id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  activity.value = res.data;
};

onMounted(fetchActivity);

const simulateActivity = async () => {
  // Simulate 30 min screen, 10 min idle for today
  const token = localStorage.getItem('token');
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  await axios.post('http://localhost:5000/api/activity', {
    date,
    screenTime: 30,
    idleTime: 10
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  msg.value = 'Activity submitted!';
  fetchActivity();
};
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
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 