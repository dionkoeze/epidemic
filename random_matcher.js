function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

function randomMatcher(population) {
    const count = connectivity * population.length / 2;

    for (let idx = 0; idx < count; idx++) {
        let a, b;
        do {
            a = randomInt(0, population.length);
            b = randomInt(0, population.length);
        } while (a === b 
            || population[a].friends.indexOf(population[b]) !== -1
            || population[b].friends.indexOf(population[a]) !== -1);

        population[a].friends.push(population[b]);
        population[b].friends.push(population[a]);
    }
}
