// Arquivo alternativo para visualizar o sistema interno
// Para usar: renomeie main.tsx para main-site.tsx e este para main.tsx
// Ou altere o import no main.tsx original

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppSistema from './AppSistema.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppSistema />
  </StrictMode>
);
