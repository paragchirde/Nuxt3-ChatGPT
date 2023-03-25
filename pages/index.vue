<template>
  <div class="w-full h-screen overflow-hidden">
    <div
      class="h-full w-full flex flex-col overflow-hidden px-4 lg:container lg:px-0"
    >
      <div class="h-fit flex flex-col w-full justify-center items-center">
        <div class="flex w-full mt-4">
          <span
            class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
          >
            @
          </span>
          <input
            type="text"
            id="website-admin"
            class="rounded-none bg-gray-50 border border-gray-300 text-gray-900 focus:ring-0 focus:border-none block flex-1 min-w-0 w-full text-sm p-4"
            placeholder="Hey Chat GPT, write me a poem on life"
            v-model="message"
          />
          <span
            @click="send()"
            class="inline-flex items-center cursor-pointer px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
          >
            Enter
          </span>
        </div>
      </div>
      <div
        class="h-full w-full border border-gray-200 rounded-md p-6 bg-gray-50 font-light mt-4 overflow-y-scroll"
      >
       
        <div class="w-full"> 
          <div v-for="(c,index) in conversations" :key="index" class="w-full flex flex-col">
            <div class="flex flex-row w-full justify-start items-start space-x-2 p-2 mt-4"> <p class="h-8 w-8 flex justify-center items-center rounded-full bg-gray-300 text-sm">U</p> <p>{{c.q}}</p> </div>
            <div class="flex flex-row  justify-start items-center space-x-2 bg-gray-100 p-2 rounded">  <p >{{c.a}}</p></div>
          </div>
          <div v-if="isLoading">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_SCdC0F.json"
            background="transparent"
            speed="1"
            class="h-24 w-24"
            loop
            autoplay
          ></lottie-player>
        </div>
        </div>
      </div>
      <div
        class="h-fit w-full flex justify-center items-center text-sm font-light pb-2 mt-4"
      >
        Developed by parag
      </div>
    </div>
  </div>
</template>

<script>
import { useMouse } from '@vueuse/core'
import { ref, reactive, computed } from 'vue'
const { x, y } = useMouse()
export default {
  data() {
    return {
      message: '',
      response: '',
      conversations:[],
      runtimeConfig: useRuntimeConfig(),
      isLoading: false,
      isError: false
    }
  },
  methods: {
    async send() {
      this.isLoading = true
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.runtimeConfig.public.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: this.message }],
            temperature: 0.8,
            max_tokens: 512,
            top_p: 1.0,
            stop: ['Human', 'Ai']
          })
        })
        const resp = await res.json()
        this.isLoading = false
        this.response = resp.choices[0].message.content
        this.conversations = [...this.conversations, {q: this.message, a: this.response}]
      } catch (e) {
        this.isLoading = false
        this.isError = true
        console.log('Error: ' + e.message)
      }
    }
  }
}
</script>

<style></style>
