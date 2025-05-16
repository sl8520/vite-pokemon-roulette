<template>
  <!-- 背景圖層（半透明） -->
  <div
    class="absolute inset-0 bg-center bg-cover opacity-40"
    :style="{ backgroundImage: `url(${bgImage})` }"
  />
  <div class="relative grid place-items-center h-screen py-10 text-center">
    <!-- 結果顯示區域 -->
    <div v-if="result" class="w-32 h-18 z-20 bg-white rounded-lg mb-2 shadow-lg text-xl font-bold gap-2">
      <div style="text-align: -webkit-center;" v-html="result.htmlContent" />
    </div>

    <!-- 實際內容層 -->
    <div class="relative z-10">
      <Roulette
        v-if="wheelActive"
        ref="wheel"
        :items="items"
        :first-item-index="firstItemIndex"
        :centered-indicator="wheelSettings.centeredIndicator"
        :indicator-position="wheelSettings.indicatorPosition"
        :size="wheelSettings.size"
        :display-shadow="wheelSettings.displayShadow"
        :display-border="wheelSettings.displayBorder"
        :display-indicator="wheelSettings.displayIndicator"
        :duration="wheelSettings.duration"
        :result-variation="wheelSettings.resultVariation"
        :easing="wheelSettings.easing"
        :counter-clockwise="wheelSettings.counterClockwise"
        :horizontal-content="wheelSettings.horizontalContent"
        :base-display="wheelSettings.baseDisplay"
        :base-size="wheelSettings.baseSize"
        :base-display-indicator="wheelSettings.baseDisplayIndicator"
        :base-display-shadow="wheelSettings.baseDisplayShadow"
        :base-background="wheelSettings.baseBackground"
        @click="launchWheel"
        @wheel-start="wheelStartedCallback"
        @wheel-end="wheelEndedCallback"
      >
        <template #baseContent>
          <div
            v-if="wheelSettings.baseHtmlContent"
            v-html="wheelSettings.baseHtmlContent"
          />
        </template>
      </Roulette>

      <div v-show="result">
        <button class="btn btn-xs mx-2" @click="onResetWheel()">
          Reset
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import Roulette from '@/components/Roulette.vue'
import { audios, pokemonIcons } from '@/utils/glob-direct'
import bgImage from '@/assets/image/background.jpg'

const wheel = ref(null)
const wheelActive = ref(true)
const result = ref()
const wheelSettings = ref({
  centeredIndicator: true,
  indicatorPosition: 'top',
  size: 300,
  displayShadow: true,
  duration: 3,
  resultVariation: 70,
  easing: 'bounce',
  counterClockwise: false,
  horizontalContent: false,
  displayBorder: false,
  displayIndicator: false,
  baseDisplay: true,
  baseSize: 100,
  baseDisplayShadow: true,
  baseDisplayIndicator: true,
  baseBackground: '#eeaacc',
  baseHtmlContent: '<p>Touch</p>',
})
const items = [
  { id: 2, htmlContent: `2 <img src="${pokemonIcons['2']}" class="w-10 h-10">`, textColor: '', background: '' },
  { id: 3, htmlContent: `3 <img src="${pokemonIcons['3']}" class="w-10 h-10">`, textColor: '', background: '' },
  { id: 4, htmlContent: `4 <img src="${pokemonIcons['4']}" class="w-10 h-10">`, textColor: '', background: '' },
  { id: 5, htmlContent: `5 <img src="${pokemonIcons['5']}" class="w-10 h-10">`, textColor: '', background: '' },
  { id: 6, htmlContent: `6 <img src="${pokemonIcons['6']}" class="w-10 h-10">`, textColor: '', background: '' },
  { id: 7, htmlContent: `7 <img src="${pokemonIcons['7']}" class="w-10 h-10">`, textColor: '', background: '' },
  { id: 8, htmlContent: `8 <img src="${pokemonIcons['8']}" class="w-10 h-10">`, textColor: '', background: '' },
  { id: 9, htmlContent: `9 <img src="${pokemonIcons['9']}" class="w-10 h-10">`, textColor: '', background: '' },
]
const firstItemIndex = ref({ value: 0 })
const startAudio = ref()
const stopAudio = ref()
const launchWheel = () => {
  wheel.value.launchWheel()
}

const wheelStartedCallback = () => {
  result.value = null
  startAudio.value = new Audio(audios['start'])

  startAudio.value.loop = true
  startAudio.value.play()

  window.currentAudio = startAudio.value
}

const wheelEndedCallback = resultItem => {
  result.value = resultItem

  // 停止音訊播放
  if (startAudio.value) {
    startAudio.value.pause()
    startAudio.value = null

    stopAudio.value = new Audio(audios['stop'])
    stopAudio.value.play()
  }
}

const onResetWheel = () => {
  wheelActive.value = false
  result.value = null
  setTimeout(() => {
    wheelActive.value = true
  }, 10)
}
</script>
