import { unified } from "unified";
import remarkParse from "remark-parse";
import { EditorView } from "@codemirror/view";

const parser = unified().use(remarkParse);

function parseMarkdown(text: string) {
    return parser.parse(text);
}

export const astListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
        const text = update.state.doc.toString();

        const ast = parseMarkdown(text);

        console.log(ast);
    }
});
