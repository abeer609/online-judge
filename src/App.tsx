import { useState } from "react";
import "./App.css";
import ProblemPage from "./ProblemPage";

function App() {
    const [count, setCount] = useState(0);

    return <ProblemPage />;
}

export default App;
