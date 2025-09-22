# Vue3 Family Tree Export

一个专注于静态展示的 Vue3 家谱树可视化与导出组件，支持丰富的自定义样式配置和高质量 PNG 图片导出功能，具备智能切片技术支持超大尺寸家谱导出。

## 🚀 特性

- ✅ **Vue3 组合式 API** - 基于最新的 Vue3 技术栈
- ✅ **高度可定制** - 支持字体、颜色、布局等全方位样式配置
- ✅ **静态渲染** - 专注于高效的静态家谱树展示和渲染
- ✅ **智能导出策略** - 根据 DOM 尺寸自动选择最优导出方式
- ✅ **高质量导出** - 支持高清 PNG 图片导出
- ✅ **大尺寸支持** - 智能切片技术支持超大家谱树导出
- ✅ **进度跟踪** - 完整的导出进度监控和回调机制
- ✅ **本地缓存** - IndexedDB 存储支持，提升性能
- ✅ **世系尺显示** - 支持传统家谱世系尺展示
- ✅ **配偶关系** - 完整的配偶信息展示和配置
- ✅ **TypeScript 友好** - 提供完整的类型定义
- ✅ **轻量级设计** - 合理的依赖管理，高性能表现

## 📦 安装

```bash
# npm
npm install vue3-family-tree-export

# yarn
yarn add vue3-family-tree-export

# pnpm
pnpm add vue3-family-tree-export
```

## 🔨 基础使用

### 简单示例

```vue
<template>
  <div>
    <Vue3FamilyTreeExport
      :data="treeData"
      :background-color="backgroundColor"
      @export-success="handleExportSuccess"
      @export-error="handleExportError"
      @export-progress="handleExportProgress"
    />
  </div>
</template>

<script setup>
import Vue3FamilyTreeExport from "vue3-family-tree-export";

// 家族树数据
const treeData = [
  {
    id: 1,
    name: "张三",
    last_name: "张",
    gender: 1, // 1-男，2-女
    shi_dai: "1", // 世代
    ranking: "1", // 排行
    mangdai: 0, // 是否盲代：0-否，1-是
    spouses: [
      {
        id: 101,
        name: "李四",
        last_name: "李",
        gender: 2,
        identity: "妻",
      },
    ],
    children: [
      {
        id: 2,
        name: "张小明",
        last_name: "张",
        gender: 1,
        shi_dai: "2",
        ranking: "1",
        mangdai: 0,
        spouses: [],
        children: [],
      },
    ],
  },
];

// 背景颜色
const backgroundColor = "#f9fafb";

// 导出成功回调
const handleExportSuccess = () => {
  console.log("家谱导出成功！");
  // 可以在这里添加成功提示逻辑
};

// 导出失败回调
const handleExportError = (error) => {
  console.error("家谱导出失败:", error);
  // 可以在这里添加错误处理逻辑
};

// 导出进度回调
const handleExportProgress = (progress) => {
  console.log(`导出进度: ${progress.percentage}% - ${progress.message}`);
  // 可以在这里更新进度条或显示进度信息
};
</script>
```

### 完整配置示例

```vue
<template>
  <div>
    <Vue3FamilyTreeExport
      ref="treeExportRef"
      :data="treeData"
      :ruler-data="rulerData"
      :background-color="backgroundColor"
      :generation-ruler-config="generationRulerConfig"
      :node-config="nodeConfig"
      :spouse-config="spouseConfig"
      :connection-lines-config="connectionLinesConfig"
      :side-config="sideConfig"
      :display-config="displayConfig"
      @export-success="handleExportSuccess"
      @export-error="handleExportError"
      @export-progress="handleExportProgress"
    />

    <!-- 导出 -->
    <button @click="handleManualExport">导出家谱为PNG</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Vue3FamilyTreeExport from "vue3-family-tree-export";

// 组件引用
const treeExportRef = ref(null);

// 家族树数据（同上）
const treeData = [
  /* ... */
];

// 世系尺数据（可选）
const rulerData = [
  { generation: "1", label: "第一代" },
  { generation: "2", label: "第二代" },
  { generation: "3", label: "第三代" },
];

// 背景颜色
const backgroundColor = "#f9fafb";

// 世系尺配置
const generationRulerConfig = {
  generationFontSize: "16px",
  generationFontColor: "#333",
  generationFontWeight: false,
  baiBieFontSize: "16px",
  baiBieFontColor: "#333",
  baiBieFontWeight: false,
};

// 节点样式配置
const nodeConfig = {
  mainNodeFontFamily: "KaiTi, serif",
  mainNodeFontColor: "#000",
  mainNodeFontSize: "16px",
  mainNodeFontWeight: false,
  mainNodeHeight: "70px",
  rankingFontFamily: "KaiTi, serif",
  rankingFontColor: "#666",
  rankingFontSize: "13px",
  rankingFontWeight: false,
};

// 配偶样式配置
const spouseConfig = {
  spouseFontFamily: "KaiTi, serif",
  spouseFontColor: "#444",
  spouseFontSize: "13px",
  spouseFontWeight: false,
  spouseRelationFontFamily: "KaiTi, serif",
  spouseRelationFontColor: "#444",
  spouseRelationFontSize: "12px",
  spouseRelationFontWeight: false,
};

// 连接线配置
const connectionLinesConfig = {
  color: "#f5130b",
  strokeLinecap: "solid",
  thickness: 3,
  verticalLineHeight: 14,
};

// 侧边配置
const sideConfig = {
  mainTitle: "家族世系图",
  mainTitleFontFamily: "鸿雷新书, serif",
  mainTitleFontColor: "#444",
  mainTitleFontSize: "46px",
  mainTitleFontWeight: true,
  mainTitleLetterSpacing: 15,
  intro: "家族世系图承载着深厚的历史文化底蕴...",
  introFontFamily: "临海隶书, serif",
  introFontColor: "#666",
  introFontSize: "18px",
  introFontWeight: false,
  introLetterSpacing: 5,
};

// 显示配置
const displayConfig = {
  showGenerationRuler: true,
  showBaiBie: true,
  showSideBaiBie: false,
  showMainNodeLastName: true,
  showMainNodeRanking: true,
  showSpouses: true,
  showSpouseIdentity: true,
  showTitle: true,
  showIntro: true,
};

// 组件内置的导出方法 使用 html-to-image 库
// 亦可使用第三方库导出
const handleManualExport = async () => {
  if (treeExportRef.value) {
    try {
      await treeExportRef.value.handleExport();
    } catch (error) {
      console.error("导出失败:", error);
    }
  }
};

// 事件处理函数
const handleExportSuccess = () => {
  console.log("家谱导出成功！");
  // 添加成功提示
  alert("家谱导出成功！");
};

const handleExportError = (error) => {
  console.error("家谱导出失败:", error);
  // 添加错误提示
  alert(`家谱导出失败：${error.message}`);
};

const handleExportProgress = (progress) => {
  console.log(`导出进度: ${progress.percentage}% - ${progress.message}`);

  // 根据导出阶段显示不同的进度信息
  if (progress.phase === "slicing") {
    console.log(`正在生成切片: ${progress.current}/${progress.total}`);
  } else if (progress.phase === "uploading") {
    console.log(`正在上传切片到服务器: ${progress.current}/${progress.total}`);
  } else if (progress.phase === "merging") {
    console.log(`正在后端合并图片: ${progress.percentage}%`);
  } else if (progress.phase === "completed") {
    console.log("导出完成！");
  }
};
</script>
```

## 📋 API 文档

### Props

| 参数                    | 类型   | 默认值    | 说明                         |
| ----------------------- | ------ | --------- | ---------------------------- |
| data                    | Array  | []        | 家族树数据数组（必填）       |
| ruler-data              | Array  | []        | 世系尺数据（可选）           |
| background-color        | String | '#f9fafb' | 导出图片的背景颜色           |
| generation-ruler-config | Object | {}        | 世系尺样式配置               |
| node-config             | Object | {}        | 主节点样式配置               |
| spouse-config           | Object | {}        | 配偶节点样式配置             |
| connection-lines-config | Object | {}        | 连接线样式配置               |
| side-config             | Object | {}        | 侧边标题和介绍配置           |
| display-config          | Object | {}        | 显示选项配置（控制显示隐藏） |

### Events

| 事件名          | 说明               | 参数类型 | 参数说明                     |
| --------------- | ------------------ | -------- | ---------------------------- |
| export-success  | 家谱导出成功时触发 | -        | 无参数                       |
| export-error    | 家谱导出失败时触发 | Error    | 错误对象，包含详细的错误信息 |
| export-progress | 导出进度更新时触发 | Object   | 进度对象，包含进度信息       |

#### 进度对象结构

```typescript
interface ExportProgress {
  phase: "slicing" | "uploading" | "merging" | "completed"; // 导出阶段
  current: number; // 当前进度值
  total: number; // 总进度值
  percentage: number; // 进度百分比 (0-100)
  message: string; // 进度描述信息
  result?: any; // 完成时的结果对象（仅在completed阶段）
}
```

## 📊 数据格式

### 树节点数据格式

```typescript
interface TreeNode {
  id: number; // 节点唯一标识
  name: string; // 姓名
  last_name: string; // 姓氏
  gender: 1 | 2; // 性别：1-男，2-女
  shi_dai: string; // 世代标识
  ranking: string; // 排行
  mangdai: 0 | 1; // 是否盲代：0-否，1-是
  spouses?: Spouse[]; // 配偶数组（可选）
  children?: TreeNode[]; // 子节点数组（可选）
}

interface Spouse {
  id: number; // 配偶唯一标识
  name: string; // 配偶姓名
  last_name: string; // 配偶姓氏
  gender: 1 | 2; // 性别：1-男，2-女
  identity: string; // 关系标识：如"妻"、"夫"等
}
```

### 世系尺数据格式

```typescript
interface RulerData {
  generation: string; // 世代标识
  label: string; // 世代显示名称
}
```

## 🎨 配置选项详解

### generation-ruler-config（世系尺配置）

```typescript
interface GenerationRulerConfig {
  generationFontSize?: string; // 世系尺字体大小，默认 "16px"
  generationFontColor?: string; // 世系尺字体颜色，默认 "#333"
  generationFontWeight?: boolean; // 世系尺字体粗细，默认 false
  baiBieFontSize?: string; // 字辈字体大小，默认 "16px"
  baiBieFontColor?: string; // 字辈字体颜色，默认 "#333"
  baiBieFontWeight?: boolean; // 字辈字体粗细，默认 false
}
```

### node-config（主节点配置）

```typescript
interface NodeConfig {
  mainNodeFontFamily?: string; // 主节点字体，默认 "KaiTi, serif"
  mainNodeFontColor?: string; // 主节点字体颜色，默认 "#000"
  mainNodeFontSize?: string; // 主节点字体大小，默认 "16px"
  mainNodeFontWeight?: boolean; // 主节点字体粗细，默认 false
  mainNodeHeight?: string; // 主节点高度，默认 "70px"
  rankingFontFamily?: string; // 排行字体，默认 "KaiTi, serif"
  rankingFontColor?: string; // 排行字体颜色，默认 "#666"
  rankingFontSize?: string; // 排行字体大小，默认 "13px"
  rankingFontWeight?: boolean; // 排行字体粗细，默认 false
}
```

### spouse-config（配偶配置）

```typescript
interface SpouseConfig {
  spouseFontFamily?: string; // 配偶姓名字体，默认 "KaiTi, serif"
  spouseFontColor?: string; // 配偶姓名字体颜色，默认 "#444"
  spouseFontSize?: string; // 配偶姓名字体大小，默认 "13px"
  spouseFontWeight?: boolean; // 配偶姓名字体粗细，默认 false
  spouseRelationFontFamily?: string; // 配偶关系字体，默认 "KaiTi, serif"
  spouseRelationFontColor?: string; // 配偶关系字体颜色，默认 "#444"
  spouseRelationFontSize?: string; // 配偶关系字体大小，默认 "12px"
  spouseRelationFontWeight?: boolean; // 配偶关系字体粗细，默认 false
}
```

### connection-lines-config（连接线配置）

```typescript
interface ConnectionLinesConfig {
  color?: string; // 连接线颜色，默认 "#f5130b"
  strokeLinecap?: string; // 线条端点样式，默认 "solid"
  thickness?: number; // 连接线粗细，默认 3
  verticalLineHeight?: number; // 垂直连接线高度，默认 14
}
```

### side-config（侧边配置）

```typescript
interface SideConfig {
  mainTitle?: string; // 主标题文本，默认 "家族世系图"
  mainTitleFontFamily?: string; // 主标题字体，默认 "鸿雷新书, serif"
  mainTitleFontColor?: string; // 主标题颜色，默认 "#444"
  mainTitleFontSize?: string; // 主标题字体大小，默认 "46px"
  mainTitleFontWeight?: boolean; // 主标题字体粗细，默认 true
  mainTitleLetterSpacing?: number; // 主标题字符间距，默认 15
  intro?: string; // 介绍文本
  introFontFamily?: string; // 介绍文本字体，默认 "临海隶书, serif"
  introFontColor?: string; // 介绍文本颜色，默认 "#666"
  introFontSize?: string; // 介绍文本字体大小，默认 "18px"
  introFontWeight?: boolean; // 介绍文本字体粗细，默认 false
  introLetterSpacing?: number; // 介绍文本字符间距，默认 5
}
```

### display-config（显示配置）

```typescript
interface DisplayConfig {
  showGenerationRuler?: boolean; // 是否显示世系尺，默认 true
  showBaiBie?: boolean; // 是否显示字辈，默认 true
  showSideBaiBie?: boolean; // 是否显示侧边字辈，默认 false
  showMainNodeLastName?: boolean; // 是否显示主节点姓氏，默认 true
  showMainNodeRanking?: boolean; // 是否显示主节点排行，默认 true
  showSpouses?: boolean; // 是否显示配偶，默认 true
  showSpouseIdentity?: boolean; // 是否显示配偶关系，默认 true
  showTitle?: boolean; // 是否显示标题，默认 true
  showIntro?: boolean; // 是否显示介绍，默认 true
}
```

## 🔧 导出功能详解

### 智能导出策略

本组件根据家谱树的实际尺寸自动选择最适合的导出方式：

- **基础导出** - 适用于常规尺寸的家谱树（宽度 ≤ 5000px）
- **切片导出** - 适用于超大尺寸的家谱树（宽度 > 5000px）

### 切片导出配置

```typescript
// 切片配置常量
const SLICE_CONFIG = {
  maxWidth: 5000, // 超过此宽度开始切片
  sliceWidth: 2000, // 每个切片的宽度
  overlapWidth: 20, // 重叠宽度，确保拼接无缝隙
};
```

### 导出 API 使用

```javascript
import {
  exportFamilyTree, // 智能导出函数
  checkSliceRequired, // 检查是否需要切片
  SLICE_CONFIG, // 切片配置
  getDOMSize, // 获取DOM尺寸
  clearAllExportData, // 清理导出数据
} from "vue3-family-tree-export/utils";

// 智能导出（推荐使用）
await exportFamilyTree(
  domElement, // DOM元素
  "#f9fafb", // 背景颜色
  (progress) => {
    // 进度回调
    console.log(`进度: ${progress.percentage}%`);
  }
);

// 检查是否需要切片
const checkResult = checkSliceRequired(domElement);
console.log("检查结果:", checkResult);
// 输出示例:
// {
//   needsSlicing: true,
//   width: 8000,
//   height: 3000,
//   estimatedSlices: 4,
//   estimatedSize: "96MB",
//   recommendation: "建议使用切片导出，预计生成 4 个切片"
// }

// 获取DOM尺寸信息
const sizeInfo = getDOMSize(domElement);
console.log("尺寸信息:", sizeInfo);
// 输出示例:
// {
//   width: 8000,
//   height: 3000,
//   estimatedSize: "96MB",
//   aspectRatio: 2.67
// }
```

### 切片导出流程

1. **切片阶段** - 将大尺寸 DOM 分割为多个可管理的切片
2. **上传阶段** - 模拟将切片上传到后端服务器
3. **合并阶段** - 后端合并所有切片为完整图片
4. **完成阶段** - 提供最终下载链接

### 本地存储管理

切片导出过程中会使用 IndexedDB 进行本地缓存：

```javascript
import {
  getExportStorageInfo,
  clearAllExportData,
} from "vue3-family-tree-export/utils";

// 获取存储信息
const storageInfo = await getExportStorageInfo();
console.log("存储信息:", storageInfo);

// 清理所有导出数据
await clearAllExportData();
console.log("存储数据已清理");
```

## 🛠️ 高级用法

### 自定义导出处理

```vue
<script setup>
const handleExportSuccess = () => {
  // 导出成功后的自定义处理
  console.log("导出成功");

  // 可以添加自定义逻辑：
  // - 显示成功消息
  // - 记录导出日志
  // - 触发其他业务逻辑
};

const handleExportError = (error) => {
  // 导出失败后的错误处理
  console.error("导出失败:", error);

  // 可以添加自定义错误处理：
  // - 显示详细错误信息
  // - 重试机制
  // - 错误上报

  if (error.message.includes("html-to-image")) {
    alert("图片生成失败，请检查网络连接或稍后重试");
  } else {
    alert(`导出失败：${error.message}`);
  }
};
</script>
```

## 🎯 最佳实践

### 1. 数据结构建议

- 确保每个节点都有唯一的 `id`
- 使用标准的性别标识（1-男，2-女）
- 保持世代标识的一致性
- 合理组织层级关系
- 数据应在传入组件前完整准备，避免运行时修改

### 2. 性能优化

- 对于大型家族树，建议预处理数据结构
- 避免过深的嵌套层级（建议不超过 10 层）
- 合理设置节点数量（单层建议不超过 20 个节点）
- 使用智能导出策略，让组件自动选择最优导出方式
- 静态数据渲染性能更佳，避免频繁的数据变更

### 3. 导出优化

- **小型家谱** (宽度 ≤ 5000px) - 自动使用基础导出，速度快
- **大型家谱** (宽度 > 5000px) - 自动使用切片导出，支持超大尺寸
- 建议在导出前使用 `checkSliceRequired()` 检查导出策略
- 监听 `export-progress` 事件，为用户提供进度反馈
- 定期清理本地缓存数据，避免占用过多存储空间

### 4. 样式配置

- 使用系统字体或确保自定义字体已加载
- 保持配色的一致性和可读性
- 合理设置字体大小，确保导出图片的清晰度
- 为超大家谱考虑使用更大的字体以保证切片拼接后的可读性

## 📖 开发指南

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 构建库文件
pnpm run build:lib

# 类型检查
pnpm run type-check
```

## 🐛 问题排查

### 常见问题

1. **导出图片模糊**：检查节点字体大小设置，适当增大字体大小
2. **自定义字体不生效**：确保字体文件已正确加载到页面
3. **数据不显示**：检查数据格式是否正确，确保符合组件接口定义
4. **导出失败**：检查控制台错误信息，通常与 DOM 渲染或网络相关
5. **切片导出缓慢**：大型家谱切片导出需要时间，请耐心等待并关注进度回调
6. **IndexedDB 存储满**：定期清理导出缓存数据，或减少切片尺寸
7. **切片拼接有缝隙**：检查 `overlapWidth` 配置，适当增加重叠区域

### 导出策略建议

- **宽度 < 3000px**：推荐基础导出，速度最快
- **宽度 3000-5000px**：基础导出或切片导出皆可
- **宽度 > 5000px**：强烈建议使用切片导出，避免浏览器内存溢出
- **宽度 > 10000px**：考虑调整切片大小或分批导出

### 调试建议

- 使用浏览器开发工具检查 DOM 结构
- 确认数据格式符合接口定义
- 检查控制台的错误和警告信息
- 使用 `checkSliceRequired()` 检查导出策略
- 监控 IndexedDB 存储使用情况

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Vue3 Family Tree Export** - 让家族传承可视化 🌳
