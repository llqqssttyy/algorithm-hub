const DIRECTIONS = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1]
};

function solution(park, routes) {
    const parkMap = park.map((p) => p.split(""));
    const start = [];
    parkMap.forEach((p, y) => {
        const x = p.findIndex((v) => v === 'S');
        if (x >= 0) { 
            start.push(y);
            start.push(x);
        }
    });
    
    const destination = routes.reduce(([curY, curX], route) => {
        const [dir, dist] = route.split(" ");
        const [dirY, dirX] = DIRECTIONS[dir];
        
        const isMovable = Array.from({ length: Number(dist) }).every((_, idx) => {
            const curDist = idx + 1;
            const [destY, destX] = [curY + dirY * curDist, curX + dirX * curDist];
            
            if (!parkMap[destY] || !parkMap[destY][destX]) {
                return false;
            }
            if (parkMap[destY][destX] === 'X') {
                return false;
            }
            return true;
        });

        if (isMovable) return [curY + dirY * dist, curX + dirX * dist];
        return [curY, curX];
    }, start);
    
    return destination;
}
