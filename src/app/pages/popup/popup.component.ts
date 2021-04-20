import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupPageComponent implements OnInit {
  wordControl: FormControl;
  urls$: Observable<string[]>;
  @ViewChild('input', { static: true }) $input: ElementRef<HTMLInputElement>;

  constructor(private storageService: StorageService) {
    this.wordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);
  }

  ngOnInit(): void {
    this.storageService.update();
    this.$input.nativeElement.focus();
    this.urls$ = this.storageService.urls$;
  }

  async search() {
    if (this.wordControl.invalid) return;

    const currentWord = this.wordControl.value;
    const newWindow = await this.createWindow();

    const tabs = newWindow.tabs;
    const firstTabID = tabs && tabs[0].id;

    this.urls$.subscribe((urls) => {
      urls.forEach((url) => this.createTab(url, currentWord, newWindow.id));
      chrome.tabs.remove(firstTabID!);
      window.close();
    });
  }

  async createWindow(): Promise<chrome.windows.Window> {
    const window = (await this.storageService.openWindow()) as chrome.windows.Window;
    chrome.windows.update(window.id, { state: 'maximized' });
    return window;
  }

  createTab(url: string, currentWord: string, windowID: number) {
    const newUrl = url.replace(/\[word\]/g, currentWord);
    chrome.tabs.create({ url: newUrl, windowId: windowID });
  }
}
