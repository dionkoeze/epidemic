let cy = cytoscape({
    container: document.getElementById('graph'),
    style: [{
        selector: 'node',
        style: {
            // 'background-color': 'rgb(0,200,0)',
            'label': 'data(id)',
            'width': 100,
            'height': 100,
        },
    }, {
        selector: 'edge',
        style: {
            'width': 4,
            'line-color': '#ccc',
        },
    }, {
        selector: '.susceptible',
        style: {
            'background-color': 'rgb(0, 200, 0)',
        },
    }, {
        selector: '.infected',
        style: {
            'background-color': 'rgb(200, 0, 0)',
        },
    }, {
        selector: '.removed',
        style: {
            'background-color': 'rgb(0, 150, 150)',
        },
    }],
    layout: {
        name: 'grid',
    },
    elements: [{
        data: {id: 'a'},
    }, {
        data: {id: 'b'},
    }, {
        data: {id: 'ab', source: 'a', target: 'b'},
    }],
});

function constructCyElems(population) {
    let elems = [];

    for (let individual of population.slice(0, shownNodes)) {
        elems.push({
            data: {id: `${individual.id}`},
        });
        
    }

    for (let individual of population.slice(0, shownNodes)) {
        for(let friend of individual.friends) {
            if (individual.id < friend.id && friend.id < shownNodes) {
                elems.push({
                    data: {
                        id: `${individual.id}-${friend.id}`,
                        source: `${individual.id}`,
                        target: `${friend.id}`,
                    },
                });
            }
        }
    }

    return elems;
}
