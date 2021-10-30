
function countForests(arr) {
    let treesObj = {}
    for (let i = 0 ; i < arr.length; i++) {
        for(let j = 0; j< arr[i].length; j++) {
            if(arr[i][j] == 1) {
                treesObj[[i, j]] = { root: null}
            }
        }
    }
    const roots = [Object.keys(treesObj)[0]]
    Object.keys(treesObj).map((key, index) => {
        if(index == 0) {
            return 
        }

        root = trees(key, roots, treesObj)
        if(root) {
            treesObj[key].root = root 
        } else {
            roots.push(key)
        }
    })

    return getNumOfForest(treesObj)
}

function trees(key, roots, obj) {
    let root
    let [outer, inner] = key.split(',')
    outer = Number(outer)
    inner = Number(inner)
    const adjancents = [
            [`${outer}`, `${inner-1}`], // left
            [`${outer}`, `${inner-1}`], // right
            [`${outer-1}`, `${inner}`], // top
            [`${outer-1}`, `${inner+1}`], // top right
            [`${outer-1}`, `${inner-1}`], // top left
            [`${outer+1}`, `${inner}`], // bottom
            [`${outer+1}`, `${inner-1}`], // bottom left
            [`${outer+1}`, `${inner+1}`] // bottom right
        ]

    for(let i =0; i<roots.length; i++) {
        var t = roots[i].split(',')
        if(JSON.stringify(adjancents).indexOf(JSON.stringify(t)) != -1) {
            root = roots[i]
        } else {
            let childs = Object.keys(obj).filter(function (el) {
                return obj[el].root != null;
                });
            for(let x = 0; x< childs.length; x++) {
                const xx = JSON.stringify(childs[x].split(','))
                if(JSON.stringify(adjancents).indexOf(xx) != -1) {
                    root = obj[childs[x]].root
                    break;
                } else {
                    root = null
                }
            }
                
        }
    }

    return root
}
     
function getNumOfForest(rootsObj) {
    let roots = {}
    Object.keys(rootsObj).map((key) => {
        if(!rootsObj[key].root) {
            roots[key] = {count: 0}
        } else {
            roots[rootsObj[key].root].count++
        }
    })
    let forests = Object.keys(roots).filter((key) => {
        return roots[key].count > 0
    });

    return forests.length
}

const example1 = [
	[0, 0, 1, 1, 0, 0],
	[0, 1, 1, 1, 0, 0],
	[0, 1, 0, 0, 0, 1],
	[0, 1, 0, 0, 1, 1],
	[1, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0]
];
const result = countForests(example1);

console.log(result)
