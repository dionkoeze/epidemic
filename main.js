const ctxPop = document.getElementById('population').getContext('2d');
const chartPop = new Chart(ctxPop, {
    type: 'line',
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
    options: {
        scales: {
            xAxes: [{
                display: true,
            }]
        }
    }
})

let population, stats;

function regenPopulation() {
    population = new Population(populationSize, randomMatcher);
    resetPopulation();
}

function resetPopulation() {
    population.epoch = 0;
    population.individuals.forEach(individual => {
        individual.infectedEpoch = undefined;
        individual.infectCount = 0;
    });
    population.individuals[0].infectedEpoch = 0;
    stats = population.computeStats();
}

function resetCharts() {
    resetStats();

    chartPop.data.labels = [0];
    chartPop.data.datasets = [{
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
    }];

    chartStat.data.labels = [0];
    chartStat.data.datasets = [{
        label: 'Reff',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,200,1)',
        data: [stats.Reff],
    }];

    chartPop.update({duration: 0});
    chartStat.update({duration: 0});
}

function resetStats() {
    $('#infectedPeak').text(0);
}

function updateStats(stats) {
    let peak = parseInt($('#infectedPeak').text())
    if (stats.infected > peak) {
        $('#infectedPeak').text(stats.infected);
    }

    $('#removedTotal').text(stats.removed);
    $('#uninfectedTotal').text(stats.susceptible);
}

function iteration() {
    population.nextEpoch();
    $('#epoch').text(population.epoch);
    const stats = population.computeStats();

    chartPop.data.labels.push(population.epoch);
    chartStat.data.labels.push(population.epoch);

    chartPop.data.datasets[0].data.push(stats.susceptible);
    chartPop.data.datasets[1].data.push(stats.infected);
    chartPop.data.datasets[2].data.push(stats.removed);
    chartPop.update({duration: 0});
    
    chartStat.data.datasets[0].data.push(stats.Reff);
    chartStat.update({duration: 0});

    updateStats(stats);

    if (stats.infected > 0) {
        setTimeout(iteration, 0);
    }
}

$('#size').val(populationSize);
$('#rate').val(infectionRate);
$('#duration').val(duration);
$('#connectivity').val(connectivity);

function readParams() {
    populationSize = parseInt($('#size').val());
    infectionRate = parseFloat($('#rate').val());
    duration = parseInt($('#duration').val());
    connectivity = parseInt($('#connectivity').val());
}

$('#regen').click(function() {
    readParams();
    regenPopulation();
    resetCharts();
    setTimeout(iteration, 0);
});

$('#start').click(function() {
    readParams();
    resetPopulation();
    resetCharts();
    setTimeout(iteration, 0);    
});

regenPopulation();
resetCharts();
setTimeout(iteration, 0);