import { Decoration, EditorView, ViewPlugin, ViewUpdate, type DecorationSet } from "@codemirror/view";
import { Facet, RangeSet, RangeSetBuilder, type Extension } from "@codemirror/state";

const baseTheme: Extension = EditorView.baseTheme({
    "&light .cm-zebraStripe": {
        backgroundColor: "#d5d5d5bb",
    },
    "&dark .cm-zebraStripe": { backgroundColor: "#34474788" },
});

const stepSize = Facet.define<number, number>({
    combine: (values) => (values.length ? Math.min(...values) : 2),
});

export function zebraStripes(options: { step?: number } = {}): Extension {
    return [baseTheme, options.step == null ? [] : stepSize.of(options.step), showStripes];
}

const stripe: Decoration = Decoration.line({
    attributes: { class: "cm-zebraStripe" },
});

function stripeDeco(view: EditorView): RangeSet<Decoration> {
    let step = view.state.facet(stepSize);
    let builder = new RangeSetBuilder<Decoration>();
    for (let { from, to } of view.visibleRanges) {
        for (let pos = from; pos <= to; ) {
            let line = view.state.doc.lineAt(pos);
            if (line.number % step == 0) {
                builder.add(line.from, line.from, stripe);
            }
            pos = line.to + 1;
        }
    }
    return builder.finish();
}

const showStripes = ViewPlugin.fromClass(
    class {
        decorations: DecorationSet;

        constructor(view: EditorView) {
            this.decorations = stripeDeco(view);
        }

        update(update: ViewUpdate) {
            if (update.docChanged || update.viewportChanged) {
                this.decorations = stripeDeco(update.view);
            }
        }
    },
    { decorations: (v) => v.decorations },
);
