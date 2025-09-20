// 默认配置
export const defaultConfig = {
  // 字体设置
  typography: {
    // 世系尺字体配置
    generationFontSize: "16px",
    generationFontColor: "#333",
    generationFontWeight: false,

    // 字辈字体配置
    baiBieFontSize: "16px",
    baiBieFontColor: "#333",
    baiBieFontWeight: false,

    // 主节点字体配置
    mainNodeFontFamily: "KaiTi, serif",
    mainNodeFontColor: "#000",
    mainNodeFontSize: "16px",
    mainNodeFontWeight: false,
    mainNodeHeight: "70px",

    // 排行字体配置
    rankingFontFamily: "KaiTi, serif",
    rankingFontColor: "#666",
    rankingFontSize: "13px",
    rankingFontWeight: false,

    // 配偶字体配置
    spouseFontFamily: "KaiTi, serif",
    spouseFontColor: "#444",
    spouseFontSize: "13px",
    spouseFontWeight: false,

    // 配偶关系字体配置
    spouseRelationFontFamily: "KaiTi, serif",
    spouseRelationFontColor: "#444",
    spouseRelationFontSize: "12px",
    spouseRelationFontWeight: false,
  },

  // 连接线配置
  connectionLines: {
    color: "#f5130b", // 红色连接线
    strokeLinecap: "solid",
    thickness: 3,
    verticalLineHeight: 14,
  },

  // 显示配置
  display: {
    showGenerationRuler: true,
    showBaiBie: true,
    showSideBaiBie: false,
    showMainNodeLastName: true,
    showMainNodeRanking: true,
    showSpouses: true,
    showSpouseIdentity: true,
    showTitle: true,
    showIntro: true,
  },

  // 侧边配置
  sideConfig: {
    mainTitle: "家族世系图",
    mainTitleFontFamily: "鸿雷新书, serif",
    mainTitleFontColor: "#444",
    mainTitleFontSize: "46px",
    mainTitleFontWeight: true,
    mainTitleLetterSpacing: 15,

    intro:
      "家族世系图承载着深厚的历史文化底蕴，记录着祖先们的智慧与传承。每一个节点都诉说着一段动人的故事，每一条连线都见证着血脉的延续。从远古时代的开枝散叶，到近现代的繁荣昌盛，家族成员们秉承着优良的家风家训，在各自的人生道路上发光发热。这不仅是一份珍贵的族谱记录，更是后代子孙了解根源、传承文化的重要载体。愿我们的家族精神代代相传，荣光永续，让这棵参天大树在历史的长河中茁壮成长，枝繁叶茂。",
    introFontFamily: "临海隶书, serif",
    introFontColor: "#666",
    introFontSize: "18px",
    introFontWeight: false,
    introLetterSpacing: 5,
  },
};

// 配置管理类
class TreeConfigManager {
  constructor() {
    this.config = { ...defaultConfig };
    this.containerHeight = 0;
  }

  // 更新配置
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  // 获取配置
  getConfig() {
    return this.config;
  }

  // 重置配置
  resetConfig() {
    this.config = { ...defaultConfig };
  }
}

// 全局配置实例
export const treeConfig = new TreeConfigManager();
