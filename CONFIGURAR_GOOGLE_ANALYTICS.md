# 📊 Como Configurar Google Analytics no Site

Este guia explica como configurar o Google Analytics para rastrear visitas e tráfego do site.

## 🚀 Passo a Passo

### 1. Criar Conta no Google Analytics

1. Acesse: https://analytics.google.com/
2. Faça login com sua conta Google
3. Clique em **"Começar a medir"** ou **"Criar conta"**

### 2. Configurar Propriedade (Site)

1. **Nome da conta:** Digite "JM Soluções" (ou o nome que preferir)
2. **Nome da propriedade:** Digite "JM Soluções - Site"
3. **Fuso horário:** Selecione "São Paulo"
4. **Moeda:** Selecione "Real brasileiro (R$)"
5. Clique em **"Avançar"**

### 3. Configurar Informações do Negócio

1. **Setor:** Selecione "Finanças" ou "Serviços financeiros"
2. **Tamanho:** Selecione o tamanho do seu negócio
3. **Como pretende usar o Google Analytics:** Selecione as opções relevantes
4. Clique em **"Criar"**

### 4. Aceitar os Termos

1. Leia e aceite os termos de serviço
2. Clique em **"Aceito"**

### 5. Obter o ID de Medição

1. Na tela seguinte, você verá **"ID de medição"**
2. Será algo como: `G-XXXXXXXXXX`
3. **Copie esse ID** (você vai precisar dele)

### 6. Configurar no Site

1. Abra o arquivo `index.html` no projeto
2. Procure por `GA_MEASUREMENT_ID` (aparece 2 vezes)
3. Substitua `GA_MEASUREMENT_ID` pelo seu ID real (ex: `G-ABC123XYZ`)
4. Salve o arquivo

**Exemplo:**
```html
<!-- Antes -->
gtag('config', 'GA_MEASUREMENT_ID');

<!-- Depois -->
gtag('config', 'G-ABC123XYZ');
```

### 7. Fazer Build e Upload

1. Gere o build: `npm run build`
2. Faça upload do `index.html` atualizado na Hostinger
3. Aguarde alguns minutos para o Google Analytics começar a coletar dados

## 📈 O que Você Pode Ver no Google Analytics

### Relatórios Principais:

1. **Tempo Real:**
   - Visitantes online agora
   - Páginas sendo visualizadas no momento

2. **Audiência:**
   - Total de visitantes
   - Novos vs. visitantes recorrentes
   - Idade, gênero, localização
   - Dispositivos usados (mobile, desktop, tablet)

3. **Aquisição:**
   - **De onde vêm os visitantes:**
     - Google (busca orgânica)
     - Redes sociais (Facebook, Instagram, etc.)
     - Links diretos (digitando a URL)
     - Referências (outros sites)
   - Campanhas de marketing

4. **Comportamento:**
   - Páginas mais visitadas
   - Tempo médio no site
   - Taxa de rejeição
   - Fluxo de navegação

5. **Conversões:**
   - Formulários preenchidos
   - Cliques em botões importantes
   - Eventos personalizados

## 🔍 Dicas Importantes

### Verificar se Está Funcionando:

1. Acesse o Google Analytics
2. Vá em **"Tempo Real"** > **"Visão geral"**
3. Abra o site em outra aba: `jmsolucoesmg.com.br`
4. Você deve ver sua visita aparecer em tempo real

### Privacidade:

- O Google Analytics é anônimo (não coleta dados pessoais)
- Está em conformidade com LGPD quando configurado corretamente
- Você pode adicionar aviso de cookies se quiser (opcional)

## 📱 Google Search Console (Bônus)

Para ver de onde vem o tráfego de busca do Google:

1. Acesse: https://search.google.com/search-console
2. Adicione a propriedade: `jmsolucoesmg.com.br`
3. Verifique a propriedade (vários métodos disponíveis)
4. Veja:
   - Palavras-chave que trouxeram visitantes
   - Posição no Google
   - Cliques e impressões
   - Páginas mais encontradas

## ⚠️ Importante

- Os dados podem levar algumas horas para aparecer
- Dados em tempo real aparecem imediatamente
- Relatórios completos levam 24-48h para ficarem precisos
- O Google Analytics é gratuito e ilimitado

## 🆘 Problemas Comuns

**Não está coletando dados?**
- Verifique se o ID está correto no `index.html`
- Verifique se fez upload do `index.html` atualizado
- Aguarde alguns minutos (pode demorar para aparecer)

**Quer remover o Google Analytics?**
- Basta remover o código do `index.html`
- Fazer novo build e upload

## 📞 Próximos Passos

Depois de configurar:
1. Aguarde 24-48h para ter dados significativos
2. Explore os relatórios no Google Analytics
3. Configure metas e conversões se quiser
4. Configure o Google Search Console para ver tráfego de busca


