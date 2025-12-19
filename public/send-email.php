<?php
/**
 * Script PHP para envio de e-mails dos formulários
 * Hospedado na Hostinger - jmsolucoesmg.com.br
 */

// Configuração
$email_destino = 'jmsolucoesmg@icloud.com';
$email_origem = 'noreply@jmsolucoesmg.com.br'; // Pode ser o mesmo domínio

// Headers para permitir requisições do frontend
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Se for uma requisição OPTIONS (preflight), retorna OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Só aceita requisições POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método não permitido']);
    exit();
}

// Lê os dados JSON do corpo da requisição
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Valida se os dados foram recebidos
if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    exit();
}

// Identifica o tipo de formulário
$tipo = isset($data['tipo']) ? $data['tipo'] : 'contato';

// Monta o assunto e corpo do e-mail
$assunto = '';
$corpo = '';

if ($tipo === 'parceiro') {
    // Formulário de Parceiro
    $assunto = '🚀 Novo Parceiro Local JM - ' . ($data['name'] ?? 'Sem nome');
    
    $corpo = "🚀 NOVO CADASTRO DE PARCEIRO LOCAL JM\n\n";
    $corpo .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $corpo .= "👤 DADOS DO CANDIDATO:\n\n";
    $corpo .= "Nome Completo: " . ($data['name'] ?? 'Não informado') . "\n";
    $corpo .= "Email: " . ($data['email'] ?? 'Não informado') . "\n";
    $corpo .= "Telefone/WhatsApp: " . ($data['phone'] ?? 'Não informado') . "\n";
    $corpo .= "Cidade: " . ($data['city'] ?? 'Não informado') . "\n\n";
    $corpo .= "💬 Mensagem:\n" . ($data['message'] ?? 'Sem mensagem adicional') . "\n\n";
    $corpo .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $corpo .= "📅 Data/Hora: " . date('d/m/Y H:i:s') . "\n";
    $corpo .= "🌐 Origem: Formulário de Parceiro Local - Site JM Soluções\n";
    $corpo .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    $reply_to = $data['email'] ?? $email_origem;
} else {
    // Formulário de Contato
    $assunto = '📧 Novo Contato do Site - ' . ($data['name'] ?? 'Sem nome');
    
    $corpo = "📧 NOVO CONTATO DO SITE\n\n";
    $corpo .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $corpo .= "👤 DADOS DO CONTATO:\n\n";
    $corpo .= "Nome Completo: " . ($data['name'] ?? 'Não informado') . "\n";
    $corpo .= "Telefone: " . ($data['phone'] ?? 'Não informado') . "\n";
    $corpo .= "WhatsApp: " . ($data['whatsapp'] ?? 'Não informado') . "\n\n";
    $corpo .= "💬 Mensagem:\n" . ($data['message'] ?? 'Sem mensagem') . "\n\n";
    $corpo .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $corpo .= "📅 Data/Hora: " . date('d/m/Y H:i:s') . "\n";
    $corpo .= "🌐 Origem: Formulário de Contato - Site JM Soluções\n";
    $corpo .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    $reply_to = $email_origem;
}

// Headers do e-mail
$headers = "From: " . $email_origem . "\r\n";
$headers .= "Reply-To: " . $reply_to . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Tenta enviar o e-mail
$enviado = mail($email_destino, $assunto, $corpo, $headers);

if ($enviado) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'E-mail enviado com sucesso!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao enviar e-mail. Tente novamente mais tarde.'
    ]);
}
?>

