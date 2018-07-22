import { convertMarkdownToPlain } from "./common";

const button = document.getElementById("button");
const textarea = document.getElementById("textarea");
if (button && textarea && textarea instanceof HTMLTextAreaElement) {
    button.onclick = (e: MouseEvent) => {
        convertMarkdownToPlain(textarea.value).then((converted: string) => {
            textarea.value = converted;
        });
    };
}
