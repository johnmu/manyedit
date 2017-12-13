export class EditBlock {
  original: String; // Text before edit
  edited: String;   // Text after edit
  selectionStart: Number; // Start of selected text or cursor position
  selectionEnd: Number; // End of selected text or same as selection start for cursor position

  constructor(original: String, edited: String, selectionStart: Number, selectionEnd: Number) {
    this.original = original;
    this.edited = edited;
    this.selectionStart = selectionStart;
    this.selectionEnd = selectionEnd;
  }
}
