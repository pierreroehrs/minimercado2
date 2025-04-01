// Adicionar produto ao carrinho
function adicionarAoCarrinho(nomeProduto, preco, imagem) {
  const produto = {
    nome: nomeProduto,
    preco: preco,
    imagem: imagem,
    quantidade: 1
  };

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const produtoExistente = carrinho.find(item => item.nome === nomeProduto);
  if (produtoExistente) {
    produtoExistente.quantidade++;
  } else {
    carrinho.push(produto);
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  alert(`"${nomeProduto}" foi adicionado ao carrinho!`);
}

// Carregar os itens do carrinho na página de carrinho
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  document.getElementById('itens-carrinho').innerHTML = '';

  if (carrinho.length === 0) {
    document.getElementById('itens-carrinho').innerHTML = `
      <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
        <p class="text-center">Seu carrinho está vazio.</p>
      </div>
    `;
    atualizarTotal();
    habilitarVenda();
    return;
  }


  carrinho.forEach((item, index) => {
    const itemHTML = `
        <div class="row item-carrinho mb-3" id="item-${index}" data-preco="${item.preco}">
          <div class="col-md-2 d-flex align-items-center justify-content-center">
            <!-- Imagem menor e centralizada -->
            <img src="${item.imagem}" alt="${item.nome}" class="img-fluid" style="max-width: 80px;">
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center">
            <h5 class="mb-2">${item.nome}</h5>
            <p>R$ ${item.preco.toFixed(2)}</p>
          </div>
          <div class="col-md-4 d-flex align-items-center">
            <button class="btn btn-outline-danger" onclick="removerItem(${index})">
              <i class="bi bi-trash"></i>
            </button>
            <div class="input-group ms-3" style="max-width: 140px;">
              <button class="btn btn-outline-secondary" onclick="atualizarQuantidade(${index}, 'diminuir')">
                <i class="bi bi-dash"></i>
              </button>
              <input type="number" class="form-control form-control-sm quantidade" id="quantidade-${index}" value="${item.quantidade}" min="1" readonly>
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
  habilitarVenda();
}

// Atualizar a quantidade do produto no carrinho
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

// Remover item do carrinho
function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

// Atualizar o valor total do carrinho
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

// Habilitar ou desabilitar o botão de finalizar compra
function habilitarVenda() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const btnFinalizar = document.getElementById('finalizar-compra');
  const dataInput = document.getElementById('data');

  // Se o carrinho estiver vazio, desabilita o botão de finalizar
  if (carrinho.length === 0 || !dataInput.value) {
    btnFinalizar.disabled = true;
  } else {
    btnFinalizar.disabled = false;
  }
}
