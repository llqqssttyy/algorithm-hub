// 2 ~ 9진법까지 가능.
// 1. 표현식이 n진법인지 확인
//  - 표현식을 돌면서 10진법의 계산 결과와 2 ~ 9진법으로 변환한 결과가 표현식의 결과값과 같은지 확인.
//  - 같다면 n진법을 후보군에 넣음.
//  - 만약 여러 개라면 결과값을 ?로 출력.
// 2. 진법이 특정되지 않으면 ?로 출력

// 특정 진법의 결과값 반환
function getNumbers(expression, base) {
    const [left, operator, right, _] = expression
        .replace(' = ', ' ')
        .split(' ');
    const l = parseInt(left, base); // 10진수로 변환
    const r = parseInt(right, base); // 10진수로 변환
    const calcResult = operator === "+" ? l + r : l - r; // 10진수 결과

    return calcResult.toString(base) // base 진수로 변환
}

function getFormations(expressions) {
    const minForm = expressions.reduce((acc, e) => {
        const numbers = e.match(/\d/g).map(Number);
        const maxForm = Math.max(...numbers) + 1;
        return maxForm > acc ? maxForm : acc;
    }, 1);

    const formations = [];
    for (let f = minForm; f <= 9; f++) {
        formations.push(f);
    }
    return formations;
}

// hints를 돌면서 가능하지 않은 formations를 제거
function checkFormations(hints, formations) {
    const avForm = new Set(formations);
    
    [...hints].forEach((hint) => {
        const [_, r] = hint.split(' = ');
        
        for (const form of formations) {
            const result = getNumbers(hint, form);
            if (r !== result) {
                avForm.delete(form);
            }
        }
    })
    
    return [...avForm];
}

function solution(expressions) {
    const hints = expressions.filter((e) => {
        const [_, result] = e.split(' = ');
        return result !== 'X';
    })
    
    const problems = expressions.filter((e) => {
        const [_, result] = e.split(' = ');
        return result === 'X';
    })
    
    const formations = getFormations(expressions);
    const availableForms = checkFormations(hints, formations);

    const result = problems.map((e) => {
        const [decimals, result] = e.split(" = ");
        
        const values = new Set();
        for (const form of availableForms) {
            const value = getNumbers(e, form);
            values.add(value);
        }
        
        if (values.size > 1) return `${decimals} = ?`;
        return `${decimals} = ${[...values][0]}`
    })
    
    return result;
}

