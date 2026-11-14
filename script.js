const botaoTema = document.getElementById("themeToggle");

const iconeSol = `
<svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42
             M17.65 17.65l1.42 1.42M2 12h2
             M20 12h2M4.93 19.07l1.42-1.42
             M17.65 6.35l1.42-1.42"/>
</svg>`;

const iconeLua = `
<svg viewBox="0 0 24 24">
    <path d="M20.9 13A9 9 0 0 1 11 3.1
             9 9 0 1 0 20.9 13Z"/>
</svg>`;

function atualizarTema() {
    const escuro = document.body.classList.contains("dark-mode");

    botaoTema.innerHTML = escuro ? iconeLua : iconeSol;
    botaoTema.setAttribute(
        "aria-label",
        escuro ? "Ativar modo claro" : "Ativar modo escuro"
    );
}

if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-mode");
}

atualizarTema();

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const escuro = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "tema",
        escuro ? "escuro" : "claro"
    );

    atualizarTema();
});