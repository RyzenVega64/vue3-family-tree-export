<script setup>
import { computed } from "vue";
import { treeConfig } from "@/config/treeConfig";

const sideConfig = computed(() => treeConfig.config.sideConfig);
const displayConfig = computed(() => treeConfig.config.display);
</script>

<template>
  <!-- 侧边信息区域 - 包含简介和标题 -->
  <div class="flex gap-6 h-full w-fit items-center h-1/2">
    <!-- 简介文本 -->
    <div
      v-if="displayConfig.showIntro"
      class="leading-8 overflow-hidden break-words break-all"
      style="writing-mode: vertical-rl; direction: ltr"
      :style="{
        fontFamily: sideConfig.introFontFamily,
        color: sideConfig.introFontColor,
        fontSize: sideConfig.introFontSize,
        fontWeight: sideConfig.introFontWeight ? 'bold' : 'normal',
        letterSpacing: `${sideConfig.introLetterSpacing}px`,
      }"
    >
      {{ sideConfig.intro }}
    </div>

    <!-- 标题 -->
    <h1
      v-if="displayConfig.showTitle"
      class="w-24 flex items-center justify-center font-bold"
      style="writing-mode: vertical-lr"
      :style="{
        fontFamily: sideConfig.mainTitleFontFamily,
        color: sideConfig.mainTitleFontColor,
        fontSize: sideConfig.mainTitleFontSize,
        fontWeight: sideConfig.mainTitleFontWeight ? 'bold' : 'normal',
        letterSpacing: `${sideConfig.mainTitleLetterSpacing}px`,
      }"
    >
      {{ sideConfig.mainTitle }}
    </h1>
  </div>
</template>

<style scoped>
/* 组件特定样式 */
</style>
