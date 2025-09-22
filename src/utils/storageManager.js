/**
 * 存储管理模块
 * 负责IndexedDB操作、数据持久化、缓存管理
 */

/**
 * IndexedDB 管理器
 */
export class SliceStorage {
  constructor() {
    this.dbName = "FamilyTreeSlices";
    this.version = 1;
    this.storeName = "slices";
    this.db = null;
  }

  /**
   * 初始化数据库
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("exportId", "exportId", { unique: false });
          store.createIndex("sliceIndex", "sliceIndex", { unique: false });
        }
      };
    });
  }

  /**
   * 存储切片数据
   */
  async saveSlice(exportId, sliceIndex, dataUrl, metadata) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const sliceData = {
        exportId,
        sliceIndex,
        dataUrl,
        metadata,
        timestamp: Date.now(),
      };

      const request = store.add(sliceData);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 获取导出任务的所有切片
   */
  async getSlicesByExportId(exportId) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const index = store.index("exportId");
      const request = index.getAll(exportId);

      request.onsuccess = () => {
        const slices = request.result.sort(
          (a, b) => a.sliceIndex - b.sliceIndex
        );
        resolve(slices);
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 清理指定导出任务的切片
   */
  async clearSlices(exportId) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const index = store.index("exportId");
      const request = index.openCursor(exportId);

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 获取存储使用情况
   */
  async getStorageInfo() {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const slices = request.result;
        const totalSize = slices.reduce((size, slice) => {
          return size + (slice.dataUrl ? slice.dataUrl.length : 0);
        }, 0);

        resolve({
          count: slices.length,
          totalSize: Math.round((totalSize / 1024 / 1024) * 100) / 100, // MB
        });
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * 清空所有数据
   */
  async clearAll() {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.clear();
      request.onsuccess = () => {
        console.log("所有导出数据已清理");
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }
}

// 创建存储管理器实例
export const sliceStorage = new SliceStorage();

/**
 * 存储工具函数
 */

/**
 * 获取存储使用情况和切片统计
 * @returns {Promise<object>} 存储信息
 */
export const getExportStorageInfo = async () => {
  try {
    await sliceStorage.init();
    return await sliceStorage.getStorageInfo();
  } catch (error) {
    console.error("获取存储信息失败:", error);
    return { count: 0, totalSize: 0 };
  }
};

/**
 * 清理所有本地存储的切片数据
 * @returns {Promise<void>}
 */
export const clearAllExportData = async () => {
  try {
    await sliceStorage.init();
    await sliceStorage.clearAll();
  } catch (error) {
    console.error("清理数据失败:", error);
    throw error;
  }
};

/**
 * 监控存储空间使用情况
 * @param {number} maxSizeMB - 最大容量限制（MB）
 * @returns {Promise<object>} 监控结果
 */
export const monitorStorageUsage = async (maxSizeMB = 100) => {
  const storageInfo = await getExportStorageInfo();

  return {
    ...storageInfo,
    isOverLimit: storageInfo.totalSize > maxSizeMB,
    usagePercentage: Math.round((storageInfo.totalSize / maxSizeMB) * 100),
    recommendation:
      storageInfo.totalSize > maxSizeMB * 0.8
        ? "建议清理部分数据"
        : "存储空间充足",
  };
};

/**
 * 生成唯一的导出ID
 * @returns {string} 导出ID
 */
export const generateExportId = () => {
  return `export_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
