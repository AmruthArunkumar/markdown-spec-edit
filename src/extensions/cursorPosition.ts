import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

export function cursorPosition(setLine: (line: number) => void, setCol: (col: number) => void): Extension {
    return EditorView.updateListener.of((update) => {
        if (update.selectionSet) {
            const pos = update.state.selection.main.head;
            const line = update.state.doc.lineAt(pos);
            const col = pos - line.from + 1;

            setLine(line.number);
            setCol(col);
        }
    });
}


