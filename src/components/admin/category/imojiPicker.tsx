/// <reference types="react" />
import React from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";

export interface EmojiPickerProps {
    onEmojiClick: (emojiData: EmojiClickData) => void;
}

export default function EmojiPicker({ onEmojiClick }: EmojiPickerProps) {
    return (
        <div>
            <Picker
                onEmojiClick={onEmojiClick}
                searchPlaceholder="Search emojis..."
                width="100%"
                height={350}
            />
        </div>
    );
}
