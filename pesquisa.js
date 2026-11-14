const produtosPesquisa = [
    { nome: "Pizza de Calabresa", pagina: "cardapio.html" },
    { nome: "Pizza Margherita", pagina: "cardapio.html" },
    { nome: "Pizza Pepperoni", pagina: "cardapio.html" },
    { nome: "Pizza Portuguesa", pagina: "cardapio.html" },
    { nome: "Pizza Quatro Queijos", pagina: "cardapio.html" },
    { nome: "Pizza Frango Catupiry", pagina: "cardapio.html" },
    { nome: "Pizza Bacon", pagina: "cardapio.html" },
    { nome: "Pizza Napolitana", pagina: "cardapio.html" },
    { nome: "Pizza Moda da Casa", pagina: "cardapio.html" },

    { nome: "Pizza de Camarão", pagina: "PizzasEspeciais.html" },
    { nome: "Pizza Filé com Cheddar", pagina: "PizzasEspeciais.html" },
    { nome: "Pizza de Costela BBQ", pagina: "PizzasEspeciais.html" },
    { nome: "Pizza Parma Especial", pagina: "PizzasEspeciais.html" },
    { nome: "Pizza Cinco Queijos", pagina: "PizzasEspeciais.html" },
    { nome: "Pizza Frango Premium", pagina: "PizzasEspeciais.html" },
    { nome: "Pizza Pepperoni Supreme", pagina: "PizzasEspeciais.html" },
    { nome: "Pizza Toscana Especial", pagina: "PizzasEspeciais.html" },
    { nome: "Pizza Suprema da Casa", pagina: "PizzasEspeciais.html" },

    { nome: "Pizza de Chocolate", pagina: "PizzasDoces.html" },
    { nome: "Pizza de Morango", pagina: "PizzasDoces.html" },
    { nome: "Pizza de Banana", pagina: "PizzasDoces.html" },
    { nome: "Pizza Prestígio", pagina: "PizzasDoces.html" },
    { nome: "Pizza de Nutella", pagina: "PizzasDoces.html" },
    { nome: "Pizza de Chocolate Branco", pagina: "PizzasDoces.html" },
    { nome: "Pizza Sensação", pagina: "PizzasDoces.html" },
    { nome: "Pizza Romeu e Julieta", pagina: "PizzasDoces.html" },
    { nome: "Pizza de Doce de Leite", pagina: "PizzasDoces.html" },

    { nome: "Coca-Cola 2L", pagina: "Bebidas.html" },
    { nome: "Guaraná Antarctica 2L", pagina: "Bebidas.html" },
    { nome: "Coca-Cola Lata 350ml", pagina: "Bebidas.html" },
    { nome: "Fanta Laranja 350ml", pagina: "Bebidas.html" },
    { nome: "Sprite 350ml", pagina: "Bebidas.html" },
    { nome: "Suco Natural de Laranja", pagina: "Bebidas.html" },
    { nome: "Suco de Morango 500ml", pagina: "Bebidas.html" },
    { nome: "Água Mineral 500ml", pagina: "Bebidas.html" },
    { nome: "Água com Gás 500ml", pagina: "Bebidas.html" },

    { nome: "Combo Família", pagina: "Combos.html" },
    { nome: "Combo Casal", pagina: "Combos.html" },
    { nome: "Combo Econômico", pagina: "Combos.html" },
    { nome: "Combo Especial da Casa", pagina: "Combos.html" },
    { nome: "Combo Doce Tentação", pagina: "Combos.html" },
    { nome: "Combo Festa", pagina: "Combos.html" },
    { nome: "Combo Frango Cremoso", pagina: "Combos.html" },
    { nome: "Combo Premium", pagina: "Combos.html" },
    { nome: "Combo Super Família", pagina: "Combos.html" }
];

document.addEventListener("DOMContentLoaded", () => {
    const campo = document.getElementById("campoPesquisa");
    const botao = document.getElementById("botaoPesquisa");

    if (!campo || !botao) return;

    function normalizar(texto) {
        return texto.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function pesquisar() {
        const termo = normalizar(campo.value.trim());

        if (!termo) {
            alert("Digite o nome de um produto!");
            return;
        }

        const resultados = produtosPesquisa.filter(produto =>
            normalizar(produto.nome).includes(termo)
        );

        if (resultados.length === 0) {
            alert("Nenhum produto encontrado!");
            return;
        }

        // Guardar o termo para destacar o produto na página
        sessionStorage.setItem("pesquisaOtto", termo);

        // Abrir a página do primeiro produto encontrado
        window.location.href = resultados[0].pagina;
    }

    botao.addEventListener("click", pesquisar);

    campo.addEventListener("keydown", evento => {
        if (evento.key === "Enter") {
            pesquisar();
        }
    });
});