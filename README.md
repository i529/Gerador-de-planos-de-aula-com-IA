##  Gerador de Planos de Aula com IA

Este projeto foi desenvolvido como parte de um **teste técnico** com o objetivo de criar um sistema que gera **planos de aula personalizados utilizando IA**, integrando **Google Gemini API**, **Supabase** e **Angular**.

---

###  Tecnologias Utilizadas

| Tecnologia | Função |
|-------------|---------|
| **Angular** | Front-end e lógica de interface |
| **Google Gemini API (via Google AI Studio)** | Geração de conteúdo com IA |
| **Supabase** | Banco de dados e autenticação |
| **TypeScript** | Tipagem e segurança no código |
| **HTML / CSS** | Estrutura e estilização do formulário |

---

##  Funcionalidades

✅ Formulário para entrada de dados (Tema, Série, Disciplina, Duração)  
✅ Integração com o modelo **Gemini 2.5 Flash** (rápido e gratuito)  
✅ Geração de plano de aula completo com:
- Introdução lúdica  
- Objetivo de aprendizagem da BNCC  
- Passo a passo da atividade  
- Rubrica de avaliação  

✅ Salvamento automático do plano no **Supabase**  
✅ Autenticação de usuário via **Supabase Auth**  
✅ Tratamento de erros e logs de depuração  

---

##  Estrutura de Dados

###  Tabela `planos_aula`

```sql
create table if not exists planos_aula (
  id uuid primary key default gen_random_uuid(),
  tema text not null,
  serie text not null,
  disciplina text not null,
  duracao text not null,
  introducao text,
  objetivo_bncc text,
  etapas text,
  rubrica_avaliacao text,
  create_at timestamp with time zone default now(),
  user_id uuid references auth.users(id)
);
```

###  Políticas de Segurança (RLS)


```sql
-- Ativar Row Level Security
alter table planos_aula enable row level security;

-- Permitir INSERT apenas para usuários autenticados

alter policy "Permitir inserts autenticados"
on "public"."planos_aula"
to public
with check (
  (auth.uid() IS NOT NULL)
);
```

---

##  Configuração do Angular

###  Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/gerador-planos-aula.git
cd gerador-planos-aula
```

###  Instalar dependências

```bash
npm install
```

###  Configurar variáveis de ambiente

Crie o arquivo `src/app/environment/environment.ts`:
Estarei deixando no git um arquivo environment como exemplo.

```typescript
export const environment = {
  supabaseUrl: 'https://SEU_PROJETO.supabase.co',
  supabaseKey: 'SUA_CHAVE_PUBLICA_SUPABASE',
  geminiApiKey: 'SUA_API_KEY_GOOGLE_AI',
  supabaseEmail: 'EMAIL_SUPABASE_AQUI',
  supabaseSenha: 'SENHA_SUPABASE_AQUI'
};
```
### Rodar o projeto

```bash
ng serve
```

Acesse em: **http://localhost:4200**

---

## Fluxo do Sistema

1️⃣ O usuário preenche o formulário (tema, série, disciplina, duração).  
2️⃣ O front-end envia esses dados para o serviço `Gemini`.  
3️⃣ O Gemini retorna um **plano de aula estruturado** em JSON.  
4️⃣ O sistema autentica o usuário no **Supabase Auth**.  
5️⃣ O plano é salvo na tabela `planos_aula`.  
6️⃣ O resultado é exibido na tela e armazenado no banco.  

---

## Escolha do Modelo de IA

Foi utilizado o modelo **`gemini-2.5-flash`**, disponível no [Google AI Studio](https://aistudio.google.com).  
**Motivos da escolha:**
- É gratuito e não exige cartão de crédito.  
- Possui boa velocidade de resposta.  
- Ideal para geração de textos educacionais curtos e bem estruturados.  

---



##  Estrutura de Pastas

```
src/
 ├── app/
 │   ├── components/
 │   │   └── form-plan/
 │   │       ├── form-plan.ts
 │   │       ├── form-plan.html
 │   │       └── form-plan.css
 │   ├── gemini.ts
 │   ├── supabase.ts
 │   ├── supabaseClient.ts
 │   └── environment/            <------- environment fica aqui.
 │       └── environment.ts
```

---

##  Desafios e Soluções

| Desafio | Solução |
|----------|----------|
| Erro “row-level security policy” ao salvar no Supabase | Implementação de autenticação via `signInWithPassword()` |
| Parsing incorreto da resposta do Gemini | Implementado `typeof result.response.text === 'function'` para garantir compatibilidade |
| Falta de sessão persistente no Supabase | Usado `persistSession: false` para ambiente temporário |
| Teste local sem https | Configuração direta no ambiente Angular via `localhost:4200` |

---

##  Decisões Técnicas

- **Angular** foi escolhido por sua estrutura modular e tipagem forte.  
- **Supabase** substitui a necessidade de backend manual, oferecendo autenticação + banco + API RESTful.  
- **Gemini 2.5 Flash** foi preferido pela performance e resposta rápida.  
- As respostas são salvas como **JSON** no banco, para futura expansão da aplicação.

---

## Licença

Este projeto foi desenvolvido apenas para fins de **avaliação técnica**.
