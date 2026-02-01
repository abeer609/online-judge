import { Code2 } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { client } from "./client";
import { type Problem } from "./schema";
import Loading from "./components/Loading";

const ProblemList = () => {
    const { data: problems, isLoading } = useQuery({
        queryKey: ["problems"],
        queryFn: async () => {
            const res = await client.get<Problem[]>("/problems/");
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading showLogo={false} />;
    } else if (!problems && !isLoading) {
        return <div>No problems found</div>;
    } else if (problems && !isLoading) {
        return (
            <div className="text-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="flex items-center mb-8 pb-4 border-gray-700">
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-3">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-semibold text-white">
                            Problem sets
                        </h1>
                    </div>

                    {/* Problems List */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                        {problems.map((problem, idx) => (
                            <Link
                                to={`/${problem.id}`}
                                key={problem.id}
                                className="flex items-center px-6 py-4 border-b border-gray-700 last:border-b-0 cursor-pointer transition-colors duration-200 hover:bg-gray-750"
                            >
                                {/* Problem Number */}
                                <div className="text-gray-400 font-medium mr-3 min-w-8">
                                    {idx + 1}
                                </div>

                                {/* Problem Title */}
                                <div
                                    className={
                                        "flex-1 font-medium text-gray-100"
                                    }
                                >
                                    {problem.title}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Stats */}
                </div>
            </div>
        );
    }
};

export default ProblemList;
