<template>
  <h1 class="text-gradient">Pokemon's</h1>
  <div class="pokemons" v-if="pokemons.length > 0">
    <template
      v-for="item in pokemons"
      :key="item.name">
      <PokemonCard :item="item" />
    </template>
  </div>
  <div class="loading" v-show="storePokemon.loading">Loading...</div>
  <div id="sentinel"></div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import PokemonCard from '../components/PokemonCard.vue'
import { usePokemonStore } from '../store/pokemons'
import { useObserver } from '../composables/observer'
import { useTeamStore } from '../store/team'

const storePokemon = usePokemonStore()
const storeTeam = useTeamStore()

const pokemons = computed(() => {
  return storePokemon.pokemons
})

const observer = useObserver(storePokemon.fetchPokemons)

onMounted(async () => {
  storePokemon.resetOffset()
  await storePokemon.fetchPokemons()
  storeTeam.loadTeam(false)

  const sentinel = document.querySelector('#sentinel')
  sentinel && observer.observe(sentinel)
})
</script>
