// 教室数据类型定义
export interface ClassroomData {
    coreMetrics: {
        focusRate: number;
        fatigueCount: number;
        interactionFreq: number;
        emotion: string;
    };
    focusTrend: Array<{
        time: string;
        percentage: number;
        fatigueCount: number;
    }>;
    emotionDistribution: Array<{
        name: string;
        value: number;
        color: string;
    }>;
    seatStatus: Array<{
        status: number;
    }>;
}

// 模拟数据
const mockData: ClassroomData = {
    coreMetrics: {
        focusRate: 75,
        fatigueCount: 3,
        interactionFreq: 12,
        emotion: "积极"
    },
    focusTrend: [
        { time: "09:00", percentage: 80, fatigueCount: 1 },
        { time: "09:30", percentage: 75, fatigueCount: 2 },
        { time: "10:00", percentage: 70, fatigueCount: 3 },
        { time: "10:30", percentage: 85, fatigueCount: 1 },
        { time: "11:00", percentage: 82, fatigueCount: 2 }
    ],
    emotionDistribution: [
        { name: "积极", value: 60, color: "#4CAF50" },
        { name: "中性", value: 30, color: "#2196F3" },
        { name: "消极", value: 10, color: "#FF9800" }
    ],
    seatStatus: Array.from({ length: 20 }, (_, i) => ({
        status: Math.floor(Math.random() * 3)
    }))
};

// 获取同步数据
export function getSynchronizedData(): ClassroomData {
    return mockData;
}

// 开始同步数据
export function startSynchronizedData(callback: (data: ClassroomData) => void): () => void {
    // 模拟数据更新
    const interval = setInterval(() => {
        const updatedData: ClassroomData = {
            ...mockData,
            coreMetrics: {
                ...mockData.coreMetrics,
                focusRate: Math.floor(Math.random() * 30) + 60,
                fatigueCount: Math.floor(Math.random() * 5),
                interactionFreq: Math.floor(Math.random() * 10) + 5
            },
            seatStatus: Array.from({ length: 20 }, (_, i) => ({
                status: Math.floor(Math.random() * 3)
            }))
        };
        callback(updatedData);
    }, 5000);

    // 返回停止函数
    return () => clearInterval(interval);
}