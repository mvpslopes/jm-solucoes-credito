# 📊 Guia de Configuração - Google Sheets para Simulações

Este guia explica como configurar uma planilha do Google Sheets para receber automaticamente os dados das simulações realizadas no site.

---

## 📋 PASSO A PASSO

### PASSO 1: Configurar a Planilha

✅ **A planilha já foi criada:** "Simulações JM Soluções"

1. Abra a planilha: [Simulações JM Soluções](https://drive.google.com/drive/folders/1mGAxSE2ImVVVYQCgK2Z_L3QhcjaZD6Nc?usp=sharing)
2. Na primeira linha, adicione os cabeçalhos (se ainda não tiver):
   ```
   Data/Hora | Nome | WhatsApp | Valor | Prazo | Parcela | Total | Taxa (%)
   ```
3. **IMPORTANTE**: Copie o ID da planilha da URL:
   - A URL será algo como: `https://docs.google.com/spreadsheets/d/1ABC123XYZ.../edit`
   - O ID é a parte entre `/d/` e `/edit` (ex: `1ABC123XYZ...`)

### PASSO 2: Criar o Google Apps Script

1. Abra a planilha "Simulações JM Soluções"
2. Vá em **Extensões** → **Apps Script**
3. Delete o código padrão e cole o código abaixo
4. **IMPORTANTE**: No código, substitua `COLE_O_ID_DA_PLANILHA_AQUI` pelo ID real da sua planilha
   - Para encontrar o ID: veja a URL da planilha quando estiver aberta
   - Exemplo de URL: `https://docs.google.com/spreadsheets/d/1ABC123XYZ.../edit`
   - O ID é a parte entre `/d/` e `/edit`

```javascript
// ⚙️ CONFIGURAÇÃO: Cole o ID da sua planilha aqui
// Para encontrar o ID: abra a planilha e veja a URL
// Exemplo: https://docs.google.com/spreadsheets/d/1ABC123XYZ.../edit
// O ID é: 1ABC123XYZ...
const PLANILHA_ID = 'COLE_O_ID_DA_PLANILHA_AQUI';

function doPost(e) {
  try {
    // Abre a planilha específica pelo ID
    const spreadsheet = SpreadsheetApp.openById(PLANILHA_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Se a planilha estiver vazia, adiciona os cabeçalhos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data/Hora', 'Nome', 'WhatsApp', 'Valor', 'Prazo', 'Parcela', 'Total', 'Taxa (%)']);
      
      // Formata os cabeçalhos
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Parse dos dados recebidos
    const dados = JSON.parse(e.postData.contents);
    
    // Adiciona uma nova linha com os dados
    sheet.appendRow([
      dados.data || new Date().toLocaleString('pt-BR'),
      dados.nome || '',
      dados.whatsapp || '',
      dados.valor || 0,
      dados.prazo || 0,
      dados.parcela || 0,
      dados.totalPagar || 0,
      dados.taxa || 0
    ]);
    
    // Formata a última linha adicionada (valores monetários)
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 4).setNumberFormat('R$ #,##0.00'); // Valor
    sheet.getRange(lastRow, 6).setNumberFormat('R$ #,##0.00'); // Parcela
    sheet.getRange(lastRow, 7).setNumberFormat('R$ #,##0.00'); // Total
    sheet.getRange(lastRow, 8).setNumberFormat('0.00%'); // Taxa
    
    // Retorna sucesso
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retorna erro
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique em **Salvar** (💾) e dê um nome ao projeto (ex: "Salvar Simulações")

### PASSO 3: Implantar como Aplicativo Web

1. No Apps Script, clique em **Implantar** → **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Tipo" e selecione **Aplicativo da Web**
3. Configure:
   - **Descrição**: "API para receber simulações"
   - **Executar como**: "Eu"
   - **Quem tem acesso**: "Qualquer pessoa"
4. Clique em **Implantar**
5. **IMPORTANTE**: Na primeira vez, você precisará autorizar o script:
   - Clique em **Autorizar acesso**
   - Escolha sua conta Google
   - Clique em **Avançado** → **Ir para [nome do projeto] (não seguro)**
   - Clique em **Permitir**
6. Copie a **URL da implantação** (algo como: `https://script.google.com/macros/s/AKfycby.../exec`)

### PASSO 4: Configurar no Site

1. Crie um arquivo `.env` na raiz do projeto (se não existir)
2. Adicione a URL do Google Apps Script:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

3. **IMPORTANTE**: Substitua `SUA_URL_AQUI` pela URL que você copiou no passo 3

### PASSO 5: Testar

1. Faça o build do projeto: `npm run build`
2. Teste uma simulação no site
3. Verifique se os dados aparecem na planilha do Google Sheets

---

## 🔒 SEGURANÇA (Opcional)

Para maior segurança, você pode adicionar uma verificação de token:

**No Google Apps Script**, adicione no início da função:

```javascript
const TOKEN_SECRETO = 'SEU_TOKEN_SECRETO_AQUI'; // Escolha um token difícil de adivinhar

function doPost(e) {
  // Verifica o token
  const dados = JSON.parse(e.postData.contents);
  if (dados.token !== TOKEN_SECRETO) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Token inválido'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // ... resto do código
}
```

**No código do site**, adicione o token ao enviar:

```javascript
const dados = {
  token: 'SEU_TOKEN_SECRETO_AQUI',
  nome: formData.nome,
  // ... resto dos dados
};
```

---

## 📝 ESTRUTURA DA PLANILHA

A planilha será preenchida automaticamente com as seguintes colunas:

| Data/Hora | Nome | WhatsApp | Valor | Prazo | Parcela | Total | Taxa (%) |
|-----------|------|----------|-------|-------|---------|-------|----------|
| 24/11/2025 18:30 | João Silva | (31) 99999-9999 | 4000 | 12 | 333.33 | 4000.00 | 17.65 |

---

## ❓ TROUBLESHOOTING

### Os dados não estão aparecendo na planilha?

1. Verifique se a URL do Google Apps Script está correta no `.env`
2. Verifique se o script foi implantado corretamente
3. Verifique se você autorizou o acesso na primeira vez
4. Abra o console do navegador (F12) e veja se há erros

### Erro de CORS?

O código já está configurado com `mode: 'no-cors'`, então não deve haver problemas de CORS.

### Como ver os logs do Google Apps Script?

1. No Apps Script, vá em **Execuções** (ícone de relógio)
2. Você verá todas as execuções e possíveis erros

---

## ✅ PRONTO!

Agora todas as simulações serão automaticamente salvas na sua planilha do Google Sheets! 🎉

