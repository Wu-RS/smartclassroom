import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import Card from "@/components/Card.tsx";

function NodeStatusList() {
    interface nodeStatus {
        name: string;
        status: string;
        message: string;
    }
    const nodeList: nodeStatus[] = [
        { name: "摄像头节点", status: "正常", message: "延迟: 12ms" },
        { name: "麦克风阵列", status: "异常", message: "延迟: 8ms" },
        { name: "传感器节点", status: "正常", message: "电量: 15%" },
        { name: "边缘计算单元", status: "异常", message: "负载: 32%" }
    ]
    return (
        <div className="arrangement-bilateral width-fill-up">
            {nodeList.map((item, index) => (
                <div key={index} className="arrangement-vertical status-node">
                    <span>{item.name}</span>
                    <span>{item.status}</span>
                    <span>{item.message}</span>
                </div>
            ))}
        </div>
    )
}

function BandwidthTrend(){
    interface Bandwidth {
        name: string;
        upload: number;
        download: number;
    }
    const data: Bandwidth[] = [
        { name: "00:00", upload: 2.5, download: 4.2 },
        { name: "04:00", upload: 1.8, download: 3.5 },
        { name: "08:00", upload: 3.2, download: 5.8 },
        { name: "12:00", upload: 5.6, download: 8.2 },
        { name: "16:00", upload: 4.8, download: 7.5 },
        { name: "20:00", upload: 3.5, download: 5.2 },
    ]
    return (
        <LineChart style={{width: "100%", aspectRatio: "5 / 3"}} data={data} responsive>
            <XAxis dataKey="name" />
            <YAxis width="auto" axisLine={ false } tickLine={ false } />
            <CartesianGrid stroke="#e0e0f5" vertical={ false } />
            <Tooltip />
            <Legend verticalAlign="top" labelStyle={{color: "gray"}} />
            <Line type="monotone" name="上传带宽" dataKey="upload"  stroke="blue" />
            <Line type="monotone" name="下载带宽"  dataKey="download" stroke="green" />
        </LineChart>
    )
}

function Resource(){
    interface Resource {
        name: string;
        usage: number;
        color: string;
    }
    const resourceList: Resource[] = [
        { name: "CPU", usage: 32, color: "blue" },
        { name: "内存", usage: 45, color: "orange" },
        { name: "存储", usage: 68, color: "aqua" }
    ]
    return (
        <div className="width-fill-up">
            {resourceList.map((item, index) => (
                <div key={ index } className="arrangement-bilateral width-fill-up">
                    <span>{item.name} 使用率</span>
                    <span>{item.usage}%</span>
                    <div style={{backgroundImage: `linear-gradient(to right, ${item.color} ${item.usage}%, transparent ${item.usage}%)`}}
                        className="width-fill-up status-progress-bar" />
                </div>
            ))}
        </div>
    )
}

export default function Status() {
    return (
        <>
            <div className="page-title width-fill-up">边缘节点状态监控</div>
            <Card title="节点健康状态" width="100%"><NodeStatusList /></Card>
            <Card title="带宽占用情况" width="400px"><BandwidthTrend /></Card>
            <Card title="资源占用情况" width="300px"><Resource /></Card>
        </>
    )
}