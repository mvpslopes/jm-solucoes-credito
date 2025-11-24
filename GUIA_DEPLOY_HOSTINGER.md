# 🚀 Guia de Deploy - Hostinger

## ✅ Sim, você pode hospedar na Hostinger!

O site JM Soluções em Créditos pode ser hospedado na Hostinger sem problemas. Como é um site React/Vite, precisamos fazer o build (compilação) antes de fazer o upload.

---

## 📋 PRÉ-REQUISITOS

1. **Conta na Hostinger** (qualquer plano de hospedagem)
2. **Acesso ao painel de controle (hPanel)**
3. **Acesso via FTP ou File Manager**

---

## 🎯 PLANO RECOMENDADO NA HOSTINGER

### Opção 1: Hospedagem Compartilhada (Econômica)
- **Plano:** Single Shared Hosting ou Premium Shared Hosting
- **Preço:** A partir de R$ 9,99/mês
- **Ideal para:** Sites estáticos como este
- **Recursos:** Espaço suficiente, SSL gratuito, email

### Opção 2: Hospedagem Cloud (Recomendado)
- **Plano:** Cloud Startup
- **Preço:** A partir de R$ 19,99/mês
- **Vantagens:** Melhor performance, mais recursos
- **Ideal para:** Sites que podem crescer

---

## 🔧 PASSO A PASSO - DEPLOY NA HOSTINGER

### PASSO 1: Fazer o Build do Projeto

No terminal, dentro da pasta do projeto:

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Gerar o build de produção
npm run build
```

Isso vai criar uma pasta `dist` com os arquivos otimizados para produção.

### PASSO 2: Acessar o File Manager da Hostinger

1. Faça login no **hPanel** da Hostinger
2. Vá em **Gerenciador de Arquivos** (File Manager)
3. Navegue até a pasta `public_html` (ou `domínio.com/public_html`)

### PASSO 3: Fazer Upload dos Arquivos

**Opção A: Via File Manager (Interface Web)**
1. Delete todos os arquivos dentro de `public_html` (exceto se houver arquivos importantes)
2. Vá na pasta `dist` do seu projeto local
3. Selecione todos os arquivos dentro de `dist`
4. Faça upload para `public_html`

**Opção B: Via FTP (Recomendado para muitos arquivos)**
1. Use um cliente FTP (FileZilla, WinSCP, etc.)
2. Conecte usando as credenciais FTP da Hostinger
3. Faça upload de todos os arquivos da pasta `dist` para `public_html`

### PASSO 4: Configurar o .htaccess (Importante!)

Crie um arquivo `.htaccess` na pasta `public_html` com o seguinte conteúdo:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache de arquivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### PASSO 5: Verificar SSL/HTTPS

1. No hPanel, vá em **SSL**
2. Ative o **SSL Gratuito** (Let's Encrypt)
3. Aguarde alguns minutos para ativação
4. Acesse seu site via `https://seudominio.com.br`

---

## 📁 ESTRUTURA DE ARQUIVOS NO SERVIDOR

Após o upload, a estrutura deve ficar assim:

```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── Logo JM.png
├── fundo-site.png
└── .htaccess
```

---

## 🔄 ATUALIZAÇÕES FUTURAS

Sempre que fizer alterações no site:

1. **Localmente:**
   ```bash
   npm run build
   ```

2. **No servidor:**
   - Delete os arquivos antigos em `public_html`
   - Faça upload dos novos arquivos da pasta `dist`

---

## ⚙️ CONFIGURAÇÕES ADICIONAIS

### Configurar Email Corporativo

1. No hPanel, vá em **Email**
2. Crie contas de email (ex: contato@seudominio.com.br)
3. Configure no seu cliente de email (Outlook, Gmail, etc.)

### Configurar Domínio

1. Se ainda não tem domínio, compre na Hostinger
2. Ou transfira um domínio existente
3. Configure os DNS se necessário

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Site não carrega
- Verifique se o arquivo `index.html` está na raiz de `public_html`
- Verifique se o `.htaccess` está configurado corretamente
- Limpe o cache do navegador

### Imagens não aparecem
- Verifique se as imagens estão na pasta `public` (serão copiadas para `dist`)
- Verifique os caminhos das imagens no código

### Erro 404 em rotas
- Certifique-se de que o `.htaccess` está configurado
- Verifique se o módulo `mod_rewrite` está ativo

### Site lento
- Ative a compressão GZIP (já incluído no .htaccess)
- Use CDN se necessário
- Otimize as imagens antes do upload

---

## 💡 DICAS IMPORTANTES

1. **Backup:** Sempre faça backup antes de atualizar
2. **Teste localmente:** Teste o build localmente antes de fazer upload
3. **Versionamento:** Use Git para controlar versões
4. **Performance:** O site já está otimizado, mas você pode usar CDN para melhorar ainda mais

---

## 📞 SUPORTE

- **Hostinger:** Suporte 24/7 via chat
- **Documentação:** https://www.hostinger.com.br/tutoriais

---

## ✅ CHECKLIST DE DEPLOY

- [ ] Build do projeto executado (`npm run build`)
- [ ] Arquivos da pasta `dist` enviados para `public_html`
- [ ] Arquivo `.htaccess` criado e configurado
- [ ] SSL/HTTPS ativado
- [ ] Site acessível via domínio
- [ ] Todas as imagens carregando
- [ ] Formulários funcionando
- [ ] WhatsApp funcionando
- [ ] Simulador funcionando
- [ ] Site responsivo (testar em mobile)

---

**Pronto! Seu site estará no ar! 🎉**



