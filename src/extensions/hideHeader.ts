import { ViewPlugin, Decoration, type DecorationSet, EditorView, ViewUpdate } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";

export const hideMarkdownHeaders = ViewPlugin.fromClass(
    class {
        decorations: DecorationSet;

        constructor(view: EditorView) {
            this.decorations = this.buildDecorations(view);
        }

        update(update: ViewUpdate) {
            if (update.docChanged || update.viewportChanged || update.selectionSet) {
                this.decorations = this.buildDecorations(update.view);
            }
        }

        buildDecorations(view: EditorView) {
            const builder = new RangeSetBuilder<Decoration>();

            for (const { from, to } of view.visibleRanges) {
                const text = view.state.doc.sliceString(from, to);
                const lines = text.split("\n");

                let pos = from;

                for (const [index, lineText] of lines.entries()) {
                    const match = /^(#{1,6})\s/.exec(lineText);

                    if (match && index != view.state.doc.lineAt(view.state.selection.main.head).number - 1) {
                        const hashesLength = match[1].length;
                        builder.add(pos, pos + hashesLength + 1, Decoration.replace({ inline: true }));
                    }
                    pos += lineText.length + 1;
                }
            }
            return builder.finish();
        }
    },
    {
        decorations: (v) => v.decorations,
    },
);
