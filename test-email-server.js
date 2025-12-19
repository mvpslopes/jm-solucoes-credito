/**
 * Servidor de teste local para simular o send-email.php
 * Execute: node test-email-server.js
 * Acesse: http://localhost:3001
 */

import http from 'http';

const PORT = 3002;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Log para debug
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

  // Handle POST to send-email.php
  if (req.method === 'POST' && (req.url === '/send-email.php' || req.url.includes('send-email'))) {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const tipo = data.tipo || 'contato';

        // Simula o envio de e-mail (apenas exibe no console)
        console.log('\n📧 ===== E-MAIL SIMULADO =====');
        console.log(`Tipo: ${tipo === 'parceiro' ? 'Parceiro Local' : 'Contato'}`);
        console.log(`Nome: ${data.name || 'Não informado'}`);
        
        if (tipo === 'parceiro') {
          console.log(`Email: ${data.email || 'Não informado'}`);
          console.log(`Telefone: ${data.phone || 'Não informado'}`);
          console.log(`Cidade: ${data.city || 'Não informado'}`);
          console.log(`Mensagem: ${data.message || 'Sem mensagem'}`);
        } else {
          console.log(`Telefone: ${data.phone || 'Não informado'}`);
          console.log(`WhatsApp: ${data.whatsapp || 'Não informado'}`);
          console.log(`Mensagem: ${data.message || 'Sem mensagem'}`);
        }
        
        console.log(`Data/Hora: ${new Date().toLocaleString('pt-BR')}`);
        console.log('================================\n');

        // Retorna sucesso
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'E-mail enviado com sucesso! (SIMULADO - veja o console)'
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: error.message
        }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/send-email.php') {
    // Resposta para teste via navegador
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: false,
      message: 'Este endpoint aceita apenas requisições POST. Use o formulário do site.'
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found', url: req.url }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Servidor de teste de e-mail rodando em http://localhost:${PORT}`);
  console.log(`📌 Certifique-se de que o Vite está configurado para fazer proxy na porta ${PORT}`);
  console.log('📧 Este servidor SIMULA o envio de e-mails (não envia e-mails reais)');
  console.log('💡 Os dados do formulário serão exibidos no console\n');
});

