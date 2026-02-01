import {
    COMPILATION_ERROR,
    RUNTIME_ERROR,
    WRONG_ANSWER,
    type SubmissionResult,
} from "../schema";
import { decodeBase64 } from "../utils";

interface Props {
    selectedSubmission: SubmissionResult;
}
const TestCase = ({ selectedSubmission }: Props) => {
    if (selectedSubmission.status_id == 3) {
        return (
            <div>
                <div className="text-gray-400 mb-1 font-medium">Output</div>
                <div className="bg-gray-900 p-3 rounded text-gray-300 font-mono  border border-gray-700">
                    <p className="whitespace-pre font-mono">
                        {selectedSubmission.stdout
                            ? decodeBase64(selectedSubmission.stdout)
                            : ""}
                    </p>
                </div>
            </div>
        );
    } else if (selectedSubmission.status_id == WRONG_ANSWER) {
        return (
            <div>
                <div className="text-gray-400 mb-1 font-medium">Output</div>
                <div className="bg-gray-900 p-3 rounded text-red-300 font-mono  border border-gray-700">
                    <p className="whitespace-pre font-mono">
                        {selectedSubmission.stdout
                            ? decodeBase64(selectedSubmission.stdout)
                            : ""}
                    </p>
                </div>
            </div>
        );
    } else if (RUNTIME_ERROR.includes(selectedSubmission.status_id)) {
        return (
            <div>
                <div className="text-gray-400 mb-1 font-medium">Output</div>
                <div className="bg-gray-900 p-3 rounded text-red-400 font-mono  border border-gray-700">
                    <p className="whitespace-pre font-mono">
                        {selectedSubmission.stderr
                            ? decodeBase64(selectedSubmission.stderr)
                            : ""}
                    </p>
                </div>
            </div>
        );
    } else if (selectedSubmission.status_id == COMPILATION_ERROR) {
        return (
            <div>
                <div className="text-gray-400 mb-1 font-medium">Output</div>
                <div className="bg-gray-900 p-3 rounded text-red-400 font-mono  border border-gray-700">
                    <p className="whitespace-pre font-mono">
                        {selectedSubmission.stderr
                            ? decodeBase64(selectedSubmission.stderr)
                            : ""}
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="text-gray-400 mb-1 font-medium">Output</div>
                <div className="bg-gray-900 p-3 rounded text-red-400 font-mono  border border-gray-700">
                    <p className="whitespace-pre font-mono">
                        {selectedSubmission.message
                            ? decodeBase64(selectedSubmission.message)
                            : ""}
                    </p>
                </div>
            </div>
        );
    }
};

export default TestCase;
