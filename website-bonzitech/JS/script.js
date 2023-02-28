const sobreNosContainer = document.getElementById("sobre-nos-container");
const sobreNosBtn = document.getElementById("sobre-nos-btn");
const textosSobreNos = document.getElementById("sobre-nos-textos");

sobreNosBtn.addEventListener("click", () => {
    const textoMaisSobreNosAtivo = textosSobreNos.childElementCount > 2;

    if (textoMaisSobreNosAtivo) {
        textosSobreNos.children[2].remove();
        sobreNosContainer.style.margin = "0px";
    }
    else {
        const maisSobreNos = document.createElement("p");

        maisSobreNos.innerHTML = `
        A BonziTech é uma pequena equipe, mas que sonha grande. <br> Nosso objetivo 
        é facilitar seu trabalho da forma mais tecnológica e acessível possível, 
        desenvolvendo tudo o que você pode imaginar e mais um pouco! <br> <br>

        Desenvolvemos sistemas de computador, aplicativos desktop ou mobile e websites 
        para qualquer tipo de negócio, tudo de forma ágil e com um plano que se adapte 
        ao seu negócio. <b> Se pode ser feito, nós fazemos! </b> <br> <br>

        BonziTech, trabalhando em seu negócio com você
        `;

        textosSobreNos.appendChild(maisSobreNos);
        sobreNosContainer.style.marginTop = "40vh";
        sobreNosContainer.style.marginBottom = "25vh";
    }

    sobreNosBtn.textContent = 
    (sobreNosBtn.textContent.includes("Saiba mais") 
    ? "Mostrar menos" 
    : "Saiba mais");
});