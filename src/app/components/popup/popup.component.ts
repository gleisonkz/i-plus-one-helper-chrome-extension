import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/storage.service';

@Component({
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  wordControl: FormControl;
  urls$: Observable<string[]>;
  @ViewChild('input', { static: true }) $input: ElementRef<HTMLInputElement>;

  constructor(private storageService: StorageService) {
    this.wordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);
  }

  async ngOnInit(): Promise<void> {
    this.$input.nativeElement.focus();
    this.urls$ = this.storageService.urls$;
  }

  async search() {
    if (this.wordControl.invalid) return;
    const word = this.wordControl.value;
    const newWindow = (await this.storageService.openWindow()) as chrome.windows.Window;
    this.urls$.subscribe((urls) => {
      urls.forEach((url) => {
        const newUrl = url.replace(/\[word\]/g, word);
        chrome.tabs.create({ url: newUrl, windowId: newWindow.id });
        chrome.windows.update(newWindow.id, { state: 'maximized' });
      });
      window.close();
    });
  }
}
