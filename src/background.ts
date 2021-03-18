import { StorageService } from 'src/app/storage.service';

const service = new StorageService();

let items = [
  `https://www.wordreference.com/enpt/[word]`,
  `https://context.reverso.net/traducao/ingles-portugues/[word]`,
  `https://www.oxfordlearnersdictionaries.com/us/definition/english/[word]?q=[word]`,
  `https://dictionary.cambridge.org/pt/dicionario/ingles/[word]`,
  `https://translate.google.com.br/?hl=pt&sl=en&tl=pt&text=[word]&op=translate`,
  `https://youglish.com/pronounce/[word]/english?`,
];

service.initialize(items);
