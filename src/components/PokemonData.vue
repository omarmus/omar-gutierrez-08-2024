<template>
  <div class="card-pokemon-footer">
    <div><h3>Types:</h3> {{ item.data?.types?.map(type => type.type.name).join(', ') }}</div>    
    <div>
      <h3>Stats:</h3>
      <div v-for="stat in item.data?.stats" :key="stat.stat.name">
        <span class="porcentage-title">{{ useCapitalize(stat.stat.name) }}</span> <div class="porcentage" :style="`width: ${stat.base_stat}px;`"></div>
      </div>
    </div>
    <div v-if="more">
      <h3 v-if="item.data?.height">Height: {{ item.data.height / 10 }} m</h3>
      <h3 v-if="item.data?.weight">Weight: {{ item.data.weight / 10 }} kg</h3>
    </div>
    <div>
      <button
        type="button"
        @click="usePlaySound(item.data?.cries.latest || item.data?.cries.legacy || '')" class="button-audio">🔉</button>
      <button
        v-if="!more"
        type="button"
        @click="storeTeam.removePokemon(item.name)" class="button-remove">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCapitalize, usePlaySound } from '../composables/pokemon'
import { Pokemon } from '../entities/pokemonEntity'
import { useTeamStore } from '../store/team'

defineProps<{ item: Pokemon, more?: boolean }>()

const storeTeam = useTeamStore()
</script>

<style lang="scss">
.card-pokemon-footer {
  h3 {
    margin: 8px 0 2px;
    font-size: 1.1rem;
  }
}
.porcentage-title {
  font-size: 0.8rem;
}
.porcentage {
  background-color: var(--color-primary);
  height: 4px;
}
.button-remove {
  margin-top: 16px;
}
.button-audio {
  margin-top: 16px;
  margin-right: 4px;
}
</style>
