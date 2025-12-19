# 🧪 Como Testar o Envio de E-mails Localmente

Este guia explica como testar o envio de e-mails dos formulários antes de fazer upload na Hostinger.

## 📋 Pré-requisitos

- Node.js instalado (já tem, pois está usando Vite)
- Terminal/PowerShell aberto

## 🚀 Passo a Passo

### Opção 1: Teste Simulado (Recomendado)

Este método **simula** o envio de e-mails (não envia e-mails reais), mas permite testar se os formulários estão funcionando corretamente.

#### 1. Abra **2 terminais**:

**Terminal 1** - Servidor de teste de e-mail:
```bash
npm run dev:test-email
```

Você verá:
```
🚀 Servidor de teste de e-mail rodando em http://localhost:3001
📧 Este servidor SIMULA o envio de e-mails (não envia e-mails reais)
💡 Os dados do formulário serão exibidos no console
```

**Terminal 2** - Servidor de desenvolvimento do site:
```bash
npm run dev
```

O site estará em: `http://localhost:3000`

#### 2. Teste os formulários:

1. Acesse `http://localhost:3000` no navegador
2. Preencha o **formulário de contato** ou **formulário de parceiro**
3. Clique em "Enviar"
4. **Veja o Terminal 1** - os dados do formulário serão exibidos no console
5. **Veja o navegador** - deve aparecer a mensagem de sucesso

### Opção 2: Teste com PHP Real (Avançado)

Se você quiser testar com PHP real (que realmente tenta enviar e-mails):

#### 1. Instale o PHP:

**Windows:**
- Baixe em: https://windows.php.net/download/
- Ou instale via XAMPP: https://www.apachefriends.org/

**Mac:**
```bash
brew install php
```

**Linux:**
```bash
sudo apt-get install php
```

#### 2. Inicie o servidor PHP:

Em um terminal, na pasta `dist` (após fazer build):
```bash
cd dist
php -S localhost:3001
```

#### 3. Configure o Vite:

O `vite.config.ts` já está configurado para fazer proxy do PHP.

#### 4. Inicie o Vite:

Em outro terminal:
```bash
npm run dev
```

#### 5. Teste:

- Acesse `http://localhost:3000`
- Preencha os formulários
- Os e-mails serão enviados (se o PHP estiver configurado corretamente)

## ⚠️ Importante

### Teste Simulado (Opção 1):
- ✅ Não envia e-mails reais
- ✅ Mostra os dados no console
- ✅ Testa se o formulário está funcionando
- ✅ Mais rápido e simples

### Teste com PHP Real (Opção 2):
- ⚠️ Pode não funcionar localmente (depende da configuração do PHP)
- ⚠️ Pode precisar configurar SMTP
- ✅ Testa o código PHP real
- ⚠️ Mais complexo

## 💡 Recomendação

**Use a Opção 1 (Teste Simulado)** para verificar se:
- Os formulários estão enviando os dados corretamente
- As mensagens de sucesso/erro aparecem
- O código está funcionando

**Depois, faça o upload na Hostinger** e teste lá com o PHP real.

## 🔍 O que Verificar no Teste

1. ✅ Formulário envia sem erros
2. ✅ Mensagem de sucesso aparece
3. ✅ Formulário é limpo após envio
4. ✅ Dados aparecem no console (Terminal 1)
5. ✅ Mensagem de erro aparece se houver problema

## 📝 Exemplo de Saída no Console

Quando você enviar um formulário, verá algo assim no Terminal 1:

```
📧 ===== E-MAIL SIMULADO =====
Tipo: Contato
Nome: João Silva
Telefone: (31) 99999-9999
WhatsApp: (31) 99999-9999
Mensagem: Gostaria de mais informações
Data/Hora: 26/11/2025 15:30:45
================================
```

## 🚨 Troubleshooting

**Erro "Cannot connect to server"?**
- Verifique se o Terminal 1 está rodando (`npm run dev:test-email`)
- Verifique se a porta 3001 está livre

**Formulário não envia?**
- Abra o Console do navegador (F12) e veja se há erros
- Verifique se ambos os servidores estão rodando

**Dados não aparecem no console?**
- Verifique se está olhando o Terminal correto (Terminal 1)
- Verifique se o servidor de teste está rodando

## ✅ Próximo Passo

Após testar localmente e confirmar que está funcionando:
1. Faça o build: `npm run build`
2. Faça upload na Hostinger
3. Teste no site real

