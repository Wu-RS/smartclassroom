/**
 * 共享课堂数据存储
 * 用于在移动端(mindclass-app)和PC端(smart-classroom)之间共享数据
 */

// 核心指标数据接口
export interface CoreMetrics {
  focusRate: number
  emotion: string
  fatigueCount: number
  interactionFreq: number
}

// 专注度数据点
export interface FocusDataPoint {
  time: string
  percentage: number
  fatigueCount: number
}

// 情感分布数据
export interface EmotionData {
  name: string
  value: number
  color: string
}

// 学生座位状态
export interface SeatStatus {
  index: number
  status: 0 | 1 | 2  // 0:专注, 1:疲劳, 2:正常
}

// 预警信息
export interface AlertItem {
  id: number
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  time: string
}

// 学生信息
export interface StudentInfo {
  id: number
  name: string
  gender: string
  age: number
  studentId: string
  seat: string
  focusRate: string
  logicScore: string
  interaction: string
  tags: string[]
  focusData: number[]
  radarData: number[]
}

// 完整的课堂数据
export interface ClassroomData {
  coreMetrics: CoreMetrics
  focusTrend: FocusDataPoint[]
  emotionDistribution: EmotionData[]
  seatStatus: SeatStatus[]
  alerts: AlertItem[]
  students: StudentInfo[]
  lastUpdate: string
}

// 默认数据
const defaultData: ClassroomData = {
  coreMetrics: {
    focusRate: 86.4,
    emotion: '积极',
    fatigueCount: 4,
    interactionFreq: 12
  },
  focusTrend: [
    { time: '10:00', percentage: 82, fatigueCount: 2 },
    { time: '10:05', percentage: 88, fatigueCount: 1 },
    { time: '10:10', percentage: 75, fatigueCount: 3 },
    { time: '10:15', percentage: 68, fatigueCount: 6 },
    { time: '10:20', percentage: 85, fatigueCount: 2 },
    { time: '10:25', percentage: 90, fatigueCount: 1 },
    { time: '10:30', percentage: 86, fatigueCount: 4 }
  ],
  emotionDistribution: [
    { name: '专注/积极', value: 50, color: 'blue' },
    { name: '困惑', value: 15, color: 'seagreen' },
    { name: '疲劳', value: 10, color: 'orange' },
    { name: '走神', value: 10, color: 'red' }
  ],
  seatStatus: [
    { index: 0, status: 0 }, { index: 1, status: 0 }, { index: 2, status: 1 },
    { index: 3, status: 2 }, { index: 4, status: 2 }, { index: 5, status: 2 },
    { index: 6, status: 2 }, { index: 7, status: 0 }, { index: 8, status: 2 },
    { index: 9, status: 1 }, { index: 10, status: 2 }, { index: 11, status: 2 },
    { index: 12, status: 2 }, { index: 13, status: 2 }, { index: 14, status: 0 },
    { index: 15, status: 2 }, { index: 16, status: 2 }, { index: 17, status: 1 }
  ],
  alerts: [
    {
      id: 1,
      title: '后排区域疲劳度上升',
      description: '检测到后排区域疲劳度上升（40%），且已连续10分钟无有效互动',
      priority: 'medium',
      time: '10:25'
    },
    {
      id: 2,
      title: '学生社交退缩倾向',
      description: '陈小华同学表现出明显的社交退缩倾向，建议关注',
      priority: 'high',
      time: '10:20'
    }
  ],
  students: [
    {
      id: 1,
      name: '陈小华',
      gender: '男',
      age: 16,
      studentId: '20240312',
      seat: '03 (第三排)',
      focusRate: '88%',
      logicScore: 'A+',
      interaction: '低',
      tags: ['深度思考者', '社交敏感', '逻辑驱动'],
      focusData: [95, 92, 40, 88, 95, 90],
      radarData: [98, 20, 85, 95, 30]
    },
    {
      id: 2,
      name: '李明',
      gender: '男',
      age: 16,
      studentId: '20240313',
      seat: '05 (第三排)',
      focusRate: '92%',
      logicScore: 'A',
      interaction: '高',
      tags: ['积极参与', '领导力强', '表达清晰'],
      focusData: [90, 88, 85, 92, 90, 88],
      radarData: [85, 95, 80, 85, 90]
    },
    {
      id: 3,
      name: '王小红',
      gender: '女',
      age: 16,
      studentId: '20240314',
      seat: '08 (第四排)',
      focusRate: '85%',
      logicScore: 'B+',
      interaction: '中',
      tags: ['细心认真', '稳定发挥', '团队协作'],
      focusData: [85, 85, 82, 88, 85, 86],
      radarData: [80, 70, 90, 75, 85]
    }
  ],
  lastUpdate: new Date().toISOString()
}

// localStorage键名
const STORAGE_KEY = 'mindclass_shared_data'

/**
 * 获取共享数据
 */
export function getSharedData(): ClassroomData {
  if (typeof window === 'undefined') {
    return defaultData
  }
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse shared data:', e)
      return defaultData
    }
  }
  
  // 首次使用，初始化数据
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
  return defaultData
}

/**
 * 更新共享数据
 */
export function updateSharedData(data: Partial<ClassroomData>): void {
  if (typeof window === 'undefined') {
    return
  }
  
  const current = getSharedData()
  const updated = {
    ...current,
    ...data,
    lastUpdate: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  // 触发数据更新事件
  window.dispatchEvent(new CustomEvent('mindclass-data-updated', { detail: updated }))
  
  // 使用BroadcastChannel通知其他页面
  try {
    const bc = new BroadcastChannel('mindclass_data_channel')
    bc.postMessage({ type: 'data_updated', timestamp: updated.lastUpdate })
    bc.close()
  } catch (e) {
    // BroadcastChannel not supported, ignore
  }
}

/**
 * 更新核心指标
 */
export function updateCoreMetrics(metrics: Partial<CoreMetrics>): void {
  const current = getSharedData()
  updateSharedData({
    coreMetrics: { ...current.coreMetrics, ...metrics }
  })
}

/**
 * 添加新的专注度数据点
 */
export function addFocusDataPoint(point: FocusDataPoint): void {
  const current = getSharedData()
  const newTrend = [...current.focusTrend, point]
  // 只保留最近10个数据点
  if (newTrend.length > 10) {
    newTrend.shift()
  }
  updateSharedData({ focusTrend: newTrend })
}

/**
 * 添加预警
 */
export function addAlert(alert: Omit<AlertItem, 'id'>): void {
  const current = getSharedData()
  const newAlert: AlertItem = {
    ...alert,
    id: Date.now()
  }
  updateSharedData({
    alerts: [newAlert, ...current.alerts].slice(0, 20) // 最多保留20条
  })
}

/**
 * 更新学生信息
 */
export function updateStudent(studentId: number, data: Partial<StudentInfo>): void {
  const current = getSharedData()
  const updatedStudents = current.students.map(s =>
    s.id === studentId ? { ...s, ...data } : s
  )
  updateSharedData({ students: updatedStudents })
}

/**
 * 监听数据变化
 */
export function onDataChange(callback: (data: ClassroomData) => void): () => void {
  const handler = (event: CustomEvent<ClassroomData>) => {
    callback(event.detail)
  }
  
  window.addEventListener('mindclass-data-updated', handler as EventListener)
  
  // 返回取消监听的函数
  return () => {
    window.removeEventListener('mindclass-data-updated', handler as EventListener)
  }
}

/**
 * 模拟实时数据更新
 */
export function startRealtimeSimulation(): () => void {
  const interval = setInterval(() => {
    const current = getSharedData()
    
    // 随机更新核心指标
    const newMetrics = {
      focusRate: Number((80 + Math.random() * 15).toFixed(1)),
      emotion: current.coreMetrics.emotion,
      fatigueCount: Math.floor(Math.random() * 8),
      interactionFreq: Math.floor(8 + Math.random() * 8)
    }
    
    // 添加新的数据点
    const now = new Date()
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
    const newPoint: FocusDataPoint = {
      time: timeStr,
      percentage: newMetrics.focusRate,
      fatigueCount: newMetrics.fatigueCount
    }
    
    const currentTrend = current.focusTrend
    const newTrend = [...currentTrend.slice(1), newPoint]
    
    updateSharedData({
      coreMetrics: newMetrics,
      focusTrend: newTrend
    })
  }, 5000) // 每5秒更新一次
  
  return () => clearInterval(interval)
}

// 导出默认数据供初始化使用
export { defaultData }
