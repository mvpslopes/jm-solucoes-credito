# Como Visualizar o Sistema Interno

## Opção 1: Alterar o main.tsx (Recomendado para demonstração)

Para visualizar o sistema interno, altere o arquivo `src/main.tsx`:

**Site Público (atual):**
```typescript
import App from './App.tsx';
```

**Sistema Interno:**
```typescript
import App from './AppSistema.tsx';
```

Depois execute:
```bash
npm run dev
```

## Opção 2: Instalar React Router (Para produção)

Para ter ambos acessíveis, instale o React Router:

```bash
npm install react-router-dom
```

E então crie um sistema de rotas que permita:
- `/` - Site público
- `/sistema` - Sistema interno (com autenticação)

## Opção 3: Criar um seletor simples

Você pode criar um componente que permita alternar entre os dois modos durante o desenvolvimento.

---

**Nota:** O sistema está completo com dados fictícios e pronto para demonstração!
