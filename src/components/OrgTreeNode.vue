<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { treeConfig } from "@/config/treeConfig";
import { getRankingText, getSpouseRanking } from "@/data/mockData";
import { LAYOUT_CONFIG } from "@/config/treeStyles";
import OrgTreeLine from "@/components/OrgTreeLine.vue";

// 组件递归引用自身
defineOptions({
  name: "OrgTreeNode",
});

// Props
const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
});

// 获取字体配置
const typographyConfig = computed(() => treeConfig.config.typography);

// 获取显示配置
const displayConfig = computed(() => treeConfig.config.display);

// 获取连接线配置
const connectionLines = computed(() => treeConfig.config.connectionLines);

// 计算配偶总宽度
const calculateSpousesTotalWidth = () => {
  if (!props.node.spouses || props.node.spouses.length === 0) {
    return 0;
  }

  let totalWidth = 0;
  spouseRefs.value.forEach((spouseRef) => {
    if (spouseRef) {
      // 获取DOM元素（配偶引用应该是DOM元素，但为了保险起见添加保护）
      const spouseElement = spouseRef.$el || spouseRef;
      if (spouseElement && spouseElement.getBoundingClientRect) {
        totalWidth += spouseElement.getBoundingClientRect().width;
      }
    }
  });

  // 添加配偶之间的间距 (配偶数量-1) * spouseGap
  const gapWidth = (props.node.spouses.length - 1) * LAYOUT_CONFIG.spouseGap;
  return totalWidth + gapWidth;
};

// 计算节点的动态padding-left
const mainNodePaddingLeft = computed(() => {
  if (!props.node.spouses || props.node.spouses.length === 0) {
    return 0;
  }

  const spousesTotalWidth = calculateSpousesTotalWidth();
  return LAYOUT_CONFIG.spouseMarginLeft + spousesTotalWidth;
});

// 计算属性 - 用于行内样式绑定
const nodeStyles = computed(() => ({
  spouseGap: `${LAYOUT_CONFIG.spouseGap}px`, // 配偶间距
  spouseMarginLeft: `${LAYOUT_CONFIG.spouseMarginLeft}px`, // 配偶左边距
  childrenGap: `${LAYOUT_CONFIG.childrenGap}px`, // 子节点间距
  mainNodePadding: `0 0 0 ${mainNodePaddingLeft.value}px`, // 主节点内边距：上 右 下 左
  mainNodeHeight: typographyConfig.value.mainNodeHeight, // 主节点高度
}));

// 配偶列表样式计算属性
const spouseListStyle = computed(() => ({
  display: "flex",
  gap: nodeStyles.value.spouseGap,
  marginLeft: nodeStyles.value.spouseMarginLeft,
}));

// 子节点包装器样式计算属性
const childrenWrapperStyle = computed(() => ({
  position: "relative",
  paddingTop: connectionLineHeight.value,
}));

// 子节点容器样式计算属性
const childrenContainerStyle = computed(() => ({
  display: "flex",
  gap: nodeStyles.value.childrenGap,
}));

// 计算连接线总高度：两段垂直连接线高度 + 水平连接线厚度 + 装饰圆点半径
const connectionLineHeight = computed(() => {
  const verticalLineHeight = connectionLines.value.verticalLineHeight * 2;
  const thickness = connectionLines.value.thickness;
  const dotDiameter = LAYOUT_CONFIG.dotDiameter;
  const totalHeight = verticalLineHeight + thickness + dotDiameter;
  return `${totalHeight}px`;
});

// 计算属性
const hasChildren = computed(
  () => props.node.children && props.node.children.length > 0
);

// 获取指定子节点的位置
const getChildPosition = (childIndex) => {
  if (!childrenContainer.value || !childRefs.value[childIndex]) {
    return 0;
  }

  const container = childrenContainer.value;
  const childRef = childRefs.value[childIndex];
  const containerRect = container.getBoundingClientRect();

  // 获取Vue组件的根DOM元素
  const childElement = childRef.$el || childRef;
  const childRect = childElement.getBoundingClientRect();

  return childRect.left - containerRect.left + childRect.width / 2;
};

// DOM引用和响应式数据
const childrenContainer = ref(null);
const childRefs = ref([]);
const containerWidth = ref(0);
const parentCenterX = ref(0);
const nodeContainer = ref(null);
const spouseRefs = ref([]);

// 设置子节点引用
const setChildRef = (el, index) => {
  if (el) {
    childRefs.value[index] = el;
  }
};

// 设置配偶节点引用
const setSpouseRef = (el, index) => {
  if (el) {
    spouseRefs.value[index] = el;
  }
};

// 计算父节点中心位置
const calculateParentCenter = () => {
  if (!nodeContainer.value || !childrenContainer.value) return 0;

  const nodeRect = nodeContainer.value.getBoundingClientRect();
  const containerRect = childrenContainer.value.getBoundingClientRect();
  const nodeCenterX = nodeRect.left + nodeRect.width / 2;

  return nodeCenterX - containerRect.left;
};

// 计算容器相关数据
const calculateContainerData = async () => {
  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 10));

  if (!childrenContainer.value || !hasChildren.value) {
    containerWidth.value = 0;
    parentCenterX.value = 0;
    return;
  }

  const container = childrenContainer.value;
  const containerRect = container.getBoundingClientRect();
  containerWidth.value = containerRect.width;
  parentCenterX.value = calculateParentCenter();
};

// 统一的位置计算触发器
const triggerPositionCalculation = () => {
  if (hasChildren.value) {
    calculateContainerData();
  }
};

// 监听器 - 移除对expand字段的依赖
watch(() => props.node.children, triggerPositionCalculation, { deep: true });

// 生命周期钩子
onMounted(() => {
  triggerPositionCalculation();
});
</script>

<template>
  <div
    class="flex flex-col items-center relative"
    :data-generation="node.shi_dai"
  >
    <!-- 节点内容 -->
    <div ref="nodeContainer" class="relative">
      <!-- 节点 -->
      <div
        class="flex items-center overflow-hidden"
        :style="{
          padding: nodeStyles.mainNodePadding,
          height: nodeStyles.mainNodeHeight,
        }"
      >
        <div class="flex">
          <!-- 节点信息 -->
          <div class="text-left flex justify-center items-end">
            <!-- 姓名 -->
            <div
              class="tracking-wide"
              style="writing-mode: vertical-lr"
              :style="{
                fontFamily: typographyConfig.mainNodeFontFamily,
                color: typographyConfig.mainNodeFontColor,
                fontSize: typographyConfig.mainNodeFontSize,
                fontWeight: typographyConfig.mainNodeFontWeight
                  ? 'bold'
                  : 'normal',
              }"
            >
              <span v-if="node.last_name && displayConfig.showMainNodeLastName">
                {{ node.last_name }}
              </span>
              <span>{{ node.name }}</span>
            </div>

            <!-- 排行信息 -->
            <div
              v-if="node.ranking && displayConfig.showMainNodeRanking"
              class="flex items-center justify-center"
              style="writing-mode: vertical-lr"
              :style="{
                fontFamily: typographyConfig.rankingFontFamily,
                fontSize: typographyConfig.rankingFontSize,
                color: typographyConfig.rankingFontColor,
                fontWeight: typographyConfig.rankingFontWeight
                  ? 'bold'
                  : 'normal',
              }"
            >
              {{ getRankingText(node.ranking, node.gender, node.shi_dai) }}
            </div>
          </div>

          <!-- 配偶信息 -->
          <div
            v-if="
              node.spouses &&
              node.spouses.length > 0 &&
              displayConfig.showSpouses
            "
            class="flex items-end"
            :style="spouseListStyle"
          >
            <div
              v-for="(spouse, index) in node.spouses"
              :key="spouse.id"
              :ref="(el) => setSpouseRef(el, index)"
              class="flex items-end"
              :style="{
                fontFamily: typographyConfig.spouseFontFamily,
                color: typographyConfig.spouseFontColor,
                fontSize: typographyConfig.spouseFontSize,
                fontWeight: typographyConfig.spouseFontWeight
                  ? 'bold'
                  : 'normal',
              }"
            >
              <div class="tracking-wide" style="writing-mode: vertical-lr">
                <span v-if="spouse.last_name">{{ spouse.last_name }}</span>
                <span>{{ spouse.name }}</span>
              </div>
              <div
                class="text-center"
                style="writing-mode: vertical-lr"
                v-if="displayConfig.showSpouseIdentity"
                :style="{
                  fontFamily: typographyConfig.spouseRelationFontFamily,
                  fontSize: typographyConfig.spouseRelationFontSize,
                  color: typographyConfig.spouseRelationFontColor,
                  fontWeight: typographyConfig.spouseRelationFontWeight
                    ? 'bold'
                    : 'normal',
                }"
              >
                {{ getSpouseRanking(spouse) || "配" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 子节点容器 - 显示所有子节点（包括盲代节点），但连接线只连接非盲代节点 -->
    <div v-if="hasChildren" class="relative" :style="childrenWrapperStyle">
      <!-- 子节点容器 -->
      <div
        ref="childrenContainer"
        class="flex items-start"
        :style="childrenContainerStyle"
      >
        <!-- 直接循环渲染子节点组件 -->
        <org-tree-node
          v-for="(child, index) in node.children"
          :key="child.id"
          :ref="(el) => setChildRef(el, index)"
          :node="child"
          class="flex flex-col items-center flex-shrink-0"
        />
      </div>

      <!-- 连接线组件 -->
      <OrgTreeLine
        :parent-center-x="parentCenterX"
        :container-width="containerWidth"
        :children="node.children"
        :get-child-position="getChildPosition"
      />
    </div>
  </div>
</template>

<style scoped>
/* 组件特定样式 */
</style>
