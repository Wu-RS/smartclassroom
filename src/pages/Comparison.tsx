import { Bar, BarChart, CartesianGrid, Line, LineChart, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import Card from "@/components/Card.tsx";
import type {CSSProperties} from "react";

interface data {
    name?: string;
    x?: number;
    y?: number;
}
const style: CSSProperties = {
    width: "100%",
    aspectRatio: "5 / 2"
}
const margin = {
    top: 30,
    right: 50,
    bottom: 10,
    left: 10
}
function Subjects(){
    const dataList: data[] = [
        { name: "物理", x: 65, y: 50 },
        { name: "英语", x: 75, y: 90 },
        { name: "数学", x: 85, y: 70 },
        { name: "语文", x: 90, y: 40 },
    ];
    interface DotProps {
        cx?: number;
        cy?: number;
        fill?: string;
        payload?: { name: string; x: number; y: number; };
    }
    function Dot(props: DotProps) {
        const { cx, cy, fill, payload } = props;
        const x = payload?.x || 0;
        const y = payload?.y || 0;
        const r = Math.sqrt(x * x + y * y) / 5;
        return (
            <>
                <circle cx={cx} cy={cy} r={r} fill={fill} />
                <text x={cx} y={(cy || 0) - r - 5} fill="gray" textAnchor="middle">{payload?.name}</text>
            </>

        )
    }
    return (
        <>
            <ScatterChart style={{width: "100%", aspectRatio: "5 / 2" }}
                          margin={{ top: 80, right: 120, bottom: 50, left: 50 }} responsive>
                <XAxis label={{value: "专注度分数", position: "right", offset: 20}}
                       type="number" dataKey="x" name="专注度" domain={[0, 100]} tickCount={6} />
                <YAxis label={{value: "互动参与率", position: "top", offset: 20}}
                       type="number" dataKey="y" name="参与率" domain={[0, 100]} tickCount={6} />
                <Tooltip />
                <Scatter data={dataList} fill="slateblue" shape={Dot} />
            </ScatterChart>
            <span className="subtitle">
                说明：气泡大小代表该学科的课堂活跃度。右上角区域代表高专注度且高互动的“理想课堂”模式。
            </span>
        </>
    )
}
function Classes(){
    const dataList: data[] = [
        { name: "(1)班", y: 78 },
        { name: "(2)班", y: 82 },
        { name: "(3)班", y: 85 },
        { name: "(4)班", y: 75 }
    ]
    return (
        <BarChart style={style} margin={margin} data={dataList} responsive>
            <XAxis type="category" dataKey="name"  />
            <YAxis type="number" tickCount={6} axisLine={false} tickLine={false} />
            <CartesianGrid vertical={false} />
            <Tooltip />
            <Bar dataKey="y" name="专注度" fill="dodgerblue " />
        </BarChart>
    )
}
function Stages() {
    const dataList: data[] = [
        { name: "导入", y: 90 },
        { name: "讲解", y: 82 },
        { name: "讨论", y: 70 },
        { name: "总结", y: 88 }
    ]
    return (
        <LineChart style={style} margin={margin} data={dataList} responsive>
            <XAxis type="category" dataKey="name" />
            <YAxis type="number" tickCount={6} axisLine={false} tickLine={false} />
            <CartesianGrid vertical={false} />
            <Tooltip />
            <Line type="monotone" dataKey="y" name="效能" stroke="slateblue" />
        </LineChart>
    )
}
export default function Comparison() {
    return (
        <>
            <div className="page-title width-fill-up">跨学科与班级教学效能对比</div>
            <Card title="各学科“专注力-互动”双维度效能图" width="100%"><Subjects /></Card>
            <Card title="平行班级专注度均值对比" width="300px"><Classes /></Card>
            <Card title="不同教学阶段(导入/讲解/练习)效能分析" width="300px"><Stages /></Card>
        </>
    )
}