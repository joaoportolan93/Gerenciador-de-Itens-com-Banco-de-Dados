// Classe principal do Gerenciador de Itens
class ItemManager {
    constructor() {
        this.items = [];
        this.editingItemId = null;
        this.filters = {
            search: '',
            category: '',
            sortBy: 'name'
        };
        
        this.init();
    }

    // Inicialização da aplicação
    async init() {
        try {
            await this.loadItems();
            this.setupEventListeners();
            this.renderItems();
            this.updateStats();
            this.showToast('Aplicação carregada com sucesso!', 'success');
        } catch (error) {
            console.error('Erro na inicialização:', error);
            this.showToast('Erro ao carregar a aplicação', 'error');
        }
    }

    // Configuração dos event listeners
    setupEventListeners() {
        try {
            // Formulário
            const form = document.getElementById('item-form');
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));

            // Botão cancelar
            const cancelBtn = document.getElementById('cancel-btn');
            cancelBtn.addEventListener('click', () => this.cancelEdit());

            // Busca
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

            // Filtros
            const categoryFilter = document.getElementById('category-filter');
            categoryFilter.addEventListener('change', (e) => this.handleCategoryFilter(e.target.value));

            const sortSelect = document.getElementById('sort-by');
            sortSelect.addEventListener('change', (e) => this.handleSort(e.target.value));

            // Modal de confirmação
            const confirmYes = document.getElementById('confirm-yes');
            const confirmNo = document.getElementById('confirm-no');
            confirmYes.addEventListener('click', () => this.handleConfirmAction());
            confirmNo.addEventListener('click', () => this.hideConfirmModal());

        } catch (error) {
            console.error('Erro ao configurar event listeners:', error);
            this.showToast('Erro na configuração da interface', 'error');
        }
    }

    // Carregamento de itens do localStorage
    async loadItems() {
        try {
            const storedItems = localStorage.getItem('items');
            if (storedItems) {
                this.items = JSON.parse(storedItems);
                // Garantir que todos os itens tenham IDs únicos
                this.items.forEach(item => {
                    if (!item.id) {
                        item.id = this.generateId();
                    }
                });
            } else {
                // Dados de exemplo para demonstração
                this.items = [
                    {
                        id: this.generateId(),
                        name: 'Notebook Dell Inspiron',
                        description: 'Notebook para trabalho e estudos',
                        quantity: 2,
                        price: 3500.00,
                        category: 'eletronicos',
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: this.generateId(),
                        name: 'Livro JavaScript ES6+',
                        description: 'Guia completo de JavaScript moderno',
                        quantity: 5,
                        price: 89.90,
                        category: 'livros',
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: this.generateId(),
                        name: 'Tênis Nike Air Max',
                        description: 'Tênis esportivo confortável',
                        quantity: 3,
                        price: 299.90,
                        category: 'esportes',
                        createdAt: new Date().toISOString()
                    }
                ];
                await this.saveItems();
            }
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
            this.showToast('Erro ao carregar itens salvos', 'error');
            this.items = [];
        }
    }

    // Salvamento de itens no localStorage
    async saveItems() {
        try {
            localStorage.setItem('items', JSON.stringify(this.items));
        } catch (error) {
            console.error('Erro ao salvar itens:', error);
            this.showToast('Erro ao salvar itens', 'error');
            throw error;
        }
    }

    // Geração de ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Manipulação do envio do formulário
    async handleFormSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(e.target);
            const itemData = {
                name: formData.get('name').trim(),
                description: formData.get('description').trim(),
                quantity: parseInt(formData.get('quantity')),
                price: parseFloat(formData.get('price')) || 0,
                category: formData.get('category'),
                createdAt: new Date().toISOString()
            };

            // Validação dos dados
            if (!this.validateItemData(itemData)) {
                return;
            }

            if (this.editingItemId) {
                // Modo edição
                await this.updateItem(this.editingItemId, itemData);
                this.showToast('Item atualizado com sucesso!', 'success');
            } else {
                // Modo criação
                await this.addItem(itemData);
                this.showToast('Item adicionado com sucesso!', 'success');
            }

            this.resetForm();
            this.renderItems();
            this.updateStats();

        } catch (error) {
            console.error('Erro ao processar formulário:', error);
            this.showToast('Erro ao processar formulário', 'error');
        }
    }

    // Validação dos dados do item
    validateItemData(data) {
        try {
            if (!data.name || data.name.length < 2) {
                this.showToast('Nome deve ter pelo menos 2 caracteres', 'warning');
                return false;
            }

            if (data.quantity < 0) {
                this.showToast('Quantidade não pode ser negativa', 'warning');
                return false;
            }

            if (data.price < 0) {
                this.showToast('Preço não pode ser negativo', 'warning');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro na validação:', error);
            this.showToast('Erro na validação dos dados', 'error');
            return false;
        }
    }

    // Adição de novo item
    async addItem(itemData) {
        try {
            const newItem = {
                ...itemData,
                id: this.generateId()
            };

            this.items.push(newItem);
            await this.saveItems();
            
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            throw error;
        }
    }

    // Atualização de item existente
    async updateItem(id, itemData) {
        try {
            const index = this.items.findIndex(item => item.id === id);
            if (index !== -1) {
                this.items[index] = {
                    ...this.items[index],
                    ...itemData,
                    id: id,
                    updatedAt: new Date().toISOString()
                };
                await this.saveItems();
            } else {
                throw new Error('Item não encontrado');
            }
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
            throw error;
        }
    }

    // Exclusão de item
    async deleteItem(id) {
        try {
            const index = this.items.findIndex(item => item.id === id);
            if (index !== -1) {
                this.items.splice(index, 1);
                await this.saveItems();
                this.showToast('Item excluído com sucesso!', 'success');
                this.renderItems();
                this.updateStats();
            }
        } catch (error) {
            console.error('Erro ao excluir item:', error);
            this.showToast('Erro ao excluir item', 'error');
        }
    }

    // Início da edição de item
    startEdit(id) {
        try {
            const item = this.items.find(item => item.id === id);
            if (item) {
                this.editingItemId = id;
                
                // Preencher formulário
                document.getElementById('item-name').value = item.name;
                document.getElementById('item-description').value = item.description;
                document.getElementById('item-quantity').value = item.quantity;
                document.getElementById('item-price').value = item.price;
                document.getElementById('item-category').value = item.category;
                
                // Atualizar interface
                document.getElementById('form-title').textContent = 'Editar Item';
                document.getElementById('submit-btn').innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
                document.getElementById('cancel-btn').style.display = 'inline-flex';
                
                // Scroll para o formulário
                document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Erro ao iniciar edição:', error);
            this.showToast('Erro ao carregar item para edição', 'error');
        }
    }

    // Cancelamento da edição
    cancelEdit() {
        try {
            this.editingItemId = null;
            this.resetForm();
        } catch (error) {
            console.error('Erro ao cancelar edição:', error);
        }
    }

    // Reset do formulário
    resetForm() {
        try {
            document.getElementById('item-form').reset();
            document.getElementById('form-title').textContent = 'Adicionar Novo Item';
            document.getElementById('submit-btn').innerHTML = '<i class="fas fa-plus"></i> Adicionar Item';
            document.getElementById('cancel-btn').style.display = 'none';
            this.editingItemId = null;
        } catch (error) {
            console.error('Erro ao resetar formulário:', error);
        }
    }

    // Manipulação da busca
    handleSearch(searchTerm) {
        try {
            this.filters.search = searchTerm.toLowerCase();
            this.renderItems();
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    }

    // Manipulação do filtro de categoria
    handleCategoryFilter(category) {
        try {
            this.filters.category = category;
            this.renderItems();
        } catch (error) {
            console.error('Erro no filtro de categoria:', error);
        }
    }

    // Manipulação da ordenação
    handleSort(sortBy) {
        try {
            this.filters.sortBy = sortBy;
            this.renderItems();
        } catch (error) {
            console.error('Erro na ordenação:', error);
        }
    }

    // Filtragem e ordenação dos itens
    getFilteredAndSortedItems() {
        try {
            let filteredItems = [...this.items];

            // Aplicar filtro de busca
            if (this.filters.search) {
                filteredItems = filteredItems.filter(item =>
                    item.name.toLowerCase().includes(this.filters.search) ||
                    item.description.toLowerCase().includes(this.filters.search)
                );
            }

            // Aplicar filtro de categoria
            if (this.filters.category) {
                filteredItems = filteredItems.filter(item => item.category === this.filters.category);
            }

            // Aplicar ordenação
            switch (this.filters.sortBy) {
                case 'name':
                    filteredItems.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'quantity':
                    filteredItems.sort((a, b) => b.quantity - a.quantity);
                    break;
                case 'price':
                    filteredItems.sort((a, b) => b.price - a.price);
                    break;
                case 'date':
                    filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
            }

            return filteredItems;
        } catch (error) {
            console.error('Erro na filtragem/ordenação:', error);
            return this.items;
        }
    }

    // Renderização dos itens
    renderItems() {
        try {
            const container = document.getElementById('items-container');
            const noItems = document.getElementById('no-items');
            const filteredItems = this.getFilteredAndSortedItems();

            if (filteredItems.length === 0) {
                container.style.display = 'none';
                noItems.style.display = 'block';
                return;
            }

            container.style.display = 'grid';
            noItems.style.display = 'none';

            container.innerHTML = filteredItems.map(item => this.createItemCard(item)).join('');
        } catch (error) {
            console.error('Erro ao renderizar itens:', error);
            this.showToast('Erro ao exibir itens', 'error');
        }
    }

    // Criação do card de item
    createItemCard(item) {
        try {
            const formattedPrice = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(item.price);

            const formattedDate = new Date(item.createdAt).toLocaleDateString('pt-BR');

            return `
                <div class="item-card" data-id="${item.id}">
                    <div class="item-header">
                        <div>
                            <div class="item-name">${this.escapeHtml(item.name)}</div>
                            <span class="item-category">${this.escapeHtml(item.category)}</span>
                        </div>
                    </div>
                    
                    <div class="item-description">${this.escapeHtml(item.description)}</div>
                    
                    <div class="item-details">
                        <div class="item-detail">
                            <div class="item-detail-label">Quantidade</div>
                            <div class="item-detail-value">${item.quantity}</div>
                        </div>
                        <div class="item-detail">
                            <div class="item-detail-label">Preço</div>
                            <div class="item-detail-value">${formattedPrice}</div>
                        </div>
                    </div>
                    
                    <div class="item-details">
                        <div class="item-detail">
                            <div class="item-detail-label">Categoria</div>
                            <div class="item-detail-value">${this.getCategoryDisplayName(item.category)}</div>
                        </div>
                        <div class="item-detail">
                            <div class="item-detail-label">Data</div>
                            <div class="item-detail-value">${formattedDate}</div>
                        </div>
                    </div>
                    
                    <div class="item-actions">
                        <button class="btn btn-warning" onclick="itemManager.startEdit('${item.id}')">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-danger" onclick="itemManager.confirmDelete('${item.id}')">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Erro ao criar card do item:', error);
            return '<div class="item-card">Erro ao carregar item</div>';
        }
    }

    // Escape de HTML para segurança
    escapeHtml(text) {
        try {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        } catch (error) {
            console.error('Erro ao escapar HTML:', error);
            return text;
        }
    }

    // Obter nome de exibição da categoria
    getCategoryDisplayName(category) {
        try {
            const categoryNames = {
                'eletronicos': 'Eletrônicos',
                'roupas': 'Roupas',
                'livros': 'Livros',
                'casa': 'Casa e Jardim',
                'esportes': 'Esportes',
                'outros': 'Outros'
            };
            return categoryNames[category] || category;
        } catch (error) {
            console.error('Erro ao obter nome da categoria:', error);
            return category;
        }
    }

    // Confirmação de exclusão
    confirmDelete(id) {
        try {
            const item = this.items.find(item => item.id === id);
            if (item) {
                this.showConfirmModal(
                    `Tem certeza que deseja excluir o item "${item.name}"?`,
                    () => this.deleteItem(id)
                );
            }
        } catch (error) {
            console.error('Erro na confirmação de exclusão:', error);
            this.showToast('Erro ao confirmar exclusão', 'error');
        }
    }

    // Exibição do modal de confirmação
    showConfirmModal(message, onConfirm) {
        try {
            this.currentConfirmAction = onConfirm;
            document.getElementById('confirm-message').textContent = message;
            document.getElementById('confirm-modal').style.display = 'block';
        } catch (error) {
            console.error('Erro ao mostrar modal de confirmação:', error);
        }
    }

    // Ocultação do modal de confirmação
    hideConfirmModal() {
        try {
            document.getElementById('confirm-modal').style.display = 'none';
            this.currentConfirmAction = null;
        } catch (error) {
            console.error('Erro ao ocultar modal de confirmação:', error);
        }
    }

    // Manipulação da ação confirmada
    handleConfirmAction() {
        try {
            if (this.currentConfirmAction) {
                this.currentConfirmAction();
            }
            this.hideConfirmModal();
        } catch (error) {
            console.error('Erro ao executar ação confirmada:', error);
        }
    }

    // Atualização das estatísticas
    updateStats() {
        try {
            const totalItems = this.items.length;
            const totalValue = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const uniqueCategories = new Set(this.items.map(item => item.category)).size;

            document.getElementById('total-items').textContent = totalItems;
            document.getElementById('total-categories').textContent = uniqueCategories;
            document.getElementById('total-value').textContent = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(totalValue);
        } catch (error) {
            console.error('Erro ao atualizar estatísticas:', error);
        }
    }

    // Exibição de toast de notificação
    showToast(message, type = 'info') {
        try {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        } catch (error) {
            console.error('Erro ao mostrar toast:', error);
        }
    }

    // Exportação de dados
    async exportData() {
        try {
            const dataStr = JSON.stringify(this.items, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `itens_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            this.showToast('Dados exportados com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            this.showToast('Erro ao exportar dados', 'error');
        }
    }

    // Importação de dados
    async importData(file) {
        try {
            const text = await file.text();
            const importedItems = JSON.parse(text);
            
            if (Array.isArray(importedItems)) {
                // Validar e processar itens importados
                const validItems = importedItems.filter(item => 
                    item.name && item.quantity !== undefined
                ).map(item => ({
                    ...item,
                    id: this.generateId(),
                    createdAt: item.createdAt || new Date().toISOString()
                }));

                this.items = [...this.items, ...validItems];
                await this.saveItems();
                this.renderItems();
                this.updateStats();
                
                this.showToast(`${validItems.length} itens importados com sucesso!`, 'success');
            } else {
                throw new Error('Formato de arquivo inválido');
            }
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            this.showToast('Erro ao importar dados. Verifique o formato do arquivo.', 'error');
        }
    }

    // Limpeza de dados
    async clearAllData() {
        try {
            this.showConfirmModal(
                'Tem certeza que deseja excluir TODOS os itens? Esta ação não pode ser desfeita.',
                async () => {
                    this.items = [];
                    await this.saveItems();
                    this.renderItems();
                    this.updateStats();
                    this.showToast('Todos os itens foram removidos', 'info');
                }
            );
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            this.showToast('Erro ao limpar dados', 'error');
        }
    }
}

// Inicialização da aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.itemManager = new ItemManager();
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        alert('Erro ao carregar a aplicação. Por favor, recarregue a página.');
    }
});

// Tratamento de erros globais
window.addEventListener('error', (event) => {
    console.error('Erro global:', event.error);
    if (window.itemManager) {
        window.itemManager.showToast('Ocorreu um erro inesperado', 'error');
    }
});

// Tratamento de promessas rejeitadas
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promessa rejeitada:', event.reason);
    if (window.itemManager) {
        window.itemManager.showToast('Erro na operação assíncrona', 'error');
    }
});
