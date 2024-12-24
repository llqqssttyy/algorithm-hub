function solution(numbers, hand) {
    const answer = [];
    
    let leftPos = [0, 3];
    let rightPos = [2, 3];
    
    const getPosition = (number) => {
        if (number === 0) return [1, 3];
        return [(number - 1) % 3, Math.floor((number - 1) / 3)];
    };

    const getDistance = (pos1, pos2) => 
        Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);

    const updatePosition = (hand, pos) => {
        if (hand === 'L') leftPos = pos;
        else rightPos = pos;
        answer.push(hand);
    };

    numbers.forEach((number) => {
        const [x, y] = getPosition(number);

        if (x === 0) return updatePosition('L', [x, y]);
        if (x === 2) return updatePosition('R', [x, y]);

        const leftDist = getDistance(leftPos, [x, y]);
        const rightDist = getDistance(rightPos, [x, y]);

        if (leftDist === rightDist) {
            return updatePosition(hand === "right" ? 'R' : 'L', [x, y]);
        }

        updatePosition(leftDist > rightDist ? 'R' : 'L', [x, y]);
    });

    return answer.join('');
}
