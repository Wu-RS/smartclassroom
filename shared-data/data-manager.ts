/**
 * 数据管理器 - 使用公共文件存储数据
 */

import { defaultData, type ClassroomData } from './classroom-data'

// 数据存储键名
const DATA_FILE_KEY = 'mindclass_global_data'

/**
 * 获取当前时间字符串
 */
function getTimeKey(): string {
  const now = new Date()
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
}

/**
 * 生成模拟数据
 */
function generateMockData(currentData: ClassroomData): ClassroomData {
  const now = new Date()
  const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
  
  // 随机更新核心指标
  const newMetrics = {
    focusRate: Number((80 + Math.random() * 15).toFixed(1)),
    emotion: currentData.coreMetrics.emotion,
    fatigueCount: Math.floor(Math.random() * 8),
    interactionFreq: Math.floor(8 + Math.random() * 8)
  }
  
  // 添加新的数据点
  const newPoint = {
    time: timeStr,
    percentage: newMetrics.focusRate,
    fatigueCount: newMetrics.fatigueCount
  }
  
  const currentTrend = currentData.focusTrend
  const newTrend = [...currentTrend.slice(1), newPoint]
  
  return {
    ...currentData,
    coreMetrics: newMetrics,
    focusTrend: newTrend,
    lastUpdate: new Date().toISOString()
  }
}

/**
 * 获取全局数据
 */
export function getGlobalData(): ClassroomData {
  if (typeof window === 'undefined') {
    return defaultData
  }
  
  // 尝试从localStorage读取
  const stored = localStorage.getItem(DATA_FILE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse global data:', e)
    }
  }
  
  // 初始化数据
  const initialData = {
    ...defaultData,
    lastUpdate: new Date().toISOString()
  }
  localStorage.setItem(DATA_FILE_KEY, JSON.stringify(initialData))
  return initialData
}

/**
 * 更新全局数据
 */
export function updateGlobalData(data: Partial<ClassroomData>): void {
  if (typeof window === 'undefined') {
    return
  }
  
  const current = getGlobalData()
  const updated = {
    ...current,
    ...data,
    lastUpdate: new Date().toISOString()
  }
  localStorage.setItem(DATA_FILE_KEY, JSON.stringify(updated))
  
  console.log('[DataManager] Data updated:', updated.coreMetrics)
}

/**
 * 启动全局数据模拟（由移动端运行）
 */
export function startGlobalDataSimulation(): () => void {
  console.log('[DataManager] Starting global data simulation...')
  
  const interval = setInterval(() => {
    const current = getGlobalData()
    const newData = generateMockData(current)
    updateGlobalData(newData)
  }, 5000) // 每5秒更新一次
  
  return () => {
    clearInterval(interval)
    console.log('[DataManager] Global data simulation stopped')
  }
}

/**
 * 监听全局数据变化
 */
export function onGlobalDataChange(callback: (data: ClassroomData) => void): () => void {
  let lastData = getGlobalData()
  
  const interval = setInterval(() => {
    const current = getGlobalData()
    if (current.lastUpdate !== lastData.lastUpdate) {
      lastData = current
      console.log('[DataManager] Data change detected:', current.coreMetrics)
      callback(current)
    }
  }, 500) // 每500ms检查一次
  
  return () => clearInterval(interval)
}
