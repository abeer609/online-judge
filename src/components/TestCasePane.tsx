import { Check, Clock, X } from "lucide-react";
import type { SubmissionResult } from "../schema";
import { decodeBase64 } from "../utils";
import TestCase from "./TestCase";

interface Props {
    isTestCaseRunning: boolean;
    submissions?: SubmissionResult[];
    selectedTestCase?: SubmissionResult;
    setSelectedTestCase: (submission: SubmissionResult) => void;
}

const TestCasePane = ({
    isTestCaseRunning,
    submissions,
    selectedTestCase,
    setSelectedTestCase,
}: Props) => {
    if (isTestCaseRunning) {
        return (
            <div className="flex items-center gap-2 text-gray-400">
                <Clock className="animate-spin" size={16} />
                Running test cases...
            </div>
        );
    } else if (!isTestCaseRunning && !submissions) {
        return (
            <div className="flex items-center gap-2 text-gray-400">
                No submissions
            </div>
        );
    } else if (submissions && selectedTestCase) {
        return (
            <div className="space-y-2">
                <div className="flex text-gray-300 items-center gap-2 text-sm font-medium">
                    Accepted{" "}
                    {`${submissions.filter((sub) => sub.status_id == 3).length} / ${
                        submissions.length
                    }`}
                </div>

                <div className="flex overflow-x-auto gap-8 mb-4">
                    {submissions.map((submission, idx) => (
                        <div
                            key={submission.token}
                            className="text-center shrink-0 basis-auto flex-1"
                        >
                            <button
                                onClick={() => {
                                    const selectedSubmission = submissions.find(
                                        (sub) => sub.token == submission.token,
                                    );
                                    if (!selectedSubmission) return;
                                    setSelectedTestCase(selectedSubmission);
                                }}
                                className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-xs font-medium ${
                                    submission.status_id == 3
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                }`}
                            >
                                {submission.status_id === 3 ? (
                                    <Check size={14} />
                                ) : (
                                    <X size={14} />
                                )}
                            </button>
                            <div className="text-sm text-gray-400">
                                Case {idx + 1}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 text-sm">
                    <div>
                        <div className="text-gray-400 mb-1 font-medium">
                            Input
                        </div>
                        <div className="bg-gray-900 p-3 rounded text-gray-300 font-mono  border border-gray-700">
                            <p className="whitespace-pre font-mono">
                                {selectedTestCase.stdin
                                    ? decodeBase64(selectedTestCase.stdin)
                                    : ""}
                            </p>
                        </div>
                    </div>

                    <TestCase selectedSubmission={selectedTestCase} />

                    <div>
                        <div className="text-gray-400 mb-1 font-medium">
                            Expected
                        </div>
                        <div className="bg-gray-900 p-3 rounded text-gray-300 font-mono  border border-gray-700">
                            <p className="whitespace-pre font-mono">
                                {selectedTestCase.expected_output
                                    ? decodeBase64(
                                          selectedTestCase.expected_output,
                                      )
                                    : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default TestCasePane;
