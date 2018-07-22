import maildown from "@anydown/maildown";
import { contextMenuId, PlainTextMessage } from "./common";

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
                id: contextMenuId,
            };
            chrome.tabs.sendMessage(tab.id, message);
        }
    }
});
