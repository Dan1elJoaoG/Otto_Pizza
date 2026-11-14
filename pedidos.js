
document.addEventListener("DOMContentLoaded", mostrarHistoricoPedidos);

function mostrarHistoricoPedidos() {
    const container = document.getElementById("listaPedidos");

    if (!container) return;

    const historico = JSON.parse(
        localStorage.getItem("pedidosOtto") || "[]"
    );

    container.innerHTML = "";

    if (historico.length === 0) {
        container.innerHTML = `
            <div class="PedidoVazio">
                <h2>Você ainda não fez nenhum pedido 🍕</h2>
                <p>Que tal escolher sua pizza favorita?</p>
                <a href="cardapio.html">Ver Cardápio</a>
            </div>
        `;
        return;
    }

    // Mostrar os pedidos mais recentes primeiro
    historico.slice().reverse().forEach((pedido, indice) => {
        const numeroPedido = historico.length - indice;

        const data = new Date(pedido.DataPedido)
            .toLocaleString("pt-BR");

        const itensHTML = pedido.Itens.map(item => `
            <div class="ItemPedido">
                <span>
                    ${item.Quantidade}x ${escaparHTML(item.Nome || "Produto #" + item.IdProduto)}
                </span>
                <span>
                    ${formatarMoeda(item.Subtotal)}
                </span>
            </div>
        `).join("");

        const cartao = document.createElement("div");
        cartao.className = "CartaoPedido";

        cartao.innerHTML = `
            <div class="CabecalhoPedido">
                <h2>Pedido #${String(numeroPedido).padStart(4, "0")}</h2>
                <span class="StatusPedido">
                    ${escaparHTML(pedido.Status)}
                </span>
            </div>

            <p class="DataPedido">${data}</p>

            <div class="ListaItensPedido">
                ${itensHTML}
            </div>

            <div class="RodapePedido">
                <strong>Total do pedido</strong>
                <strong>${formatarMoeda(pedido.ValorTotal)}</strong>
            </div>
        `;

        container.appendChild(cartao);
    });
}

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}
