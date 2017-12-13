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
    this.currText = '';
    this.timer = Observable.timer(0, 2000);
  }

  ngOnInit() {
    this.timer.subscribe(x => {
      const el = this.editorArea.nativeElement;
      const prevVal = el.value;
      const prevStart = el.selectionStart;
      const prevEnd = el.selectionEnd;
      console.log( x + ':' + this.currText + ':' + prevVal + ':' + prevStart + ':' + prevEnd );
      const block = new EditBlock(this.currText, prevVal, prevStart, prevEnd);
      this.currText = prevVal;
      const updatedBlock = this.editorService.update(block);
      updatedBlock.subscribe(v => {
        const elinner = this.editorArea.nativeElement;
        console.log(elinner.value + ' response: ' + v.edited + ':' + v.selectionStart + ':' + v.selectionEnd);
        if (elinner.value === v.original) {
          console.log('updated');
          this.currText = v.edited;
          elinner.value = v.edited;
          elinner.selectionStart = v.selectionStart;
          elinner.selectionEnd = v.selectionEnd;
        } // Otherwise just ignore because the request is stale
      });
    });
  }

}
