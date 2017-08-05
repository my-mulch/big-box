function addIterative(a,b){
    
    for(let i = 0; i < a.length; i++){
        
        for(let j = 0; j < a[0].length; j++){
            a[i][j] + b[i][j]
        }
    }
    
}


const start = new Date().getTime()
addIterative([[1,2,3],[1,2,3],[1,2,3]], [[1,2,3],[1,2,3],[1,2,3]])
const end = new Date().getTime()
console.log((end - start) / 1000)