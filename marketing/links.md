# Links de divulgação (com UTM)

Todos os links apontam para `https://marioraimundo.vercel.app` e levam
`utm_source`, `utm_medium` e `utm_campaign`. Assim o Vercel Analytics mostra de
qual canal veio cada visita, em vez de agrupar tudo como "direto".

A lista completa (todos os projetos × todos os canais × EN/PT) está em
`marketing/project-links.csv`. Para regenerar depois de adicionar projetos:

```bash
node --experimental-strip-types scripts/utm-links.mjs
```

## Links fixos (bio, site, assinatura)

Use estes nos campos de perfil — são os que ficam no ar por mais tempo.

| Onde | Link |
| --- | --- |
| Instagram (bio) | `https://marioraimundo.vercel.app/en/work?utm_source=instagram&utm_medium=social&utm_campaign=work-index` |
| TikTok (bio) | `https://marioraimundo.vercel.app/en/work?utm_source=tiktok&utm_medium=social&utm_campaign=work-index` |
| LinkedIn (site) | `https://marioraimundo.vercel.app/en?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio` |
| Behance (perfil) | `https://marioraimundo.vercel.app/en/work?utm_source=behance&utm_medium=portfolio-platform&utm_campaign=work-index` |
| ArtStation (perfil) | `https://marioraimundo.vercel.app/en?utm_source=artstation&utm_medium=portfolio-platform&utm_campaign=portfolio` |
| YouTube (descrição) | `https://marioraimundo.vercel.app/en?utm_source=youtube&utm_medium=video&utm_campaign=portfolio` |
| Assinatura de e-mail | `https://marioraimundo.vercel.app/en/work?utm_source=email&utm_medium=email&utm_campaign=signature` |
| Orçamento (bio/CTA) | `https://marioraimundo.vercel.app/en/quote?utm_source=instagram&utm_medium=social&utm_campaign=quote` |

Para público brasileiro, troque `/en` por `/pt` nos links acima.

## Links por projeto

Padrão: `/{locale}/work/{slug}` + UTMs. Exemplos prontos:

**Flamengo — Libertadores 2019** (LinkedIn)
`https://marioraimundo.vercel.app/en/work/flamengo-libertadores-2019?utm_source=linkedin&utm_medium=social&utm_campaign=project-flamengo-libertadores-2019`

**Volkswagen — Maxi Performance** (Instagram)
`https://marioraimundo.vercel.app/en/work/volkswagen-maxi-performance?utm_source=instagram&utm_medium=social&utm_campaign=project-volkswagen-maxi-performance`

**Motion Design School — Octopus** (ArtStation)
`https://marioraimundo.vercel.app/en/work/mds-octopus?utm_source=artstation&utm_medium=portfolio-platform&utm_campaign=project-mds-octopus`

**Shell — Craque da Troca** (Behance)
`https://marioraimundo.vercel.app/pt/work/shell-craque-da-troca?utm_source=behance&utm_medium=portfolio-platform&utm_campaign=project-shell-craque-da-troca`

## Regras para os números fazerem sentido

- Sempre minúsculas em `utm_source` e `utm_medium`; não invente variações
  (`instagram` e `Instagram` viram dois canais diferentes).
- Um link por canal: Instagram na bio ≠ Instagram em story. Se quiser separar,
  use `utm_medium=story` ou `utm_medium=bio`.
- **Nunca** use UTM em link interno do próprio site — ele quebra a sessão e
  polui o relatório.
- Ao subir um projeto novo, rode o script e use o link da linha correspondente.
- No Analytics, o cruzamento útil é: `Referrer` × `Path`. Os UTMs aparecem como
  canal de entrada; o path mostra qual projeto converteu.
