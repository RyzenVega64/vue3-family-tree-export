<script setup>
import { computed, onMounted, ref } from "vue";
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
});

// 容器高度信息
const containerHeight = computed(() => treeConfig.containerHeight);

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
  const verticalHeight = connectionLinesConfig.value.verticalLineHeight * 2; // 两段垂直连接线高度
  const thickness = connectionLinesConfig.value.thickness; // 水平连接线厚度
  const dotDiameter = LAYOUT_CONFIG.dotDiameter; // 装饰圆点半径
  const totalGap = verticalHeight + thickness + dotDiameter; // 总间隔
  return `${totalGap}px`;
});

// 计算wrapper的样式
const wrapperStyle = computed(() => ({
  height: `${containerHeight.value}px`, // 容器高度
  gap: connectionLineHeight.value, // 世代间隔
}));
</script>

<template>
  <div
    v-if="displayConfig.showGenerationRuler"
    class="sticky top-0 left-0 z-10 flex flex-col items-center"
    :style="wrapperStyle"
  >
    <div
      v-for="(item, index) in rulerInfo"
      :key="index"
      class="flex items-center gap-1 min-w-11 overflow-hidden relative"
      :style="{
        height: treeConfig.config.typography.mainNodeHeight,
      }"
    >
      <!-- 世代文字 -->
      <div
        class="leading-none text-sm whitespace-nowrap"
        style="writing-mode: vertical-rl"
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
        class="leading-none text-sm whitespace-nowrap"
        style="writing-mode: vertical-rl"
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
/* 组件特定样式 */
</style>
