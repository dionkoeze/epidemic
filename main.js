const population = new Population(10000, randomMatcher);
population.individuals[0].infectedEpoch = 0;
const stats = population.computeStats();

const ctxPop = document.getElementById('population').getContext('2d');
const chartPop = new Chart(ctxPop, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: 'susceptible',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,200,0,1)',
            data: [stats.susceptible],
        }, {
            label: 'infected',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(200,0,0,1)',
            data: [stats.infected],
        }, {
            label: 'removed',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(150,150,150,1)',
            data: [stats.removed],
        }],
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
            }]
        }
    }
})

const ctxStat = document.getElementById('stats').getContext('2d');
const chartStat = new Chart(ctxStat, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: 'Ravg',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,200,1)',
            data: [stats.Ravg],
        }],
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
            }]
        }
    }
})

const int = setInterval(() => {
    population.nextEpoch();
    $('#epoch').text(population.epoch);
    const stats = population.computeStats();

    chartPop.data.labels.push(population.epoch);
    chartStat.data.labels.push(population.epoch);

    chartPop.data.datasets[0].data.push(stats.susceptible);
    chartPop.data.datasets[1].data.push(stats.infected);
    chartPop.data.datasets[2].data.push(stats.removed);
    chartPop.update();
    
    chartStat.data.datasets[0].data.push(stats.Ravg);
    chartStat.update();

    if (stats.infected === 0) {
        clearInterval(int);
    }
}, 500);
