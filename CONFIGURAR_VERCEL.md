# ⚙️ Configurar Variável de Ambiente no Vercel

## 📋 Passo a Passo

### 1. Acesse o Painel do Vercel
- Vá para: https://vercel.com
- Faça login na sua conta
- Selecione o projeto do site JM Soluções

### 2. Configure a Variável de Ambiente

1. **Vá em Settings** (Configurações)
2. **Clique em "Environment Variables"** (Variáveis de Ambiente)
3. **Adicione uma nova variável:**
   - **Name (Nome):** `VITE_GOOGLE_SCRIPT_URL`
   - **Value (Valor):** Cole a URL completa do seu Google Apps Script:
     ```
     https://script.google.com/macros/s/AKfycbxWt6Gu3YVxEd61c9ayUjNY4lRM0iP6DS3NF41o_pbDtE4bNN1uNHGYJQM6VXVFuXBy/exec
     ```
   - **Environment (Ambiente):** Selecione:
     - ✅ Production (Produção)
     - ✅ Preview (Preview)
     - ✅ Development (Desenvolvimento) - se quiser testar localmente também
4. **Clique em "Save"** (Salvar)

### 3. Faça um Novo Deploy

Após adicionar a variável, você precisa fazer um novo deploy para que ela seja aplicada:

1. **Opção A - Deploy Automático:**
   - Faça um commit e push para o GitHub
   - O Vercel detectará automaticamente e fará um novo deploy

2. **Opção B - Deploy Manual:**
   - Vá em **Deployments**
   - Clique nos **3 pontinhos** (⋮) do último deploy
   - Clique em **Redeploy**
   - Confirme o redeploy

### 4. Verifique se Funcionou

Após o deploy:
1. Acesse o site no Vercel
2. Faça uma simulação de teste
3. Verifique na planilha do Google se os dados foram salvos corretamente

---

## ✅ URL do Google Apps Script

A URL que você precisa configurar é:
```
https://script.google.com/macros/s/AKfycbxWt6Gu3YVxEd61c9ayUjNY4lRM0iP6DS3NF41o_pbDtE4bNN1uNHGYJQM6VXVFuXBy/exec
```

---

## ⚠️ Importante

- As variáveis de ambiente no Vercel são aplicadas no **build time** (momento da compilação)
- Após adicionar/alterar uma variável, **sempre faça um novo deploy**
- Variáveis que começam com `VITE_` são expostas no código do cliente (isso é normal e seguro para URLs públicas)

---

## 🔍 Como Verificar se Está Configurado

1. Após o deploy, abra o console do navegador (F12)
2. Faça uma simulação
3. Se aparecer "Dados enviados para a planilha com sucesso" no console, está funcionando!
4. Se aparecer "VITE_GOOGLE_SCRIPT_URL não configurada", a variável não foi configurada corretamente

