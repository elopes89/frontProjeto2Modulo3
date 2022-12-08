const nomeCategoria = document.getElementById('nomeCategoria')
const descricao = document.getElementById('descricao')
const listaDOM = document.getElementById("ul")
const btn = document.getElementById("btn")
const btnAlt = document.getElementById("btnAlt")
const btnDel = document.getElementById("btnDel")
let categorias = []
async function getCategorias() {
    listaDOM.innerHTML = ""
    categorias = await (await fetch('http://localhost:8000/categorias')).json()
    console.log(categorias)
    for (let i = 0; i < categorias.length; i++) {
        const pId = document.createElement("p")
        const pNome = document.createElement("p")
        const pDescricao = document.createElement("p")
        const li = document.createElement("li")
        pId.innerText = categorias[i].id
        pNome.innerText = categorias[i].nome
        pDescricao.innerText = categorias[i].descricao
        const botao = document.createElement("button")
        botao.innerHTML = 'selecionar'
        botao.id = `${i}`
        botao.classList = "btn btn-primary"
        botao.onclick = function () { selecionar(botao.id); }
        li.appendChild(pId)
        li.appendChild(pNome)
        li.appendChild(pDescricao)
        li.appendChild(botao)
        listaDOM.appendChild(li)
    }
}

console.log(categorias)

let idBackEnd = 0
let idDel = 0
function selecionar(id) {
    nomeCategoria.value = categorias[id].nome
    descricao.value = categorias[id].descricao
    idBackEnd = categorias[id].id
    idDel = id
}

function deletar() {
    fetch("http://localhost:8000/categorias/" + idBackEnd,
        {
            method: "DELETE",
        })
        .then(function (res) {
            getCategorias()
            limpar()
        })
        .catch(function (res) { console.log(res) })
};

btnDel.addEventListener('click', function (event) {
    event.preventDefault();
    deletar()
    categorias.splice(idDel, 1)
})


function alterar() {
    fetch("http://localhost:8000/categorias",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
                id: idBackEnd,
                nome: nomeCategoria.value,
                descricao: descricao.value,
            })
        })
        .then(function (res) {
            getCategorias()
            limpar()
        })
        .catch(function (res) { console.log(res) })
};

btnAlt.addEventListener('click', function (event) {
    event.preventDefault();
    alterar();

})
function cadastrar() {
    fetch("http://localhost:8000/categorias",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id: 0,
                nome: nomeCategoria.value,
                descricao: descricao.value,
            })
        })
        .then(function (res) {
            getCategorias()
            validar()
            validarValor()
            limpar()

        })
        .catch(function (res) { console.log(res) })
};

btn.addEventListener('click', function (event) {
    event.preventDefault();
    cadastrar();

})

getCategorias()

function validar() {
    for (let i = 0; i < categorias.length; i++) {
        if (nomeCategoria.value === categorias[i].nome) {
            alert("O nome deve ser único")
        }
    }
}

function limpar() {
    nomeCategoria.value = ''
    descricao.value = ''
}

function validarValor() {
    if (nomeCategoria.value === '' || descricao.value === '') {
        alert("Preencha todos os campos")
    }
}
