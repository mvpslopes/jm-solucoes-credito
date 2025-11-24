# 🚀 Passo a Passo - Implantação do Google Apps Script

## 📋 PASSO 1: Configurar os Cabeçalhos da Planilha

✅ **ID da planilha já configurado:** `17xWB6PswlIjGSWKEIjj1NZY1TZSwRXCv1Smeh-rLTbE`

1. Acesse a planilha: [Simulações JM Soluções](https://docs.google.com/spreadsheets/d/17xWB6PswlIjGSWKEIjj1NZY1TZSwRXCv1Smeh-rLTbE/edit)

---

2. Na **linha 1**, adicione os cabeçalhos (se ainda não tiver):
   ```
   Data/Hora | Nome | WhatsApp | Valor | Prazo | Parcela | Total | Taxa (%)
   ```

3. (Opcional) Formate os cabeçalhos:
   - Selecione a linha 1
   - Clique em **Negrito** (B)
   - Escolha uma cor de fundo (azul, por exemplo)

---

## 📋 PASSO 3: Criar o Google Apps Script

1. Na planilha, clique em **Extensões** (no menu superior)
2. Clique em **Apps Script**
3. Uma nova aba abrirá com o editor de código
4. **Delete todo o código que estiver lá** (geralmente tem `function myFunction() {}`)
5. **Cole este código:**

```javascript
// ⚙️ CONFIGURAÇÃO: ID da planilha "Simulações JM Soluções"
// ✅ ID já configurado automaticamente!
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

6. ✅ **O ID já está configurado no código!** Não precisa alterar nada.

7. Clique em **Salvar** (💾) no canto superior esquerdo
8. Dê um nome ao projeto (ex: "Salvar Simulações JM")

---

## 📋 PASSO 4: Implantar como Aplicativo Web

1. No editor do Apps Script, clique no botão **Implantar** (no canto superior direito)
2. Clique em **Nova implantação**
3. Clique no ícone de **engrenagem** ⚙️ ao lado de "Tipo"
4. Selecione **Aplicativo da Web**
5. Configure:
   - **Descrição**: "API para receber simulações do site"
   - **Executar como**: Selecione **Eu** (seu email)
   - **Quem tem acesso**: Selecione **Qualquer pessoa**
6. Clique em **Implantar**
7. **IMPORTANTE - Autorização:**
   - Uma janela aparecerá pedindo autorização
   - Clique em **Autorizar acesso**
   - Escolha sua conta Google
   - Pode aparecer um aviso "Este app não foi verificado"
   - Clique em **Avançado**
   - Clique em **Ir para [nome do projeto] (não seguro)**
   - Clique em **Permitir**
8. **Copie a URL da implantação:**
   - Aparecerá uma URL como: `https://script.google.com/macros/s/AKfycby.../exec`
   - **COPIE ESTA URL COMPLETA!**
   - Esta é a URL que você usará no site

---

## 📋 PASSO 5: Configurar no Site

1. Na pasta do projeto, crie um arquivo chamado `.env` (se não existir)
2. Abra o arquivo `.env` e adicione:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

3. **Substitua** `SUA_URL_AQUI` pela URL completa que você copiou no Passo 4
   - Exemplo: `VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycby123456/exec`

4. Salve o arquivo

---

## 📋 PASSO 6: Testar

1. No terminal, execute:
   ```bash
   npm run build
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse o site e faça uma simulação de teste:
   - Preencha todos os campos
   - Clique em "Calcular Simulação"
   - Verifique se o resultado aparece

4. **Verifique a planilha:**
   - Abra a planilha "Simulações JM Soluções"
   - Deve aparecer uma nova linha com os dados da simulação

---

## ✅ CHECKLIST FINAL

- [ ] ID da planilha copiado e colado no código
- [ ] Cabeçalhos adicionados na planilha
- [ ] Google Apps Script criado e salvo
- [ ] Script implantado como Aplicativo Web
- [ ] Autorização concedida
- [ ] URL da implantação copiada
- [ ] Arquivo `.env` criado com a URL
- [ ] Teste realizado e dados aparecendo na planilha

---

## ❓ PROBLEMAS COMUNS

### Erro: "Script não autorizado"
- Volte ao Passo 4 e certifique-se de ter clicado em "Permitir" na autorização

### Erro: "Planilha não encontrada"
- Verifique se o ID da planilha está correto no código
- Certifique-se de que a planilha está compartilhada com você

### Dados não aparecem na planilha
- Verifique se a URL no `.env` está correta
- Abra o console do navegador (F12) e veja se há erros
- No Apps Script, vá em "Execuções" para ver se há erros

---

## 🎉 PRONTO!

Agora todas as simulações serão automaticamente salvas na planilha "Simulações JM Soluções"!

