# Vue3 Family Tree Export

一个功能完整的 Vue3 家谱树可视化与导出组件，支持丰富的自定义样式配置和高质量 PNG 图片导出功能。

## 🚀 特性

- ✅ **Vue3 组合式 API** - 基于最新的 Vue3 技术栈
- ✅ **高度可定制** - 支持字体、颜色、布局等全方位样式配置
- ✅ **响应式数据** - 支持数据动态更新和响应式渲染
- ✅ **高质量导出** - 支持高清 PNG 图片导出
- ✅ **世系尺显示** - 支持传统家谱世系尺展示
- ✅ **配偶关系** - 完整的配偶信息展示和配置
- ✅ **TypeScript 友好** - 提供完整的类型定义
- ✅ **无外部依赖** - 轻量级，仅依赖 Vue3 和 html-to-image

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
</script>
```

### 完整配置示例

```vue
<template>
  <div>
    <Vue3FamilyTreeExport
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
    />
  </div>
</template>

<script setup>
import Vue3FamilyTreeExport from "vue3-family-tree-export";

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
  mainTitle: "张氏家族世系图",
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

| 事件名         | 说明               | 参数类型 | 参数说明                     |
| -------------- | ------------------ | -------- | ---------------------------- |
| export-success | 家谱导出成功时触发 | -        | 无参数                       |
| export-error   | 家谱导出失败时触发 | Error    | 错误对象，包含详细的错误信息 |

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

## 🛠️ 高级用法

### 动态更新数据

```vue
<script setup>
import { ref } from "vue";
import Vue3FamilyTreeExport from "vue3-family-tree-export";

const treeData = ref([
  /* 初始数据 */
]);

// 动态添加节点
const addNode = (parentId, newNode) => {
  // 递归查找父节点并添加子节点
  const findAndAdd = (nodes) => {
    for (const node of nodes) {
      if (node.id === parentId) {
        if (!node.children) node.children = [];
        node.children.push(newNode);
        return true;
      }
      if (node.children && findAndAdd(node.children)) {
        return true;
      }
    }
    return false;
  };
  findAndAdd(treeData.value);
};

// 更新节点信息
const updateNode = (nodeId, updates) => {
  const findAndUpdate = (nodes) => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        Object.assign(node, updates);
        return true;
      }
      if (node.children && findAndUpdate(node.children)) {
        return true;
      }
    }
    return false;
  };
  findAndUpdate(treeData.value);
};
</script>
```

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

### 2. 性能优化

- 对于大型家族树，考虑分页或懒加载
- 避免过深的嵌套层级（建议不超过 10 层）
- 合理设置节点数量（单层建议不超过 20 个节点）

### 3. 样式配置

- 使用系统字体或确保自定义字体已加载
- 保持配色的一致性和可读性
- 合理设置字体大小，确保导出图片的清晰度

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
3. **数据不更新**：检查数据格式是否正确，确保响应式更新
4. **导出失败**：检查控制台错误信息，通常与 DOM 渲染或网络相关

### 调试建议

- 使用浏览器开发工具检查 DOM 结构
- 确认数据格式符合接口定义
- 检查控制台的错误和警告信息

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Vue3 Family Tree Export** - 让家族传承可视化 🌳
