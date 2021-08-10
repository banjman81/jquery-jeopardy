
// arrThing[0] = data
// arrThing[1] = unique category
// arrThing[2] = unique value


async function onLoad() {
    const arrThings = []
    const rawData = await fetch('jeopardy.json');
    const data = await rawData.json();
    let categories = []
    let values = []
    let shows = []
    for( let item of data){
        categories.push(item.category)
        values.push(item.value)
        shows.push(item.showNumber)
    }

    const uniqueCat = Array.from(new Set(categories))
    const uniqueValue = Array.from(new Set(values))
    const uniqueShow = Array.from(new Set(shows))
    arrThings.push(data)
    arrThings.push(uniqueCat)
    arrThings.push(uniqueValue)
    arrThings.push(uniqueShow)
    console.log(uniqueShow.length)
    return arrThings
}



function sortArray(arrays){
    let resultArr = []
    for(let item of arrays){
        temp = ''
        for(i of item){
            if(!isNaN(Number(i))){
                temp += i
            }
        }
        resultArr.push(Number(temp))
    }
    resultArr.sort(function(a,b){
        return a-b
    })
    
    const finalArr = []
    for( a of resultArr){
        finalArr.push(formatter.format(a))
    }
    return finalArr
}
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

