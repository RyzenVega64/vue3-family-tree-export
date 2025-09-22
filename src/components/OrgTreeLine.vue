<script setup>
import { computed } from "vue";
import { treeConfig } from "@/config/treeConfig";
import { LAYOUT_CONFIG } from "@/config/treeStyles";

// Props
const props = defineProps({
  // 父节点中心位置
  parentCenterX: {
    type: Number,
    required: true,
  },
  // 容器宽度
  containerWidth: {
    type: Number,
    required: true,
  },
  // 子节点列表
  children: {
    type: Array,
    required: true,
  },
  // 获取子节点位置的函数
  getChildPosition: {
    type: Function,
    required: true,
  },
});

const connectionLines = computed(() => treeConfig.config.connectionLines);

// 获取连接线厚度
const lineThickness = computed(() => connectionLines.value.thickness || 2);

// 获取垂直连接线高度
const verticalLineHeight = computed(
  () => connectionLines.value.verticalLineHeight
);

// 计算需要显示连接线的子节点（非盲代子节点）
const visibleConnectionChildren = computed(() =>
  props.children.filter((child) => child.mangdai !== 1)
);

// 检查是否有需要显示连接线的子节点
const hasVisibleConnections = computed(
  () => visibleConnectionChildren.value.length > 0
);

// 计算子节点位置信息
const childrenPositions = computed(() => {
  const positions = [];
  props.children.forEach((child, index) => {
    if (child.mangdai !== 1) {
      positions.push({
        id: child.id,
        x: props.getChildPosition(index),
        originalIndex: index,
      });
    }
  });
  return positions;
});

// 计算水平连接线路径（去重重叠线段）
const horizontalConnections = computed(() => {
  if (childrenPositions.value.length === 0) return [];

  const leftMost = Math.min(...childrenPositions.value.map((p) => p.x));
  const rightMost = Math.max(...childrenPositions.value.map((p) => p.x));

  return [
    {
      x1: Math.min(props.parentCenterX, leftMost),
      x2: Math.max(props.parentCenterX, rightMost),
      y: verticalLineHeight.value,
    },
  ];
});

// 计算连接线总高度：两段垂直连接线高度 + 水平连接线厚度 + 装饰圆点半径 + 装饰圆点厚度
const connectionLineHeight = computed(() => {
  return `${
    connectionLines.value.verticalLineHeight * 2 +
    connectionLines.value.thickness +
    LAYOUT_CONFIG.dotDiameter +
    LAYOUT_CONFIG.dotThickness
  }px`;
});

// 计算连接线底部Y坐标（垂直线终点和圆点中心的Y坐标）
const connectionBottomY = computed(() => {
  return (
    verticalLineHeight.value + verticalLineHeight.value + lineThickness.value
  );
});

// 获取线条样式属性
const lineStyleProps = computed(() => ({
  stroke: connectionLines.value.color,
  strokeWidth: lineThickness.value,
  strokeLinecap: connectionLines.value.strokeLinecap,
  strokeDasharray:
    connectionLines.value.strokeLinecap === "dotted" ? "5,5" : "",
}));
</script>

<template>
  <!-- 连接线容器 -->
  <svg
    v-if="hasVisibleConnections && containerWidth > 0"
    class="connection-lines"
    :width="containerWidth"
    :height="connectionLineHeight"
  >
    <!-- 主垂直线（只绘制一次） -->
    <line
      :x1="parentCenterX"
      y1="0"
      :x2="parentCenterX"
      :y2="verticalLineHeight"
      v-bind="lineStyleProps"
    />

    <!-- 水平连接线（避免重叠，只绘制必要的线段） -->
    <line
      v-for="(connection, index) in horizontalConnections"
      :key="`horizontal-${index}`"
      :x1="connection.x1"
      :y1="connection.y"
      :x2="connection.x2"
      :y2="connection.y"
      v-bind="lineStyleProps"
    />

    <!-- 每个子节点的垂直连接线和装饰 -->
    <g v-for="position in childrenPositions" :key="`child-${position.id}`">
      <!-- 子节点垂直连接线 -->
      <line
        :x1="position.x"
        :y1="verticalLineHeight"
        :x2="position.x"
        :y2="connectionBottomY"
        v-bind="lineStyleProps"
      />

      <!-- 连接线底部装饰圆点 -->
      <circle
        :cx="position.x"
        :cy="connectionBottomY"
        :r="LAYOUT_CONFIG.dotDiameter"
        :stroke="connectionLines.color"
        :stroke-width="LAYOUT_CONFIG.dotThickness"
        fill="white"
      />
    </g>
  </svg>
</template>

<style scoped>
.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10;
}
</style>
