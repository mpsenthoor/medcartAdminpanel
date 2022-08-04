import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
// import { ClassicEditor } from "@ckeditor/ckeditor5-build-classic/build/ckeditor.js";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import {ckEditor} from '../ckeditor';

@Component({
  selector: 'app-ck-editer',
  templateUrl: './ck-editer.component.html',
  styleUrls: ['./ck-editer.component.scss']
})
export class CkEditerComponent implements OnInit {
  @Input() editorValue :any;
  @Output() setCkEditorValue = new EventEmitter();

  // editorForm : FormGroup;
  constructor(
    // private fb : FormBuilder,
  ) {
    // this.ckEditorData = this.editorValue;
    // this.editorForm = this.fb.group({
    //   myckeditor : this.editorValue,
    // })
  }
  

// customEditor = Editor;
Editor = ClassicEditor;
// ckeConfig: any;
// editerVal = ckEditor.builtinPlugins;
// ckEditorData : any;
  ngOnInit(): void {
    // <script src="./node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
    // this.Editor.setData(this.editorValue);
    // console.log(this.editorValue);
  }

  check(){
    // this.editorValue = this.ckEditorData;
    // console.log(this.ckEditorData);
    // console.log(this.ckEditorData);
    // this.setCkEditorValue.emit(this.ckEditorData);
  }

  onChange({ editor }: ChangeEvent) {
    // const data = editor.getData();
    // console.log(data);
    this.setCkEditorValue.emit(editor.getData());
    // this.editorValue = data;
  }

  // onBlur({ editor }: ChangeEvent) {
  //   const data = editor.getData();
  //   console.log(data);
  //   this.editorValue = data;
  // }

  // get f(){
  //   return this.fb.control;
  // }

}
