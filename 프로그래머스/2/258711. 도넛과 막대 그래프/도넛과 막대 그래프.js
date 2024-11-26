// 도넛 모양 그래프: 다시 출발 정점으로 돌아오는 그래프. n개의 정점과 n개의 간선이 있음.
// 막대 모양 그래프: 한 정점에서 출발해서 모든 노드를 한 번씩 방문하게 되는 정점이 단 하나 존재. n개의 정점과 n-1개의 간선이 있음.
// 8자 모양 그래프: 크기가 동일한 2개의 도넛 모양 그래프를 결합시킨 형태. 2n+1개의 정점과 2n+2개의 간선이 있음.
// 정점 하나를 뺐을 때 모든 그래프가 도넛 or 막대 or 8자여야 한다.
// => 정점의 개수와 간선의 개수를 구하면 그래프의 종류를 알 수 있다.
// 1. 시작 정점을 구해야 하는데, 들어오는 게 없고 나가는 간선만 있다면 임의로 추가한 정점이다.
// 2. 임의의 정점과 연결된 간선의 개수가 그래프의 총 개수이다.
// 3. 임의의 정점을 삭제하고, 해당 정점과 연결되어 있던 노드에서부터 그래프를 만든다.
// 4. 그래프를 판단한다.
//    - 탐색 시작 지점에서 뻗어 나가는 간선이 없다면, 막대 그래프다.
//    - 탐색 시작 지점에서 시작해 모든 간선이 나가는 간선과 들어오는 간선이 각 1개일 경우 도넛이다.
//    - 탐색 시작 지점에서 시작해 들어오는 간선과 나가는 간선이 최대 4개인 그래프가 있을 경우 8자 모양이다.

function getGraphInfo(edges) {
    const graph = new Map();

    edges.forEach(([from, to]) => {
        if (!graph.has(from)) {
            graph.set(from, { from: [], to: [] });
        }
        if (!graph.has(to)) {
            graph.set(to, { from: [], to: [] });
        }

        graph.get(from).to.push(to);
        graph.get(to).from.push(from);
    });
    
    let tempNode;
    for (const [node, {from, to}] of graph.entries()) {
        if (from.length === 0 && to.length >= 2) {
            console.log(tempNode, node);
            tempNode = node;
            graph.delete(node);
            break;
        }
    }
    
    return [graph, tempNode];
}

function solution(edges) {
    let line = 0;
    let eight = 0;
    
    const [graph, tempNode] = getGraphInfo(edges);
    const totalGraphs = Array.from(graph).reduce((sum, [_, {from}]) => {
        if (from.includes(tempNode)) return sum + 1;
        return sum;
    }, 0);
    
    for (const [node, info] of graph.entries()) {
        const from = info.from.filter((v) => v !== tempNode);
        const to = info.to;
        
        if ((from.length === 1 || from.length === 0) && to.length === 0) line++;
        if (from.length === 2 && to.length === 2) eight++;
    }
    
    return [tempNode, totalGraphs - (line + eight), line, eight];
}