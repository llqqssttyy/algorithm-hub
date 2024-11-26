class Player {
    isDead = false;
    
    constructor(maxHealth, [t, x, y]) {
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.recovery = { interval: t, default: x, bonus: y };
    }

    recover(time) {
        const stat = this.recovery;
        const bonus = time >= stat.interval 
            ? Math.floor(time / stat.interval) * stat.bonus 
            : 0;
        const recovery = time * stat.default + bonus;
        
        this.health = Math.min(this.health + recovery, this.maxHealth);
    }

    damaged(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
    }
}

function solution(bandage, health, attacks) {
    const player = new Player(health, bandage);

    let lastAttackTiming = 0;
    for (const [timing, amount] of attacks) {
        const idle = timing - lastAttackTiming - 1;
        player.recover(idle);
        player.damaged(amount);

        if (player.isDead) return -1;
        lastAttackTiming = timing;
    }

    return player.health;
}
