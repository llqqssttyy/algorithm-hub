// 투포인터
// queue1과 queue2를 합친 배열에서,s는 0, e는 queue2의 시작을 가리킴.
// queue1의 합이 목표 합보다 크면 s++, 작으면 e++
// s와 e가 순회해야 하므로 전체 배열의 크기로 나눠줘야 함.

// 예외
// 가장 큰 원소가 나머지 원소의 합보다 크면 return -1
// 총 합이 홀수면 return -1

function solution(queue1, queue2) {
    const [q1Sum, q2Sum] = getSum(queue1, queue2);
    const totalSum = q1Sum + q2Sum;
    const maxNum = Math.max(getMaxNum(queue1), getMaxNum(queue2));

    if (maxNum > totalSum - maxNum) return -1;
    if (totalSum % 2 !== 0) return -1;
    
    const targetSum = totalSum / 2;
    const combined = [...queue1, ...queue2];
    let curQ1Sum = q1Sum;
    let s = 0;
    let e = queue1.length;
    let moves = 0;
    
    while(s < combined.length && e < combined.length) {
        if (curQ1Sum === targetSum) return moves;
        else if (curQ1Sum < targetSum) {
            curQ1Sum += combined[e % combined.length];
            e++;
        } else {
            curQ1Sum -= combined[s % combined.length];
            s++;
        }
        moves++;
    }
    
    return -1;
}

function getMaxNum(queue) {
    return [...queue].sort((a, b) => b - a)[0];
}

function getSum(queue1, queue2) {
    return [queue1.reduce((sum, q) => sum += q, 0), queue2.reduce((sum, q) => sum += q, 0)];
}
