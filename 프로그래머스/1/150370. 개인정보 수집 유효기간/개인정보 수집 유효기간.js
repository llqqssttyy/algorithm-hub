// 모든 달은 1일~28일까지만 있음
// 파기해야 할 개인정보의 번호를 오름차순으로 1차원 정수 배열에 담아 return
// 1. terms를 돌면서 약관 종류에 따른 보관 기간을 map으로 생성
// 2. privacies를 돌면서 만료된 약관을 검사
//    - 일자로 검사해 계산.
// 3. 만료되었으면 index + 1을 결과 배열에 push
function solution(today, term, privacies) {
    const terms = new Map(term.map((term) => term.split(' ')));
    
    const isExpired = (collection, id) => {
        const term = Number(terms.get(id)) * 28;
        const [tYear, tMonth, tDay] = today.split('.').map((s) => Number(s));
        const [cYear, cMonth, cDay] = collection.split('.').map((s) => Number(s));
        const cDays = (cYear * 12 * 28) + ((cMonth - 1) * 28) + (cDay);
        const tDays = (tYear * 12 * 28) + ((tMonth - 1) * 28) + (tDay);
        
        return cDays + term <= tDays;
    }
    
    const expireds = [];
    privacies.map((privacy, idx) => {
        const [collection, id] = privacy.split(' ');
        if(isExpired(collection, id)) expireds.push(idx + 1);
    });
    return expireds.sort((a, b) => a - b);
}