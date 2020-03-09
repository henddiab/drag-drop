var count = 0;
var elements = [];


// get all sections to allow drag & drop on them
var allowed = document.getElementsByClassName('container-task');
for (var i = 0; i < allowed.length; i++) {
    allowed[i].addEventListener('dragover', dragOver)
    allowed[i].addEventListener('drop', function(e){
        drop(e,this)
    })
}

var returnedArr = JSON.parse(localStorage.getItem('item'));
if (returnedArr.length) {
    elements = returnedArr
    count = returnedArr.length
}

showFromLocalStorage()

// drag element
function dragTask(e) {
    e.dataTransfer.setData('text', event.target.id);
}

// drag over element
function dragOver(e) {
    e.preventDefault();
}

// drop element
function drop(e,thisObj) {
    thisObj.appendChild(document.getElementById(e.dataTransfer.getData('text')));

    for (let index = 0; index < elements.length; index++) {
        if (elements[index].id == e.dataTransfer.getData('text')) {
            elements[index].parentId = e.target.id
            localStorage.setItem('item', JSON.stringify(elements))
        }
    }
}


// add task
function add(e) {
    if (document.getElementsByTagName('input')[0].value) {

        //data object
        var ele = addTask()
        var dataObj = {
            'id': ele.id,
            'text': ele.innerText,
            'parentId': ele.parentNode.id
        }
        //push data into array 
        elements.push(dataObj)

        // add to local storage
        localStorage.setItem('item', JSON.stringify(elements))
        count++;
        clear();
    }

}
// clear input content after adding
function clear() {
    document.getElementsByTagName('input')[0].value = ''
}

// console.log(returnedArr);


function showFromLocalStorage() {
    for (var i = 0; i < returnedArr.length; i++) {
        var ele = addTask()
        ele.innerText = returnedArr[i].text
        ele.id = returnedArr[i].id
        document.getElementById(returnedArr[i].parentId).appendChild(ele)
    }
}

function addTask() {
    var item = document.createElement('p');
    item.innerText = document.getElementsByTagName('input')[0].value
    item.setAttribute('draggable', 'true')
    item.setAttribute('id', count)
    item.style.cursor = 'pointer'
    document.getElementById('inProgress').appendChild(item)
    item.addEventListener('dragstart', dragTask)

    return item;
}