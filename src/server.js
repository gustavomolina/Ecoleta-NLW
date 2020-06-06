const express = require("express")
const server = express()

const db = require("./database/db")

//Configurar pasta 'public'
server.use(express.static("public"))


//Habiltar req.body
server.use(express.urlencoded({ extended: true }))


//Utilizando o template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar caminhos da aplicação
//Home
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == ""){
        //pesquisa vazia
        // Mostra a pagina HTML com os dados do banco de dados
        return res.render("search-results.html", { total: 0 })
    }

    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length
        // Mostra a pagina HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })

})


///////////////////// POST /////////////////////////

server.post("/savepoint", (req, res) => {
    //console.log(req.body)

    //Inserir dados no banco
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso!")
        // Resposta do 'run'
        console.log(this)

        return res.send("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)


    
})


//Ligar o servidor na porta 3000
server.listen(3000)