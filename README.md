# 🧩 Speedcubing Timer (WCA-style)

Um **cronômetro de cubo mágico** inspirado no **csTimer**, feito em **Next.js + React**, com inspeção WCA, bips sonoros, controle de volume e UX refinada para speedcubers.

Projeto ideal para **treino**, **uso pessoal** ou como **portfólio frontend**.

---

## ✨ Funcionalidades

### ⏱️ Cronômetro
- Timer de alta precisão usando `requestAnimationFrame`
- Início e parada com **barra de espaço**
- Mantém o tempo visível após parar (solve salvo)

### 🔍 Inspeção WCA
- Inspeção de **15 segundos**
- Bips sonoros nos **8 segundos finais**
- Mudança de cor para **vermelho** nos últimos 8s
- Início automático do cronômetro ao chegar em `0`
- Toggle para **ativar/desativar inspeção**

### 🔊 Áudio
- Beep configurável (on/off)
- Controle de **volume**
- Áudio otimizado (AudioContext único, sem travamentos)

### 🎯 UX / UI
- Animação suave ao rodar
- **Soft reset quase imperceptível** ao reiniciar sem inspeção
- Visual limpo e focado (estilo csTimer)
- Feedback visual por cores:
  - 🟡 Inspeção
  - 🔴 Perigo (últimos 8s)
  - 🟢 Rodando
  - ⚪ Parado / Idle

---

## 🎮 Controles

| Ação | Tecla |
|----|----|
| Iniciar inspeção | Espaço |
| Iniciar timer | Espaço |
| Parar timer (salvar solve) | Espaço |
| Nova inspeção / novo ciclo | Espaço |

---

## 🛠️ Tecnologias

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Framer Motion**
- **Web Audio API**
- **Tailwind CSS**
- - **Shadcn/ui**

---

## 📦 Estrutura (principal)

```txt
src/
 ├─ _components/
 │   └─ CubeSelector.tsx
 ├─ app/
 │     Timer/
 │     └─ Scramble.tsx
 │     └─ Timer.tsx
 │   └─ page.tsx
 ├─ lib/
 │   └─ eventConfigs.ts
 │   └─ events.ts
 │   └─ randomAlg.ts
 │   └─ scrambler.ts
 │   └─ utils.ts
