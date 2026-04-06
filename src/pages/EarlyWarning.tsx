import Card from "@/components/Card.tsx";
import { useState } from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import { getAlerts, getFilteredAlerts, type Alert } from "../../../shared-data/shared-data";

function PopupWindow(alert: Alert){
    return (
        <div className="width-fill-up arrangement-bilateral early-waring-popup-window">
            <div>
                <svg width="80px" height="80px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="64,20 20,110 108,110 64,20" fill="none" stroke="red" strokeWidth="5" />
                    <text x="64" y="95" fontSize="50" textAnchor="middle" fill="red">!</text>
                </svg>
            </div>
            <div>
                <b style={{fontSize: "1.3em", color: "#c00"}}>发现长周期行为趋势异常：{alert.student}</b><br />
                {alert.description}
            </div>
            <button className="early-waring-button" style={{fontSize: "1.1em"}}>查看深度报告</button>
        </div>
    )
}

function EmotionalIndex(){ 
    interface data { name: string; x: number; y: number; z: number; }
    const dataList: data[] = [
        { name: "第1周", x: 80, y: 10, z: 70  },
        { name: "第2周", x: 74, y: 20, z: 60 },
        { name: "第3周", x: 68, y: 45, z: 30 },
        { name: "第4周", x: 62, y: 80, z: 10 },
    ]
    return (
        <LineChart style={{width: "100%", aspectRatio: "2 / 1"}}
                   data={dataList} responsive>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} tickCount={6} axisLine={false} tickLine={false} />
            <CartesianGrid stroke="#eef" vertical={false} />
            <Legend verticalAlign="top" labelStyle={{color: "gray"}}
                    itemSorter={(item)=> {
                        switch (item.dataKey){
                            case "x": return 1;
                            case "y": return 2;
                            case "z": return 3;
                            default: return 0;
                        }
                    }} />
            <Tooltip  />
            <Line type="monotone" name="积极情绪" dataKey="x" stroke="royalblue" />
            <Line type="monotone" name="焦虑风险" dataKey="y" stroke="red"
                  dot={{strokeDasharray: 0}} strokeDasharray="5 5" />
            <Line type="monotone" name="社交参与度" dataKey="z" stroke="orange" />

        </LineChart>
    )
}
function ProposalSuggestions(){
    return (
        <Card width="100%" shadow="orange -3px 0px 0px" backgroundColor="#ffb">
            <i>
                <b>[依据]</b> 《中小学心理健康教育指导纲要》<br />
                <b>[现状分析]</b> 目标学生呈现明显的"社交退缩"与"习得性无助"特征。<br />
                <b>[行动建议]</b>
                <ol>
                    <li>建议体育老师在分组教学时，安排其担任"计分员"等低压力社交角色。</li>
                    <li>建议班主任应在 48 小时内进行一次侧面观察，避免直接质问导致压力。</li>
                </ol>
            </i>
        </Card>
    )
}

export default function EarlyWarning() {
    const [activeFilter, setActiveFilter] = useState("全部");
    const [alerts] = useState<Alert[]>(getAlerts());
    const filteredAlerts = getFilteredAlerts(activeFilter);
    const highPriorityAlert = alerts.find(alert => alert.level === "high");

    return (
        <>
            <div className="width-fill-up page-title">异常行为与心理预警中心 [cite: 52]</div>
            
            {/* 筛选标签 */}
            <div style={{display: "flex", gap: "8px", marginBottom: "16px", overflowX: "auto", paddingBottom: "4px"}}>
                {["全部", "高优先级", "社交风险", "疲劳预警", "行为异常"].map(filter => (
                    <button 
                        key={filter}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            border: "1px solid #e5e5ea",
                            background: activeFilter === filter ? "#007AFF" : "white",
                            color: activeFilter === filter ? "white" : "#333",
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* 高优先级预警弹窗 */}
            {highPriorityAlert && (
                <Card width="100%" shadow="red -3px 0px 0px" backgroundColor="#fee">
                    <PopupWindow {...highPriorityAlert} />
                </Card>
            )}

            {/* 班级情感指数趋势 */}
            <Card width="400px" title="班级情感指数趋势 (4周对照)">
                <EmotionalIndex />
            </Card>

            {/* 预警列表 */}
            {filteredAlerts.map(alert => (
                <Card key={alert.id} width="400px" title={alert.title}>
                    <div style={{marginBottom: "12px"}}>
                        <div style={{fontSize: "14px", color: "#666", marginBottom: "8px"}}>
                            <strong>学生：</strong>{alert.student}
                        </div>
                        <div style={{fontSize: "14px", color: "#666", marginBottom: "8px"}}>
                            <strong>时间：</strong>{alert.time}
                        </div>
                        <div style={{fontSize: "14px", lineHeight: "1.5", marginBottom: "12px"}}>
                            {alert.description}
                        </div>
                        <div style={{background: "#f8f9ff", padding: "10px", borderRadius: "8px", marginBottom: "12px"}}>
                            <strong style={{color: "#007AFF"}}>建议：</strong>{alert.suggestion}
                        </div>
                        <div style={{display: "flex", gap: "8px"}}>
                            {alert.actions.map((action, index) => (
                                <button 
                                    key={index}
                                    style={{
                                        flex: 1,
                                        padding: "8px",
                                        border: index === 0 ? "1px solid #007AFF" : "1px solid #e5e5ea",
                                        background: index === 0 ? "#007AFF" : "white",
                                        color: index === 0 ? "white" : "#333",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                        cursor: "pointer"
                                    }}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
            ))}

            {/* RAG 教育政策干预方案建议 */}
            <Card width="400px" title="RAG 教育政策干预方案建议">
                <ProposalSuggestions />
            </Card>

            <div style={{width: "400px"}} />
        </>
    )
}
