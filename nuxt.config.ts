// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
          title: 'Chat GPT',
          link: [{ rel: 'icon', type: 'image/*', href: '/favicon.svg' }],
          script: [{
            src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'
          }]
        }
      },
      runtimeConfig: {
        public:{
            OPENAI_API_KEY: process.env.OPENAI_API_KEY
        }
    },
    css: ['~/assets/css/main.css'],
    modules: [
        '@vueuse/nuxt',
      ],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
})
