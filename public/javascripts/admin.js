const listGroup = document.querySelector('#listGroup');
const featureGroup = document.querySelector('#featureGroup');

const deleteBtns = document.querySelectorAll('#btnDelete');
const deleteFeature = document.querySelectorAll('#deleteFeature');

const newBtn = document.querySelector('#newInput');
const addNewFeature = document.querySelector('#addNewFeature');

const descCounter = document.querySelector('#countDesk');
const featCounter = document.querySelector('#countFeat');


let deskIncrease = 0;
let featIncrease = 0;

descCounter.setAttribute('value', deskIncrease)
featCounter.setAttribute('value', featIncrease)

const handleClick = (e) => {
    let li = e.target.parentNode
    let ul = li.parentNode
    ul.removeChild(li)

    deskIncrease -= 1

    descCounter.setAttribute('value', '')
    descCounter.setAttribute('value', deskIncrease)

    
}

const newHandleClick = (e) => {
    console.log(e.target)
}

const addNewInput = (e) => {

    deskIncrease += 1;
    
    descCounter.setAttribute('value', '')
    descCounter.setAttribute('value', deskIncrease)

    let li = document.createElement('li')
    let i = document.createElement('i')
    let input = document.createElement('input')
    
    // add Attributes
    i.setAttribute('type', 'button')
    i.setAttribute('id', 'newBtnDelete')
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'prd_description_'+deskIncrease)
    input.setAttribute('placeholder', 'new description')
    input.setAttribute('required', true)
    
    // add Classes
    li.classList.add('d-flex')
    li.classList.add('align-items-center')
    li.classList.add('mb-2')

    i.classList.add('bx')
    i.classList.add('bx-x')
    i.classList.add('bg-danger')
    i.classList.add('mr-2')
    i.classList.add('color-white')

    input.classList.add('form-control')
    
    li.appendChild(i)
    li.appendChild(input)
    
    listGroup.appendChild(li)

    const newBtnDelete = document.querySelectorAll('#newBtnDelete');
    newBtnDelete.forEach(btn => btn.addEventListener('click', handleClick, false));
}

const featureHandler = (e) => {

    featIncrease -= 1;
    
    featCounter.setAttribute('value', '')
    featCounter.setAttribute('value', featIncrease)

    let li = e.target.parentNode.parentNode.parentNode;
    let ul = e.target.parentNode.parentNode.parentNode.parentNode;

    ul.removeChild(li)
}

const addNewFeatureHandler = (e) => {

    featIncrease += 1;  

    featCounter.setAttribute('value', '')
    featCounter.setAttribute('value', featIncrease)

    //  Create elements
    let i = document.createElement('i')
    let li = document.createElement('li')
    let row = document.createElement('div')
    let colSm1 = document.createElement('div')
    let colSm3 = document.createElement('div')
    let colSm8 = document.createElement('div')
    let input1 = document.createElement('input')
    let input2 = document.createElement('input')

    // Classes

    i.classList.add('bx')
    i.classList.add('bx-x')
    i.classList.add('bg-danger')
    i.classList.add('color-white')

    li.classList.add('m-2')

    row.classList.add('row')

    input1.classList.add('form-control')
    input2.classList.add('form-control')

    colSm1.classList.add('col-sm-1')
    colSm1.classList.add('d-flex')
    colSm1.classList.add('align-items-center')
    colSm1.classList.add('justify-content-center')

    colSm3.classList.add('col-sm-3')
    colSm8.classList.add('col-sm-8')

    // Attributes
    i.setAttribute('id', 'deleteNewFeature')
    i.setAttribute('type', 'button')
    input1.setAttribute('type', 'text')
    input1.setAttribute('required', true)
    input1.setAttribute('name', 'prd_feature_field_key_'+ featIncrease)
    input1.setAttribute('placeholder', 'key')
    input2.setAttribute('required', true)
    input2.setAttribute('type', 'text')
    input2.setAttribute('name', 'prd_feature_field_value_'+ featIncrease)
    input2.setAttribute('placeholder', 'value')

    //Append
    colSm1.appendChild(i)
    colSm3.appendChild(input1)
    colSm8.appendChild(input2)
    row.appendChild(colSm1)
    row.appendChild(colSm3)
    row.appendChild(colSm8)
    li.appendChild(row)

    featureGroup.appendChild(li)

    
    // Listener
    let deleteNewFeature = document.querySelectorAll('#deleteNewFeature')
    deleteNewFeature.forEach(feature => feature.addEventListener('click', featureHandler, false));
}


newBtn.addEventListener('click', addNewInput, false);
addNewFeature.addEventListener('click', addNewFeatureHandler, false);
deleteBtns.forEach(btn => btn.addEventListener('click', handleClick, false));
deleteFeature.forEach(feature => feature.addEventListener('click', featureHandler, false));


