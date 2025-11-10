# Devocional - devocional-so-v2

Mini-site React + Vite (clean edition) — só para vocês dois, com login por senha e busca de capítulos via API.

## Como rodar localmente
1. Instale dependências:
   ```bash
   npm install
   ```
2. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```
3. Build:
   ```bash
   npm run build
   npm run preview
   ```

## API de capítulos
- O app tenta buscar capítulos usando **https://bible-api.com/** por padrão.
- Se a API falhar, você pode adicionar capítulos manualmente no painel de administração (Config).

## Notas de segurança
- Senhas são **hash de SHA-256** locais (Web Crypto). Não é produção-grade. Para multi-dispositivo, use backend (Supabase/Firebase).

## Deploy no Vercel
1. Conecte o repositório GitHub ao Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
