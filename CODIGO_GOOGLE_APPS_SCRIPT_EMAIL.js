// 📧 SCRIPT PARA ENVIO DE E-MAILS DOS FORMULÁRIOS
// Este script recebe dados dos formulários e envia e-mail para contato@jmsolucoesmg.com.br

const EMAIL_DESTINO = 'contato@jmsolucoesmg.com.br';

function doPost(e) {
  try {
    // Parse dos dados recebidos
    const dados = JSON.parse(e.postData.contents);
    
    // Identifica o tipo de formulário
    const tipoFormulario = dados.tipo || 'contato'; // 'contato' ou 'parceiro'
    
    // Monta o assunto do e-mail
    let assunto = '';
    if (tipoFormulario === 'parceiro') {
      assunto = `🚀 Novo Parceiro Local JM - ${dados.name || 'Sem nome'}`;
    } else {
      assunto = `📧 Novo Contato do Site - ${dados.name || 'Sem nome'}`;
    }
    
    // Monta o corpo do e-mail
    let corpoEmail = '';
    
    if (tipoFormulario === 'parceiro') {
      corpoEmail = `
🚀 NOVO CADASTRO DE PARCEIRO LOCAL JM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 DADOS DO CANDIDATO:

Nome Completo: ${dados.name || 'Não informado'}
Email: ${dados.email || 'Não informado'}
Telefone/WhatsApp: ${dados.phone || 'Não informado'}
Cidade: ${dados.city || 'Não informado'}

💬 Mensagem:
${dados.message || 'Sem mensagem adicional'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Data/Hora: ${new Date().toLocaleString('pt-BR')}
🌐 Origem: Formulário de Parceiro Local - Site JM Soluções

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();
    } else {
      corpoEmail = `
📧 NOVO CONTATO DO SITE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 DADOS DO CONTATO:

Nome Completo: ${dados.name || 'Não informado'}
Telefone: ${dados.phone || 'Não informado'}
WhatsApp: ${dados.whatsapp || 'Não informado'}

💬 Mensagem:
${dados.message || 'Sem mensagem'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Data/Hora: ${new Date().toLocaleString('pt-BR')}
🌐 Origem: Formulário de Contato - Site JM Soluções

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();
    }
    
    // Envia o e-mail
    MailApp.sendEmail({
      to: EMAIL_DESTINO,
      subject: assunto,
      body: corpoEmail,
      replyTo: dados.email || 'noreply@jmsolucoesmg.com.br'
    });
    
    // Retorna sucesso
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'E-mail enviado com sucesso!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Retorna erro
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (opcional)
function testarEnvio() {
  const dadosTeste = {
    tipo: 'contato',
    name: 'Teste',
    phone: '(31) 99999-9999',
    whatsapp: '(31) 99999-9999',
    message: 'Esta é uma mensagem de teste'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(dadosTeste)
    }
  };
  
  doPost(e);
}

