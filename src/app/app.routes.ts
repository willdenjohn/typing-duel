import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { GameOverComponent } from './pages/game-over/game-over.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'game-over', component: GameOverComponent },
  { path: '**', redirectTo: '' }
];