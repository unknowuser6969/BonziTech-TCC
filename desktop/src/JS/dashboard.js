const profileBtn = document.getElementById('profile');
const profileMenu = document.getElementById('profile-menu');
const addBtn = document.getElementById('add-table-row');
const editForm = document.getElementById('edit-form');
const closeEditForm = document.getElementById('close-form');
const addForm = document.getElementById('add-form');
const cancelBtn = document.getElementById('cancel-btn');
const cancelIcon = document.getElementById('cancel-icon')
const confirmBtn = document.getElementById('confirm-btn');

profileBtn.addEventListener('click', () => {
    if (profileMenu.style.display === 'block') {
        profileMenu.style.display = 'none';
    } else {
        profileMenu.style.display = 'block';
    }
});

document.addEventListener('click', (event) => {
    if (!profileMenu.contains(event.target) && event.target !== profileBtn) {
        profileMenu.style.display = 'none';
    }
});

function mostrarSection(idSection, botaoOpcao) {
    var sections = document.querySelectorAll('.hero');
    sections.forEach(function(section) {
      if (section.id === idSection) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });

    var tituloDiv = document.querySelector(".top h1");
    tituloDiv.textContent = botaoOpcao.textContent;
}

document.getElementById('visao-geral').style.display = 'block';

var profile = document.getElementById('profile');
profile.style.display = 'block';

const botoesOpcao = document.querySelectorAll(".opcao-nav");
botoesOpcao.forEach(function(botao) {
    botao.addEventListener('click', function() {
        mostrarSection(this.dataset.section, this);
    });
});

addBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  addForm.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
  addForm.style.display = 'none';
});

cancelIcon.addEventListener('click', ()=>{
  addForm.style.display = 'none';
});

document.addEventListener('click', (event) => {
  if (!addForm.contains(event.target) && event.target !== addBtn) {
    addForm.style.display = 'none';
  }
});
