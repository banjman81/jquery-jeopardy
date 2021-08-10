// array[0] = data
// array[1] = unique category
// array[2] = unique value
// array[3] = unique show numbers
const answerInput = $('#answer-box')

const gridWidth = 5;
let block = 1;
while (block <= gridWidth * gridWidth) {
    const board = $('.board');
    const newBlock = $(`
        <div class="question-slot" id="${block}">
        </div>
    `)
    board.append(newBlock);
    block++;
}
function loadPage(){
    // ALL IMPORTANT VAR ARE HERE
    let currentQuestion = ''
    let cats = []
    let overValue = 0
    // -----------------------------------
    async function main(){
        const array = await (onLoad())
        let data = array[0]
        let uniqueCat = array[1]
        let uniqueShow = array[3]
        const currentShow = uniqueShow[getRandomInt(uniqueShow.length-1)]
        console.log(currentShow)
        data = data.filter(question => question.showNumber === currentShow)
        console.log(data.length)

        // GET ALL DIFFERENT VALUES OF EACH QUESTIONS
        let currentShowValues = []
        let currentShowCats = []
        for(const price of data){
            currentShowValues.push(price.value)
        }
        currentShowValues = Array.from(new Set(currentShowValues))
        for(const cat of data){
            currentShowCats.push(cat.category)
        }
        currentShowCats = Array.from(new Set(currentShowCats))

        let currentShowValues2 = []
        let currentShowCats2 = []

        for (c of currentShowCats){
            if(data.filter(question => question.category === c).length >=5){
                currentShowCats2.push(c)
            }
        }
        for (c of currentShowValues){
            if(data.filter(question => question.value === c).length >=5){
                currentShowValues2.push(c)
            }
        }

        currentShowValues2 = sortArray(currentShowValues2)
        
        console.log(currentShowCats2)
        let tempData = []
        for (c of currentShowCats2){
            tempData.push(data.filter(question => question.category === c))
        }
        console.log(currentShowValues2)
        let newData = [].concat.apply([], tempData)
        console.log(newData)

        for(let i = 0; i<5; i++){
            cats.push(uniqueCat[getRandomInt(uniqueCat.length -1)])
        }
    
    $('.question-slot').each(function(){
        if($(this).attr('id') <=5){
            let int = getRandomInt(newData.length -1)
            while(newData[int].value != currentShowValues[0] || newData[int].category != currentShowCats2[$(this).attr('id')-1]){
                int = getRandomInt(newData.length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(newData[int].value)
            $('.cats-display').append($(`
                <td class=".cat${$(this).attr('id')}">
                    <p>${currentShowCats2[$(this).attr('id')-1]}</p>
                </td>
            `))
        }

        else if($(this).attr('id') <=10){
            let int = getRandomInt(newData.length -1)
            while(newData[int].value != currentShowValues2[1] || newData[int].category != currentShowCats2[$(this).attr('id')-6]){
                int = getRandomInt(newData.length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(newData[int].value)
        }

        else if($(this).attr('id') <=15){
            let int = getRandomInt(newData.length -1)
            while(newData[int].value != currentShowValues2[2] || newData[int].category != currentShowCats2[$(this).attr('id')-11]){
                int = getRandomInt(newData.length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(newData[int].value)
        }
        
        else if($(this).attr('id') <=20){
            let int = getRandomInt(newData.length -1)
            while(newData[int].category != currentShowCats2[$(this).attr('id')-16]){
                int = getRandomInt(newData.length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(`$800`)
        }
        
        else if($(this).attr('id') <=25){
            let int = getRandomInt(newData.length -1)
            while(newData[int].category != currentShowCats2[$(this).attr('id')-21]){
                int = getRandomInt(newData.length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(`$1,200`)
        }
        
    })
    

    let count = localStorage.getItem('count')
    if(count === null){
        count = 0
    }


    $('.score').append($(`<h3 class="won">$${count}</h3>`))

    // --------------------------ANSWER CHECKER
    $('.add').on('click', function(){
        // console.log($(this))
        if(answerInput.val().toLowerCase() === newData[currentQuestion].answer.toLowerCase()){
            const prize = Number(strToMoney(newData[currentQuestion].value))
            if(overValue >=16 && overValue <=20){
                count += 800
            }
            else if(overValue >=20 && overValue <=25){
                count += 1200
            }
            else{
                count += prize
            }
            console.log(typeof count)
            localStorage.setItem('count', count)
            $('.won').remove()
            $('.score').append($(`<h3 class="won">$${count}</h3>`))
            $('.active').addClass('complete')
            $('.complete').removeClass('active')
            console.log($('.active').length)
            $('.the-messege').remove()
            $('.messege-board').append($(`
                <div class="the-messege">
                    <h4><span class="green">Correct</span><h4>
                </div>
            `))
            answerInput.val('')
        }
        else{
            $('.the-messege').remove()
            $('.messege-board').append($(`
                <div class="the-messege">
                    <h4><span class="red">Incorrect</span><h4>
                </div>
            `))
        }
    })

    // --------------------------------GIVE UP REVEAL ANSWER
    $('.giveup').on('click', function(){
        $('.active').addClass('fail')
        $('.fail').removeClass('active')
        console.log($('.active').length)
        $('.the-messege').remove()
        $('.messege-board').append($(`
            <div class="the-messege">
                <h4>The answer is, <span class="red">${newData[currentQuestion].answer}</span><h4>
            </div>
        `))
    })


    $('.clear').on('click', function(){
        $('.score').children().remove()
        $('.question-slot').removeClass('active')
        $('.question-slot').removeClass('complete')
        $('.question-slot').removeClass('fail')
        $('.question-box').children().remove()
        $('.the-messege').remove()
        localStorage.removeItem('count')
        $('.cats-display').children().remove()
        location.reload()
    })

    $('.question-slot').on('click', function(){
        if($('.active').length < 1){
            $('.the-messege').remove()
            const resultClass = $(this).attr('class').split(' ')
            $(this).addClass('active')
            currentQuestion = resultClass[1]
            console.log(currentQuestion)
            const myQuestion = newData[currentQuestion]
            console.log(myQuestion)
            $('.question-box').children().remove()
            $('.question-box').append( $(`
                <h4>${removeTags(myQuestion.question)}</h4>
            `))
            console.log(Number($(this).attr('id')))
            overValue = Number($(this).attr('id'))
        }
        else{
            console.log('please complete the current question first')
        }
        
    })


    // $('.start').on('click', function(){
    //     count++
    //     localStorage.setItem('count', count)
    //     $('.score').text(count)
    // })

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // function moneyToStr(val){

    // }
    function strToMoney(val){
        let result = ''
        for( const v of val){
            if (!isNaN(Number(v))){
                result += v
            }
        }
        return Number(result)
    }

}

main()
}
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}

loadPage()