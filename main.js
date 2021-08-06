// array[0] = data
// array[1] = unique category
// array[2] = unique value
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
    // -----------------------------------
    async function main(){
        const array = await (onLoad())
        const data = array[0]
        const uniqueCat = array[1]
        const uniqueValue = array[2]

        for(let i = 0; i<5; i++){
            cats.push(uniqueCat[getRandomInt(uniqueCat.length -1)])
        }
    
    $('.question-slot').each(function(){
        if($(this).attr('id') <=5){
            let int = getRandomInt(array[0].length -1)
            while(data[int].value != "$200"){
                int = getRandomInt(array[0].length -1)
                console.log('running')
            }
            // bRokencodes ----------------------------
            // console.log(cats[$(this).attr('id')-1])
            // // console.log(data[int].category != cats[$(this).attr('id')-1])
            // console.log(data[int].category)
            // ------------------------------------------------
            $(this).addClass(`${int}`)
            $(this).text(data[int].value)
        }

        else if($(this).attr('id') <=10){
            let int = getRandomInt(array[0].length -1)
            while(data[int].value != "$400"){
                int = getRandomInt(array[0].length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(data[int].value)
        }

        else if($(this).attr('id') <=15){
            let int = getRandomInt(array[0].length -1)
            while(data[int].value != "$600"){
                int = getRandomInt(array[0].length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(data[int].value)
        }
        
        else if($(this).attr('id') <=20){
            let int = getRandomInt(array[0].length -1)
            while(data[int].value != "$800"){
                int = getRandomInt(array[0].length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(data[int].value)
        }
        
        else if($(this).attr('id') <=25){
            let int = getRandomInt(array[0].length -1)
            while(data[int].value != "$1,000"){
                int = getRandomInt(array[0].length -1)
            }
            $(this).addClass(`${int}`)
            $(this).text(data[int].value)
        }
        
    })
    

    let count = localStorage.getItem('count')
    if(count === null){
        count = 0
    }


    $('.score').append($(`<h3 class="won">$${count}</h3>`))

    // --------------------------ANSWER CHECKER
    $('.add').on('click', function(){
        console.log(answerInput.val().toLowerCase())
        console.log(data[currentQuestion].answer.toLowerCase())
        // console.log($(this))
        if(answerInput.val().toLowerCase() === data[currentQuestion].answer.toLowerCase()){
            const prize = Number(strToMoney(data[currentQuestion].value))
            count += prize
            console.log(typeof count)
            localStorage.setItem('count', count)
            $('.won').remove()
            $('.score').append($(`<h3 class="won">$${count}</h3>`))
            $('.active').addClass('complete')
            $('.complete').removeClass('active')
            console.log($('.active').length)
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
                <h4>The answer is, <span class="red">${data[currentQuestion].answer}</span><h4>
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
        loadPage()
    })

    $('.question-slot').on('click', function(){
        if($('.active').length < 1){
            const resultClass = $(this).attr('class').split(' ')
            $(this).addClass('active')
            currentQuestion = resultClass[1]
            console.log(currentQuestion)
            const myQuestion = data[currentQuestion]
            console.log(myQuestion)
            $('.question-box').children().remove()
            $('.question-box').append( $(`
                <h4>${removeTags(myQuestion.question)}</h4>
            `))
        }
        else{
            console.log('please complete the current question first')
        }
        
    })


    $('.start').on('click', function(){
        count++
        localStorage.setItem('count', count)
        $('.score').text(count)
    })

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