<template>
  <h1 class="text-gradient">My team</h1>
  <div class="pokemons" v-if="pokemons.length > 0">
    <div
      v-for="item in pokemons"
      :key="item.name"
      class="pokemon-data-card">
      <PokemonCard :item="item" />
      <PokemonData :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTeamStore } from '../store/team'
import PokemonCard from '../components/PokemonCard.vue'
import PokemonData from '../components/PokemonData.vue'

const storeTeam = useTeamStore()

const pokemons = computed(() => {
  return storeTeam.team
})

onMounted(async () => {
  storeTeam.loadTeam()
})
</script>

<style lang="scss">
.pokemon-data-card {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
}
</style>
