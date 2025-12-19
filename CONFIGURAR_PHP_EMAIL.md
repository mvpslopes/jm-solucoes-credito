# 📧 Configuração de Envio de E-mails com PHP na Hostinger

Este guia explica como configurar o envio automático de e-mails usando PHP diretamente na Hostinger.

## 📋 Pré-requisitos

- Hospedagem ativa na Hostinger
- E-mail `contato@jmsolucoesmg.com.br` criado na Hostinger
- Acesso ao Gerenciador de Arquivos da Hostinger

## 🚀 Passo a Passo

### 1. Fazer Upload do Arquivo PHP

1. Acesse o **Gerenciador de Arquivos** na Hostinger
2. Navegue até a pasta `public_html` (raiz do site)
3. Faça upload do arquivo `send-email.php` que está na pasta `public` do projeto
4. Certifique-se de que o arquivo está na raiz de `public_html` (mesmo nível do `index.html`)

### 2. Verificar Permissões do Arquivo

1. No Gerenciador de Arquivos, clique com o botão direito no arquivo `send-email.php`
2. Selecione **"Alterar permissões"** ou **"Change permissions"**
3. Configure para: **644** (ou **rw-r--r--**)
4. Salve

### 3. Configurar o E-mail de Destino (Opcional)

Se quiser alterar o e-mail de destino, edite o arquivo `send-email.php` e modifique:

```php
$email_destino = 'contato@jmsolucoesmg.com.br';
```

### 4. Testar o Envio

1. Acesse o site: `jmsolucoesmg.com.br`
2. Preencha o formulário de contato ou de parceiro
3. Envie o formulário
4. Verifique se o e-mail chegou em `contato@jmsolucoesmg.com.br`

## 📝 Estrutura de Arquivos

Após o upload, a estrutura deve ficar assim:

```
public_html/
├── index.html
├── send-email.php  ← Arquivo PHP aqui
├── assets/
│   ├── index-xxx.js
│   └── index-xxx.css
├── fundo-site.png
└── Logo JM.png
```

## ⚙️ Como Funciona

1. O formulário React envia os dados via `fetch()` para `/send-email.php`
2. O PHP recebe os dados JSON
3. O PHP monta o e-mail com os dados
4. O PHP envia o e-mail usando a função `mail()` do PHP
5. O PHP retorna uma resposta JSON (sucesso ou erro)
6. O React exibe a mensagem de feedback para o usuário

## 🔧 Troubleshooting

### E-mail não está chegando?

1. **Verifique se o arquivo PHP está na raiz de `public_html`**
   - Deve estar no mesmo nível do `index.html`

2. **Verifique as permissões do arquivo**
   - Deve ser 644 (rw-r--r--)

3. **Verifique se o e-mail está ativo na Hostinger**
   - Acesse o painel de e-mails e confirme que `contato@jmsolucoesmg.com.br` existe

4. **Verifique a caixa de spam**
   - E-mails podem ir para spam inicialmente

5. **Teste o PHP diretamente**
   - Acesse: `https://jmsolucoesmg.com.br/send-email.php`
   - Deve retornar um erro JSON (isso é normal, significa que o arquivo está funcionando)

### Erro "Método não permitido"?

- Verifique se o formulário está enviando via POST
- Verifique se o caminho `/send-email.php` está correto

### Erro 500 (Internal Server Error)?

- Verifique os logs de erro do PHP na Hostinger
- Verifique se a função `mail()` está habilitada no PHP
- Entre em contato com o suporte da Hostinger se necessário

## 📧 Configuração Avançada (SMTP)

Se a função `mail()` não funcionar, você pode configurar SMTP. A Hostinger geralmente suporta SMTP. Para isso, seria necessário usar uma biblioteca como PHPMailer, mas isso é mais complexo.

**Por enquanto, a função `mail()` do PHP deve funcionar perfeitamente na Hostinger.**

## ✅ Vantagens desta Solução

- ✅ Não depende de serviços externos (Google, etc.)
- ✅ Mais rápido (roda direto no servidor)
- ✅ Mais seguro (dados não saem do seu servidor)
- ✅ Sem limites de uso
- ✅ Gratuito (já está incluído na hospedagem)

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs de erro do PHP na Hostinger
2. Entre em contato com o suporte da Hostinger
3. Verifique se o PHP está configurado corretamente

