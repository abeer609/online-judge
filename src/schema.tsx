import type { LucideProps } from "lucide-react";

export interface Problem {
    id: number;
    title: string;
    description: string;
    created_at: string;
    test_cases: TestCase[];
    code_submissions: CodeSubmission | null;
}

export interface TestCase {
    id: number;
    problem: number;
    stdin: string;
    output: string;
}

export type IconType = React.FC<LucideProps>;

export interface Language {
    id: number;
    name: string;
    label: string;
}

export interface Status {
    id: number;
    description: string;
}

export interface SubmissionResponse {
    submissions: SubmissionResult[];
}

export interface SubmissionResult {
    time: string | null;
    memory: number | null;
    stdout: string | null;
    stderr: string | null;
    message: string | null;
    status_id: number;
    token: string;
    stdin: string | null;
    expected_output: string | null;
    status: Status;
}

export interface Token {
    token: string;
}

export const DEFAULT_LANGUAGES: Language[] = [
    {
        id: 92,
        name: "Python (3.11.2)",
        label: "python",
    },
    {
        id: 102,
        name: "JavaScript (Node.js 22.08.0)",
        label: "javascript",
    },
    {
        id: 54,
        name: "C++ (GCC 9.2.0)",
        label: "cpp",
    },
];
export interface TestCaseResult {
    id: number;
    submission: number;
    test_case: number;
    status: string;
    status_display: string;
}
export interface CodeSubmission {
    id: number;
    problem: number;
    user: string;
    code: string;
    // empty test case results allowed
    testcase_results: TestCaseResult[];
}

export const WRONG_ANSWER = 4;
export const TIME_LIMIT_EXCEEDED = 5;
export const COMPILATION_ERROR = 6;
export const RUNTIME_ERROR = [7, 8, 9, 10, 11, 12];
export const INTERNAL_ERROR = 13;
