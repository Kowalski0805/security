const fs = require('fs');
const nGram = require('n-gram');

// const quads = fs.readFileSync('quad.txt', 'utf-8').split('\n').map(e => e.split(',')).reduce((a, [q, p]) => (a[q] = parseFloat(p), a), {});
const tris = fs.readFileSync('tri.txt', 'utf-8').split('\n').map(e => e.split(',')).reduce((a, [q, p]) => (a[q] = parseFloat(p), a), {});
const bis = fs.readFileSync('bi.txt', 'utf-8').split('\n').map(e => e.split(',')).reduce((a, [q, p]) => (a[q] = parseFloat(p), a), {});
const unis = fs.readFileSync('uni.txt', 'utf-8').split('\n').map(e => e.split(',')).reduce((a, [q, p]) => (a[q] = parseFloat(p), a), {});

const str = 'EFFPQLEKVTVPCPYFLMVHQLUEWCNVWFYGHYTCETHQEKLPVMSAKSPVPAPVYWMVHQLUSPQLYWLASLFVWPQLMVHQLUPLRPSQLULQESPBLWPCSVRVWFLHLWFLWPUEWFYOTCMQYSLWOYWYETHQEKLPVMSAKSPVPAPVYWHEPPLUWSGYULEMQTLPPLUGUYOLWDTVSQETHQEKLPVPVSMTLEUPQEPCYAMEWWYTYWDLUULTCYWPQLSEOLSVOHTLUYAPVWLYGDALSSVWDPQLNLCKCLRQEASPVILSLEUMQBQVMQCYAHUYKEKTCASLFPYFLMVHQLUPQLHULIVYASHEUEDUEHQBVTTPQLVWFLRYGMYVWMVFLWMLSPVTTBYUNESESADDLSPVYWCYAMEWPUCPYFVIVFLPQLOLSSEDLVWHEUPSKCPQLWAOKLUYGMQEUEMPLUSVWENLCEWFEHHTCGULXALWMCEWETCSVSPYLEMQYGPQLOMEWCYAGVWFEBECPYASLQVDQLUYUFLUGULXALWMCSPEPVSPVMSBVPQPQVSPCHLYGMVHQLUPQLWLRPOEDVMETBYUFBVTTPENLPYPQLWLRPTEKLWZYCKVPTCSTESQPQULLGYAUMEHVPETFWMEHVPETBZMEHVPETB';
const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const freq = {
    A: 0.08167,
    B: 0.01492,
    C: 0.02782,
    D: 0.04253,
    E: 0.12702,
    F: 0.02228,
    G: 0.02015,
    H: 0.06094,
    I: 0.06966,
    J: 0.00153,
    K: 0.00772,
    L: 0.04025,
    M: 0.02406,
    N: 0.06749,
    O: 0.07507,
    P: 0.01929,
    Q: 0.00095,
    R: 0.05987,
    S: 0.06327,
    T: 0.09056,
    U: 0.02758,
    V: 0.00978,
    W: 0.02360,
    X: 0.00150,
    Y: 0.01974,
    Z: 0.00074
};

// rand - get random int from min to max
const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

// transform - map characters from str through dict {source: dest}
const transform = (str, dict) => str.split('').map(e => dict[e]).join('');

// getLetterCount - count how many times does each letter occur
const getLetterCounts = str => {
    const plaintext = str.toUpperCase().replace(/[^A-Z]/g, ""); 
    const counts = [...abc].map(letter => ({letter, count: 0}));
    
    plaintext.split('').forEach(letter => {
        counts.find(c => c.letter == letter).count++;
    });
    
    return counts;
};

// getKeyHole - returns string with characters sorted by descending frequency
const getKeyHole = (str) => {
    const counts = getLetterCounts(str);

    return counts.sort((a, b) => b.count - a.count).map(e => e.letter).join('');
};

// decode - decodes string by key
const decode = (str, key) => {
    const keyHole = getKeyHole(str);

    const dict = [...keyHole].reduce((acc, hole, i) => (acc[hole] = key[i], acc), {});

    return transform(str, dict);
};

// const fitness = (phenotype) => nGram(4)(decode(str, phenotype)).map(gram => quads[gram]).reduce((a, v) => a + (Math.log(v) || 0), 0);
const fitness = (phenotype) => (
    0.3 * nGram(1)(decode(str, phenotype)).map(gram => unis[gram]).reduce((a, v) => a + (Math.log(v) || 0), 0)
    + 0.3 * nGram(2)(decode(str, phenotype)).map(gram => bis[gram]).reduce((a, v) => a + (Math.log(v) || 0), 0)
    + 0.3 * nGram(3)(decode(str, phenotype)).map(gram => tris[gram]).reduce((a, v) => a + (Math.log(v) || 0), 0)
);

const mutation = (old) => {
    const [i, j] = [rand(0, 26), rand(0, 26)];
    const result = [...old];
    
    if (i !== j) {
        const tmpChar = result[i];
        result[i] = result[j];
        result[j] = tmpChar; 
    }
    
    return result.join('');
};

const crossover = (oldX, oldY) => {
    const first = [];
    let letters = [...abc];
    [...oldX].forEach((_,i) => {
        const parents = [oldX[i], oldY[i]];
        letters = letters.sort((a, b) => (((parents.includes(b) ? 1 : Math.random()/2) + freq[b]) - ((parents.includes(a) ? 1 : Math.random()/2) + freq[a])));
        first.push(letters.shift());
    });

    const second = [];
    letters = [...abc];
    [...oldY].forEach((_,i) => {
        const parents = [oldX[oldX.length-i], oldY[oldX.length-i]];
        letters = letters.sort((a, b) => (((parents.includes(b) ? -1 : Math.random()/2) + freq[b]) - ((parents.includes(a) ? -1 : Math.random()/2) + freq[a])));
        second.unshift(letters.pop());
    });

    return [first.join(''), second.join('')];
};

const start = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const reverse = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
const right = 'ETAIHNOSRCLYPUDBFWGMXKVQJZ'; // -3149.387587088393

const config = {
    mutationFunction: mutation,
    crossoverFunction: crossover,
    fitnessFunction: fitness,
    population: [ start, reverse ],
    populationSize: 4 	// defaults to 100
}

// console.log(decode(str, right));
// console.log(fitness(reverse));
// console.log(getLetterCounts(str));
// console.log(getKeyHole(str));
// return;

// const GeneticAlgorithmConstructor = require('geneticalgorithm')
// const geneticalgorithm = GeneticAlgorithmConstructor( config )

// console.log(Array(10000).fill(null).map((e, i) => i).reduce((a, v) => (console.log(v), a.evolve()), geneticalgorithm).scoredPopulation())

const geneticalgorithm = require('./genetic_algo')({
    mutationFn: mutation,
    crossoverFn: crossover,
    fitnessFn: fitness,
    populationArr: [ start, reverse ],
    populationSizeNum: 100 	// defaults to 100
});

const four = () => {
    let max = {f: geneticalgorithm.maxFitness, i: 0};
    // for (let i = 0; i < 1000; i++) {
    //     console.log(i);
    //     geneticalgorithm.iterate();
    // }
    let i = 0;
    while (max.i + 100 > i && i < 10000) {
        geneticalgorithm.iterate();
        if (geneticalgorithm.maxFitness > max.f) {
            console.log(i);
            max.f = geneticalgorithm.maxFitness;
            max.i = i;
        }
    
        i++;
    }
    console.log(i);
    const bests = geneticalgorithm.getBest();
    bests.forEach(e => console.log(e, decode(str, e.chromosome)));
};

//------------------------------------------------------------------------------------
const strMulti = 'KZBWPFHRAFHMFSNYSMNOZYBYLLLYJFBGZYYYZYEKCJVSACAEFLMAJZQAZYHIJFUNHLCGCINWFIHHHTLNVZLSHSVOZDPYSMNYJXHMNODNHPATXFWGHZPGHCVRWYSNFUSPPETRJSIIZSAAOYLNEENGHYAMAZBYSMNSJRNGZGSEZLNGHTSTJMNSJRESFRPGQPSYFGSWZMBGQFBCCEZTTPOYNIVUJRVSZSCYSEYJWYHUJRVSZSCRNECPFHHZJBUHDHSNNZQKADMGFBPGBZUNVFIGNWLGCWSATVSSWWPGZHNETEBEJFBCZDPYJWOSFDVWOTANCZIHCYIMJSIGFQLYNZZSETSYSEUMHRLAAGSEFUSKBZUEJQVTDZVCFHLAAJSFJSCNFSJKCFBCFSPITQHZJLBMHECNHFHGNZIEWBLGNFMHNMHMFSVPVHSGGMBGCWSEZSZGSEPFQEIMQEZZJIOGPIOMNSSOFWSKCRLAAGSKNEAHBBSKKEVTZSSOHEUTTQYMCPHZJFHGPZQOZHLCFSVYNFYYSEZGNTVRAJVTEMPADZDSVHVYJWHGQFWKTSNYHTSZFYHMAEJMNLNGFQNFZWSKCCJHPEHZZSZGDZDSVHVYJWHGQFWKTSNYHTSZFYHMAEDNJZQAZSCHPYSKXLHMQZNKOIOKHYMKKEIKCGSGYBPHPECKCJJKNISTJJZMHTVRHQSGQMBWHTSPTHSNFQZKPRLYSZDYPEMGZILSDIOGGMNYZVSNHTAYGFBZZYJKQELSJXHGCJLSDTLNEHLYZHVRCJHZTYWAFGSHBZDTNRSESZVNJIVWFIVYSEJHFSLSHTLNQEIKQEASQJVYSEVYSEUYSMBWNSVYXEIKWYSYSEYKPESKNCGRHGSEZLNGHTSIZHSZZHCUJWARNEHZZIWHZDZMADNGPNSYFZUWZSLXJFBCGEANWHSYSEGGNIVPFLUGCEUWTENKCJNVTDPNXEIKWYSYSFHESFPAJSWGTYVSJIOKHRSKPEZMADLSDIVKKWSFHZBGEEATJLBOTDPMCPHHVZNYVZBGZSCHCEZZTWOOJMBYJSCYFRLSZSCYSEVYSEUNHZVHRFBCCZZYSEUGZDCGZDGMHDYNAFNZHTUGJJOEZBLYZDHYSHSGJMWZHWAFTIAAY';

const getNth = (str, k, b) => [...str].filter((_,i) => (i-b) % k === 0).join('');

const concat = strs => [...strs[0]].map((_, i) => strs.map(str => str[i]).join('')).join('');

const decodeMulti = (str, keys) => {
    return concat(
        keys.map((key, i) => {
            const strPart = getNth(str, keys.length, i)

            const keyHole = getKeyHole(strPart);
        
            const dict = [...keyHole].reduce((acc, hole, i) => (acc[hole] = key[i], acc), {});
        
            return transform(strPart, dict);
        })
    );
};

// const fitness = (phenotype) => nGram(4)(decode(str, phenotype)).map(gram => quads[gram]).reduce((a, v) => a + (Math.log(v) || 0), 0);
const algos = [];
const best = [];
const fitnessMulti = i => phenotype => {
    const keys = best.map((b, j) => (i === j) ? phenotype : b);

    return (
        0.3 * nGram(1)(decodeMulti(strMulti, keys)).map(gram => unis[gram]).reduce((a, v) => a + (Math.log(v) || 0), 0)
        + 0.1 * nGram(2)(decodeMulti(strMulti, keys)).map(gram => bis[gram]).reduce((a, v) => a + (Math.log(v) || 0), 0)
        + 0.3 * nGram(3)(decodeMulti(strMulti, keys)).map(gram => tris[gram]).reduce((a, v) => a + (Math.log(v) || 0), 0)
    );
};

const configMulti = i => ({
    mutationFn: mutation,
    crossoverFn: crossover,
    fitnessFn: fitnessMulti(i),
    populationArr: [ start, reverse ],
    populationSizeNum: 10 	// defaults to 100
});

const create = (i) => {
    // const geneticalgorithm = GeneticAlgorithmConstructor( configMulti(i) );
    const geneticalgorithm = require('./genetic_algo')( configMulti(i) );
    algos[i] = geneticalgorithm;
    best[i] = start;
}

const run = async (i) => {
    // for (let j = 0; j < 1000; j++) {
    algos[i] = algos[i].evolve();
    // }
    // console.log(Array(10000).fill(null).map((e, i) => i).reduce((a, v) => (console.log(v), a.evolve()), geneticalgorithm).scoredPopulation())
}

const five = (k) => {  
    const getLetterCounts = str => {
        const plaintext = str.toLowerCase().replace(/[^a-z]/g, ""); 
        const counts = new Array(26).fill(0);
        let total = 0;
      
        for (let i = 0; i < plaintext.length; i++) {
          counts[plaintext.charCodeAt(i) - 97]++;
          total++;
        }
      
        return {counts, total};
    ;}

    const getIC = str => {
        const {counts, total} = getLetterCounts(str);
      
        const sum = counts.reduce((a, v) => a + v * (v - 1), 0);
        const ic = sum / (total * (total - 1));
      
        return ic;
    };

    // const getNth = (k, b) => str.filter((c,i) => (i-b) % k === 0);

    let i = 2;
    const lengths = [];

    for (i = 2; i < 20; i++) {
        const ics = Array(i).fill(null).map((e, j) => getIC(getNth(strMulti, i, j)));
        const ic = ics.reduce((a, v) => a + v) / ics.length;

        lengths.push({length: i, ic});
    }

    // console.log(lengths);
    const maxIC = Math.max(...lengths.map(e => e.ic));
    const bestLength = lengths.sort((a, b) => b.ic - a.ic).filter(e => e.ic > maxIC * 0.9).filter((e, _, arr) => !arr.some(s => e.length !== s.length && e.length % s.length === 0));

    const keylen = bestLength[0].length;
    // const keylen = 4;
    console.log(keylen);
    return;

    for (let i = 0; i < keylen; i++) {
        console.log('create', i);
        create(i);
    }

    // for (let j = 0; j < 10000; j++) {
    //     console.log('-----Lap', j);
    //     for (let i = 0; i < 4; i++) {
    //         // console.log('run', i);
    //         run(i);
    //     }
    //     if (j % k === 0) algos.forEach((algo, i) => best[i] = algo.best());
    // }

    // while (max.i + 100 > i && i < 10000) {
    //     geneticalgorithm.iterate();
    //     if (geneticalgorithm.maxFitness > max.f) {
    //         console.log(i);
    //         max.f = geneticalgorithm.maxFitness;
    //         max.i = i;
    //     }
    
    //     i++;
    // }

    // let finished = false;
    let j = 1;
    const max = {f: algos[0].maxFitness, j: 1};

    while (max.j + 100 > j && j < 10000) {
        console.log('-----Lap', j);
        for (let i = 0; i < keylen; i++) {
            // console.log('run', i);
            algos[i].iterate();
            if (algos[i].maxFitness > max.f) {
                console.log(i);
                max.f = algos[i].maxFitness;
                max.j = j;
            }
        }
        if (j % k === 0) {
            // const oldBest = [...best];
            algos.forEach((algo, i) => best[i] = algo.getBest()[0].chromosome);
            // finished = oldBest.reduce((a, v, i) => a && (v === best[i]), true);
        }
        j++;
    }

    for (let i = 0; i < keylen; i++) {
        const bestie = algos[i].getBest()[0].chromosome;
        best[i] = bestie;
        console.log({i, code: bestie, score: fitnessMulti(i)(bestie)})
    }
    console.log(decodeMulti(strMulti, best));
};

// four();
five(50);