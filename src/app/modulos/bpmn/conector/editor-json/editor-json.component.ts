import { Conector, ConectorBuild } from '@/shared/models/conector.model';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import JSONEditor from 'jsoneditor';

@Component({
  selector: 'app-editor-json',
  imports: [],
  templateUrl: './editor-json.component.html',
  styleUrl: './editor-json.component.scss'
})
export class EditorJsonComponent implements OnInit {

  protected editor!: JSONEditor;
  @Input() json?: any;
  @Input() editavel = false;
  @Output() jsonUpdate = new EventEmitter;
  @ViewChild('editor', { static: true }) editorRef!: ElementRef;

  ngOnInit(): void {
    this.editor = new JSONEditor(this.editorRef.nativeElement, {
      mode: 'code',
      modes: ['code'],
      onEditable: () => this.editavel,
      onChange: () => {
        try {
          const data = this.editor.get();
          this.jsonUpdate.emit(Object.assign(new ConectorBuild(), data))
          console.log('JSON válido:', data);
          console.log('Headers:', data.headers);
        } catch (err) {
          console.warn('JSON inválido ainda', err);
        }
      }
    });
    this.editor.set(this.json);
  }

  public set(json: any) {
    this.editor.set(json);
  }
}
