<template>
  <div v-if="pokemon">
    <h1 class="text-gradient center">{{ useCapitalize(pokemon.name) }}</h1>
    <div class="team-pokemon">
      <PokemonCard :item="pokemon" />
      <PokemonData :item="pokemon" :more="true" />
    </div>
    <div v-html="storePokemon.description"></div>
    <div>
      <h2>Evolutions</h2>
      <div class="pokemons">
        <template
          v-for="item in evolutions"
          :key="item.name">
          <PokemonCard :item="item" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCapitalize } from '../composables/pokemon';
import { useTeamStore } from '../store/team'
import PokemonCard from '../components/PokemonCard.vue'
import PokemonData from '../components/PokemonData.vue'
import { usePokemonStore } from '../store/pokemons';

const storeTeam = useTeamStore()
const storePokemon = usePokemonStore()
const route = useRoute()
const router = useRouter()

const pokemon = computed(() => {
  return storeTeam.pokemon
})

const evolutions = computed(() => {
  return storePokemon.evolutions
})

onMounted(() => {
  if (route.params.id) {
    storeTeam.loadTeam(false)
    const pokemon = storeTeam.loadPokemon(route.params?.id as string)
    if (!pokemon) {
      router.push('/')
    }
    if (storeTeam.pokemon?.data?.id) {
      storePokemon.fetchEvolution(storeTeam.pokemon.data.id)
    }
  } else {
    router.push('/')
  }
})

</script>

<style lang="scss">
.team-pokemon {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  justify-content: center;
}
.center {
  text-align: center;
}
</style>