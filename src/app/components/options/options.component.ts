import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  panelOpenState = true;
  urlControl: FormControl;
  urls = [
    `https://www.wordreference.com/enpt/[word]`,
    `https://context.reverso.net/traducao/ingles-portugues/[word]`,
    `https://www.oxfordlearnersdictionaries.com/us/definition/english/[word]?q=[word]`,
    `https://dictionary.cambridge.org/pt/dicionario/ingles/[word]`,
    `https://translate.google.com.br/?hl=pt&sl=en&tl=pt&text=[word]&op=translate`,
    `https://youglish.com/pronounce/[word]/english?`,
  ];

  constructor() {
    this.urlControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^https?:\/\//),
    ]);
  }

  addUrl() {
    this.urlControl.valid && this.urls.push(this.urlControl.value);
    this.urlControl.setValue('');
  }

  word = 'ruthless';

  visible = true;
  selectable = true;
  removable = true;

  ngOnInit(): void {}

  remove(fruit: string): void {
    // const index = this.fruits.indexOf(fruit);
    // if (index >= 0) {
    //   this.fruits.splice(index, 1);
    // }
  }
}
