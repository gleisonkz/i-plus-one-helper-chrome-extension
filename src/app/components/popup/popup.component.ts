import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  wordControl: FormControl;
  constructor() {
    this.wordControl = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {}
}
