// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nomeProduto, preco, imagem) {
  const produto = {
    nome: nomeProduto,
    preco: preco,
    imagem: imagem,
    quantidade: 1
  };

  // Recupera o carrinho existente ou cria um novo
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se o produto já está no carrinho
  const produtoExistente = carrinho.find(item => item.nome === nomeProduto);
  if (produtoExistente) {
    produtoExistente.quantidade++;
  } else {
    carrinho.push(produto);
  }

  // Salva o carrinho atualizado no LocalStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Feedback visual para o usuário
  alert(`"${nomeProduto}" foi adicionado ao carrinho!`);
}

// Função para carregar os itens do carrinho na página de carrinho
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  console.log(carrinho);

  // Limpa o conteúdo atual antes de carregar os novos itens
  document.getElementById('itens-carrinho').innerHTML = '';

  if (carrinho.length === 0) {
    document.getElementById('itens-carrinho').innerHTML = '<p class="text-center">Seu carrinho está vazio.</p>';
    return;
  }

  carrinho.forEach((item, index) => {
    const itemHTML = `
        <div class="row item-carrinho" id="item-${index}" data-preco="${item.preco}">
          <div class="col-md-8">
            <h5>${item.nome}</h5>
            <p>R$ ${item.preco.toFixed(2)}</p>
          </div>
          <div class="col-md-4 d-flex align-items-center">
            <button class="btn btn-outline-danger" onclick="removerItem(${index})">
              <i class="bi bi-trash"></i>
            </button>
            <div class="input-group ms-3">
              <button class="btn btn-outline-secondary" onclick="atualizarQuantidade(${index}, 'diminuir')">
                <i class="bi bi-dash"></i>
              </button>
              <input type="number" class="form-control quantidade" id="quantidade-${index}" value="${item.quantidade}" min="1" readonly>
              <button class="btn btn-outline-secondary" onclick="atualizarQuantidade(${index}, 'aumentar')">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
        </div>
      `;

    document.getElementById('itens-carrinho').insertAdjacentHTML('beforeend', itemHTML);
  });

  atualizarTotal();
}

// Função para atualizar a quantidade do produto no carrinho
function atualizarQuantidade(index, operacao) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let quantidade = carrinho[index].quantidade;

  if (operacao === 'aumentar') {
    quantidade++;
  } else if (operacao === 'diminuir' && quantidade > 1) {
    quantidade--;
  }

  carrinho[index].quantidade = quantidade;
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  document.getElementById('quantidade-' + index).value = quantidade;
  atualizarTotal();
}

// Função para remover um item do carrinho
function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

// Função para atualizar o total
function atualizarTotal() {
  let total = 0;
  const itens = document.querySelectorAll('.item-carrinho');
  itens.forEach(item => {
    const preco = parseFloat(item.getAttribute('data-preco'));
    const quantidade = parseInt(item.querySelector('.quantidade').value);
    total += preco * quantidade;
  });

  document.getElementById('total').textContent = 'R$ ' + total.toFixed(2);
}
