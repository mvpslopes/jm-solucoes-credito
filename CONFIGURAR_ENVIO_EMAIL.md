# 📧 Configuração de Envio de E-mails dos Formulários

Este guia explica como configurar o envio automático de e-mails para `contato@jmsolucoesmg.com.br` quando os formulários forem preenchidos.

## 📋 Pré-requisitos

- Conta Google (Gmail)
- Acesso ao Google Apps Script
- E-mail `contato@jmsolucoesmg.com.br` já criado na Hostinger

## 🚀 Passo a Passo

### 1. Criar o Google Apps Script

1. Acesse: https://script.google.com/
2. Clique em **"Novo projeto"**
3. Cole o código do arquivo `CODIGO_GOOGLE_APPS_SCRIPT_EMAIL.js`
4. Salve o projeto com o nome: **"Envio de E-mails JM Soluções"**

### 2. Configurar o E-mail de Destino

No código do script, verifique se o e-mail está correto:
```javascript
const EMAIL_DESTINO = 'contato@jmsolucoesmg.com.br';
```

### 3. Implantar como Aplicativo Web

1. No Google Apps Script, clique em **"Implantar"** > **"Nova implantação"**
2. Clique no ícone de engrenagem ⚙️ ao lado de **"Tipo"**
3. Selecione **"Aplicativo da Web"**
4. Configure:
   - **Descrição:** "Envio de e-mails dos formulários"
   - **Executar como:** "Eu"
   - **Quem tem acesso:** "Qualquer pessoa"
5. Clique em **"Implantar"**
6. **Copie a URL gerada** (algo como: `https://script.google.com/macros/s/...`)

### 4. Configurar no Projeto

1. Crie um arquivo `.env` na raiz do projeto (se não existir)
2. Adicione a variável:
   ```
   VITE_GOOGLE_SCRIPT_EMAIL_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
   ```
3. Substitua `SUA_URL_AQUI` pela URL que você copiou

### 5. Testar

1. Faça o build do projeto: `npm run build`
2. Faça upload na Hostinger
3. Preencha um dos formulários no site
4. Verifique se o e-mail chegou em `contato@jmsolucoesmg.com.br`

## 📝 Formulários Configurados

### 1. Formulário de Contato (`Contact.tsx`)
- Envia: Nome, Telefone, WhatsApp, Mensagem
- Assunto: "📧 Novo Contato do Site - [Nome]"

### 2. Formulário de Parceiro (`Partner.tsx`)
- Envia: Nome, Email, Telefone, Cidade, Mensagem
- Assunto: "🚀 Novo Parceiro Local JM - [Nome]"

## ⚠️ Importante

- O script usa `mode: 'no-cors'`, então não podemos verificar a resposta no frontend
- Mas o e-mail será enviado mesmo assim
- Se houver erro, o usuário verá uma mensagem de erro no formulário

## 🔧 Troubleshooting

**E-mail não está chegando?**
1. Verifique se o script foi implantado corretamente
2. Verifique se a URL no `.env` está correta
3. Verifique se o e-mail `contato@jmsolucoesmg.com.br` está ativo
4. Verifique a caixa de spam

**Erro "URL do script não configurada"?**
- Verifique se o arquivo `.env` existe e tem a variável `VITE_GOOGLE_SCRIPT_EMAIL_URL`
- Após adicionar, faça um novo build: `npm run build`

## 📞 Suporte

Se precisar de ajuda, verifique os logs do Google Apps Script em:
- **Execuções** > Ver histórico de execuções

