<template>
  <div class="card-pokemon" @click="redirect(item)">
    <figure>
      <img :src="useImagePokemon(item.url)">
    </figure>
    <h2>{{ useNamePokemon(item.name) }}</h2>
    <span class="select" v-if="selected && !$route.path.includes('/team')">✅</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Pokemon } from '../entities/pokemonEntity'
import { useImagePokemon, useNamePokemon } from '../composables/pokemon'
import { useTeamStore } from '../store/team'

const props = defineProps<{ item: Pokemon }>()

const route = useRoute()
const router = useRouter()
const storeTeam = useTeamStore()

const selected = computed(() => {
  const exist = storeTeam.team.find(item => item.name === props.item.name)
  return !!exist
})

function redirect (item: Pokemon) {
  if (route.path === '/team') {
    router.push(`/team/${item.name}`)
  } else {
    storeTeam.addOrRemovePokemon(item)
  }
}
</script>

<style lang="scss">
.card-pokemon {
  border: 1px solid #555;
  border-radius: 10px; 
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  figure {
    margin: 0;
    width: 120px;
    height: 120px;

    img {
      width: 100%;
    }
  }

  h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .select {
    position: absolute;
    top: 2px;
    right: 7px;
    font-size: 1.4rem;
  }
}
</style>
