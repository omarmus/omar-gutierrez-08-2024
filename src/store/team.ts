import { defineStore } from 'pinia'
import axios from 'axios'
import { Pokemon } from '../entities/pokemonEntity'

const LIMIT = 6

async function fetchPokemon (name: string) {
  try {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return data.data
  } catch (error) {
    console.log(error)
  }
}

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: [] as Pokemon[],
    pokemon: undefined as Pokemon | undefined
  }),
  actions: {
    addOrRemovePokemon (pokemon: Pokemon) {
      const exist = this.team.find(item => item.name === pokemon.name)

      if (!exist) {
        if (this.team.length < LIMIT) {
          this.team.push(pokemon)
          localStorage.setItem('team', JSON.stringify(this.team))
        }
      } else {
        this.team = this.team.filter(item => item.name !== pokemon.name)
        localStorage.setItem('team', JSON.stringify(this.team))
      }
    },
    removePokemon (name: string) {
      this.team = this.team.filter(item => item.name !== name)
      localStorage.setItem('team', JSON.stringify(this.team))
    },
    async loadTeam (fetch = true) {
      const items = JSON.parse(localStorage.getItem('team') || '')
      if (fetch) {
        for (const key in items) {
          items[key].data = await fetchPokemon(items[key].name)
        }
      }
      this.team = items
    },
    loadPokemon (name: string) {
      this.pokemon = this.team.find(item => item.name === name)
      return this.pokemon
    }
  }
})
