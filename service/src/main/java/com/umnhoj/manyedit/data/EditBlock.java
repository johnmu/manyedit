package com.umnhoj.manyedit.data;

import lombok.Value;

@Value
public class EditBlock {
    String original; // Text before edit
    String edited;   // Text after edit
    int selectionStart; // Start of selected text or cursor position
    int selectionEnd; // End of selected text or same as selection start for cursor position
}
