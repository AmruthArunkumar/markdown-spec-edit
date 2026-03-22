import { useState } from "react";
import "./App.css";

import { Editor } from "./components/editor";
import { LeftPane } from "./components/leftPane";
import { RightPane } from "./components/rightPane";

function App() {
    let [line, setLine] = useState(1);
    let [col, setCol] = useState(1);

    return (
        <>
            <div id="app">
                <div id="main">
                    <section id="left">
                        <LeftPane />
                    </section>
                    <section id="editor">
                        <Editor setLine={setLine} setCol={setCol} />
                    </section>
                    <section id="right">
                        <RightPane />
                    </section>
                </div>
                <div id="bottomBar">
                    Ln {line}, Col {col}
                </div>
            </div>
        </>
    );
}

export default App;
