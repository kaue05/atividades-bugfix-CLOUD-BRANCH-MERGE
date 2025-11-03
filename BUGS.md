# Bugs Identificados

## Bug 1: Fórmula do IMC Incorreta
- **Arquivo:** script.js
- **Linha:** 10
- **Problema:** A fórmula está dividindo peso por altura, quando deveria dividir por altura ao quadrado
- **Impacto:** Todos os cálculos de IMC estão retornando valores incorretos
- **Correção:** Alterar `weight / height` para `weight / (height * height)`

## Bug 2: Classificação do IMC com Intervalos Incorretos
- **Arquivo:** script.js
- **Linha:** 16
- **Problema:** O intervalo de "Peso normal" está definido como 18.5-20, quando deveria ser 18.5-24.9
- **Impacto:** Pessoas com IMC entre 20-24.9 são classificadas incorretamente
- **Correção:** Alterar condição de `imc < 20` para `imc < 25`

## Bug 3: Histórico com Limite Muito Baixo
- **Arquivo:** script.js
- **Linha:** 61
- **Problema:** O histórico está limitado a apenas 3 itens, quando deveria armazenar 5
- **Impacto:** Usuários perdem dados de cálculos anteriores muito rapidamente
- **Correção:** Alterar limite de 3 para 5 itens no histórico