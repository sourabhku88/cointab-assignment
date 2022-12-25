var input = '1234surya-name4321&42-age1234&male-gender4321'
// output = { name: 'surya', age: '42', gender: 'male' } 

function abc(str) {

    str = str.split('1234').join('').split('4321').join('').split('&');

    let map = {}

    for (let value of str) {
        map[value.split('-')[1]] = value.split('-')[0];
    }
    return map
}

// console.log(abc(input)); // n^2  Done 