import { useParams } from "react-router";
import useProblem from "./hooks/useProblem";
import LeftPane from "./components/LeftPane";
import RightPane from "./components/RightPane";

const ProblemPage = () => {
    const { id } = useParams();
    if (!id) {
        return;
    }
    const { data: problem, isLoading } = useProblem(id);

    return (
        <div className="md:flex md:h-screen">
            {/* Left Panel - Problem Description */}
            <LeftPane isLoading={isLoading} problem={problem} />
            {/* Right Panel - Code Editor */}
            <RightPane problem={problem} />
        </div>
    );
};

export default ProblemPage;
