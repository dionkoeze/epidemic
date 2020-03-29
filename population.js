class Individual {
    constructor(id) {
        this.id = id;
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

    removedToday(epoch) {
        return this.infectedEpoch === epoch - duration;
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
        this.individuals = [...Array(count).keys()].map((id) => new Individual(id));
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
        const all = [...Array(max+1).keys()].map(() => 0);
        const susceptible = [...Array(max+1).keys()].map(() => 0);
        const infected = [...Array(max+1).keys()].map(() => 0);
        const removed = [...Array(max+1).keys()].map(() => 0);
        this.individuals.forEach(individual => {
            all[individual.degree()] += 1;

            if (individual.infectious(this.epoch)) {
                infected[individual.degree()] += 1;
            } else if (individual.infected()) {
                removed[individual.degree()] += 1;
            } else {
                susceptible[individual.degree()] += 1;
            }
        });
        return {
            all,
            susceptible,
            infected,
            removed,
            max,
        };
    }

    computeStats() {
        let susceptible = 0;
        let infected = 0;
        let removed = 0;
        let Reff = 0;
        let ReffCount = 0;

        this.individuals.forEach(individual => {
            if (individual.infectious(this.epoch)) {
                infected += 1;
                cy.$(`[id="${individual.id}"]`).classes('infected');
            } else if (individual.infected()) {
                removed += 1;
                cy.$(`[id="${individual.id}"]`).classes('removed');
            } else {
                susceptible += 1;
            }

            if (individual.removedToday(this.epoch)) {
                Reff += individual.infectCount;
                ReffCount += 1;
            }
        });

        
        Reff /= ReffCount;

        return {
            susceptible,
            infected,
            removed,
            Reff,
        };
    }
}