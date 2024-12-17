// 간선에 가중치가 있으므로 다익스트라로 탐색.
// 1번 마을부터 양방향으로 접근했을 때 가중치(weight)을 구하고, dist 배열의 값보다 작을 경우 heap에 push

class MinHeap {
    constructor() {
        this.heap = [null];
    }
    
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    push(value) {
        this.heap.push(value);
        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);

        while (parentIndex !== 0 && this.heap[parentIndex].weight > value.weight) {
            this.swap(parentIndex, currentIndex);

            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        }
    }

    pop() {
        if (this.isEmpty()) return;
        if (this.heap.length === 2) return this.heap.pop(); // root만 있는 경우
        
        const returnValue = this.heap[1];
        this.heap[1] = this.heap.pop();

        let currentIndex  = 1;
        let leftIndex = 2;
        let rightIndex = 3;
        
        while (this.heap[leftIndex] || this.heap[rightIndex]) {
            const left = this.heap[leftIndex] ? this.heap[leftIndex].weight : Infinity;
            const right = this.heap[rightIndex] ? this.heap[rightIndex].weight : Infinity;

            const smallerIndex = left <= right ? leftIndex : rightIndex;

            if (this.heap[smallerIndex].weight >= this.heap[currentIndex].weight) break;

            this.swap(currentIndex, smallerIndex);
            currentIndex = smallerIndex;
            leftIndex = currentIndex * 2;
            rightIndex = currentIndex * 2 + 1;
        }

        return returnValue;
    }
    
    isEmpty() {
        return this.heap.length === 1;
    }
}

function solution(N, road, K) {
    const minHeap = new MinHeap();
    minHeap.push({ node: 1, weight: 0 });
    
    const dist = Array.from({ length: N + 1 }).fill(Infinity);
    dist[1] = 0;
    
    while(!minHeap.isEmpty()) {
        const { node: curNode, weight: curWeight } = minHeap.pop();
        
        for (const [start, dest, weight] of road) {
            const nextWeight = curWeight + weight;
            
            if (start === curNode && dist[dest] > nextWeight) {
                dist[dest] = nextWeight;
                minHeap.push({ node: dest, weight: nextWeight }); // 갈 수 있는 모든 노드 중 최소값을 찾을 수 있도록 push
            }
            else if (dest === curNode && dist[start] > nextWeight) {
                dist[start] = nextWeight;
                minHeap.push({ node: start, weight: nextWeight });
            }
        }
    }
    
    return dist.filter((d) => d <= K).length;
}