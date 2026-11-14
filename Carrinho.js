const CHAVE_CARRINHO = "carrinhoOtto";

// Buscar os produtos que já estão no carrinho
function obterCarrinho() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(CHAVE_CARRINHO) || "[]"
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

// Salvar o carrinho no navegador
function salvarCarrinho(carrinho) {
    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
    );
}

// Formatar valores em reais
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Atualizar o valor mostrado no cabeçalho
function atualizarResumoCarrinho() {
    const carrinho = obterCarrinho();

    const total = carrinho.reduce((soma, produto) => {
        return soma + produto.preco * produto.quantidade;
    }, 0);

    const textoCarrinho =
        document.querySelector(".TextoCarrinho");

    if (textoCarrinho) {
        textoCarrinho.textContent = formatarPreco(total);
    }
}

// Adicionar um produto ao carrinho
function adicionarProduto(produto) {
    const carrinho = obterCarrinho();

    const existente = carrinho.find(
        item => item.nome === produto.nome
    );

    if (existente) {
        existente.quantidade += 1;
        existente.idProduto = produto.idProduto;
    } else {
        carrinho.push({
            idProduto: produto.idProduto,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);
    atualizarResumoCarrinho();
    if (document.querySelector(".DivCentro")) {
        mostrarProdutosCarrinho();
    }

    alert(produto.nome + " adicionado ao carrinho!");
}

// Configurar todos os botões do cardápio
function configurarBotoes() {
    const cartoes =
        document.querySelectorAll(".FundoProdutos");

    cartoes.forEach(cartao => {
        const botao =
            cartao.querySelector(".BotaoAdicionarProduto");

        const imagem =
            cartao.querySelector(".Produto img");

        const textos =
            cartao.querySelectorAll(".TituloProdutoVenda");

        if (!botao || !imagem || textos.length < 2) {
            return;
        }

        const nome = textos[0].textContent.trim();

        const precoTexto = textos[1].textContent
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim();

        const preco = Number(precoTexto);

        if (!Number.isFinite(preco)) {
            return;
        }

        const produto = {
            idProduto: Number(cartao.dataset.id),
            nome: nome,
            preco: preco,
            imagem: imagem.getAttribute("src")
        };

        botao.style.cursor = "pointer";

        botao.setAttribute("role", "button");
        botao.setAttribute("tabindex", "0");

        botao.addEventListener("click", () => {
            adicionarProduto(produto);
        });

        botao.addEventListener("keydown", event => {
            if (event.key === "Enter" ||
                event.key === " ") {
                event.preventDefault();
                adicionarProduto(produto);
            }
        });
    });
}

// Iniciar quando a página estiver carregada
document.addEventListener("DOMContentLoaded", () => {
    configurarBotoes();
    atualizarResumoCarrinho();
});
function mostrarProdutosCarrinho() {
    const centro = document.querySelector(".DivCentro");

    if (!centro) return;

    const carrinho = obterCarrinho();

    centro.innerHTML = "";

    if (carrinho.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "CarrinhoVazio";
        mensagem.textContent = "Seu carrinho está vazio! 🍕";
        centro.appendChild(mensagem);
        return;
    }

    carrinho.forEach((produto, indice) => {
        const item = document.createElement("div");
        item.className = "ItemCarrinho";

        const imagem = document.createElement("img");
        imagem.className = "ImagemItemCarrinho";
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;

        const informacoes = document.createElement("div");
        informacoes.className = "InformacoesItemCarrinho";

        const nome = document.createElement("p");
        nome.className = "NomeItemCarrinho";
        nome.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.className = "PrecoItemCarrinho";
        preco.textContent = formatarPreco(produto.preco);

        informacoes.append(nome, preco);

        const controles = document.createElement("div");
        controles.className = "ControlesCarrinho";

        const diminuir = document.createElement("button");
        diminuir.className = "BotaoQuantidade";
        diminuir.textContent = "−";
        diminuir.addEventListener("click", () => {
            alterarQuantidade(indice, -1);
        });

        const quantidade = document.createElement("span");
        quantidade.className = "QuantidadeCarrinho";
        quantidade.textContent = produto.quantidade;

        const aumentar = document.createElement("button");
        aumentar.className = "BotaoQuantidade";
        aumentar.textContent = "+";
        aumentar.addEventListener("click", () => {
            alterarQuantidade(indice, 1);
        });

        const remover = document.createElement("button");
        remover.className = "BotaoRemover";
        remover.textContent = "Remover";
        remover.addEventListener("click", () => {
            removerProdutoCarrinho(indice);
        });

        controles.append(
            diminuir,
            quantidade,
            aumentar,
            remover
        );

        item.append(imagem, informacoes, controles);
        centro.appendChild(item);
    });

    const total = carrinho.reduce(
        (soma, produto) =>
            soma + produto.preco * produto.quantidade,
        0
    );

    const rodape = document.createElement("div");
    rodape.className = "RodapeCarrinho";

    const botaoFinalizar = document.createElement("button");
    botaoFinalizar.className = "BotaoFinalizar";
    botaoFinalizar.textContent = "FINALIZAR PEDIDO";

    botaoFinalizar.addEventListener("click", finalizarPedido);

    const resumo = document.createElement("div");
    resumo.className = "TotalCarrinho";
    resumo.textContent = "Total: " + formatarPreco(total);

    rodape.append(botaoFinalizar, resumo);
    centro.appendChild(rodape);
}

function alterarQuantidade(indice, alteracao) {
    const carrinho = obterCarrinho();

    if (!carrinho[indice]) return;

    carrinho[indice].quantidade += alteracao;

    if (carrinho[indice].quantidade <= 0) {
        carrinho.splice(indice, 1);
    }

    salvarCarrinho(carrinho);
    atualizarResumoCarrinho();
    mostrarProdutosCarrinho();
}

function removerProdutoCarrinho(indice) {
    const carrinho = obterCarrinho();

    carrinho.splice(indice, 1);

    salvarCarrinho(carrinho);
    atualizarResumoCarrinho();
    mostrarProdutosCarrinho();
}

// Exibir os produtos ao abrir a página do carrinho
document.addEventListener("DOMContentLoaded", () => {
    mostrarProdutosCarrinho();
});

const CHAVE_HISTORICO = "pedidosOtto";

// Salvar um pedido no histórico
function salvarPedidoNoHistorico(pedido) {
    const historico = JSON.parse(
        localStorage.getItem(CHAVE_HISTORICO) || "[]"
    );

    historico.push(pedido);

    localStorage.setItem(
        CHAVE_HISTORICO,
        JSON.stringify(historico)
    );
}

// Finalizar o pedido
function finalizarPedido() {
    const carrinho = obterCarrinho();

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const idInformado = prompt(
        "Digite o ID do cliente cadastrado no sistema C#:"
    );

    if (idInformado === null) return;

    const idCliente = Number(idInformado);

    if (!Number.isInteger(idCliente) || idCliente <= 0) {
        alert("Informe um ID de cliente válido!");
        return;
    }

    const itens = carrinho.map(produto => ({
        IdProduto: Number(produto.idProduto),
        Nome: produto.nome,
        Quantidade: produto.quantidade,
        PrecoUnitario: produto.preco,
        Subtotal: Number(
            (produto.preco * produto.quantidade).toFixed(2)
        )
    }));

    if (itens.some(item =>
        !Number.isInteger(item.IdProduto) ||
        item.IdProduto <= 0
    )) {
        alert("Existem produtos sem ID cadastrado!");
        return;
    }

    const valorTotal = Number(
        itens.reduce(
            (soma, item) => soma + item.Subtotal,
            0
        ).toFixed(2)
    );

    // Pedido para importar no C#
    const pedido = {
        IdCliente: idCliente,
        DataPedido: new Date().toISOString(),
        ValorTotal: valorTotal,
        Status: "Pendente",
        Itens: itens.map(item => ({
            IdProduto: item.IdProduto,
            Quantidade: item.Quantidade,
            PrecoUnitario: item.PrecoUnitario,
            Subtotal: item.Subtotal
        }))
    };

    // Gerar arquivo JSON
    const arquivo = new Blob(
        [JSON.stringify(pedido, null, 4)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = "pedido.json";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    // Salvar no histórico do site, incluindo os nomes
    const pedidoHistorico = {
        ...pedido,
        Itens: itens
    };

    // Salvar o pedido no histórico
    salvarPedidoNoHistorico(pedidoHistorico);

    // Limpar o carrinho após finalizar
    localStorage.removeItem("carrinhoOtto");

    // Atualizar o valor do carrinho no cabeçalho
    atualizarResumoCarrinho();

    // Atualizar os produtos exibidos no carrinho
    mostrarProdutosCarrinho();

    alert("Pedido finalizado com sucesso!");
}

function atualizarIdsAntigos() {
    const ids = {
        "Pizza de Calabresa": 4,
        "Pizza Margherita": 5,
        "Pizza Pepperoni": 6,
        "Pizza Portuguesa": 7,
        "Pizza Quatro Queijos": 8,
        "Pizza Frango Catupiry": 9,
        "Pizza Bacon": 10,
        "Pizza Napolitana": 11,
        "Pizza Moda da Casa": 12
    };

    const carrinho = obterCarrinho();

    carrinho.forEach(produto => {
        if (ids[produto.nome]) {
            produto.idProduto = ids[produto.nome];
        }
    });

    salvarCarrinho(carrinho);
    atualizarResumoCarrinho();
    mostrarProdutosCarrinho();
}

document.addEventListener("DOMContentLoaded", atualizarIdsAntigos);