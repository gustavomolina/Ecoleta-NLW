
function populateUFs(){

    //estado selecinado do JSON retornado pela API do IBGE
    const ufSelect = document.querySelector("select[name=uf]")

    //Consulta a API do IBGE
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

    //'res' recebe a resposta da API em formato JSON
    .then( (res) =>  res.json()  )

    //Seleciona os estados do JSON
    .then( states => {
        //Preenche o seletor no HTML
        for(const state of states){
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }  
    })


}

populateUFs()

function getCities(event){
    
    //Habilita o seletor:
    document.getElementById("seletorCidades").removeAttribute("disabled");
    //Consulta das cidades
    const citySelect = document.querySelector("select[name=city]")

    //Toda vez que essa tunção é chamada
    /*const stateInput = document.querySelector("input[name=city]")
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text*/

    //Recebe o evento como atributo, no caso, o UF.
    const ufValue = event.target.value

    
    const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


        //Consulta a API do IBGE
        fetch(urlCity)

        //'res' recebe a resposta da API em formato JSON
        .then( (res) =>  res.json()  )
    
        //Seleciona as cidades do JSON
        .then( cities => {
            //Preenche o seletor no HTML
            for(const city of cities){
                citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.id}">${city.nome}</option>`
                
            }  
        })
        
        //Habilita o seletor de cidades que havia sido desabilitado.
}

document
//'getCities' é chamada toda vez que se troca o 'uf'
    .querySelector("select[name=uf]")
    //quando ocorre alguma mudança de estado
    .addEventListener("change", getCities)