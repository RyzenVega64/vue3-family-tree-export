<script setup>
import { computed, ref } from "vue";
import { treeConfig } from "@/config/treeConfig";
import { mockBaiBieList, numberToChinese } from "@/data/mockData";
import { LAYOUT_CONFIG } from "@/config/treeStyles";

// Props
const props = defineProps({
  treeData: {
    type: Array,
    required: true,
  },
  rulerData: {
    type: Array,
    default: () => [],
  },
  containerHeight: {
    type: Number,
    default: 0,
  },
});

// 连接线配置
const connectionLinesConfig = computed(() => treeConfig.config.connectionLines);

// 显示配置
const displayConfig = computed(() => treeConfig.config.display);

// 字体配置
const typographyConfig = computed(() => treeConfig.config.typography);

// 世系尺字体样式配置 - 支持自定义，默认为楷体
const rulerFontConfig = computed(() => ({
  fontFamily: "KaiTi, serif", // 默认楷体
  ...typographyConfig.value, // 继承全局配置
  // 如果在generationRulerConfig中有fontFamily配置，则使用该配置
  ...(typographyConfig.value.fontFamily && {
    fontFamily: typographyConfig.value.fontFamily,
  }),
}));

// 世系尺数据计算
const rulerInfo = computed(() => {
  // 如果传入了rulerData，优先使用
  if (props.rulerData && props.rulerData.length > 0) {
    return props.rulerData.map((item, index) => ({
      generation: item.generation || `${numberToChinese(index + 1)}世`,
      baiBie: item.baiBie || "",
    }));
  }

  // 否则根据treeData计算
  const findMaxGeneration = (nodes) => {
    let max = 0;
    nodes.forEach((node) => {
      const generation = Number.parseInt(node.shi_dai) || 0;
      if (generation > max) {
        max = generation;
      }
      if (node.children && node.children.length > 0) {
        const childMax = findMaxGeneration(node.children);
        if (childMax > max) {
          max = childMax;
        }
      }
    });
    return max;
  };

  const maxGen = findMaxGeneration(props.treeData);
  return Array.from({ length: maxGen }, (_, i) => ({
    generation: `${numberToChinese(i + 1)}世`,
    baiBie: mockBaiBieList[i] || "",
  }));
});

// 计算世代间隔
const connectionLineHeight = computed(() => {
  const config = connectionLinesConfig.value;
  const verticalLineHeight = config.verticalLineHeight * 2;
  const thickness = config.thickness;
  const dotDiameter = LAYOUT_CONFIG.dotDiameter;
  const totalHeight = verticalLineHeight + thickness + dotDiameter;
  return `${totalHeight}px`;
});

// 计算wrapper的样式
const wrapperStyle = computed(() => ({
  height: props.containerHeight > 0 ? `${props.containerHeight}px` : "auto", // 容器高度，为0时使用auto
  gap: connectionLineHeight.value, // 世代间隔
}));
</script>

<template>
  <div
    v-if="displayConfig.showGenerationRuler"
    class="generation-ruler-wrapper"
    :style="wrapperStyle"
  >
    <div
      v-for="(item, index) in rulerInfo"
      :key="index"
      class="ruler-item"
      :style="{
        height: treeConfig.config.typography.mainNodeHeight,
      }"
    >
      <!-- 世代文字 -->
      <div
        class="generation-text"
        :style="{
          fontFamily: rulerFontConfig.fontFamily,
          fontSize: typographyConfig.generationFontSize,
          color: typographyConfig.generationFontColor,
          fontWeight: typographyConfig.generationFontWeight ? 'bold' : 'normal',
        }"
      >
        {{ item.generation }}
      </div>

      <!-- 字辈文字 -->
      <div
        v-if="displayConfig.showBaiBie && item.baiBie && item.baiBie.trim()"
        class="baibie-text"
        :style="{
          fontFamily: rulerFontConfig.fontFamily,
          fontSize: typographyConfig.baiBieFontSize,
          color: typographyConfig.baiBieFontColor,
          fontWeight: typographyConfig.baiBieFontWeight ? 'bold' : 'normal',
        }"
      >
        {{ item.baiBie }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.generation-ruler-wrapper {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ruler-item {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 44px;
  overflow: hidden;
  position: relative;
}

.generation-text,
.baibie-text {
  line-height: 1;
  font-size: 14px;
  white-space: nowrap;
  writing-mode: vertical-rl;
}
</style>
