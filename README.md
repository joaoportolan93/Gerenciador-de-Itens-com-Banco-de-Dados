# 📦 Gerenciador de Itens com Banco de Dados

Um sistema completo e moderno para gerenciamento de itens/inventário desenvolvido com HTML5, CSS3 e JavaScript puro, incluindo tratamento robusto de erros com try-catch.

## ✨ Funcionalidades

### 🔧 Operações CRUD Completas
- **Criar**: Adicionar novos itens com validação
- **Ler**: Visualizar itens em cards responsivos
- **Atualizar**: Editar itens existentes
- **Excluir**: Remover itens com confirmação

### 🔍 Sistema de Busca e Filtros
- Busca por texto em nome e descrição
- Filtro por categoria
- Ordenação por nome, quantidade, preço ou data
- Resultados em tempo real

### 📊 Estatísticas em Tempo Real
- Total de itens cadastrados
- Número de categorias únicas
- Valor total do inventário
- Atualização automática

### 💾 Persistência de Dados
- Armazenamento local (localStorage)
- Dados de exemplo incluídos
- Backup e restauração automática

### 🎨 Interface Moderna e Responsiva
- Design responsivo para todos os dispositivos
- Animações suaves e transições
- Ícones Font Awesome
- Gradientes e sombras modernas

### 🛡️ Tratamento de Erros Robusto
- Try-catch em todas as operações críticas
- Validação de dados em tempo real
- Mensagens de erro amigáveis
- Fallbacks para operações falhadas

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Grid, Flexbox, animações e responsividade
- **JavaScript ES6+**: Classes, async/await, módulos
- **localStorage**: Persistência de dados no navegador
- **Font Awesome**: Ícones profissionais
- **Try-Catch**: Tratamento robusto de erros

## 📱 Responsividade

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)
- ✅ Orientação landscape e portrait

## 🎯 Como Usar

### 1. Adicionar Item
1. Preencha o formulário com os dados do item
2. Clique em "Adicionar Item"
3. O item será salvo e exibido na lista

### 2. Editar Item
1. Clique no botão "Editar" do item desejado
2. Modifique os dados no formulário
3. Clique em "Salvar Alterações"

### 3. Excluir Item
1. Clique no botão "Excluir" do item
2. Confirme a ação no modal
3. O item será removido permanentemente

### 4. Buscar e Filtrar
- Use a barra de busca para encontrar itens
- Selecione uma categoria para filtrar
- Escolha o critério de ordenação

## 🔧 Estrutura do Projeto

```
Gerenciador-de-Itens-com-Banco-de-Dados/
├── index.html          # Página principal
├── styles.css          # Estilos e responsividade
├── script.js           # Lógica da aplicação
└── README.md           # Documentação
```

## 📋 Campos dos Itens

- **Nome**: Nome do item (obrigatório, mínimo 2 caracteres)
- **Descrição**: Descrição detalhada do item
- **Quantidade**: Número de unidades (obrigatório, não negativo)
- **Preço**: Valor unitário em reais (opcional, não negativo)
- **Categoria**: Categoria do item (seleção obrigatória)
- **Data de Criação**: Automática
- **Data de Atualização**: Automática (quando editado)

## 🎨 Categorias Disponíveis

- 🖥️ **Eletrônicos**: Computadores, smartphones, etc.
- 👕 **Roupas**: Vestuário e acessórios
- 📚 **Livros**: Literatura e materiais educativos
- 🏠 **Casa e Jardim**: Decoração e jardinagem
- ⚽ **Esportes**: Equipamentos esportivos
- 📦 **Outros**: Itens diversos

## 🛡️ Tratamento de Erros

### Try-Catch Implementado em:
- ✅ Inicialização da aplicação
- ✅ Carregamento de dados
- ✅ Salvamento de dados
- ✅ Validação de formulários
- ✅ Operações CRUD
- ✅ Renderização da interface
- ✅ Event listeners
- ✅ Operações assíncronas
- ✅ Manipulação de localStorage
- ✅ Tratamento de erros globais

### Validações Implementadas:
- ✅ Nome obrigatório e mínimo de caracteres
- ✅ Quantidade não negativa
- ✅ Preço não negativo
- ✅ Categoria obrigatória
- ✅ Dados de entrada sanitizados

## 🚀 Funcionalidades Avançadas

### Sistema de Notificações
- Toasts informativos para todas as ações
- Diferentes tipos: success, error, warning, info
- Auto-hide após 3 segundos

### Modal de Confirmação
- Confirmação para ações destrutivas
- Interface amigável e responsiva
- Prevenção de exclusões acidentais

### Dados de Exemplo
- 3 itens pré-cadastrados para demonstração
- Categorias variadas para teste
- Valores realistas para demonstração

### Performance
- Renderização otimizada
- Debounce na busca
- Lazy loading de funcionalidades

## 🌟 Recursos Especiais

### Animações CSS
- Transições suaves em todos os elementos
- Hover effects nos cards
- Animações de entrada para novos itens
- Loading states visuais

### Acessibilidade
- Labels semânticos
- Contraste adequado
- Navegação por teclado
- Estrutura HTML semântica

### Segurança
- Escape de HTML para prevenir XSS
- Validação de entrada rigorosa
- Sanitização de dados
- IDs únicos para cada item

## 📊 Estatísticas e Métricas

O sistema calcula automaticamente:
- **Total de Itens**: Soma de todos os itens cadastrados
- **Categorias Únicas**: Número de categorias diferentes
- **Valor Total**: Soma de (preço × quantidade) de todos os itens

## 🔄 Persistência de Dados

- **localStorage**: Armazenamento local no navegador
- **Backup Automático**: Dados salvos automaticamente
- **Recuperação**: Dados restaurados ao recarregar a página
- **Formato JSON**: Estrutura de dados padronizada

## 🎯 Casos de Uso

### Pessoal
- Controle de livros pessoais
- Inventário de eletrônicos
- Gestão de roupas e acessórios

### Profissional
- Controle de estoque pequeno
- Gestão de ferramentas
- Inventário de materiais

### Educacional
- Controle de materiais escolares
- Gestão de equipamentos
- Inventário de laboratório

## 🚀 Como Executar

1. **Clone ou baixe** o projeto
2. **Abra** o arquivo `index.html` em um navegador moderno
3. **Comece a usar** imediatamente!

### Requisitos do Navegador
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🔧 Personalização

### Cores
As cores podem ser facilmente alteradas no arquivo `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --danger-color: #f56565;
    --warning-color: #ed8936;
}
```

### Categorias
Adicione novas categorias editando o array no JavaScript:
```javascript
const categoryNames = {
    'nova-categoria': 'Nova Categoria',
    // ... outras categorias
};
```

## 📈 Roadmap Futuro

- [ ] Exportação para CSV/Excel
- [ ] Backup na nuvem
- [ ] Múltiplos usuários
- [ ] Histórico de alterações
- [ ] Relatórios avançados
- [ ] API REST
- [ ] Banco de dados real (MySQL/PostgreSQL)

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para o projeto final do curso de JavaScript.

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela! ⭐**