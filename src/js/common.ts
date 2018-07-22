/**
 * This file is used from content / background scripts.
 */
export const contextMenuId: string = "87102717-DC51-4433-AFF6-2CF4284B3D78";

export enum Id {
    ContextMenu = "87102717-DC51-4433-AFF6-2CF4284B3D78",
    ConvertToPlainText = "67AB1570-DE95-4D70-AB4F-DAAF6A08E218",
}

export interface PlainTextMessage {
    readonly id: Id.ContextMenu;
}

export interface ConvertToPlainRequestMessage {
    readonly id: Id.ConvertToPlainText;
    readonly text: string;
}

export interface ConvertToPlainResponseMessage {
    readonly text: string;
}
