// Mock字辈数据 - 传统家族字辈示例
export const mockBaiBieList = [
  "德",
  "仁",
  "义",
  "礼",
  "智",
  "信",
  "忠",
  "孝",
  "廉",
  "耻",
];

// 常用姓氏列表 - 用于生成随机家族成员
const SURNAMES = [
  "张",
  "王",
  "李",
  "赵",
  "刘",
  "陈",
  "杨",
  "黄",
  "周",
  "吴",
  "徐",
  "孙",
  "马",
  "朱",
  "胡",
  "郭",
  "何",
  "林",
  "罗",
  "高",
];

// 常用男性名字 - 用于生成男性家族成员姓名
const MALE_NAMES = [
  "伟",
  "强",
  "军",
  "明",
  "华",
  "建",
  "国",
  "志",
  "勇",
  "峰",
  "磊",
  "鹏",
  "涛",
  "辉",
  "超",
  "刚",
  "平",
  "文",
  "斌",
  "杰",
  "宇",
  "浩",
  "博",
  "凯",
  "俊",
  "晨",
  "阳",
  "龙",
  "飞",
  "鸿",
  "天",
  "宏",
  "亮",
  "东",
  "南",
  "西",
  "北",
  "春",
  "夏",
  "秋",
];

// 常用女性名字 - 用于生成女性家族成员姓名
const FEMALE_NAMES = [
  "丽",
  "娜",
  "敏",
  "静",
  "秀",
  "美",
  "芳",
  "燕",
  "红",
  "霞",
  "玲",
  "梅",
  "琳",
  "雪",
  "英",
  "华",
  "慧",
  "巧",
  "真",
  "爱",
  "月",
  "凤",
  "花",
  "春",
  "兰",
  "竹",
  "菊",
  "萍",
  "云",
  "珠",
  "晶",
  "妍",
  "婷",
  "雯",
  "琪",
  "嫣",
  "颖",
  "洁",
  "莉",
  "薇",
];

// 配偶身份类型 - 传统家族中配偶的不同身份
const SPOUSE_IDENTITIES = ["妻", "妾", "继室", "填房"];

/**
 * 生成随机中文名字
 * @param {number} gender - 性别 1-男性，2-女性
 * @param {string} surname - 姓氏
 * @returns {string} 生成的名字
 */
const generateName = (gender, surname) => {
  const names = gender === 1 ? MALE_NAMES : FEMALE_NAMES;
  const nameLength = Math.random() < 0.7 ? 1 : 2; // 70%概率单字名，30%概率双字名

  let name = "";
  for (let i = 0; i < nameLength; i++) {
    name += names[Math.floor(Math.random() * names.length)];
  }

  return name;
};

/**
 * 生成配偶信息
 * @param {number} nodeId - 节点ID，用于生成配偶ID
 * @param {string} mainSurname - 主要姓氏，配偶会使用不同的姓氏
 * @returns {object} 配偶对象
 */
const generateSpouse = (nodeId, mainSurname) => {
  const spouseSurnames = SURNAMES.filter((s) => s !== mainSurname);
  const surname =
    spouseSurnames[Math.floor(Math.random() * spouseSurnames.length)];

  return {
    id: nodeId * 1000 + Math.floor(Math.random() * 1000),
    name: generateName(2, surname), // 配偶默认为女性
    last_name: surname,
    gender: 2,
    identity:
      SPOUSE_IDENTITIES[Math.floor(Math.random() * SPOUSE_IDENTITIES.length)],
  };
};

/**
 * 生成家族树数据的函数
 * @param {number} totalNodes - 要生成的节点总数，默认50
 * @returns {Array} 家族树根节点数组
 */
export const generateMockTreeData = (totalNodes = 50) => {
  if (totalNodes < 1) return [];

  const familySurname = SURNAMES[0]; // 使用张姓作为家族姓氏
  let currentId = 1;
  let currentSpouseId = 10000;
  let nodesGenerated = 0;

  // 生成节点
  const generateNode = (generation, parentRanking = 0) => {
    if (nodesGenerated >= totalNodes) return null;

    const nodeId = currentId++;
    nodesGenerated++;

    const gender = Math.random() < 0.6 ? 1 : 2; // 60%概率为男性
    const ranking = parentRanking + 1;

    // 配偶数量：80%概率有1个配偶，15%概率有2个，5%概率没有
    let spousesCount = 0;
    const spouseRand = Math.random();
    if (spouseRand < 0.8) spousesCount = 1;
    else if (spouseRand < 0.95) spousesCount = 2;

    const spouses = [];
    for (let i = 0; i < spousesCount; i++) {
      spouses.push(generateSpouse(currentSpouseId++, familySurname));
    }

    const node = {
      id: nodeId,
      name: generateName(gender, familySurname),
      last_name: familySurname,
      gender,
      shi_dai: generation.toString(),
      ranking: ranking.toString(),
      mangdai: Math.random() < 0.05 ? 1 : 0, // 5%概率为盲代
      spouses,
      children: [],
    };

    // 生成子节点
    if (generation < 6 && nodesGenerated < totalNodes) {
      // 最多6代
      // 子节点数量：根据世代调整概率
      let childrenCount = 0;
      const childRand = Math.random();

      if (generation === 1) {
        // 第一代：2-4个子节点
        childrenCount = Math.floor(Math.random() * 3) + 2;
      } else if (generation === 2) {
        // 第二代：1-3个子节点
        childrenCount = Math.floor(Math.random() * 3) + 1;
      } else if (generation <= 4) {
        // 第三四代：0-3个子节点
        if (childRand < 0.2) childrenCount = 0;
        else if (childRand < 0.5) childrenCount = 1;
        else if (childRand < 0.8) childrenCount = 2;
        else childrenCount = 3;
      } else {
        // 第五代及以后：0-2个子节点
        if (childRand < 0.4) childrenCount = 0;
        else if (childRand < 0.8) childrenCount = 1;
        else childrenCount = 2;
      }

      for (let i = 0; i < childrenCount && nodesGenerated < totalNodes; i++) {
        const child = generateNode(generation + 1, i);
        if (child) {
          node.children.push(child);
        }
      }
    }

    return node;
  };

  // 生成根节点
  const rootNodes = [];
  const rootCount = Math.min(3, Math.ceil(totalNodes / 15)); // 根据总数决定根节点数量

  for (let i = 0; i < rootCount && nodesGenerated < totalNodes; i++) {
    const rootNode = generateNode(1, i);
    if (rootNode) {
      rootNodes.push(rootNode);
    }
  }

  return rootNodes;
};

// 默认的mock数据（50个节点） - 用于组件的默认展示
export const mockTreeData = generateMockTreeData(50);

/**
 * 数字转中文
 * @param {number} num - 要转换的数字
 * @returns {string} 中文数字字符串
 */
export const numberToChinese = (num) => {
  const chineseNumbers = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
  ];
  if (num <= 10) {
    return chineseNumbers[num] || num.toString();
  }
  if (num < 20) {
    return "十" + (num === 10 ? "" : chineseNumbers[num - 10]);
  }
  if (num < 100) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return (
      chineseNumbers[tens] + "十" + (ones === 0 ? "" : chineseNumbers[ones])
    );
  }
  return num.toString();
};

/**
 * 获取排行文本
 * @param {string|number} ranking - 排行数字
 * @param {number} gender - 性别 1-男，2-女
 * @param {string} generation - 世代
 * @returns {string} 格式化的排行文本
 */
export const getRankingText = (ranking, gender, generation) => {
  if (!ranking) return "";

  const genderMap = {
    1: "子", // 男
    2: "女", // 女
  };

  const rankingChinese = numberToChinese(parseInt(ranking));
  return `${genderMap[gender] || ""}${rankingChinese}`;
};

/**
 * 获取配偶排行显示文本
 * @param {object} spouse - 配偶对象
 * @returns {string} 配偶关系文本
 */
export const getSpouseRanking = (spouse) => {
  if (!spouse.identity) return "配";

  const identityMap = {
    妻: "妻",
    妾: "妾",
    继室: "继",
    填房: "填",
  };

  return identityMap[spouse.identity] || spouse.identity;
};
