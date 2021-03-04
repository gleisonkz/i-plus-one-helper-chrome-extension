import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  wordControl: FormControl;
  @ViewChild('input', { static: true }) $input: ElementRef<HTMLInputElement>;

  constructor() {
    this.wordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);
  }

  ngOnInit(): void {
    this.$input.nativeElement.focus();
  }

  search() {
    if (this.wordControl.invalid) return;
    const word = this.wordControl.value;

    const targetUrls = [
      `https://www.wordreference.com/enpt/${word}`,
      `https://context.reverso.net/traducao/ingles-portugues/${word}`,
      `https://www.oxfordlearnersdictionaries.com/us/definition/english/${word}?q=${word}`,
      `https://dictionary.cambridge.org/pt/dicionario/ingles/${word}`,
      `https://translate.google.com.br/?hl=pt&sl=en&tl=pt&text=${word}&op=translate`,
      `https://youglish.com/pronounce/${word}/english?`,
    ];

    targetUrls.forEach((url) => {
      chrome.tabs.create({ url: url });
    });
  }
}
