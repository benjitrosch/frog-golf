module.exports = {
  purge: ['./src/client/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: '#071821',
        white: '#e0f8cf',
        shadow: '#306850',
        mid: '#86c06c',
      },
      fontFamily: {
        sans: ['gameboy', 'rainyhearts', 'minecraftia'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
