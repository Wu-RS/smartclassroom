import type {ReactNode} from "react";

interface CardProps {
    title?: string;
    titleSub?: string;
    width: string;
    height?: string;
    backgroundColor?: string;
    shadow?: `${string} ${number}px ${number}px ${number}px`;
    children?: ReactNode;
}
export default function Card({title, titleSub, width, height = 'auto',backgroundColor, shadow, children } : CardProps) {
    const head = title ? (
        <div className="width-fill-up arrangement-bilateral">
            <b>{title}</b><span className="card-subtitle subtitle">{titleSub}</span>
        </div>
    ) : null
    return (
        <div className="card" style={{ width, height, backgroundColor, boxShadow: shadow }}>
            { head }
            <div className="width-fill-up">
                { children }
            </div>
        </div>
    )
}