/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', () => {
            const towns = xhr.response;

            if (xhr.status >= 400) {
                reject();
            } else {
                resolve(towns.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    
                    return 0;
                }));
            }
            
        });
        xhr.addEventListener('error', reject);
        xhr.addEventListener('abort', reject);

    });
}
let arrTowns = [],
    buttonRepeat = document.createElement('button');

buttonRepeat.textContent = 'Повторить';
window.addEventListener('load', () => {
    let count = 0;

    loadTowns()
        .then((towns) => {
            loadingBlock.textContent = '';
            filterBlock.removeAttribute('style');
            for (let i of towns) {
                arrTowns[count] = i.name;
                count++;
            }
        })
        .catch(() => {
            loadingBlock.textContent = 'Не удалось загрузить города....';
            homeworkContainer.appendChild(buttonRepeat);      
        });
});
buttonRepeat.addEventListener('click', () => {
    let count = 0;

    loadTowns()
        .then((towns) => {
            homeworkContainer.removeChild(buttonRepeat); 
            loadingBlock.textContent = '';
            filterBlock.removeAttribute('style');
            for (let i of towns) {
                arrTowns[count] = i.name;
                count++;
            }
        })
        .catch(() => '');
});

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toUpperCase().includes(chunk.toUpperCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result').appendChild(document.createElement('UL'));

// filterResult.appendChild(document.createElement('UL'));

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    while (filterResult.firstChild ) {
        filterResult.removeChild(filterResult.firstChild);
    }
    for (let towns of arrTowns) {
        if (isMatching(towns, filterInput.value) && filterInput.value !== '') {
            filterResult.appendChild(document.createElement('li')).textContent = towns;
        }
    }

});

export {
    loadTowns,
    isMatching
};
