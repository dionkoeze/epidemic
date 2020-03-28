class Individual {
    constructor() {
        this.infectedEpoch = undefined;
        this.infectCount = 0;
        this.friends = [];
    }

    degree() {
        return this.friends.length;
    }

    infected() {
        return this.infectedEpoch !== undefined;
    }

    infectious(epoch) {
        return this.infectedEpoch !== epoch 
            && this.infectedEpoch >= epoch - duration;
    }

    spread(epoch) {
        if (this.infectious(epoch)) {
            this.friends.forEach((friend) => {
                if (infectionRate > Math.random()
                    && !friend.infected()) {
                    friend.infectedEpoch = epoch;
                    this.infectCount += 1;
                }
            });
        }
    }
}

class Population {
    constructor(count, matcher) {
        this.epoch = 0;
        this.individuals = [...Array(count).keys()].map(() => new Individual());
        matcher(this.individuals);
    }

    nextEpoch() {
        this.epoch += 1;
        this.individuals.forEach(individual => {
            individual.spread(this.epoch);
        });
    }

    computeMaxDegree() {
        return this.individuals.reduce((max, ind) => ind.degree() > max ? ind.degree() : max, 0);
    }

    computeDegrees() {
        const max = this.computeMaxDegree();
        const degrees = [...Array(max+1).keys()].map(() => 0);
        console.log(degrees)
        this.individuals.forEach(individual => {
            degrees[individual.degree()] += 1;
        });
        console.log(degrees)
        return degrees;
    }

    computeStats() {
        let susceptible = 0;
        let infected = 0;
        let removed = 0;
        let Reff = 0;

        this.individuals.forEach(individual => {
            if (individual.infectious(this.epoch)) {
                Reff += individual.infectCount;
                infected += 1;
            } else if (individual.infected()) {
                removed += 1;
            } else {
                susceptible += 1;
            }
        });

        
        Reff /= infected;

        return {
            susceptible,
            infected,
            removed,
            Reff,
        };
    }
}