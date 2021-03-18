import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/storage.service';

@Component({
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  urlControl: FormControl;
  urls: string[];

  constructor(private storageService: StorageService) {
    this.urlControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^https?:\/\//),
    ]);
  }

  addUrl() {
    this.urlControl.valid && this.storageService.set(this.urlControl.value);
    this.urlControl.setValue('');
  }

  async ngOnInit(): Promise<void> {
    this.urls = await this.storageService.get();
  }

  remove(url: string) {
    console.log('click');
    // let currentUrls = await this.storageService.get();
    // currentUrls = currentUrls.filter((c) => url !== c);
    // console.log(currentUrls);
  }

  test() {
    console.log('Teste');
  }
}
