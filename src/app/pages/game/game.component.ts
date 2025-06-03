import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, takeWhile } from 'rxjs';
import { FreesoundService } from '../../core/services/freesound.service';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [FormsModule]
})
export class GameComponent implements OnInit {
  private router = inject(Router);
  private freesoundService = inject(FreesoundService)
  wordChanged = true;
  currentWord = '';
  userInput = '';
  score = 0;
  timeLeft = 60;

  words = [
    'angular', 'component', 'typescript', 'rxjs', 'template',
    'service', 'module', 'directive', 'router', 'state',
    'binding', 'observable', 'input', 'output', 'form'
  ];

  ngOnInit(): void {
    this.nextWord();
    this.startTimer();
  }

  startTimer() {
    interval(500)
      .pipe(takeWhile(() => this.timeLeft > 0))
      .subscribe(() => {
        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.onGameOver(); // 🔔 toca som de fim de jogo
          this.router.navigate(['/game-over'], {
            state: { score: this.score }
          });
        }
      });
  }

  nextWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randomIndex];
    this.wordChanged = true;

    // Remove a classe de animação após 300ms para permitir nova ativação depois
    setTimeout(() => {
      this.wordChanged = false;
    }, 300);
  }

  checkWord() {
    if (this.userInput.trim().toLowerCase() === this.currentWord.toLowerCase()) {
      this.score++;
      this.onCorrectAnswer(); // ✅ toca som de acerto
      this.nextWord();
    } else {
      this.score--;
      this.onWrongAnswer(); // ❌ toca som de erro
    }
    this.userInput = '';
  }

  playSound(query: string) {
    this.freesoundService.searchSound(query).subscribe(url => {
      console.log('🔊 Preview URL:', url); // 👈 adicionado

      if (url) {
        const audio = new Audio(url);
        audio.volume = 0.5;
        audio.play();
      } else {
        console.warn(`❌ Nenhum som encontrado para: ${query}`);
      }
    });
  }

  onCorrectAnswer() {
    this.playSound('button click');
  }

  onWrongAnswer() {
    this.playSound('positive notification');
  }

  onGameOver() {
    this.playSound('error beep');
  }
}
