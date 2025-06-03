import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over',
  standalone: true,
  templateUrl: './game-over.component.html',
})
export class GameOverComponent {
  private router = inject(Router);

  score = 0;
  message = '';

  constructor() {
    const nav = this.router.getCurrentNavigation();
    this.score = nav?.extras.state?.['score'] ?? 0;

    this.message = this.getMessage(this.score);
  }

  getMessage(score: number): string {
    if (score >= 10) return 'Você é um ninja da digitação! 🚀';
    if (score >= 5) return 'Mandou bem! Mas dá pra melhorar 😎';
    return 'Foi só aquecimento, tenta de novo! 🔁';
  }

  restartGame() {
    this.router.navigate(['/']);
  }
}
