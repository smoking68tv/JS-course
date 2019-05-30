/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {

    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let Arr = [];

    for (let i = 0; i < array.length; i++) {
        Arr[i] = fn(array[i], i, array);
    }

    return Arr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let length = array.length, 
        prevValue = initial;

    for (let i = 0; i < length; i++) {
        if (initial == undefined && i == 0) {
            prevValue = array[0];
            i++;
        }
            
        prevValue = fn(prevValue, array[i], i, array);
    }

    return prevValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let Arr = [], 
        count = 0;
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            Arr[count] = key.toUpperCase();
            count++;
        }
    }

    return Arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let Arr = [],
        index = 0;

    if (from > array.length) { // Если begin больше длины последовательности вернется пустой массив.
        return Arr = [];
    }
    if (from == undefined) { // Если begin неопределен, slice() начинает работать с индекса 0.
        for (let i = 0; i < array.length; i++) {
            Arr[index] = array[i];
            ++index;
        }
    }
    if (from < 0) { // Если индекс отрицательный, begin указывает смещение от конца последовательности
        for (let i = array.length; i >= from; i--) {
            Arr[index] = array[i];
            ++index
        }
    } else {
        for (let i = from; i < array.length; i++) {
            Arr[index] = array[i];
            ++index;
        }
    }

    // for(let i = 0; i < )
    return Arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
