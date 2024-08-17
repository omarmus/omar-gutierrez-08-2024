export function useIdPokemon (url: string) {
  const tokens = url.split('/')
  return parseInt(tokens[tokens.length - 2], 10)
}

export function useImagePokemon (url: string) {
  const id = useIdPokemon(url)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export function useNamePokemon (name: string) {
  return name.split('-').map(token => token.charAt(0).toUpperCase() + token.substring(1)).join(' ')
}

export function useCapitalize (text: string) {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, ' ')
}

export function usePlaySound (url: string) {
  if (url) {
    const audio = new Audio(url)
    audio.play()
  }
}
