// 정확하게 순위를 매길 수 있는 선수의 수를 return
// 플로이드 워샬로 모든 정점에서 모든 정점까지의 최단거리를 구해봤을 때
// 본인의 진 횟수(col[n]에서 Infinity가 아닌 숫자)와 이긴 횟수(row[n]에서 Infinity가 아닌 숫자)를 더했을 때 n-1과 같다면 등수 확정이라고 판단.

function solution(n, results) {
    const graph = initializeGraph(n, results);
    const shortestPaths = floydWarshall(graph, n);

    let answer = 0;
    for (let i = 1; i <= n; i++) {
        const [wins, losses] = countWinsAndLosses(shortestPaths, i, n);
        if (wins + losses === n - 1) answer++;
    }

    return answer;
}

function initializeGraph(n, edges) {
    const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));
    
    for (let i = 1; i <= n; i++) graph[i][i] = 0;
    
    edges.forEach(([from, to]) => {
        graph[from][to] = 1;
    });
    
    return graph;
}

function floydWarshall(graph, n) {
    const dist = graph.map(row => [...row]);

    for (let transit = 1; transit <= n; transit++) {
        for (let from = 1; from <= n; from++) {
            for (let to = 1; to <= n; to++) {
                const prevDist = dist[from][to];
                const newDist = dist[from][transit] + dist[transit][to];
                if (prevDist > newDist) {
                    dist[from][to] = newDist;
                }
            }
        }
    }

    return dist;
}

function countWinsAndLosses(graph, player, n) {
    let wins = 0; 
    let losses = 0;

    for (let opponent = 1; opponent <= n; opponent++) {
        if (graph[player][opponent] < Infinity) wins++;
        if (graph[opponent][player] < Infinity) losses++;
    }

    return [wins - 1, losses - 1];
}
