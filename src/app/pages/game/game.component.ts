import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [FormsModule]
})
export class GameComponent implements OnInit {
  private router = inject(Router);

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
    interval(100)
      .pipe(takeWhile(() => this.timeLeft > 0))
      .subscribe(() => {
        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.router.navigate(['/game-over'], {
            state: { score: this.score }
          });
        }
      });
  }

  nextWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randomIndex];
  }

  checkWord() {
    if (this.userInput.trim().toLowerCase() === this.currentWord.toLowerCase()) {
      this.score++;
      this.nextWord();
    } else {
      this.score--;
    }
    this.userInput = '';
  }
}
