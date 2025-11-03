# Bugs Identificados

## Bug 1: Fórmula do IMC Incorreta
- **Arquivo:** script.js
- **Linha:** 10
- **Problema:** A fórmula está dividindo peso por altura, quando deveria dividir por altura ao quadrado
- **Impacto:** Todos os cálculos de IMC estão retornando valores incorretos
- **Correção:** Alterar `weight / height` para `weight / (height * height)`