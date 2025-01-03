// 모든 사람이 심사를 받는 데 걸리는 시간의 최솟값
// 대기자와 심사관의 최대값이 매우 크므로 logN의 시간복잡도를 갖는 알고리즘 필요. -> 이분탐색
// 1부터 MAX 시간까지 중에서 N분일 때 모든 사람이 심사를 받을 수 있는지 확인.
// 받을 수 있다면 right를 mid로,
// 받을 수 없다면 left를 mid로.
// left와 mid가 같아지는 때를 구하면 됨?
function solution(n, times) {
    const longest = Math.max(...times);
    
    let left = 1;
    let right = n * longest;
    
    while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        const total = times.reduce((sum, time) => sum + Math.floor(mid / time), 0);
        
        if (total >= n) right = mid - 1;
        else left = mid + 1;
    }
    
    return left
}
