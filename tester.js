const str = 'which has an engraving of this event on the back; limited space on the note meant five guys got left out'

function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

// console.log(removeTags(str))

let arr = ['$100', '$300', '$200', '$1,000' ,'$400','$500']
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

arr = sortArray(arr)
console.log(arr)
