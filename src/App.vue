<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/final">Final</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: auto;
  padding: 2rem;;
}

.container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 400px;
}

/* Tab styles */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

nav a {
  color: #333;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
}

nav a:hover {
  background-color: #ccc;
}

nav a.active {
  background-color: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
}

/* RouterLink active class */
.router-link-active {
  background-color: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #007f00;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #009f00;
}

</style>
