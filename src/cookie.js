/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
// const btnDelete = homeworkContainer.querySelector('#list-table button');

// console.log(btnDelete)
filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    for (let cookie in cookies) {
        if (cookies.hasOwnProperty(cookie) && isInclude(cookie, filterNameInput.value) || 
            isInclude(cookies[cookie], filterNameInput.value)) {
            console.log(cookies[cookie])
            console.log(filterCoockies[cookie])
            filterCoockies[cookie] = cookies[cookie];
        }
    }
    if (filterNameInput.value == '') {
        createTable();
    }
    console.log(filterCoockies)
});
function isInclude(full, chunk) {
    return full.toUpperCase().includes(chunk.toUpperCase());
}
let cookies = {};

// const th = document.createElement('th');
window.addEventListener('load', () => {
    cookies = parseCookie();
    // console.log(cookies)
    createTable();
})
function createTable() { // если false, то не обновляем в таблицу
    listTable.textContent = '';
    cookies = parseCookie();
    // console.log(cookies)
    for (let cookie in cookies) {       
        if (cookies.hasOwnProperty(cookie)) {     
            listTable.appendChild(document.createElement('tr'));
            createTh(cookie, cookies[cookie]);
        }  
    }
}

function createTh (name, value) {
    listTable.lastChild.appendChild(document.createElement('th')).textContent = name;
    listTable.lastChild.appendChild(document.createElement('th')).textContent = value;
    listTable.lastChild.appendChild(document.createElement('th'))
        .appendChild(document.createElement('button')).textContent = 'Удалить';
    listTable.lastChild.lastChild.firstChild.addEventListener('click', () => {
        delete cookies[name]
        deleteCookie(name);
        createTable();
    });
}
function deleteCookie (cookieName) {
    let cookieDate = new Date (); // Текущая дата и время

    cookieDate.setTime (cookieDate.getTime() - 1);
    document.cookie = cookieName += '=; expires=' + cookieDate.toGMTString();
}

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    if (addNameInput.value != '' && addValueInput.value != '') {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        // console.log(document.cookie)
        // for (let cookie in cookies) {
        //     if (cookies.hasOwnProperty(cookie) && cookie == addNameInput.value) {
        //         cookies[cookie] = addValueInput.value;
        //         createTable();
        //     }
        // }
        
        createTable();
    }
    addNameInput.value = '';
    addValueInput.value = '';
});

function parseCookie () {
    if (document.cookie) {
        return document.cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');
    
            prev[name] = value;
    
            return prev;
        }, {});
    }
    
}
