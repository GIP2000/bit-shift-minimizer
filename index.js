const states = { "0.0": 0, "0.5": 0, "1.0": 0, "1.5": 0, "2.0": 0, "2.5": 0 };
const bitStates = ["000", "001", "010", "011", "100", "101", "110", "111"];


const permutate = arr => {
    let arrs = [];
    let counter = null;
    let sol = null;

    for (let i = 0; i < arr.length; i++) {
        let r = permutate(arr.slice(0, i).concat(arr.slice(i + 1)));

        if (!r.length) {
            arrs.push([arr[i]]);
        }
        else {
            for (let j = 0; j < r.length; j++) {
                arrs.push([arr[i]].concat(r[j]));
            }
        }
    }

    return arrs;
}


const getMins = arrs => arrs.map(x => {
    return { "jumps": calculateBitJumps(x), x }
}).sort((a, b) => { return a.jumps - b.jumps }).filter((x, i, arr) => x.jumps == arr[0].jumps);




const calculateBitJumps = map => {
    //map = ["000", "001", "010", "011", "100", "101"];
    let counter = 0;

    for (let i = 0; i < 6; i++) {
        let currentValue = map[i].split('');

        let jump = (map[i + 1] ? map[i + 1] : map[0]).split('');
        let doubleJump = (map[i + 2] ? map[i + 2] : map[0]).split('');


        counter += currentValue.reduce((acc, x, j) => {
            if (x != jump[j]) acc++;
            if (x != doubleJump[j]) acc++;
            return acc;
        }, 0);


    }
    return counter;
}

console.log(getMins(permutate(bitStates)).length);

