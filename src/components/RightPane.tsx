import { useEffect, useRef, useState } from "react";
import {
    DEFAULT_LANGUAGES,
    type Language,
    type Problem,
    type SubmissionResponse,
    type SubmissionResult,
    type Token,
} from "../schema";
import { encodeBase64 } from "../utils";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import EditorToolbar from "./EditorToolbar";
import TestCasePane from "./TestCasePane";

interface Props {
    problem?: Problem;
}
const RightPane = ({ problem }: Props) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [tokens, setTokens] = useState<string[]>();
    const [code, setCode] = useState("");
    const [isTestCaseRunning, setIsTestCaseRunning] = useState(false);
    const [submissions, setSubmissions] = useState<SubmissionResult[]>();
    const codeEditorRef = useRef<HTMLDivElement>(null);
    const heightResizeRef = useRef<HTMLDivElement>(null);
    const [selectedTestCase, setSelectedTestCase] =
        useState<SubmissionResult>();
    const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGES[0]);

    const isDraggingYRef = useRef<boolean>(false);

    useEffect(() => {
        const heightResizer = heightResizeRef.current;
        if (!heightResizer) return;

        const onMouseDown = () => {
            isDraggingYRef.current = true;
            document.body.style.userSelect = "none";
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDraggingYRef.current) return;
            if (!codeEditorRef.current) return;

            const editorRect = codeEditorRef.current.getBoundingClientRect();
            let newHeight = e.clientY - editorRect.top;
            console.log(newHeight);
            const MIN_HEIGHT = 200;
            const MAX_HEIGHT = 550;
            if (newHeight < MIN_HEIGHT) {
                newHeight = MIN_HEIGHT;
            } else if (newHeight > MAX_HEIGHT) {
                newHeight = MAX_HEIGHT;
            }

            // const min = 100;
            // const max = editorRect.height - 100;
            // newHeight = Math.max(min, Math.min(max, newHeight));
            codeEditorRef.current.style.height = newHeight + "px";
        };

        const onMouseUp = () => {
            isDraggingYRef.current = false;
            document.body.style.userSelect = "";
        };

        heightResizer.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            heightResizer.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    useEffect(() => {
        if (!problem) return;
        setCode(problem.code_submissions?.code || "");
    }, [problem]);

    useEffect(() => {
        if (!tokens) return;

        let intervalId: number;
        const fetchSubmissions = async () => {
            if (!tokens) {
                return;
            }
            setIsTestCaseRunning(true);
            const options = {
                method: "GET",
                url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: "true",
                    fields: "*",
                },
                headers: {
                    "x-rapidapi-key":
                        "8ae39f33f8msh2a6274b1538ca7cp195e00jsn16c32cde4b26",
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                },
            };

            try {
                const response =
                    await axios.request<SubmissionResponse>(options);
                const submissionRes = response.data.submissions;
                if (
                    submissionRes.every(
                        (submission) =>
                            submission.status_id != 2 &&
                            submissionRes.every(
                                (submission) => submission.status_id != 1,
                            ),
                    )
                ) {
                    clearInterval(intervalId);
                    setSubmissions(submissionRes);
                    setSelectedTestCase(submissionRes[0]);
                    setIsTestCaseRunning(false);
                }
            } catch (error) {
                console.error(error);
                clearInterval(intervalId);
                setIsTestCaseRunning(false);
            }
        };
        fetchSubmissions();
        intervalId = setInterval(fetchSubmissions, 5000);
        return () => clearInterval(intervalId);
    }, [tokens]);

    const runCode = async () => {
        if (!problem) return;

        setIsRunning(true);
        const submissions = problem.test_cases.map((test_case) => ({
            source_code: encodeBase64(code),
            language_id: language.id,
            stdin: encodeBase64(test_case.stdin),
            expected_output: encodeBase64(test_case.output),
        }));

        const options = {
            method: "POST",
            url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
            params: {
                base64_encoded: "true",
            },
            headers: {
                "x-rapidapi-key":
                    "8ae39f33f8msh2a6274b1538ca7cp195e00jsn16c32cde4b26",
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "Content-Type": "application/json",
            },
            data: {
                submissions,
            },
        };

        try {
            const response = await axios.request<Token[]>(options);
            setTokens(response.data.map((token) => token.token));
            setIsRunning(false);
        } catch (error) {
            console.error(error);
            setIsRunning(false);
        } finally {
            setIsRunning(false);
        }
    };

    const handleLanguageChange = (newLang: number) => {
        const filteredLanguage = DEFAULT_LANGUAGES.filter(
            (language) => language.id == newLang,
        );
        setLanguage(filteredLanguage[0]);
    };

    return (
        <div className="md:flex-1 flex flex-col overflow-hidden">
            {/* Code Editor Header */}
            <EditorToolbar
                language={language}
                handleLanguageChange={handleLanguageChange}
                isRunning={isRunning || isTestCaseRunning}
                runCode={runCode}
                disabled={!code || isRunning || isTestCaseRunning}
            />

            {/* Code Editor */}
            <div className="relative h-100" ref={codeEditorRef}>
                <CodeEditor
                    setCode={setCode}
                    language={language}
                    code={problem?.code_submissions?.code || ""}
                />
            </div>

            <div
                className="h-2 cursor-ns-resize"
                style={{ userSelect: "none" }}
                ref={heightResizeRef}
            ></div>
            {/* Test Results Panel */}
            <div className="border-t border-gray-700 overflow-y-auto flex-1">
                <div className="border-b border-gray-700 px-4 py-3">
                    <div className="flex items-center gap-4">
                        <button className="text-sm text-orange-400 font-medium border-b-2 border-orange-400 pb-1">
                            Testcase
                        </button>
                    </div>
                </div>

                {/* test case */}
                <div className="p-4 overflow-y-auto">
                    <TestCasePane
                        isTestCaseRunning={isTestCaseRunning}
                        submissions={submissions}
                        selectedTestCase={selectedTestCase}
                        setSelectedTestCase={setSelectedTestCase}
                    />
                </div>
            </div>
        </div>
    );
};

export default RightPane;
