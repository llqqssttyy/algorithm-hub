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