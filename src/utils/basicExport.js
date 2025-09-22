/**
 * 基础导出功能模块
 * 负责常规导出、Canvas生成、文件下载
 */

import html2canvas from "html2canvas";

// 固定导出格式
const FILE_FORMAT = "PNG";

/**
 * Canvas导出和下载功能 - 只接受尺寸信息
 * @param {object} params - 尺寸信息对象
 * @param {HTMLElement} params.element - 要导出的DOM元素
 * @param {number} params.width - 导出宽度
 * @param {number} params.height - 导出高度
 * @param {string} params.backgroundColor - 背景颜色
 * @returns {Promise<void>}
 */
export const exportToCanvas = async (params) => {
  if (!params || !params.width || !params.height || !params.element) {
    throw new Error("尺寸信息或DOM元素无效");
  }

  try {
    console.log("开始生成图片");

    // 让出主线程，确保DOM渲染完成
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 使用html2canvas生成图片
    const canvas = await html2canvas(params.element, {
      backgroundColor: params.backgroundColor || "#f9fafb", // 设置背景颜色
      width: params.width, // 设置导出宽度
      height: params.height, // 设置导出高度
      foreignObjectRendering: true, // 启用foreignObjectRendering
    });

    // 转换为DataURL
    const dataUrl = canvas.toDataURL("image/png");
    console.log("图片生成完毕");

    // 调用下载函数，固定使用PNG格式
    await downloadImage(dataUrl, FILE_FORMAT.toLowerCase());
  } catch (error) {
    throw new Error(`图片生成失败：${error.message || "未知错误"}`);
  }
};

/**
 * 下载Base64图片数据
 * @param {string} dataUrl - Base64格式的图片数据
 * @param {string} format - 图片格式，默认为'png'
 * @returns {Promise<void>}
 */
export const downloadImage = async (dataUrl, format) => {
  try {
    console.log("开始下载流程");
    // 验证dataUrl格式
    if (
      !dataUrl ||
      typeof dataUrl !== "string" ||
      !dataUrl.startsWith("data:")
    ) {
      throw new Error("无效的图片数据格式");
    }

    // 生成带时间戳的文件名
    const timestamp = new Date().toLocaleString();
    const filename = `家谱树导出-${timestamp}`;

    // 创建下载链接
    const link = document.createElement("a");
    link.download = `${filename}.${format}`;
    link.href = dataUrl;

    // 临时添加到DOM中以确保兼容性
    document.body.append(link);

    // 触发下载
    link.click();

    // 清理DOM
    link.remove();

    console.log("下载完成");
  } catch (error) {
    console.error(`下载失败：${error.message || "请重试"}`);
    throw error;
  }
};

/**
 * 基础导出流程 - 适用于小尺寸DOM
 * @param {HTMLElement} element - 要导出的DOM元素
 * @param {string} backgroundColor - 背景颜色，默认为 #f9fafb
 * @returns {Promise<void>}
 */
export const basicExport = async (element, backgroundColor = "#f9fafb") => {
  try {
    console.log("开始基础导出");

    // 让出主线程，确保UI更新完成
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 获取DOM的实际宽高（包括滚动区域外的内容）
    const width = element.scrollWidth;
    const height = element.scrollHeight;
    console.log(`获取到DOM尺寸 - 宽度: ${width}, 高度: ${height}`);

    // 构建尺寸信息对象
    const params = {
      element,
      width: width + 100,
      height: height + 100,
      backgroundColor,
    };

    console.log("准备DOM元素");
    await exportToCanvas(params);
  } catch (error) {
    console.error("基础导出失败:", error);
    throw error;
  }
};

/**
 * 检查DOM尺寸信息
 * @param {HTMLElement} element - DOM元素
 * @returns {object} 尺寸信息
 */
export const getDOMSize = (element) => {
  const width = element.scrollWidth;
  const height = element.scrollHeight;
  const estimatedSize =
    Math.round(((width * height * 4) / 1024 / 1024) * 100) / 100; // 粗略估算MB

  return {
    width,
    height,
    estimatedSize: `${estimatedSize}MB`,
    aspectRatio: Math.round((width / height) * 100) / 100,
  };
};
