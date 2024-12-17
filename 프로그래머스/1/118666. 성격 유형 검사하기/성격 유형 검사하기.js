function solution(survey, choices) {
    const SCORES = [undefined, 3, 2, 1, 0, 1, 2, 3];
    const SLOTS = {
        R: 0,
        T: 0,
        C: 1,
        F: 1,
        J: 2,
        M: 2,
        A: 3,
        N: 3,
    }
    const characteristics = [
        { R: 0, T: 0 },
        { C: 0, F: 0 },
        { J: 0, M: 0 },
        { A: 0, N: 0 },
    ];
    
    survey.map((char, idx) => {
        const [a, b] = char.split("");
        const choice = choices[idx];
        const character = choice >= 4 ? b : a;
        const score = Math.abs(4 - choice);
        const slot = SLOTS[character];
        
        const prevScore = characteristics[slot][character];
        characteristics[slot][character] = prevScore + score;
    })
    
    return characteristics.map((slot) => {
        const [a, b] = Object.keys(slot);
        const scoreA = slot[a];
        const scoreB = slot[b];
        
        if (scoreA === scoreB) return Object.keys(slot).sort()[0];
        return scoreA > scoreB ? a : b
    }).join("");
}