// attacks는 [공격 시간, 피해량]
function solution(bandage, health, attacks) {
    const [t, x, y] = bandage; // 시연 시간, 초당 회복량, 보너스 회복량;
    const MAX_HEALTH = health;
    
    let curHealth = MAX_HEALTH;
    let lastAttackTiming = 0;
    
    for(const [timing, damage] of attacks) {
        term = timing - lastAttackTiming - 1;
        
        const bonus = term >= t ? (Math.floor(term / t) * y) : 0;
        const cureAmount = term * x + bonus;
        const health = Math.min(cureAmount + curHealth, MAX_HEALTH) - damage;
        
        if (health <= 0) return -1;
        curHealth = health;
        lastAttackTiming = timing;
    }
    return curHealth;
}