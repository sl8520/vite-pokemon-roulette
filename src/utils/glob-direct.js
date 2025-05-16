const pokemonFiles = import.meta.glob('../assets/image/pokemon/**/*', {
  as: 'url',
  eager: true,
})

export const pokemonIcons = (() => {
  const icons = {}
  for (const path in pokemonFiles) {
    let key = path.replace('../assets/image/pokemon/', '')
    key = key.split('.')[0]
    icons[key] = pokemonFiles[path]
  }
  return icons
})()

const audioFiles = import.meta.glob('../assets/audio/**/*', {
  as: 'url',
  eager: true,
})

export const audios = (() => {
  const audios = {}
  for (const path in audioFiles) {
    let key = path.replace('../assets/audio/', '')
    key = key.split('.')[0]
    audios[key] = audioFiles[path]
  }
  return audios
})()
