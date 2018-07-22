import maildown from "@anydown/maildown";
import { contextMenuId, PlainTextMessage } from "./common";

chrome.runtime.onMessage.addListener((message: PlainTextMessage, sender: chrome.runtime.MessageSender, sendResponse) => {
    if (message.id === contextMenuId) {
        const element = document.activeElement;
        if (element instanceof HTMLTextAreaElement) {
            const converted: string = maildown(element.value.substring(element.selectionStart, element.selectionEnd));
            element.value = element.value.slice(0, element.selectionStart) + converted + element.value.substring(element.selectionEnd);
        } else if (element instanceof HTMLInputElement && element.selectionStart !== null && element.selectionEnd !== null) {
            const converted: string = maildown(element.value.substring(element.selectionStart, element.selectionEnd));
            element.value = element.value.slice(0, element.selectionStart) + converted + element.value.substring(element.selectionEnd);
        }
    }
});
