import { basicExport } from "./basicExport.js";
import {
  exportWithSlicing,
  checkSliceRequired,
  SLICE_CONFIG,
} from "./sliceExport.js";

/**
 * 家族树导出工具 - 智能选择导出方式
 * @param {HTMLElement} element - 要导出的DOM元素
 * @param {string} backgroundColor - 背景颜色，默认为 #f9fafb
 * @param {Function} onProgress - 进度回调函数
 * @returns {Promise<void>}
 */
export const exportFamilyTree = async (
  element,
  backgroundColor = "#f9fafb",
  onProgress = null
) => {
  try {
    console.log("开始导出");

    // 让出主线程，确保UI更新完成
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 使用统一的策略选择逻辑
    const checkResult = checkSliceRequired(element);
    console.log(
      `获取到DOM尺寸 - 宽度: ${checkResult.width}, 高度: ${checkResult.height}`
    );

    // 根据检查结果选择导出方式
    if (checkResult.needsSlicing) {
      console.log(
        `宽度 ${checkResult.width}px 超过阈值 ${SLICE_CONFIG.maxWidth}px，启用切片导出`
      );
      await exportWithSlicing(element, backgroundColor, onProgress);
    } else {
      console.log("使用常规导出方式");
      await basicExport(element, backgroundColor);
    }
  } catch (error) {
    console.error("导出失败:", error);
    throw error;
  }
};

// 重新导出常用公共API
export { checkSliceRequired, SLICE_CONFIG } from "./sliceExport.js";
export { getDOMSize } from "./basicExport.js";
export { getExportStorageInfo, clearAllExportData } from "./storageManager.js";

/**
 * 获取树节点容器的高度信息
 * @param {HTMLElement} treeNodesContainer - 树节点容器的DOM元素
 * @returns {number} 容器高度值
 */
export const getContainerHeight = (treeNodesContainer) => {
  if (!treeNodesContainer) {
    console.warn("treeNodesContainer 为空，无法获取高度");
    return 0;
  }

  const height = treeNodesContainer.scrollHeight;
  console.log("获取到树节点容器高度:", height);

  if (height === 0) {
    console.warn("获取到的容器高度为0，可能DOM还未完全渲染");
  }

  return height;
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
