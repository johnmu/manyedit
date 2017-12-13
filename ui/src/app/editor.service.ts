import { Injectable } from '@angular/core';
import { EditBlock } from './editBlock';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EditorService {

  private editorUrl = '/api/edit';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  update (editBlock: EditBlock): Observable<EditBlock> {
    return this.http.post<EditBlock>(this.editorUrl, editBlock, httpOptions);
  }

}
