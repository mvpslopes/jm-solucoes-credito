# ⚙️ Configuração do Arquivo .env

## 📝 Como Configurar

1. Após implantar o Google Apps Script e obter a URL, abra o arquivo `.env` na raiz do projeto

2. Adicione a URL completa do Google Apps Script:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

3. **Substitua** `SUA_URL_AQUI` pela URL real que você copiou ao implantar o script

4. Salve o arquivo

5. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## ✅ Exemplo

Se a URL do seu script for: `https://script.google.com/macros/s/AKfycby123456789/exec`

O arquivo `.env` deve conter:
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycby123456789/exec
```

## ⚠️ IMPORTANTE

- O arquivo `.env` não deve ser commitado no Git (já está no .gitignore)
- Após adicionar a URL, você precisa reiniciar o servidor para as mudanças terem efeito
- Para produção, você precisará configurar a variável de ambiente no servidor de hospedagem

