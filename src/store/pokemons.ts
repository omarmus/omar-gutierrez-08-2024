import { defineStore } from 'pinia'
import axios from 'axios'
import { Pokemon, Specie } from '../entities/pokemonEntity'

const MAX_POKEMONS = 151
const LIMIT = 25

const extractFlavorTexts = (data: Specie) => {
  if (!data.flavor_text_entries) return ''

  const flavorTexts = data.flavor_text_entries
    .filter(entry => entry.language && entry.language.name === "en")
    .map(entry => entry.flavor_text)

  return flavorTexts.filter((value, index, self) => self.indexOf(value) === index).join(' ')
}

export interface Evolution { 
  species: {
    name: string
  },
  evolves_to: Evolution[]
}

const getSpeciesNames = (chain: Evolution) => {
  let speciesArray: string[] = [];

  const extractSpecies = (evolutionChain: Evolution) => {
    if (evolutionChain) {
      speciesArray.push(evolutionChain.species.name);
      if (evolutionChain.evolves_to.length > 0) {
        evolutionChain.evolves_to.forEach(evolution => extractSpecies(evolution));
      }
    }
  };

  extractSpecies(chain);
  return speciesArray;
};

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Pokemon[],
    offset: 0,
    loading: false,
    evolutions: [] as Pokemon[],
    description: ''
  }),
  actions: {
    async fetchPokemons () {
      if (this.offset <= MAX_POKEMONS && !this.loading) {
        try {
          this.loading = true
          const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${LIMIT}`)
          this.pokemons = [...this.pokemons, ...data.data.results]
          this.offset += LIMIT
          this.loading = false
        } catch (error) {
          console.log(error)
        }
      }
    },
    resetOffset () {
      this.offset = 0
    },
    async fetchEvolution (id: number) {
      try {
        const specie = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        this.description = extractFlavorTexts(specie.data)
        
        if (specie.data.evolution_chain.url) {
          const chain = await axios.get(specie.data.evolution_chain.url)
          const evolutionNames = getSpeciesNames(chain.data.chain)

          const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000`)
          const evolutions : Pokemon[] = []
          evolutionNames.forEach(name => {
            const token = data.data.results.find((item: Pokemon) => item.name === name)
            if (token) {
              evolutions.push(token)
            }
          })
          this.evolutions = evolutions
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
