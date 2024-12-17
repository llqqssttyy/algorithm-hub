function solution(survey, choices) {
    const characteristics = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };

    survey.forEach((char, idx) => {
        const [a, b] = char.split("");
        const choice = choices[idx];
        const score = Math.abs(choice - 4);

        const target = choice > 4 ? b : a;
        characteristics[target] += score;
    });

    return ["RT", "CF", "JM", "AN"]
        .map(([a, b]) => (characteristics[a] >= characteristics[b] ? a : b))
        .join("");
}
