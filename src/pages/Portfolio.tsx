import { useState } from "react";
import {PolarAngleAxis, PolarGrid, Radar, RadarChart} from "recharts";
import Card from "@/components/Card.tsx";
import { getStudents, getStudentById, type Student } from "../../../shared-data/shared-data";

function PortfolioHeader(student: Student) {
    return (
        <div className="width-fill-up arrangement-bilateral portfolio-header">
            <div className="arrangement-bilateral">
                <div>{student.avatar}</div>
                <div className="arrangement-bilateral" style={{fontSize: "1.5em", color: "white"}}>
                    <div className="width-fill-up">
                        <span style={{fontSize: "1.8em"}}>{student.name}</span><sub>(学号: {student.studentId})</sub>
                    </div>
                    {student.tags.map((tag, index) => (
                        <div key={index} className="portfolio-header-tag">{tag}</div>
                    ))}
                    <div className="portfolio-header-tag">高一(3)班</div>
                </div>
            </div>
            <div className="arrangement-vertical">
                <span>档案更新时间</span>
                <span style={{color: "white"}}>2026-03-24 18:30</span>
            </div>
        </div>
    )
}

function PortfolioQuadrant(student: Student) {
    interface data {
        name: string;
        value: number;
    }
    const dataList: data[] = [
        { name: "专注力", value: student.radarData[0] },
        { name: "逻辑思辨", value: student.radarData[3] },
        { name: "互动频率", value: student.radarData[1] },
        { name: "情绪稳定性", value: student.radarData[2] },
        { name: "社交性", value: student.radarData[4] },
    ]
    return (
        <div className="portfolio-quadrant arrangement-bilateral">
            <b>核心能力象限分析</b>
            <RadarChart style={{width: "100%", aspectRatio: "3 / 2"}} data={dataList}  responsive>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar dataKey="value" stroke="royalblue" fill="royalblue" fillOpacity={0.2} />
            </RadarChart>
            <b>本周社交轨迹统计</b>
            <div className="width-fill-up">
                <div>小组讨论参与次数<b>2次</b></div>
                <hr />
                <div>有效师生互动(VAD)<b>低于班级均值 60%</b></div>
                <hr />
                <div>课间社交距离偏好<b>独立空间 (3-5米)</b></div>
            </div>
        </div>
    )
}

function PortfolioWeeklyReport(student: Student) {
    return (
        <div className="portfolio-weekly-report arrangement-bilateral">
            <b>LLM 深度行为评价周报</b>
            <Card width="100%" shadow="orange -3px 0px 0px" backgroundColor="#ffb">
                <i>
                    {student.behaviorAnalysis}
                    <br/><br/>
                    <b>高光 moment：</b>{student.highlightMoment}
                </i>
            </Card>
            <div><span className="subtitle">本周情绪主基调</span><br /><b style={{color: "deepskyblue"}}>{student.emotionFreq}</b></div>
            <div><span className="subtitle">建议干预时机</span><br /><b style={{color: "seagreen"}}>下周数学兴趣小组</b></div>
            <div className="width-fill-up">导出完整PDF行为周报 [cite: 94]</div>
        </div>
    )
}

export default function Portfolio() {
    const [students] = useState<Student[]>(getStudents());
    const [selectedStudentId, setSelectedStudentId] = useState(1);
    const selectedStudent = getStudentById(selectedStudentId);

    return (
        <>
            <div className="width-fill-up page-title">学生行为成长档案 [cite: 93]</div>
            
            {/* 学生选择器 */}
            <div style={{marginBottom: "16px"}}>
                <label style={{marginRight: "8px", fontSize: "14px"}}>选择学生：</label>
                <select 
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(Number(e.target.value))}
                    style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "1px solid #e5e5ea",
                        fontSize: "14px"
                    }}
                >
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name} (学号: {student.studentId})
                        </option>
                    ))}
                </select>
            </div>

            <div className="width-fill-up arrangement-bilateral portfolio-content">
                <PortfolioHeader {...selectedStudent} />
                <PortfolioQuadrant {...selectedStudent} />
                <PortfolioWeeklyReport {...selectedStudent} />
            </div>
        </>
    )
}
