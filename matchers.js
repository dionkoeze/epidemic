function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function areFriends(a, b) {
    return a.friends.indexOf(b) !== -1 || b.friends.indexOf(a) !== -1;
}

function makeFriends(a, b) {
    a.friends.push(b);
    b.friends.push(a);
}

function randomMatcher(population) {
    const count = connectivity * population.length / 2;

    for (let idx = 0; idx < count; idx++) {
        let a, b;
        do {
            a = randomInt(0, population.length);
            b = randomInt(0, population.length);
        } while (a === b || areFriends(population[a], population[b]));

        makeFriends(population[a], population[b]);
    }
}

function grid1DMatcher(population) {
    for (let i = 0; i < population.length-1; i++) {
        makeFriends(population[i], population[i+1]);
    }
}

function grid2DMatcher(population) {
    let size = Math.round(Math.sqrt(population.length));

    for (let i = 0; i < population.length; i++) {
        if (i + 1 < population.length) {
            makeFriends(population[i], population[i + 1]);
        }
        if (i + size < population.length) {
            makeFriends(population[i], population[i + size]);
        }
    }
}

function grid3DMatcher(population) {
    let size = Math.round(Math.pow(population.length, 1/3));

    for (let i = 0; i < population.length; i++) {
        if (i + 1 < population.length) {
            makeFriends(population[i], population[i + 1]);
        }
        if (i + size < population.length) {
            makeFriends(population[i], population[i + size]);
        }
        if (i + size * size < population.length) {
            makeFriends(population[i], population[i + size * size]);
        }
    }
}

function smallWorldMatcher(population) {
    
}