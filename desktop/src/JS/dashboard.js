const profileBtn = document.getElementById("profile");
const profileMenu = document.getElementById("profile-menu");
const addBtn = document.getElementById("add-table-row");
const editForm = document.getElementById("edit-form");
const closeEditForm = document.getElementById("close-form");
const cancelIcon = document.getElementById("cancel-icon");
const addForm = document.getElementById("add-form");
const cancelBtn = document.getElementById("cancel-btn");
const confirmBtn = document.getElementById("confirm-btn");
const tableBody = document.querySelector("tbody");
const permissoesInput = document.getElementById("add-permission");
const nomeInput = document.getElementById("add-name");
const emailInput = document.getElementById("add-email");
const senhaInput = document.getElementById("add-password");
const funcDeleteBtn = document.getElementById("func-delete-btn");
const funcRow = document.createElement("td")
const codUsers = [];

profileBtn.addEventListener("click", () => {
  if (profileMenu.style.display === "block") {
    profileMenu.style.display = "none";
  } else {
    profileMenu.style.display = "block";
  }
});

document.addEventListener("click", (event) => {
  if (!profileMenu.contains(event.target) && event.target !== profileBtn) {
    profileMenu.style.display = "none";
  }
});

function mostrarSection(idSection, botaoOpcao) {
  var sections = document.querySelectorAll(".hero");
  sections.forEach(function (section) {
    if (section.id === idSection) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });

  var tituloDiv = document.querySelector(".top h1");
  tituloDiv.textContent = botaoOpcao.textContent;
}

document.getElementById("visao-geral").style.display = "block";

var profile = document.getElementById("profile");
profile.style.display = "block";

const botoesOpcao = document.querySelectorAll(".opcao-nav");
botoesOpcao.forEach(function (botao) {
  botao.addEventListener("click", function () {
    mostrarSection(this.dataset.section, this);
  });
});

addBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  addForm.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
  addForm.style.display = "none";
});

cancelIcon.addEventListener("click", () => {
  addForm.style.display = "none";
});

document.addEventListener("click", (event) => {
  if (!addForm.contains(event.target) && event.target !== addBtn) {
    addForm.style.display = "none";
  }
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const data = {
    permissoes: permissoesInput.value.trim(),
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    senha: senhaInput.value.trim(),
  };

  fetch("https://bonzitech-tcc.onrender.com/api/usuarios", {
    method: "POST",
    headers: {
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.reload();
    });
});


fetch("https://bonzitech-tcc.onrender.com/api/usuarios")
  .then((response) => response.json())
  .then((data) => {
    if (typeof data === "object" && data !== null) {
      for (const user of data.usuarios) {
        codUsers[user.nome] = user.codUsuario;
        const tabela = document.getElementById("tabela");
        const tbody = tabela.getElementsByTagName("tbody")[0];

        const row = document.createElement("tr");

        const nomeCell = document.createElement("td");
        nomeCell.textContent = user.nome;
        row.appendChild(nomeCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const acoesCell = document.createElement("td");

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete-btn");
        btnDelete.addEventListener("click", () => { fetchDelete(user) });
        btnDelete.innerHTML = 
          '<i class="fa-solid fa-ban"></i>';
        acoesCell.appendChild(btnDelete);
        row.appendChild(acoesCell);
        
        row.addEventListener("click", () => { puxarFormUpdate(user); });

        tbody.appendChild(row);
      }
    } else {
      console.error("Os dados não são um objeto:", data);
      alert("Os dados não são um objeto:", data);
    }
  })
  .catch((error) => {
    console.error("Ocorreu um erro:", error);
  });

  function puxarFormUpdate(user) {
    editForm.style.display = 'block'

    const addpermission = document.getElementById('edit-permission');
    const addnome = document.getElementById('edit-name');
    const addemail = document.getElementById('edit-email');

    addpermission.value = user.permissoes;
    addnome.value = user.nome;
    addemail.value = user.email;

    console.log(addpermission);

  }

async function fetchDelete(user) {
  console.log(user)
  
  fetch("https://bonzitech-tcc.onrender.com/api/usuarios/" + user.codUsuario, {
   	method: "DELETE",
    headers: {
      "Content-type": "Application/JSON"
    }
  })
  .then((res) => { return res.json(); })
  .then((res) => {
    if (res.error != null) {
      alert(res.error);
      return;
    }
    
    alert(res.message);
  })
  .catch((err) => {
    console.log(err);
  });
}

profileBtn.addEventListener("click", () => {
  if (profileMenu.style.display === "block") {
  } else {
    profileMenu.style.display = "block";
  }
});

document.addEventListener("click", (event) => {
  if (!profileMenu.contains(event.target) && event.target !== profileBtn) {
    profileMenu.style.display = "none";
  }
});
