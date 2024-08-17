export interface Pokemon {
  name: string
  url: string
  data?: DataPokemon
}

interface DataPokemon {
  id: number
  types: {
    type: {
      name: string
    }
  }[],
  stats: {
    base_stat: number,
    effort: number,
    stat: {
      name: string,
    }
  }[],
  cries: {
    latest: string
    legacy: string
  },
  height: number
  weight: number
  species: {
    name: string
    url: string
  }
}

export interface Specie {
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
  }[],
  evolution_chain: {
    url: string
  }
}
