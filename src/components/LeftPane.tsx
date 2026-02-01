import { useEffect, useRef } from "react";
import type { Problem } from "../schema";
import ProbleDescription from "./ProblemDescription";

interface Props {
    problem?: Problem;
    isLoading: boolean;
}
const LeftPane = ({ problem, isLoading }: Props) => {
    const resizerRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const isDraggingX = useRef(false);

    useEffect(() => {
        function handleMousedown() {
            isDraggingX.current = true;
            document.body.style.userSelect = "none";
        }
        function handleMouseup() {
            isDraggingX.current = false;
            document.body.style.userSelect = "";
        }
        function handleMouseMove(e: MouseEvent) {
            if (!isDraggingX.current) return;
            if (!leftRef.current) return;
            const rect = leftRef.current.getBoundingClientRect();
            let dx = e.clientX - rect.left;

            if (dx < 200) {
                dx = 200;
            }
            leftRef.current.style.width = dx + "px";
        }
        resizerRef.current?.addEventListener("mousedown", handleMousedown);
        document.addEventListener("mouseup", handleMouseup);
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            resizerRef.current?.removeEventListener(
                "mousedown",
                handleMousedown,
            );
            document.removeEventListener("mouseup", handleMouseup);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const renderProblem = () => {
        if (isLoading) {
            return <p>problem is loading...</p>;
        } else if (!isLoading && !problem) {
            return <p>No problem</p>;
        } else if (!isLoading && problem) {
            return <ProbleDescription problem={problem} />;
        }
    };
    return (
        <>
            <div
                className="md:w-1/2 md:border-r border-gray-700 flex flex-col  overflow-hidden dark:text-white "
                ref={leftRef}
            >
                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                    {renderProblem()}
                </div>
            </div>
            <div
                className="hidden md:block w-2 cursor-ew-resize"
                ref={resizerRef}
            ></div>
        </>
    );
};

export default LeftPane;
