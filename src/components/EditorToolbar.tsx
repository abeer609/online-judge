import { DEFAULT_LANGUAGES, type Language } from "../schema";
import { Clock, Play } from "lucide-react";

interface Props {
    language: Language;
    handleLanguageChange: (languageId: number) => void;
    isRunning: boolean;
    runCode: () => Promise<void>;
    disabled: boolean;
}

const EditorToolbar = ({
    isRunning,
    runCode,
    disabled,
    language,
    handleLanguageChange,
}: Props) => {
    return (
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex flex-wrap lg:flex-nowrap items-center gap-2">
            <select
                value={language.id}
                onChange={(e) => handleLanguageChange(parseInt(e.target.value))}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                {DEFAULT_LANGUAGES.map((language) => (
                    <option key={language.id} value={language.id}>
                        {language.name}
                    </option>
                ))}
            </select>

            <button
                onClick={runCode}
                disabled={disabled}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 disabled:bg-green-300 disabled:cursor-not-allowed
                            disabled:text-black rounded text-sm text-white transition-colors"
            >
                {isRunning ? (
                    <Clock className="animate-spin" size={16} />
                ) : (
                    <Play size={16} />
                )}
                {isRunning ? "Running..." : "Run"}
            </button>
        </div>
    );
};

export default EditorToolbar;
