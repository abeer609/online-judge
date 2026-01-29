import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import type { Language } from "../schema";

interface Props {
    code: string;
    language: Language;
    setCode: (code: string) => void;
}

const CodeEditor = ({ code, language, setCode }: Props) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
        editorRef.current = editor;
    }
    function handleChange() {
        if (editorRef.current == null) {
            return;
        }
        setCode(editorRef.current.getValue());
    }

    return (
        <>
            <Editor
                options={{
                    minimap: {
                        enabled: false,
                    },
                }}
                theme="vs-dark"
                onMount={handleEditorDidMount}
                onChange={handleChange}
                // height="100%"

                defaultLanguage={language.label}
                value={code}
                defaultValue={code}
            />
        </>
    );
};

export default CodeEditor;
