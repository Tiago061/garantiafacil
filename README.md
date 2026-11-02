# GarantiaFácil
Aplicativo offline em português brasileiro para produtos, garantias, notas fiscais e manutenções. React 19, TypeScript, Vite, Tailwind 4, Lucide, React Router, Zustand, IndexedDB (idb) e Capacitor 7.

## Execução
Requer Node.js 22+ e npm.
```sh
npm ci
npm run dev
npm test
npm run build
npx vite preview
```
O service worker de produção pré-carrega os assets no primeiro acesso online. Depois da instalação do cache, funciona sem rede. O preview de desenvolvimento não representa o cache de produção. A versão Capacitor embarca `dist` e funciona offline desde a instalação.

## Etapas e arquitetura
1. `src/lib/warranty.ts`: regras puras de datas locais. Compra + meses limita o dia ao último dia do mês; data final manual tem prioridade. Zero dias = vence hoje, 1–30 = próxima, negativos = expirada. Garantias cadastradas não definem direitos legais.
2. `src/lib/db.ts` e `src/store/useApp.ts`: IndexedDB, transações e estado Zustand. Schema v1: products/settings; v2 adiciona meta. Migrações incrementais em upgrade preservam registros. Não existe backend de documentos.
3. `src/App.tsx`: componentes reutilizados (cartões, formulários, anexos, títulos), rotas por hash, dashboard, busca/filtros/ordenação, detalhes, edição, exclusão confirmada e manutenções. Exemplos são transitórios, separados dos dados reais.
4. `src/lib/native.ts`: câmera, compartilhamento, gravação temporária no cache nativo e notificações locais. Preferências persistidas; agenda recalculada em cadastro, edição, exclusão, restauração, inicialização e retorno ao app. A agenda usa 09h local antes do vencimento, sem timers de WebView. Permissão solicitada apenas ao ativar lembretes. Alertas web não são prometidos.
5. `scripts/offline.mjs`: cache de assets com versão por build. Testes cobrem fim de mês, ano bissexto, virada de ano, data manual, vencimento hoje, expiração e diferença de dias independente de horário de verão.

## Armazenamento e backup
Metadados e anexos são persistidos no IndexedDB como dados serializáveis (imagens/PDF em data URLs), com limite de 15 MB por anexo. Essa abordagem mantém transacionalidade e compatibilidade web/nativa, com custo de aproximadamente 33% de espaço em base64; não é adequada a acervos muito grandes. Compartilhamento nativo materializa um arquivo temporário em Directory.Cache. O app não transmite anexos; exportar e compartilhar são ações explícitas do usuário. Não há OCR remoto, analytics ou serviços de terceiros.

Backups JSON v1 contêm produtos, anexos e manutenções, sem criptografia. A importação valida estrutura e combina por UUID dentro de transação, mantendo o updatedAt mais recente. Restaurar o mesmo backup não duplica registros. Preferências ficam específicas do dispositivo. Desinstalação e limpeza do navegador podem apagar o armazenamento local. Exporte backups regularmente. Não há sincronização entre dispositivos.

## Android / iOS
```sh
npm run build
npx cap add android
npx cap add ios
npx cap sync
npx cap open android
npx cap open ios
```
`cap add` é executado uma vez por plataforma. Android requer Android Studio e SDK; iOS requer macOS e Xcode. Projetos nativos são gerados, não incluídos no repositório. Após alterações web, repita build e sync. Bundle ID configurado: br.com.garantiafacil.app.

Em `ios/App/App/Info.plist`, configure `NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription` e `NSPhotoLibraryAddUsageDescription` explicando o uso para fotos de produtos e notas fiscais. Android 13+ exige consentimento POST_NOTIFICATIONS (plugin trata pedido); use ícone monocromático `ic_stat_icon_config_sample` ou configure seu ícone em capacitor.config.ts. Lembretes aceitam entrega aproximada pelo sistema: o app não solicita alarme exato. A agenda prioriza os 60 próximos lembretes para respeitar limites do iOS; é renovada ao retomar o aplicativo. Revise o Privacy Manifest e as declarações de privacidade exigidas pelas lojas.

## Validação e limites
Build TypeScript/Vite e testes de regras automatizados. Recursos de câmera, share, permissões e entrega de notificações com o app encerrado precisam de teste em Android/iOS reais antes da distribuição; este ambiente não possui Xcode, simuladores nem SDK Android. Dados não são criptografados pelo aplicativo. O modal de manutenção usa campos rotulados e foco inicial; futuras melhorias incluem focus trap e testes de leitor de tela. Alterações de fuso ou permissões são reconciliadas ao reabrir/retomar o aplicativo.
