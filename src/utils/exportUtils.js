import * as htmlToImage from "html-to-image";
import { treeConfig } from "../config/treeConfig";

/**
 * 家族树导出工具 - 获取DOM尺寸后调用exportToCanvas
 * @param {HTMLElement} element - 要导出的DOM元素
 * @param {string} backgroundColor - 背景颜色，默认为 #f9fafb
 * @returns {Promise<void>}
 */
export const exportFamilyTree = async (
  element,
  backgroundColor = "#f9fafb"
) => {
  try {
    console.log("开始导出");

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
      backgroundColor, // 传递背景色
    };

    console.log("准备DOM元素");
    // 获取尺寸成功后，调用exportToCanvas
    await exportToCanvas(params);
  } catch (error) {
    console.error("导出失败:", error);
    throw error;
  }
};

// 下载文件格式
const FILE_FORMAT_OPTIONS = {
  png: {
    func: "toPng",
    format: "png",
  },
  jpeg: {
    func: "toJpeg",
    format: "jpeg",
  },
};

/**
 * Canvas导出和下载功能 - 只接受尺寸信息
 * @param {object} params - 尺寸信息对象
 * @param {string} params.backgroundColor - 背景颜色
 * @returns {Promise<void>}
 */
export const exportToCanvas = async (params) => {
  if (!params || !params.width || !params.height || !params.element) {
    throw new Error("尺寸信息或DOM元素无效");
  }

  // 下载文件格式
  const fileFormat = "png";

  // 根据格式获取对应的配置
  const formatConfig = FILE_FORMAT_OPTIONS[fileFormat];
  if (!formatConfig) {
    throw new Error(`不支持的文件格式: ${fileFormat}`);
  }

  try {
    console.log("开始生成图片");

    // 让出主线程，确保DOM渲染完成
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 动态调用对应的htmlToImage函数
    const dataUrl = await htmlToImage[formatConfig.func](params.element, {
      backgroundColor: params.backgroundColor || "#f9fafb", // 背景颜色，优先使用自定义
      width: params.width, // 宽度
      height: params.height, // 高度
      pixelRatio: window.devicePixelRatio || 1, // 像素比
      skipAutoScale: false, // 是否跳过自动缩放
      cacheBust: true, // 是否缓存
      quality: 1, // 固定最高质量（仅JPEG格式生效）
    });
    console.log("图片生成完毕");

    // 调用下载函数，使用对应的格式
    await downloadImage(dataUrl, formatConfig.format);
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
 * 获取树节点容器的高度信息
 * @param {HTMLElement} treeNodesContainer - 树节点容器的DOM元素
 */
export const getContainerHeight = (treeNodesContainer) => {
  if (!treeNodesContainer) return;

  treeConfig.containerHeight = treeNodesContainer.scrollHeight;
};

/**
 * 优化的窗口尺寸监听器 - 窗口尺寸变化时重新计算布局
 * @param {Function} onResize - 窗口变化时的回调函数
 * @param {number} delay - 防抖延迟时间，默认300ms
 * @returns {Function} 清理函数
 */
export const useWindowResize = (onResize, delay = 300) => {
  let resizeTimer = null;

  // 防抖处理的窗口大小变化处理器
  const debouncedHandleResize = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      // 如果传入了回调函数，则执行回调
      if (typeof onResize === "function") {
        onResize();
      }
    }, delay);
  };

  // 设置窗口大小监听器
  window.addEventListener("resize", debouncedHandleResize);

  // 返回清理函数
  return () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
      resizeTimer = null;
    }
    window.removeEventListener("resize", debouncedHandleResize);
  };
};
