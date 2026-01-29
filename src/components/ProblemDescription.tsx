import Markdown from "react-markdown";
import type { Problem } from "../schema";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
    problem: Problem;
}

const ProbleDescription = ({ problem }: Props) => {
    return (
        <>
            <div className="prose">
                <h2>{problem.title}</h2>
                <Markdown
                    children={problem.description}
                    components={{
                        code(props) {
                            const { children } = props;
                            return (
                                <SyntaxHighlighter style={dracula}>
                                    {String(children)}
                                </SyntaxHighlighter>
                            );
                        },
                    }}
                ></Markdown>
            </div>
        </>
    );
};

export default ProbleDescription;
