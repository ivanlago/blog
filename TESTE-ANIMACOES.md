# 🎬 Guia de Teste - Animações Framer Motion

## ✅ O que você deve ver

### 1. **Página Inicial** (`http://localhost:3001`)

#### **Cards de Posts**
- [ ] Cards aparecem com fade-in + movimento de baixo para cima (40px)
- [ ] Cards começam menores (scale 0.9) e crescem até tamanho normal
- [ ] **HOVER**: Card sobe 8px e cresce levemente (scale 1.02)
- [ ] **HOVER na imagem**: Zoom suave de 8% (scale 1.08)
- [ ] Duração total: 0.7 segundos

#### **Footer**
- [ ] Ao rolar até o footer, ele aparece com fade-in
- [ ] Movimento de 20px de baixo para cima

### 2. **Página de Categoria** (`/categoria/[slug]`)

#### **Título**
- [ ] Aparece com fade-in de cima para baixo
- [ ] Animação suave de 0.6s

#### **Grid de Posts**
- [ ] Posts aparecem sequencialmente (stagger)
- [ ] Delay de 0.1s entre cada card
- [ ] Cada post tem fade-in + movimento vertical

### 3. **Página de Post Individual** (`/post/[id]`)

#### **Conteúdo**
- [ ] Página inteira com PageTransition
- [ ] Fade-in do header
- [ ] Imagem principal (se existir) aparece suavemente

### 4. **Página de Login** (`/login`)

#### **Formulário**
- [ ] Formulário aparece com fade-in de baixo para cima
- [ ] Centralizado suavemente

## 🐛 Troubleshooting

### **Se NÃO ver animações:**

#### 1. **Verificar Console do Navegador**
Abra DevTools (F12) e verifique:
- Erros de hydration?
- Warnings do Framer Motion?

#### 2. **Limpar Cache**
```bash
# Parar o servidor
Ctrl + C

# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
npm install

# Reiniciar
npm run dev
```

#### 3. **Verificar Framer Motion**
```bash
# Verificar se está instalado
npm list framer-motion
```

Deve mostrar: `framer-motion@11.x.x`

#### 4. **Hard Refresh no Navegador**
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

## 🎯 Como Testar Hover

### **PostCard**
1. Passe o mouse sobre um card de post
2. **Deve ver**:
   - Card sobe 8px
   - Card cresce sutilmente (2%)
   - Imagem faz zoom de 8%
   - Transições suaves

### **Links**
1. Passe o mouse sobre links
2. Veja transições de cor

## 📊 Performance

### **Verificar FPS**
1. Abra DevTools (F12)
2. Vá para "Performance" ou "Rendering"
3. Ative "FPS Meter"
4. Deve manter 60 FPS durante animações

### **Checklist de Performance**
- [ ] Animações suaves (sem travamentos)
- [ ] Scroll fluido
- [ ] Hover responsivo
- [ ] Sem delays perceptíveis

## 🔍 Inspeção Visual

### **O que observar:**

#### **Timing**
- Animações não são muito rápidas (<0.3s)
- Animações não são muito lentas (>1s)
- Easing natural (não linear)

#### **Movimento**
- Fade-in suave (opacity 0 → 1)
- Movimento vertical suave (y: 40 → 0)
- Scale suave (0.9 → 1.0)

#### **Hover**
- Resposta imediata (sem delay)
- Retorno suave ao estado original
- Sem "pulos" ou movimentos bruscos

## 💡 Dicas

### **Para ver animações mais facilmente:**

1. **Recarregue a página** - Animações de entrada só aparecem uma vez
2. **Role devagar** - Algumas animações são ativadas ao entrar no viewport
3. **Teste em janela privada** - Sem cache ou extensões

### **Navegadores Recomendados:**
- ✅ Chrome/Edge (melhor performance)
- ✅ Firefox
- ✅ Safari
- ⚠️ Evite IE11 (não suportado)

## 📱 Teste Mobile

Se estiver testando no celular:
1. Conecte-se à mesma rede WiFi
2. Acesse: `http://[seu-ip]:3001`
3. Animações devem funcionar igualmente

## ✨ Animações Específicas

### **PostCard**
```
Initial:
  - opacity: 0
  - y: 40px
  - scale: 0.9

Animate:
  - opacity: 1
  - y: 0
  - scale: 1.0
  - duration: 0.7s

Hover:
  - y: -8px
  - scale: 1.02
```

### **Footer**
```
Initial:
  - opacity: 0
  - y: 20px

WhileInView:
  - opacity: 1
  - y: 0
  - duration: 0.6s
```

## 📞 Suporte

Se ainda não conseguir ver as animações:
1. Verifique a versão do Node.js: `node -v` (recomendado: 18+)
2. Verifique se o servidor está rodando: `http://localhost:3001`
3. Abra o console do navegador para erros
4. Teste em modo incógnito/privado

