<script setup>
import { computed } from "vue";
import { treeConfig } from "@/config/treeConfig";

const sideConfig = computed(() => treeConfig.config.sideConfig);
const displayConfig = computed(() => treeConfig.config.display);
</script>

<template>
  <!-- 侧边信息区域 - 包含简介和标题 -->
  <div class="side-info-container">
    <!-- 简介文本 -->
    <div
      v-if="displayConfig.showIntro"
      class="intro-text"
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
      class="main-title"
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
.side-info-container {
  display: flex;
  gap: 24px;
  height: 100%;
  width: fit-content;
  align-items: center;
  height: 50%;
}

.intro-text {
  max-height: 70%;
  line-height: 32px;
  overflow: hidden;
  word-break: break-word;
  word-wrap: break-word;
  writing-mode: vertical-rl;
  direction: ltr;
}

.main-title {
  width: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  writing-mode: vertical-lr;
}
</style>
