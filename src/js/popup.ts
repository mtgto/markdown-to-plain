import maildown from "@anydown/maildown";

const button = document.getElementById("button");
const textarea = document.getElementById("textarea");
if (button && textarea && textarea instanceof HTMLTextAreaElement) {
    button.onclick = (e: MouseEvent) => {
        textarea.value = maildown(textarea.value).trim();
    };
}
