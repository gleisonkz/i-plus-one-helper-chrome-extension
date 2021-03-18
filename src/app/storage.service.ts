import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async set(url: string): Promise<void> {
    const currentUrls = await this.get();
    currentUrls.push(url);
    chrome.storage.sync.set({ urls: currentUrls }, function () {
      console.log('Value is set to ' + currentUrls);
    });
  }

  async initialize(items: string[]) {
    const hasData = (await this.get()).length > 0;
    if (hasData) return;
    chrome.storage.sync.set({ urls: items }, () => {
      console.log('Storage Inicializado ' + items);
    });
  }

  async get(): Promise<string[]> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['urls'], (result) => resolve(result.urls));
    });
  }

  async openWindow() {
    return new Promise((resolve) => {
      chrome.windows.create({}, (windows) => {
        if (windows != null) {
          resolve(windows as chrome.windows.Window);
        }
      });
    });
  }
}
