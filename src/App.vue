<script setup>
import { ref, onMounted } from "vue";
import Vue3FamilyTreeExport from "@/Vue3FamilyTreeExport.vue";
import { mockTreeData } from "@/data/mockData";

// 测试数据
const treeData = ref([]);

// 加载树数据
const loadTreeData = () => {
  // 直接使用mock数据
  treeData.value = mockTreeData;
};

// 导出成功
const handleExportSuccess = () => {
  console.log("导出成功!");
};

// 导出失败
const handleExportError = (error) => {
  console.error("导出失败:", error);
};

// 世系尺配置
const generationRulerConfig = ref({
  fontFamily: "KaiTi, serif", // 世系尺字体样式，默认楷体
  generationFontSize: "18px",
  generationFontColor: "#666",
  generationFontWeight: true,
  baiBieFontSize: "16px",
  baiBieFontColor: "#666",
  baiBieFontWeight: false,
});

// 节点配置
const nodeConfig = ref({
  mainNodeFontFamily: "KaiTi, serif",
  mainNodeFontColor: "#1f2937",
  mainNodeFontSize: "18px",
  mainNodeFontWeight: true,
  mainNodeHeight: "75px",
  rankingFontFamily: "KaiTi, serif",
  rankingFontColor: "#6b7280",
  rankingFontSize: "14px",
  rankingFontWeight: false,
});

// 配偶配置
const spouseConfig = ref({
  spouseFontFamily: "KaiTi, serif",
  spouseFontColor: "#444",
  spouseFontSize: "14px",
  spouseFontWeight: false,
  spouseRelationFontFamily: "KaiTi, serif",
  spouseRelationFontColor: "#444",
  spouseRelationFontSize: "12px",
  spouseRelationFontWeight: true,
});

// 连接线配置
const connectionLinesConfig = ref({
  color: "#ef4444",
  strokeLinecap: "solid",
  thickness: 2.5,
  verticalLineHeight: 16,
});

// 侧边设置配置
const sideConfig = ref({
  mainTitle: "张氏家族世系图",
  mainTitleFontFamily: "鸿雷新书, serif",
  mainTitleFontColor: "#1e3a8a",
  mainTitleFontSize: "48px",
  mainTitleFontWeight: true,
  mainTitleLetterSpacing: 12,
  intro:
    "张氏家族源远流长，世代传承。这份族谱记录了家族成员的血脉关系，承载着深厚的历史文化底蕴。每一个节点都诉说着先祖的智慧与传承，每一条连线都见证着血脉的延续。愿家族精神代代相传，荣光永续。",
  introFontFamily: "临海隶书, serif",
  introFontColor: "#374151",
  introFontSize: "16px",
  introFontWeight: false,
  introLetterSpacing: 3,
});

// 显示配置
const displayConfig = ref({
  showGenerationRuler: true,
  showBaiBie: true,
  showSideBaiBie: false,
  showMainNodeLastName: true,
  showMainNodeRanking: true,
  showSpouses: true,
  showSpouseIdentity: true,
  showTitle: true,
  showIntro: true,
});

// 世系尺数据 - 可选配置，如果不传则根据treeData自动生成
const rulerData = ref([
  { generation: "一世", baiBie: "德" },
  { generation: "二世", baiBie: "仁" },
  { generation: "三世", baiBie: "义" },
  { generation: "四世", baiBie: "礼" },
  { generation: "五世", baiBie: "智" },
  { generation: "六世", baiBie: "信" },
]);

// 初始化时加载数据
onMounted(() => {
  loadTreeData();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 家谱导出组件 -->
    <Vue3FamilyTreeExport
      :data="treeData"
      :ruler-data="rulerData"
      background-color="#f8fafc"
      :generation-ruler-config="generationRulerConfig"
      :node-config="nodeConfig"
      :spouse-config="spouseConfig"
      :connection-lines-config="connectionLinesConfig"
      :side-config="sideConfig"
      :display-config="displayConfig"
      @export-success="handleExportSuccess"
      @export-error="handleExportError"
    />
  </div>
</template>

<style scoped>
/* 自定义样式可以在这里添加 */
</style>
