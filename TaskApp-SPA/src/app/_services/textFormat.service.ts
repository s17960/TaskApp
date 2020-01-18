import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextFormatService {
  constructor() {}

  formatUserName(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
