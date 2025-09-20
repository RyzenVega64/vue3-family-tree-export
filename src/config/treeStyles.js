// 布局配置 - 静态不可编辑数据
export const LAYOUT_CONFIG = {
  childrenGap: 68, // 子节点之间的间距
  spouseMarginLeft: 6, // 子节点与配偶之间的间距
  spouseGap: 6, // 配偶之间的间距
  dotDiameter: 4, // 装饰圆点半径
  dotThickness: 2, // 装饰圆点厚度
};

// 排序类型选项
export const ORDER_TYPE_OPTIONS = [
  { label: '默认排行', value: 1 },
  { label: '录入顺序', value: 2 },
];

// 分组选项
export const GROUP_OPTIONS = [
  { label: '世系尺设置', value: 'generation' },
  { label: '连接线设置', value: 'connection' },
  { label: '节点设置', value: 'node' },
  { label: '配偶设置', value: 'spouse' },
  { label: '侧边设置', value: 'side' },
  { label: '显示选项', value: 'display' },
];

// 字体选项常量
export const FONT_FAMILY_OPTIONS = [
  { label: '宋体', value: 'SimSun, serif' },
  { label: '黑体', value: 'SimHei, sans-serif' },
  { label: '微软雅黑', value: 'Microsoft YaHei, sans-serif' },
  { label: '仿宋', value: 'FangSong, serif' },
  { label: '楷体', value: 'KaiTi, serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: '心意吉祥宋', value: '心意吉祥宋, serif' },
  { label: '江西拙楷', value: '江西拙楷, serif' },
  { label: '钉钉进步体', value: '钉钉进步体, sans-serif' },
  { label: '鸿雷板书简体', value: '鸿雷板书简体, serif' },
  { label: '鸿雷新书', value: '鸿雷新书, serif' },
  { label: '临海隶书', value: '临海隶书, serif' },
  { label: '思源宋体', value: 'Source Han Serif SC, serif' },
];

// 节点字体大小选项
export const MAIN_NODE_FONT_SIZE_OPTIONS = [
  { label: '10px', value: '10px' },
  { label: '11px', value: '11px' },
  { label: '12px', value: '12px' },
  { label: '13px', value: '13px' },
  { label: '14px', value: '14px' },
  { label: '15px', value: '15px' },
  { label: '16px', value: '16px' },
  { label: '17px', value: '17px' },
  { label: '18px', value: '18px' },
  { label: '19px', value: '19px' },
  { label: '20px', value: '20px' },
  { label: '21px', value: '21px' },
  { label: '22px', value: '22px' },
  { label: '23px', value: '23px' },
  { label: '24px', value: '24px' },
];

// 配偶字体大小选项
export const SPOUSE_FONT_SIZE_OPTIONS = [
  { label: '10px', value: '10px' },
  { label: '11px', value: '11px' },
  { label: '12px', value: '12px' },
  { label: '13px', value: '13px' },
  { label: '14px', value: '14px' },
  { label: '15px', value: '15px' },
  { label: '16px', value: '16px' },
  { label: '17px', value: '17px' },
  { label: '18px', value: '18px' },
  { label: '19px', value: '19px' },
  { label: '20px', value: '20px' },
  { label: '21px', value: '21px' },
  { label: '22px', value: '22px' },
  { label: '23px', value: '23px' },
  { label: '24px', value: '24px' },
];

// 标题字体大小选项
export const MAIN_TITLE_FONT_SIZE_OPTIONS = [
  { label: '24px', value: '24px' },
  { label: '26px', value: '26px' },
  { label: '28px', value: '28px' },
  { label: '30px', value: '30px' },
  { label: '32px', value: '32px' },
  { label: '34px', value: '34px' },
  { label: '36px', value: '36px' },
  { label: '38px', value: '38px' },
  { label: '40px', value: '40px' },
  { label: '42px', value: '42px' },
  { label: '44px', value: '44px' },
  { label: '46px', value: '46px' },
  { label: '48px', value: '48px' },
  { label: '50px', value: '50px' },
  { label: '52px', value: '52px' },
  { label: '54px', value: '54px' },
  { label: '56px', value: '56px' },
  { label: '58px', value: '58px' },
  { label: '60px', value: '60px' },
];

// 副标题字体大小选项
export const SUB_TITLE_FONT_SIZE_OPTIONS = [
  { label: '14px', value: '14px' },
  { label: '15px', value: '15px' },
  { label: '16px', value: '16px' },
  { label: '17px', value: '17px' },
  { label: '18px', value: '18px' },
  { label: '19px', value: '19px' },
  { label: '20px', value: '20px' },
  { label: '21px', value: '21px' },
  { label: '22px', value: '22px' },
  { label: '23px', value: '23px' },
  { label: '24px', value: '24px' },
  { label: '25px', value: '25px' },
  { label: '26px', value: '26px' },
  { label: '27px', value: '27px' },
  { label: '28px', value: '28px' },
  { label: '29px', value: '29px' },
  { label: '30px', value: '30px' },
];

// 连接线厚度选项
export const CONNECTION_LINE_THICKNESS_OPTIONS = [
  { label: '1', value: 1 },
  { label: '1.5', value: 1.5 },
  { label: '2', value: 2 },
  { label: '2.5', value: 2.5 },
  { label: '3', value: 3 },
  { label: '3.5', value: 3.5 },
  { label: '4', value: 4 },
  { label: '4.5', value: 4.5 },
  { label: '5', value: 5 },
];

// 垂直连接线高度选项
export const VERTICAL_LINE_HEIGHT_OPTIONS = [
  { label: '10', value: 10 },
  { label: '11', value: 11 },
  { label: '12', value: 12 },
  { label: '13', value: 13 },
  { label: '14', value: 14 },
  { label: '15', value: 15 },
  { label: '16', value: 16 },
  { label: '17', value: 17 },
  { label: '18', value: 18 },
  { label: '19', value: 19 },
  { label: '20', value: 20 },
  { label: '21', value: 21 },
  { label: '22', value: 22 },
  { label: '23', value: 23 },
  { label: '24', value: 24 },
  { label: '25', value: 25 },
  { label: '26', value: 26 },
  { label: '27', value: 27 },
  { label: '28', value: 28 },
  { label: '29', value: 29 },
  { label: '30', value: 30 },
];

// 节点高度
export const MAIN_NODE_HEIGHT_OPTIONS = [
  { label: '60px', value: '60px' },
  { label: '62px', value: '62px' },
  { label: '64px', value: '64px' },
  { label: '66px', value: '66px' },
  { label: '68px', value: '68px' },
  { label: '70px', value: '70px' },
  { label: '72px', value: '72px' },
  { label: '74px', value: '74px' },
  { label: '76px', value: '76px' },
  { label: '78px', value: '78px' },
  { label: '80px', value: '80px' },
  { label: '82px', value: '82px' },
  { label: '84px', value: '84px' },
  { label: '86px', value: '86px' },
  { label: '88px', value: '88px' },
  { label: '90px', value: '90px' },
];
