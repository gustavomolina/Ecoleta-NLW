// Importar a dependencia do sqlite3, com mensagens
const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá fazer as operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto de banco de dados para as operações
db.serialize(() => {

    //Com comandos SQL: 
    // 1. Criar uma tabela
    // 'Template literals' ou 'template strings'
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT, 
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)


    // 2. Inserir dados na tabela
    /*const query = `
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Papersider",
        "Guilherme Gamballa, Jardim America",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e papelão"

    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        // Resposta do 'run'
        console.log(this)
    }

    db.run(query, values, afterInsertData)





    // 3. Deletar um dado da tabela
    db.run(`DELETE FROM places WHERE id IN (6,7)`, function(err){
        if (err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    })
*/
        // 4. Consultar dados na tabela

        db.all(`SELECT * FROM places`, function(err, rows){
            if (err) {
                return console.log(err)
            }
    
            console.log("Aqui estão os seus registros:")
            console.log(rows)
        })
})