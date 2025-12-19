# ⚙️ Configuração do Arquivo .env

## 📝 Como Configurar

1. Após implantar o Google Apps Script e obter a URL, abra o arquivo `.env` na raiz do projeto

2. Adicione as URLs completas dos Google Apps Scripts:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_SIMULADOR/exec
VITE_GOOGLE_SCRIPT_EMAIL_URL=https://script.google.com/macros/s/SUA_URL_EMAIL/exec
```

3. **Substitua** `SUA_URL_AQUI` pela URL real que você copiou ao implantar o script

4. Salve o arquivo

5. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## ✅ Exemplo

Se as URLs dos seus scripts forem:
- Simulador: `https://script.google.com/macros/s/AKfycby123456789/exec`
- E-mail: `https://script.google.com/macros/s/AKfycby987654321/exec`

O arquivo `.env` deve conter:
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycby123456789/exec
VITE_GOOGLE_SCRIPT_EMAIL_URL=https://script.google.com/macros/s/AKfycby987654321/exec
```

## ⚠️ IMPORTANTE

- O arquivo `.env` não deve ser commitado no Git (já está no .gitignore)
- Após adicionar as URLs, você precisa reiniciar o servidor para as mudanças terem efeito
- Para produção, você precisará configurar as variáveis de ambiente no servidor de hospedagem
- **VITE_GOOGLE_SCRIPT_URL**: Usado pelo simulador de crédito
- **VITE_GOOGLE_SCRIPT_EMAIL_URL**: Usado pelos formulários de contato e parceiro

