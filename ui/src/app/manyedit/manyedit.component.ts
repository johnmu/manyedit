import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { EditorService } from '../editor.service';
import { EditBlock } from '../editBlock';

@Component({
  selector: 'app-manyedit',
  templateUrl: './manyedit.component.html',
  styleUrls: ['./manyedit.component.css']
})
export class ManyeditComponent implements OnInit {
  @ViewChild('editor') editorArea: ElementRef;

  currText: String;
  timer: Observable<Number>;

  constructor(private editorService: EditorService) {
    this.timer = Observable.timer(0, 300);
  }

  ngOnInit() {
    this.timer.subscribe(x => {
      const el = this.editorArea.nativeElement;
      const prevVal = el.value;
      const prevStart = el.selectionStart;
      const prevEnd = el.selectionEnd;
      // console.log( x + ':' + prevVal + ':' + prevStart + ':' + prevEnd );
      const block = new EditBlock(this.currText, prevVal, prevStart, prevEnd);
      this.currText = prevVal;
      const updatedBlock = this.editorService.update(block);
      updatedBlock.subscribe(v => {
        if (this.currText === v.original) {
          this.currText = v.edited;
          el.value = v.edited;
          el.selectionStart = v.selectionStart;
          el.selectionEnd = v.selectionEnd;
        } // Otherwise just ignore because the request is stale
      });
    });
  }

}
