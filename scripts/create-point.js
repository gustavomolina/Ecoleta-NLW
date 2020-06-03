
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


    
        citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
        citySelect.disabled = true

        //Consulta a API do IBGE
        fetch(urlCity)

        //'res' recebe a resposta da API em formato JSON
        .then( (res) =>  res.json()  )
    
        //Seleciona as cidades do JSON
        .then( cities => {
            
            //Preenche o seletor no HTML
            for(const city of cities){
                citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
                
            }  

            citySelect.disabled = false
        })
        
        //Habilita o seletor de cidades que havia sido desabilitado.
}

document
//'getCities' é chamada toda vez que se troca o 'uf'
    .querySelector("select[name=uf]")
    //quando ocorre alguma mudança de estado
    .addEventListener("change", getCities)


//Pega todos os 'li'sdentro de 'items-grid'
const itemsToCollect = document.querySelectorAll(".items-grid li")
    /*Mudança de evento na seleção dos 'li's*/
    for(item of itemsToCollect){
        item
        //quando ocorre algum 'click' em algum dos itens
        .addEventListener("click", handleSelectedItem)

    }

let selectedItems = [1,2,3,4,5,6]

const collectedItems = document.querySelector("input[name=items]")

/*Adiciona ou remove 'class' "selected" dos 'li's*/
function handleSelectedItem(event){

    const itemLi = event.target
    

    /*Função que adiciona ou remove determinada classe*/
    itemLi.classList.toggle("selected")


    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {

        //retorna true or false
        return item == itemId
        
    })

    /*Verificar se existem itens selecionados, se sim pega-los*/
    /*Se já estiver selecionado, tirar da seleção*/

    //Está no vetor selectedItems
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsdifferent = item != itemId
            return itemIsdifferent
        })

        selectedItems = filteredItems
    }else{
        //se nao estiver selecionado, adiciona
        selectedItems.push(itemId)
    }
    
    
    collectedItems.value = selectedItems
    /*Se não estiver, adiciona-lo*/



}