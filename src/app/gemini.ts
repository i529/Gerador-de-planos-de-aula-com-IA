import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Gemini {
  private genAI = new GoogleGenerativeAI(environment.geminiApiKey);

  async gerarPlano(formData: any) {
    const prompt = `
        Gere um plano de aula com base nas seguintes informações:
        Tema: ${formData.tema}
        Série: ${formData.serie}
        Disciplina: ${formData.disciplina}
        Duração: ${formData.duracao}
        
        IMPORTANTE: Responda **APENAS** com JSON válido por JSON.parse, sem markdown, sem asteriscos, 
        sem explicações, sem listas numeradas, sem quebras extras, sem texto adicional, sem comentários.
         
        Formato esperado:
        {
          "introducao": "string",
          "objetivo_bncc": ["string", "string"],
          "etapas": [{"fase": "string", "descricao": ["string", "string"]}],
          "rubrica_avaliacao": ["string", "string"]
        } 
        **IMPORTANTE** As chaves do JSON devem ser exatamente como as características abaixo:
        
        Introdução: Forma criativa e engajadora de apresentar o tema
        objetivo_bncc: Alinhado à Base Nacional Comum Curricular
        etapas: Roteiro detalhado para execução da aula
        rubrica_avaliacao: Critérios para a professora avaliar o aprendizado dos alunos
        
        lembrando, seguindo a risca o formato JSON acima.
        `;

    const model = this.genAI.getGenerativeModel({ model: `gemini-2.5-flash` });
    const result = await model.generateContent(prompt);
      const text = typeof result.response.text === 'function' 
               ? await result.response.text() 
               : String(result.response);
    
    console.log(text);
    

    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error('Falha ao converter resposta proveniente da IA para JSON')
    }
  }
}