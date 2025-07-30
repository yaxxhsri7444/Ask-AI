import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Chatservice } from '../../service/chat';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {

  prompt = '';
  response = '';
  typingResponse = '';
  isTyping = false;
  darkMode = false;

  constructor(private service: Chatservice) {}

  sendPrompt() {
    if (!this.prompt.trim()) return;

    this.service.sendprompt(this.prompt).subscribe(
      (data) => {
        this.response = data.response;
      },
      (error) => {
        console.error('Error:', error);
        this.response = 'An error occurred while processing your request.';
      }
    );
  }

  typingEffect(text: string) {
    this.typingResponse = '';
    this.isTyping = true;
    let i = 0;
    const speed = 25;

    const typeNext = () => {
      if (i < text.length) {
        this.typingResponse += text.charAt(i);
        i++;
        setTimeout(typeNext, speed);
      } else {
        this.isTyping = false;
      }
    };

    typeNext();
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.response);
    alert('✅ Response copied!');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode ? 'true' : 'false');
  }
}
