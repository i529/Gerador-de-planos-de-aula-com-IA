import { Component, signal } from '@angular/core';
import { FormPlan } from "./components/form-plan/form-plan";

@Component({
  selector: 'app-root',
  imports: [FormPlan],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gerador-planos-aula');
}
