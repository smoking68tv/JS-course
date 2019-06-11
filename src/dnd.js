/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let div = document.createElement('DIV');

    div.classList.add('draggable-div');
    div.style.height = `${Math.random() * 100}px`;
    div.style.width = `${Math.random() * 100}px`;
    div.style.backgroundColor = 'red';
    div.style.top = `${Math.random() * 100}px`;
    div.style.left = `${Math.random() * 100}px`;



    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
let currentDrag;
let startX = 0;
let startY = 0;

document.addEventListener('mousemove', e => {
    if (currentDrag) {
        currentDrag.style.top = (e.clientY - startY) + 'px';
        currentDrag.style.left = (e.clientX - startX) + 'px';
    }
});
function addListeners(target) {

    target.addEventListener('ondragstart', () => false)
    target.addEventListener('mousedown', e => {
        currentDrag = target;
        startX = e.offsetX;
        startY = e.offsetY;

        document.body.appendChild(target);
    });
    target.addEventListener('mouseup', () => currentDrag = false );
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
