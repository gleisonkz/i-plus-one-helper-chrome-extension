import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
    (async () => {
      const values = await this.get();
      this.urls$$.next(values);
    })();
  }

  private urls$$ = new BehaviorSubject<string[]>([]);

  urls$ = this.urls$$.asObservable();

  get urls(): string[] {
    return this.urls$$.value;
  }

  set urls(urls: string[]) {
    this.urls$$.next(urls);
  }

  async set(url: string): Promise<void> {
    const currentUrls = await this.get();
    currentUrls.push(url);
    this.urls = currentUrls;
    chrome.storage.sync.set({ urls: currentUrls }, () => {});
  }

  async post(currentUrls: string[]): Promise<void> {
    chrome.storage.sync.set({ urls: currentUrls }, () => {
      this.urls = currentUrls;
    });
    this.urls = currentUrls;
  }

  async get(): Promise<string[]> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['urls'], (result) => resolve(result.urls));
    });
  }

  async initialize() {
    const hasData = (await this.get()).length > 0;
    if (hasData) return;

    const items = [
      `https://www.wordreference.com/enpt/[word]`,
      `https://context.reverso.net/traducao/ingles-portugues/[word]`,
      `https://www.oxfordlearnersdictionaries.com/us/definition/english/[word]?q=[word]`,
      `https://dictionary.cambridge.org/pt/dicionario/ingles/[word]`,
      `https://translate.google.com.br/?hl=pt&sl=en&tl=pt&text=[word]&op=translate`,
      `https://youglish.com/pronounce/[word]/english?`,
    ];

    chrome.storage.sync.set({ urls: items }, () => {
      console.log('Storage Inicializado ' + items);
      this.urls$$.next(items);
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
