// 预警类型定义
export interface Alert {
    id: number;
    title: string;
    student: string;
    time: string;
    description: string;
    suggestion: string;
    level: string;
    actions: string[];
}

// 学生类型定义
export interface Student {
    id: number;
    studentId: string;
    name: string;
    avatar: string;
    tags: string[];
    radarData: number[];
    behaviorAnalysis: string;
    highlightMoment: string;
    emotionFreq: string;
}

// 模拟预警数据
const mockAlerts: Alert[] = [
    {
        id: 1,
        title: "社交退缩预警",
        student: "张三",
        time: "2026-03-24 10:15",
        description: "连续3天课间活动时独自坐在座位上，不与同学交流。",
        suggestion: "建议班主任进行侧面了解，安排同学主动邀请其参与活动。",
        level: "high",
        actions: ["查看详情", "标记已处理"]
    },
    {
        id: 2,
        title: "疲劳预警",
        student: "李四",
        time: "2026-03-24 09:30",
        description: "上课期间多次打哈欠，注意力不集中。",
        suggestion: "建议提醒学生保证充足睡眠，注意劳逸结合。",
        level: "medium",
        actions: ["查看详情", "标记已处理"]
    },
    {
        id: 3,
        title: "行为异常",
        student: "王五",
        time: "2026-03-23 14:20",
        description: "数学课上频繁打扰邻座同学，影响课堂秩序。",
        suggestion: "建议与学生沟通，了解行为原因，进行针对性引导。",
        level: "medium",
        actions: ["查看详情", "标记已处理"]
    }
];

// 模拟学生数据
const mockStudents: Student[] = [
    {
        id: 1,
        studentId: "2023001",
        name: "张三",
        avatar: "👨‍🎓",
        tags: ["安静", "内向", "成绩优秀"],
        radarData: [70, 50, 80, 90, 40],
        behaviorAnalysis: "该生学习态度认真，成绩优异，但在社交方面较为被动。建议鼓励其参与小组活动，提升社交能力。",
        highlightMoment: "在数学竞赛中获得年级第一名。",
        emotionFreq: "平静"
    },
    {
        id: 2,
        studentId: "2023002",
        name: "李四",
        avatar: "👩‍🎓",
        tags: ["活泼", "外向", "体育特长"],
        radarData: [60, 80, 70, 65, 90],
        behaviorAnalysis: "该生性格开朗，善于与人交往，但学习态度不够专注。建议制定学习计划，提高学习效率。",
        highlightMoment: "在校运会上获得100米短跑冠军。",
        emotionFreq: "积极"
    },
    {
        id: 3,
        studentId: "2023003",
        name: "王五",
        avatar: "👨‍🎓",
        tags: ["调皮", "好动", "思维活跃"],
        radarData: [50, 75, 60, 85, 70],
        behaviorAnalysis: "该生思维敏捷，创造力强，但课堂纪律需要加强。建议给予适当的引导和约束，发挥其优势。",
        highlightMoment: "在科技创新大赛中获得二等奖。",
        emotionFreq: "兴奋"
    }
];

// 获取预警数据
export function getAlerts(): Alert[] {
    return mockAlerts;
}

// 获取筛选后的预警数据
export function getFilteredAlerts(filter: string): Alert[] {
    if (filter === "全部") {
        return mockAlerts;
    }
    if (filter === "高优先级") {
        return mockAlerts.filter(alert => alert.level === "high");
    }
    // 简单的模拟筛选
    return mockAlerts;
}

// 获取学生数据
export function getStudents(): Student[] {
    return mockStudents;
}

// 根据ID获取学生数据
export function getStudentById(id: number): Student {
    return mockStudents.find(student => student.id === id) || mockStudents[0];
}