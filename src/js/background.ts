import maildown from "@anydown/maildown";
import {
    contextMenuId,
    ConvertToPlainRequestMessage,
    ConvertToPlainResponseMessage,
    Id,
    PlainTextMessage,
} from "./common";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuId,
        documentUrlPatterns: ["http://*/*", "https://*/*"],
        title: chrome.i18n.getMessage("contextMenuConvertTitle"),
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab?) => {
    if (info.menuItemId === contextMenuId && tab && tab.id) {
        // @note newline in info.selectionText is converted to space.
        // see https://bugs.chromium.org/p/chromium/issues/detail?id=116429
        if (info.selectionText) {
            // @todo Guess the text is markdown
            const selectedText = info.selectionText;
            const message: PlainTextMessage = {
                id: Id.ContextMenu,
            };
            chrome.tabs.sendMessage(tab.id, message);
        }
    }
});

chrome.runtime.onMessage.addListener(
    (
        message: ConvertToPlainRequestMessage,
        sender: chrome.runtime.MessageSender,
        sendResponse: ((response: any) => void),
    ) => {
        if (message.id === Id.ConvertToPlainText && message.text) {
            const converted: ConvertToPlainResponseMessage = {
                text: maildown(message.text),
            };
            sendResponse(converted);
        }
    },
);
