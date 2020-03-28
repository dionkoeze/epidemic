function asPercentage(number) {
    return Math.round(number/populationSize*10000)/100;
}

function rounded(number) {
    return Math.round(number * 100)/100;
}

function average(hist) {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < hist.length; i++) {
        sum += i * hist[i];
        count += hist[i];
    }

    if (count > 0) {
        return sum / count;
    } else {
        return 0;
    }
}

function median(hist) {
    let count = 0;
    
    for (let i = 0; i < hist.length; i++) {
        count += hist[i];
    }

    count /= 2;

    let cat = 0;
    while (count > 0) {
        count -= hist[cat];
        cat++;
    }

    return cat
}

function mode(hist) {
    let cat = 0;
    let max = 0;

    for (let i = 0; i < hist.length; i++) {
        if (hist[i] > max) {
            max = hist[i];
            cat = i;
        }
    }

    return cat;
}