<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { treeConfig } from "@/config/treeConfig";
import GenerationRuler from "@/components/GenerationRuler.vue";
import OrgTreeNode from "@/components/OrgTreeNode.vue";
import SideInfo from "@/components/SideInfo.vue";
import { exportFamilyTree, getContainerHeight } from "@/utils/exportUtils";

// Props定义
const props = defineProps({
  // 树数据 - 直接传入数据数组
  data: {
    type: Array,
    default: () => [],
  },
  // 世系尺数据 - 可选，如果传入则以此为准
  rulerData: {
    type: Array,
    default: () => [],
  },
  // 背景颜色
  backgroundColor: {
    type: String,
    default: "#f9fafb",
  },
  // 世系尺配置
  generationRulerConfig: {
    type: Object,
    default: () => ({}),
  },
  // 节点配置
  nodeConfig: {
    type: Object,
    default: () => ({}),
  },
  // 配偶配置
  spouseConfig: {
    type: Object,
    default: () => ({}),
  },
  // 连接线配置
  connectionLinesConfig: {
    type: Object,
    default: () => ({}),
  },
  // 侧边设置配置
  sideConfig: {
    type: Object,
    default: () => ({}),
  },
  // 显示配置
  displayConfig: {
    type: Object,
    default: () => ({}),
  },
});

// Emits定义
const emit = defineEmits(["export-success", "export-error"]);

const treeData = ref(props.data);

// 监听data属性的变化，更新内部数据
watch(
  () => props.data,
  (newData) => {
    treeData.value = newData;
  },
  { deep: true }
);

onMounted(() => {
  initComponent();
});

// 初始化配置和容器高度
const initComponent = async () => {
  try {
    // 合并传入的配置到全局配置
    const configUpdates = {};

    if (Object.keys(props.generationRulerConfig).length > 0) {
      configUpdates.typography = {
        ...treeConfig.config.typography,
        ...props.generationRulerConfig,
      };
    }

    if (Object.keys(props.nodeConfig).length > 0) {
      configUpdates.typography = {
        ...(configUpdates.typography || treeConfig.config.typography),
        ...props.nodeConfig,
      };
    }

    if (Object.keys(props.spouseConfig).length > 0) {
      configUpdates.typography = {
        ...(configUpdates.typography || treeConfig.config.typography),
        ...props.spouseConfig,
      };
    }

    if (Object.keys(props.connectionLinesConfig).length > 0) {
      configUpdates.connectionLines = {
        ...treeConfig.config.connectionLines,
        ...props.connectionLinesConfig,
      };
    }

    if (Object.keys(props.sideConfig).length > 0) {
      configUpdates.sideConfig = {
        ...treeConfig.config.sideConfig,
        ...props.sideConfig,
      };
    }

    if (Object.keys(props.displayConfig).length > 0) {
      configUpdates.display = {
        ...treeConfig.config.display,
        ...props.displayConfig,
      };
    }

    // 更新全局配置
    if (Object.keys(configUpdates).length > 0) {
      treeConfig.updateConfig(configUpdates);
    }

    // 等待DOM更新后获取节点高度信息
    await nextTick();
    // 获取容器高度信息
    await getContainerHeight(treeNodesContainerRef.value);
  } catch (error) {
    console.error("初始化组件失败：", error);
  }
};

// 主容器引用
const mainContainerRef = ref(null);
// 树节点容器引用
const treeNodesContainerRef = ref(null);

// 计算容器样式
const containerStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
}));

// 导出
const handleExport = async () => {
  // 如果主容器未找到，则不进行导出
  if (!mainContainerRef.value) {
    const errorMsg = "导出容器未找到";
    console.error(errorMsg);
    emit("export-error", errorMsg);
    return;
  }

  try {
    // 等待DOM更新完成
    await nextTick();

    // 调用封装的导出函数，传递背景色
    await exportFamilyTree(mainContainerRef.value, props.backgroundColor);
    emit("export-success");
  } catch (error) {
    console.error("导出失败：", error);
    emit("export-error", error.message || "导出失败");
  }
};
</script>

<template>
  <div class="w-fit" :style="containerStyle">
    <!-- 主容器 -->
    <div
      ref="mainContainerRef"
      id="target"
      class="flex items-center gap-24 p-12"
    >
      <!-- 固定在左侧的世系尺 -->
      <GenerationRuler :tree-data="treeData" :ruler-data="props.rulerData" />

      <!-- 树节点容器 -->
      <div class="flex items-start gap-36" ref="treeNodesContainerRef">
        <!-- 直接循环渲染根节点组件 -->
        <OrgTreeNode
          v-for="rootNode in treeData"
          :key="rootNode.id"
          :node="rootNode"
          class="flex-shrink-0"
        />
      </div>

      <!-- 侧边信息区域 -->
      <SideInfo />
    </div>
  </div>
</template>

<style scoped></style>
