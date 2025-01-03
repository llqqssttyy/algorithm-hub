function solution(friends, gifts) {
    const giftBook = new Map();

    friends.forEach(friend => {
        giftBook.set(friend, { give: [], receive: [] });
    });

    gifts.forEach(gift => {
        const [giver, receiver] = gift.split(" ");
        giftBook.get(giver).give.push(receiver);
        giftBook.get(receiver).receive.push(giver);
    });

    const nextMonth = new Map();
    friends.forEach(friend => nextMonth.set(friend, 0));
    
    const visited = new Set();

    friends.forEach(me => {
        friends.forEach(friend => {
            if (me === friend) return;

            const pairKey = [me, friend].sort().join('-');
            if (visited.has(pairKey)) return;
            visited.add(pairKey);

            const meGiveToFriend = giftBook.get(me).give.filter(name => name === friend).length;
            const friendGiveToMe = giftBook.get(friend).give.filter(name => name === me).length;

            if (meGiveToFriend > friendGiveToMe) {
                // 내가 더 많이 준 경우, 내가 다음 달 선물을 받음
                nextMonth.set(me, nextMonth.get(me) + 1);
            } else if (meGiveToFriend < friendGiveToMe) {
                // 친구가 더 많이 준 경우, 친구가 다음 달 선물을 받음
                nextMonth.set(friend, nextMonth.get(friend) + 1);
            } else {
                // 선물 지수 계산
                const myScore = calculateGiftScore(me, giftBook);
                const friendScore = calculateGiftScore(friend, giftBook);

                if (myScore > friendScore) {
                    nextMonth.set(me, nextMonth.get(me) + 1);
                } else if (myScore < friendScore) {
                    nextMonth.set(friend, nextMonth.get(friend) + 1);
                }
                // 동점이면 아무도 받지 않음
            }
        });
    });

    return Math.max(...nextMonth.values());
}

function calculateGiftScore(person, giftBook) {
    const giveCnt = giftBook.get(person).give.length;
    const receiveCnt = giftBook.get(person).receive.length;
    return giveCnt - receiveCnt;
}
