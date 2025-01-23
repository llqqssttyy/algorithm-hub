function solution(players, callings) {
    const playerIndex = new Map();
    players.forEach((player, index) => {
        playerIndex.set(player, index);
    });

    for (const call of callings) {
        const callerIdx = playerIndex.get(call);
        const prevIdx = callerIdx - 1;
        const prevPlayer = players[prevIdx];

        players[prevIdx] = call;
        players[callerIdx] = prevPlayer;

        playerIndex.set(call, prevIdx);
        playerIndex.set(prevPlayer, callerIdx);
    }

    return players;
}
