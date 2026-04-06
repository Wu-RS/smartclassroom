import Card from "@/components/Card.tsx";
import { useState, useEffect } from "react";
import {
    Bar, CartesianGrid, ComposedChart, Legend, Line, Pie, PieChart,
    type PieSectorShapeProps, Sector, Tooltip, XAxis, YAxis
} from "recharts";
import {
    getSynchronizedData,
    startSynchronizedData,
    type ClassroomData
} from "../../shared-data/synchronized-data";

// 主组件
function Message() {
    const [data, setData] = useState<ClassroomData>(getSynchronizedData());

    useEffect(() => {
        console.log('Message component mounted');
        
        const stop = startSynchronizedData((newData) => {
            console.log('Message component data updated:', newData.coreMetrics);
            setData(newData);
        });

        return stop;
    }, []);

    interface DataItem {
        name: string;
        value: string;
        color: string;
    }

    const dataList: DataItem[] = [
        { name: "实时专注率", value: `${data.coreMetrics.focusRate}%`, color: "royalblue" },
        { name: "当前疲劳人数", value: String(data.coreMetrics.fatigueCount), color: "orange" },
        { name: "师生互动频率", value: `${data.coreMetrics.interactionFreq} 次/节`, color: "limegreen" },
        { name: "班级情感指数", value: data.coreMetrics.emotion, color: "slateblue" },
    ];

    return (
        <div className="width-fill-up arrangement-bilateral">
            {dataList.map((item, index) => (
                <Card key={index} width="200px" shadow={`${item.color} 0px 3px 0px`}>
                    <div className="width-fill-up arrangement-vertical">
                        <span className="subtitle">{item.name}</span>
                        <span style={{ color: item.color, fontSize: "2rem" }}>{item.value}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}

function TemporalFluctuation() {
    const [data, setData] = useState<ClassroomData>(getSynchronizedData());

    useEffect(() => {
        console.log('TemporalFluctuation component mounted');
        
        const stop = startSynchronizedData((newData) => {
            console.log('TemporalFluctuation component data updated');
            setData(newData);
        });

        return stop;
    }, []);

    return (
        <ComposedChart
            style={{ width: "100%", aspectRatio: "2 / 1" }}
            margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
            data={data.focusTrend}
            responsive
        >
            <XAxis type="category" dataKey="time" />
            <YAxis
                type="number"
                yAxisId="left"
                dataKey="percentage"
                label={{ position: "top", value: "%", offset: 20 }}
                domain={[0, 100]}
                tickCount={6}
                axisLine={false}
                tickLine={false}
            />
            <YAxis
                type="number"
                yAxisId="right"
                orientation="right"
                label={{ position: "top", value: "人", offset: 20 }}
                axisLine={false}
                tickLine={false}
            />
            <CartesianGrid yAxisId="left" vertical={false} />
            <CartesianGrid yAxisId="right" vertical={false} />
            <Tooltip />
            <Legend verticalAlign="top" labelStyle={{ color: "gray" }} />
            <Line type="monotone" dataKey="percentage" name="平均专注度" yAxisId="left" stroke="royalblue" />
            <Bar dataKey="fatigueCount" name="疲劳人数" yAxisId="right" fill="orange" />
        </ComposedChart>
    );
}

function Emotion() {
    const [data, setData] = useState<ClassroomData>(getSynchronizedData());

    useEffect(() => {
        console.log('Emotion component mounted');
        
        const stop = startSynchronizedData((newData) => {
            console.log('Emotion component data updated');
            setData(newData);
        });

        return stop;
    }, []);

    const MyCustomPie = (props: PieSectorShapeProps) => {
        return <Sector {...props} fill={props.color} />;
    };

    return (
        <PieChart style={{ width: "100%", aspectRatio: "3 / 2" }}>
            <Pie
                data={data.emotionDistribution}
                dataKey="value"
                nameKey="name"
                startAngle={90}
                endAngle={450}
                cx="50%"
                cy="50%"
                innerRadius={40}
                fill="black"
                shape={MyCustomPie}
            />
            <Tooltip />
        </PieChart>
    );
}

function Seat() {
    const [data, setData] = useState<ClassroomData>(getSynchronizedData());

    useEffect(() => {
        console.log('Seat component mounted');
        
        const stop = startSynchronizedData((newData) => {
            console.log('Seat component data updated');
            setData(newData);
        });

        return stop;
    }, []);

    const color: string[] = ['green', 'orange', ''];

    return (
        <div className="width-fill-up">
            <div className="width-fill-up arrangement-bilateral dashboard-seat">
                {data.seatStatus.map((item: any, index: number) => (
                    <div className={color[item.status]} key={index}>{index + 1}</div>
                ))}
            </div>
            <div className="width-fill-up">
                <span>专注</span>
                <span>疲劳</span>
                <span>正常</span>
            </div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <>
            <div className="page-title width-fill-up">实时学情分析看板</div>
            <Message />
            <Card title="专注度与疲劳时序波动曲线" titleSub="实时更新" width="550px">
                <TemporalFluctuation />
            </Card>
            <div style={{ width: "200px" }}>
                <Card title="多模态情感实时分布" width="100%">
                    <Emotion />
                </Card>
                <div style={{ height: "30px" }} />
                <Card title="数字孪生教室座椅布局" width="100%">
                    <Seat />
                </Card>
            </div>
        </>
    );
}
