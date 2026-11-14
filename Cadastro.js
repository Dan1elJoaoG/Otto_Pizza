document.getElementById("formCadastro")
    .addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("txtNome").value.trim();
    const telefone = document.getElementById("txtTelefone").value.trim();
    const email = document.getElementById("txtEmail").value.trim();
    const endereco = document.getElementById("txtEndereco").value.trim();
    const senha = document.getElementById("txtSenha").value;
    const confirmarSenha =
        document.getElementById("txtConfirmarSenha").value;

    if (!nome || !telefone || !email ||
        !endereco || !senha || !confirmarSenha) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    if (senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres!");
        return;
    }

    // Buscar os clientes já cadastrados
    let clientes = JSON.parse(
        localStorage.getItem("clientesOtto") || "[]"
    );

    // Impedir e-mails duplicados
    const emailExiste = clientes.some(
        cliente => cliente.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExiste) {
        alert("Este e-mail já foi cadastrado!");
        return;
    }

    // Criar o novo cliente
    const novoCliente = {
        nome: nome,
        telefone: telefone,
        email: email,
        endereco: endereco
    };

    // Adicionar à lista
    clientes.push(novoCliente);

    // Salvar todos os clientes no navegador
    localStorage.setItem(
        "clientesOtto",
        JSON.stringify(clientes)
    );

    alert("Cliente cadastrado com sucesso!");

    document.getElementById("formCadastro").reset();
});

// Exportar todos os clientes para JSON
function exportarClientes() {

    const clientes = JSON.parse(
        localStorage.getItem("clientesOtto") || "[]"
    );

    if (clientes.length === 0) {
        alert("Nenhum cliente cadastrado!");
        return;
    }

    const json = JSON.stringify(clientes, null, 4);

    const arquivo = new Blob(
        [json],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(arquivo);

    const link = document.createElement("a");
    link.href = url;
    link.download = "clientes.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    alert("Arquivo clientes.json exportado com sucesso!");
}