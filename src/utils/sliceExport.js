/**
 * 切片导出主功能模块
 * 负责切片导出流程控制、DOM切片处理、后端交互模拟
 */

import * as htmlToImage from "html-to-image";
import { sliceStorage, generateExportId } from "./storageManager.js";

// 切片配置
export const SLICE_CONFIG = {
  maxWidth: 5000, // 超过此宽度开始切片
  sliceWidth: 2000, // 每个切片的宽度
  overlapWidth: 20, // 重叠宽度，确保拼接无缝隙
};

/**
 * DOM 切片器
 */
export class DOMSlicer {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      sliceWidth: options.sliceWidth || SLICE_CONFIG.sliceWidth,
      overlapWidth: options.overlapWidth || SLICE_CONFIG.overlapWidth,
      backgroundColor: options.backgroundColor || "#f9fafb",
    };
  }

  /**
   * 计算切片信息
   */
  calculateSlices() {
    const totalWidth = this.element.scrollWidth;
    const totalHeight = this.element.scrollHeight;
    const sliceWidth = this.options.sliceWidth;
    const overlapWidth = this.options.overlapWidth;

    const slices = [];
    let currentX = 0;
    let sliceIndex = 0;

    while (currentX < totalWidth) {
      const actualWidth = Math.min(sliceWidth, totalWidth - currentX);
      const nextX = currentX + sliceWidth - overlapWidth;

      slices.push({
        index: sliceIndex,
        x: currentX,
        y: 0,
        width: actualWidth,
        height: totalHeight,
        isLastSlice: nextX >= totalWidth,
      });

      currentX = nextX;
      sliceIndex++;

      // 如果是最后一个切片，跳出循环
      if (nextX >= totalWidth) break;
    }

    return {
      totalWidth,
      totalHeight,
      sliceCount: slices.length,
      slices,
    };
  }

  /**
   * 渲染单个切片
   */
  async renderSlice(sliceInfo) {
    const { x, y, width, height } = sliceInfo;

    // 创建临时容器来裁剪视图
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "-9999px";
    tempContainer.style.width = `${width}px`;
    tempContainer.style.height = `${height}px`;
    tempContainer.style.overflow = "hidden";
    tempContainer.style.backgroundColor = this.options.backgroundColor;

    // 克隆原始元素
    const clonedElement = this.element.cloneNode(true);
    clonedElement.style.position = "relative";
    clonedElement.style.left = `-${x}px`;
    clonedElement.style.top = `-${y}px`;

    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    try {
      // 等待DOM更新
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 生成图片
      const dataUrl = await htmlToImage.toPng(tempContainer, {
        backgroundColor: this.options.backgroundColor,
        width: width,
        height: height,
        pixelRatio: window.devicePixelRatio || 1,
        skipAutoScale: false,
        cacheBust: true,
      });

      return dataUrl;
    } finally {
      // 清理临时元素
      document.body.removeChild(tempContainer);
    }
  }
}

/**
 * 后端合并模拟器
 */
export class BackendMerger {
  /**
   * 模拟发送切片到后端
   */
  async sendSlicesToBackend(exportId, slices, onProgress) {
    const totalSlices = slices.length;
    let processedSlices = 0;

    console.log(`开始向后端发送 ${totalSlices} 个切片...`);

    // 模拟分批发送切片
    for (let i = 0; i < slices.length; i++) {
      const slice = slices[i];

      // 模拟网络延迟
      await new Promise((resolve) =>
        setTimeout(resolve, 200 + Math.random() * 300)
      );

      // 模拟发送到后端
      await this.uploadSlice(slice, exportId);

      processedSlices++;

      if (onProgress) {
        onProgress({
          current: processedSlices,
          total: totalSlices,
          percentage: Math.round((processedSlices / totalSlices) * 100),
          message: `正在上传切片 ${processedSlices}/${totalSlices}`,
        });
      }

      console.log(`切片 ${slice.sliceIndex + 1}/${totalSlices} 上传完成`);
    }

    // 模拟后端合并处理
    return await this.mergeSlicesOnBackend(exportId, slices.length, onProgress);
  }

  /**
   * 模拟上传单个切片
   */
  async uploadSlice(slice, exportId) {
    // 这里模拟实际的API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`模拟上传切片 ${slice.sliceIndex} 到后端服务器`);
        resolve({
          success: true,
          sliceId: `${exportId}_slice_${slice.sliceIndex}`,
          uploadTime: Date.now(),
        });
      }, 100);
    });
  }

  /**
   * 模拟后端合并切片
   */
  async mergeSlicesOnBackend(exportId, sliceCount, onProgress) {
    console.log("开始后端合并处理...");

    // 模拟合并进度
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (onProgress) {
        onProgress({
          current: i,
          total: 100,
          percentage: i,
          message: `正在合并图片... ${i}%`,
        });
      }
    }

    // 模拟返回最终下载链接
    const finalImageUrl = `https://api.example.com/download/${exportId}`;

    console.log("后端合并完成，返回下载链接:", finalImageUrl);

    return {
      success: true,
      downloadUrl: finalImageUrl,
      exportId,
      fileSize: "15.2MB",
      mergeTime: Date.now(),
    };
  }
}

// 创建后端合并器实例
export const backendMerger = new BackendMerger();

/**
 * 切片导出处理函数
 * @param {HTMLElement} element - 要导出的DOM元素
 * @param {string} backgroundColor - 背景颜色
 * @param {Function} onProgress - 进度回调函数
 */
export const exportWithSlicing = async (
  element,
  backgroundColor,
  onProgress
) => {
  const exportId = generateExportId();

  try {
    // 初始化存储
    await sliceStorage.init();

    // 创建切片器
    const slicer = new DOMSlicer(element, {
      backgroundColor,
      sliceWidth: SLICE_CONFIG.sliceWidth,
      overlapWidth: SLICE_CONFIG.overlapWidth,
    });

    // 计算切片信息
    const sliceInfo = slicer.calculateSlices();
    console.log(`将生成 ${sliceInfo.sliceCount} 个切片`);

    if (onProgress) {
      onProgress({
        phase: "slicing",
        current: 0,
        total: sliceInfo.sliceCount,
        percentage: 0,
        message: `准备生成 ${sliceInfo.sliceCount} 个切片...`,
      });
    }

    // 生成并存储切片
    const slices = [];
    for (let i = 0; i < sliceInfo.slices.length; i++) {
      const slice = sliceInfo.slices[i];

      if (onProgress) {
        onProgress({
          phase: "slicing",
          current: i + 1,
          total: sliceInfo.sliceCount,
          percentage: Math.round(((i + 1) / sliceInfo.sliceCount) * 30), // 切片阶段占30%
          message: `正在生成切片 ${i + 1}/${sliceInfo.sliceCount}...`,
        });
      }

      console.log(`开始渲染切片 ${i + 1}/${sliceInfo.sliceCount}`);

      // 渲染切片
      const dataUrl = await slicer.renderSlice(slice);

      // 存储到IndexedDB
      const metadata = {
        totalWidth: sliceInfo.totalWidth,
        totalHeight: sliceInfo.totalHeight,
        sliceCount: sliceInfo.sliceCount,
        x: slice.x,
        y: slice.y,
        width: slice.width,
        height: slice.height,
        isLastSlice: slice.isLastSlice,
      };

      await sliceStorage.saveSlice(exportId, i, dataUrl, metadata);

      slices.push({
        sliceIndex: i,
        dataUrl,
        metadata,
      });

      console.log(`切片 ${i + 1} 生成并存储完成`);
    }

    console.log("所有切片生成完成，开始发送到后端");

    // 发送到后端合并
    if (onProgress) {
      onProgress({
        phase: "uploading",
        current: 0,
        total: slices.length,
        percentage: 30,
        message: "开始上传切片到服务器...",
      });
    }

    const mergeResult = await backendMerger.sendSlicesToBackend(
      exportId,
      slices,
      (progress) => {
        if (onProgress) {
          onProgress({
            phase: progress.current < progress.total ? "uploading" : "merging",
            current: progress.current,
            total: progress.total,
            percentage: 30 + Math.round((progress.percentage / 100) * 70), // 上传和合并占70%
            message: progress.message,
          });
        }
      }
    );

    console.log("导出完成:", mergeResult);

    if (onProgress) {
      onProgress({
        phase: "completed",
        current: 100,
        total: 100,
        percentage: 100,
        message: "导出完成！",
        result: mergeResult,
      });
    }

    // 清理本地存储的切片（可选）
    setTimeout(async () => {
      try {
        await sliceStorage.clearSlices(exportId);
        console.log("本地切片数据已清理");
      } catch (error) {
        console.warn("清理本地切片数据失败:", error);
      }
    }, 5000);

    // 模拟下载最终文件
    await simulateDownloadFromBackend(mergeResult.downloadUrl, exportId);
  } catch (error) {
    console.error("切片导出失败:", error);

    // 清理失败的数据
    try {
      await sliceStorage.clearSlices(exportId);
    } catch (cleanupError) {
      console.warn("清理失败数据时出错:", cleanupError);
    }

    throw error;
  }
};

/**
 * 模拟从后端下载最终合并文件
 * @param {string} downloadUrl - 下载链接
 * @param {string} exportId - 导出ID
 */
const simulateDownloadFromBackend = async (downloadUrl, exportId) => {
  console.log("模拟下载最终文件...");

  // 模拟下载延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 创建下载链接（实际项目中这里会是真实的API下载）
  const link = document.createElement("a");
  link.download = `家谱树导出-合并版-${new Date().toLocaleString()}.png`;
  link.href = downloadUrl; // 在实际项目中，这会是真实的文件URL

  // 由于是模拟，我们显示一个提示而不是真实下载
  console.log(`文件下载链接: ${downloadUrl}`);
  alert(
    `导出完成！\n\n下载链接: ${downloadUrl}\n导出ID: ${exportId}\n\n在实际项目中，文件会自动开始下载。`
  );
};

/**
 * 检查DOM是否需要切片导出
 * @param {HTMLElement} element - DOM元素
 * @returns {object} 检查结果
 */
export const checkSliceRequired = (element) => {
  const width = element.scrollWidth;
  const height = element.scrollHeight;
  const needsSlicing = width > SLICE_CONFIG.maxWidth;

  if (needsSlicing) {
    const estimatedSlices = Math.ceil(width / SLICE_CONFIG.sliceWidth);
    const estimatedSize =
      Math.round(((width * height * 4) / 1024 / 1024) * 100) / 100; // 粗略估算MB

    return {
      needsSlicing: true,
      width,
      height,
      estimatedSlices,
      estimatedSize: `${estimatedSize}MB`,
      recommendation: `建议使用切片导出，预计生成 ${estimatedSlices} 个切片`,
    };
  }

  return {
    needsSlicing: false,
    width,
    height,
    recommendation: "可以使用常规导出方式",
  };
};
