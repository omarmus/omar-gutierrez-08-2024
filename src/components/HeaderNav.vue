<template>
  <header class="header">
    <button type="button" class="text-gradient" @click="$router.push('/')">Home</button>
    <button type="button" class="text-gradient" @click="$router.push('/team')">My Team</button>
  </header>
</template>

<style lang="scss" scope>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  background-color: rgb(28, 27, 34);
  
  button {
    font-weight: bold;
    border: 1px solid var(--color-primary);
    border-radius: 30px;
    box-shadow: none;
    padding: 12px 16px;
    font-size: 1.2rem;
  }
}
@media (prefers-color-scheme: light) {
  .header {
    background-color: #e0e0e0;
  }
}
</style>