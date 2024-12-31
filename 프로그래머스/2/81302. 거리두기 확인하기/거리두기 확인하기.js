// 5x5 크기의 대기실이 5개

// [탐색 방법]
// 본질은 "길찾기"
// P의 좌표들을 찾는다.
// P들을 순회하면서 P에서 맨해튼 거리 2 이내의 다른 P까지의 경로를 찾는다.
// - X로 가로막혀 있으면 탐색을 중단.
// - P가 있으면 규칙 위반.
function solution(places) {
    const answer = Array(5).fill(1);

    for (let p = 0; p < 5; p++) {
        const place = places[p];
        
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (place[i][j] === "P" && hasViolations([i, j], place)) {
                    answer[p] = 0;
                    break;
                }
            }
            if (answer[p] === 0) break;
        }
    }
    
    return answer;
}

function hasViolations([startX, startY], place) {
    const visited = Array.from({ length: 5 }, () => Array(5).fill(false));
    const queue = [[startX, startY]];
    visited[startX][startY] = true;
    
    const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

    while (queue.length) {
        const [currentX, currentY] = queue.shift();
        
        for (const [dx, dy] of directions) {
            const nextX = currentX + dx;
            const nextY = currentY + dy;

            if (!isInBounds(nextX, nextY) || visited[nextX][nextY]) continue;
            visited[nextX][nextY] = true;

            const distance = calculateDistance([startX, startY], [nextX, nextY]);
            if (distance > 2) continue;

            if (place[nextX][nextY] === "P") {
                return true; // 거리 내 다른 사람이 있으면 규칙 위반
            }

            if (place[nextX][nextY] !== "X") {
                queue.push([nextX, nextY]); // 파티션(X)이 아니면 탐색 계속
            }
        }
    }
    
    return false; // 규칙 위반 없음
}

function isInBounds(x, y) {
    return x >= 0 && y >= 0 && x < 5 && y < 5;
}

function calculateDistance([x1, y1], [x2, y2]) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
