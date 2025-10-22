import { Injectable } from '@angular/core';
import { supabase } from './supabaseClient';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  async login (email: string, password:string){
    const {data, error} = await supabase.auth.signInWithPassword({email, password});
    if (error) throw error;
    return data.user;
  }

  async salvarPlano(plano: any, formData: any) {
    const {data, error} = await supabase
    .from('planos_aula')
    .insert([{
      tema: formData.tema,
      serie: formData.serie,
      disciplina: formData.disciplina,
      duracao: formData.duracao,
      introducao: plano.introducao,
      objetivo_bncc: plano.objetivo_bncc,
      etapas: plano.etapas,
      rubrica_avaliacao: plano.rubrica_avaliacao
    }]);
    
    if (error) {
      console.log('erro supabase:', error);
      throw error;
    };
    
    return data;
  }
}
