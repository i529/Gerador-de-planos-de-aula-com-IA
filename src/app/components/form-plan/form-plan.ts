import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gemini } from '../../gemini';
import { Supabase } from '../../supabase';

@Component({
  selector: 'app-form-plan',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-plan.html',
  styleUrl: './form-plan.css'
})
export class FormPlan {

  constructor(private geminiService: Gemini, private supabaseService: Supabase) { }

  formData = {
    tema: '',
    serie: '',
    disciplina: '',
    duracao: ''
  };

  planoGerado: any = null;
  erro: string | null = null;
  carregando = false;

  async enviar() {
    this.carregando = true;
    try {

      try {
        this.planoGerado = await this.geminiService.gerarPlano(this.formData);
      } catch (geminiError) {
        console.error('Erro ao gerar plano no gemini:', geminiError);
        throw geminiError;
      }
      console.log('Plano gerado com sucesso:', this.planoGerado);

      try {

        await this.supabaseService.login('testedev@dev.com', '123456');

        await this.supabaseService.salvarPlano(this.planoGerado, this.formData);

      }  catch (error: any) {
      this.erro = error.message;
      console.error('Erro ao salvar plano no Supabase:', error);

      } 
    }finally {
      this.carregando = false;
    }

    console.log(this.planoGerado, 'estou acessando')
  }
}