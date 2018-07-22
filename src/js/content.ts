import { contextMenuId, convertMarkdownToPlain, PlainTextMessage } from "./common";

chrome.runtime.onMessage.addListener((message: PlainTextMessage, sender: chrome.runtime.MessageSender, sendResponse) => {
    if (message.id === contextMenuId) {
        const element = document.activeElement;
        if (element instanceof HTMLTextAreaElement) {
            convertMarkdownToPlain(element.value.substring(element.selectionStart, element.selectionEnd)).then((converted: string) => {
                element.value = element.value.slice(0, element.selectionStart) + converted + element.value.substring(element.selectionEnd);
            });
        } else if (element instanceof HTMLInputElement && element.selectionStart !== null && element.selectionEnd !== null) {
            convertMarkdownToPlain(element.value.substring(element.selectionStart, element.selectionEnd)).then((converted: string) => {
                if (element.selectionStart !== null && element.selectionEnd !== null) {
                    element.value = element.value.slice(0, element.selectionStart) + converted + element.value.substring(element.selectionEnd);
                }
            });
        }
    }
});
