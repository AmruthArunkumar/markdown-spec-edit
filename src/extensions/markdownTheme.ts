import { tags } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";

export const markdownHeadingStyle = HighlightStyle.define([
    {
        tag: tags.heading1,
        fontSize: "1.8em",
        fontWeight: "bold",
    },
    {
        tag: tags.heading2,
        fontSize: "1.5em",
        fontWeight: "bold",
    },
    {
        tag: tags.heading3,
        fontSize: "1.3em",
        fontWeight: "bold",
    },
]);
