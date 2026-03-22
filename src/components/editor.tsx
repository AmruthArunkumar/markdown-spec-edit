import { useEffect, useRef, type RefObject } from "react";

import { EditorState } from "@codemirror/state";
import { EditorView, highlightActiveLine } from "@codemirror/view";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { bracketMatching, defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { history } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { cursorPosition } from "../extensions/cursorPosition";
import { markdownHeadingStyle } from "../extensions/markdownTheme";
import { hideMarkdownHeaders } from "../extensions/hideHeader";
import { astListener } from "../extensions/markdownParse";
// import { zebraStripes } from "../extensions/theme";

export const Editor = (props: {setLine: (line: number) => void, setCol: (col: number) => void}) => {
    const editor: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!editor.current) return;

        const view: EditorView = new EditorView({
            state: EditorState.create({
                doc: "# Document",
                extensions: [
                    history(),
                    bracketMatching(),
                    closeBrackets(),
                    autocompletion(),
                    highlightActiveLine(),
                    // markdown(),
                    // syntaxHighlighting(defaultHighlightStyle),
                    // syntaxHighlighting(markdownHeadingStyle),
                    // hideMarkdownHeaders,
                    astListener,
                    cursorPosition(props.setLine, props.setCol),
                    // zebraStripes({ step: 2 }),
                ],
            }),
            parent: editor.current,
        });

        return () => view.destroy();
    }, []);

    return <div ref={editor} id="codemirror" />;
};
