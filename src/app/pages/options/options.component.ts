import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsPageComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  urlControl: FormControl;
  urls$: Observable<string[]>;
  hasValue$: Observable<boolean>;

  constructor(private storageService: StorageService) {
    this.urlControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^https?:\/\/\w+[.]\w+/),
    ]);
  }

  ngOnInit(): void {
    this.storageService.update();
    this.urls$ = this.storageService.urls$;
    this.hasValue$ = this.storageService.hasValue$;
  }

  addUrl() {
    this.urlControl.valid && this.storageService.set(this.urlControl.value);
    this.urlControl.reset();
  }

  async remove(url: string) {
    let currentUrls = await this.storageService.get();
    currentUrls = currentUrls.filter((c) => url !== c);
    this.storageService.post(currentUrls);
  }
}
