
// 1. 숫자와 영어 단어를 판별해야 함.
// 2. 영어 단어가 numberWords 중 포함이 되어있다면 해당 인덱스가 answer 배열에 들어가면 됨.

function solution(s) {
    const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const answer = [];
    
    for (let i = 0; i < s.length; i++) {
        const w = s[i];
        
        if (!isNaN(w)) {
            answer.push(Number(w));
            continue;
        }
        
        const hint = s.slice(i, i + 3);
        const idx = numberWords.findIndex((numberWord) => numberWord.includes(hint));
        answer.push(idx);
        i = i + numberWords[idx].length - 1;
    }
    
    return Number(answer.join(''));
}