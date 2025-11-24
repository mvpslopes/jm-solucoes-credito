# 🔄 Como Atualizar o Código no Google Apps Script

## 📋 Passo a Passo Rápido

1. **Acesse o Google Apps Script:**
   - Vá para: https://script.google.com
   - Ou abra a planilha e vá em **Extensões** → **Apps Script**

2. **Substitua o código:**
   - Selecione todo o código atual (Ctrl+A)
   - Delete
   - Cole o código completo abaixo

3. **Salve:**
   - Clique em **Salvar** (💾)

4. **Atualize a implantação:**
   - Clique em **Implantar** → **Gerenciar implantações**
   - Clique nos **3 pontinhos** (⋮) da implantação existente
   - Clique em **Editar**
   - Clique em **Implantar**
   - Confirme a atualização

---

## 📝 Código Completo para Copiar:

```javascript
// ⚙️ CONFIGURAÇÃO: ID da planilha "Simulações JM Soluções"
const PLANILHA_ID = '17xWB6PswlIjGSWKEIjj1NZY1TZSwRXCv1Smeh-rLTbE';

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
    
    // Converte valores string para número quando necessário
    const valor = parseFloat(dados.valor) || 0;
    const prazo = parseInt(dados.prazo) || 0;
    const parcela = parseFloat(dados.parcela) || 0;
    const totalPagar = parseFloat(dados.totalPagar) || 0;
    const taxa = parseFloat(dados.taxa) || 0;
    
    // Adiciona uma nova linha com os dados (sem a taxa ainda)
    sheet.appendRow([
      dados.data || new Date().toLocaleString('pt-BR'),
      dados.nome || '',
      dados.whatsapp || '',
      valor,
      prazo,
      parcela,
      totalPagar,
      '' // Taxa será inserida depois como texto puro
    ]);
    
    // Formata a última linha adicionada (valores monetários)
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 4).setNumberFormat('R$ #,##0.00'); // Valor
    sheet.getRange(lastRow, 6).setNumberFormat('R$ #,##0.00'); // Parcela
    sheet.getRange(lastRow, 7).setNumberFormat('R$ #,##0.00'); // Total
    
    // Força a taxa a ser texto puro (sem formatação de porcentagem)
    const taxaCell = sheet.getRange(lastRow, 8);
    taxaCell.setNumberFormat('@'); // Formato de texto
    taxaCell.setValue(taxa.toFixed(2) + '%'); // Insere como texto
    
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

---

## ✅ Após Atualizar

Teste fazendo uma nova simulação no site e verifique se a taxa aparece corretamente na planilha (ex: 6.00%, 7.06%, etc.)

