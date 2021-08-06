
// arrThing[0] = data
// arrThing[1] = unique category
// arrThing[2] = unique value


async function onLoad() {
    const arrThings = []
    const rawData = await fetch('jeopardy.json');
    const data = await rawData.json();
    let categories = []
    let values = []
    for( let item of data){
        categories.push(item.category)
        values.push(item.value)
    }
    const uniqueCat = Array.from(new Set(categories))
    const uniqueValue = Array.from(new Set(values))
    arrThings.push(data)
    arrThings.push(uniqueCat)
    arrThings.push(uniqueValue)
    return arrThings
}

