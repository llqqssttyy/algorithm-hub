class MinHeap {
    constructor() {
        this.heap = [null];
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    push(value) {
        this.heap.push(value);
        let curIdx = this.heap.length - 1;
        let parentIdx = Math.floor(curIdx / 2);

        while (parentIdx !== 0 && this.heap[parentIdx].fare > this.heap[curIdx].fare) {
            this.swap(parentIdx, curIdx);
            curIdx = parentIdx;
            parentIdx = Math.floor(curIdx / 2);
        }
    }

    pop() {
        if (this.heap.length === 1) return null;
        if (this.heap.length === 2) return this.heap.pop();

        const returnValue = this.heap[1];
        this.heap[1] = this.heap.pop();

        let curIdx = 1;
        let leftIdx = 2;
        let rightIdx = 3;

        while (this.heap[leftIdx] || this.heap[rightIdx]) {
            const left = this.heap[leftIdx]?.fare ?? Infinity;
            const right = this.heap[rightIdx]?.fare ?? Infinity;
            const smallerIdx = left < right ? leftIdx : rightIdx;

            if (this.heap[curIdx].fare <= this.heap[smallerIdx].fare) break;

            this.swap(curIdx, smallerIdx);
            curIdx = smallerIdx;
            leftIdx = curIdx * 2;
            rightIdx = curIdx * 2 + 1;
        }

        return returnValue;
    }
}

function dijkstra(n, start, graph) {
    const fares = Array(n + 1).fill(Infinity);
    fares[start] = 0;

    const minHeap = new MinHeap();
    minHeap.push({ node: start, fare: 0 });

    while (minHeap.heap.length > 1) {
        const { node: curNode, fare: curFare } = minHeap.pop();

        if (fares[curNode] < curFare) continue;

        for (const [dest, fare] of graph[curNode]) {
            const nextFare = curFare + fare;
            if (nextFare < fares[dest]) {
                fares[dest] = nextFare;
                minHeap.push({ node: dest, fare: nextFare });
            }
        }
    }

    return fares;
}

function solution(n, s, a, b, fares) {
    // 1. 양방향 그래프 만들기
    const graph = Array.from({ length: n + 1 }, () => []);
    fares.forEach(([src, dest, fare]) => {
        graph[src].push([dest, fare]);
        graph[dest].push([src, fare]);
    });

    // 2. 각 출발점에서 다익스트라 실행
    const fromS = dijkstra(n, s, graph);
    const fromA = dijkstra(n, a, graph);
    const fromB = dijkstra(n, b, graph);

    let minFare = Infinity;
    for (let k = 1; k <= n; k++) {
        const fare = fromS[k] + fromA[k] + fromB[k];
        minFare = Math.min(minFare, fare);
    }

    return minFare;
}
