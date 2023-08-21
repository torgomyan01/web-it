const {
    active
} = {
    active: 'active'
}


$('.gradient-card-running-line').each((index, elem) => {
    const gradientCardRunningLine = $(elem).text();

    $(elem).css('width', `${gradientCardRunningLine.length * 50}px`);
    $(elem).css('animation', `gradient-card-line 40s linear`);
    $(elem).css('animation-iteration-count', `infinite`);
    $(elem).css('animation-play-state', `paused`);

})

const slider = $('.feedback-slider');

slider.slick({
    centerMode: true,
    prevArrow: $('#prev'),
    nextArrow: $('#next'),
    centerPadding: '120px',
    slidesToShow: 3,
    slidesToScroll: 2,
    infinite: true,
    speed: 300,
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 577,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '20px',
            }
        }
    ]
});

$('.mobile-menu-board').on('click', function (){
    if($(this).hasClass(active)){
        $(this).removeClass(active);
        $('body').css('overflow', '')
        $('.mobile-menu').removeClass(active);
    } else {
        $(this).addClass(active);
        $('body').css('overflow', 'hidden');
        $('.mobile-menu').addClass(active);
    }
})

$('.mobile-menu a').on('click', function (){
    $('.mobile-menu-board').removeClass(active);
    $('body').css('overflow', '')
    $('.mobile-menu').removeClass(active);
})

AOS.init();

const allSections = $('section');


const sectionsInfo = [];

allSections.each((index, elem) => {
    sectionsInfo.push({
        top: $(elem).offset().top,
        text: $(elem).data('pandatext'),
        pandaUrl: $(elem).data('pandaurl'),
        success: true
    })
})


const pandaBlock = $('.panda-anim');
const pandaMessage = $('.panda-anim-message-body');
let textsArray = [];

$(window).on('scroll', function (){


    sectionsInfo.forEach((item, index) => {

        if($(window).scrollTop() >= item.top - 200 ){

            pandaBlock.css('background-image', `url(${item.pandaUrl})`)

            if(item.success){
                item.success = false;

                const texts = item.text.split('/')
                pandaBlock.addClass('start-speak');

                startPrintText(texts);
                textsArray = texts;
            }

        }

    })

})


let text = '';
let arrIndex = 0;
let symbolCount = 0;
let interval;

function startPrintText(texts){
    clearInterval(interval)
    arrIndex = 0;
    symbolCount = 0;

    text = texts[arrIndex];

    interval = setInterval(() => {
        if(symbolCount === text?.length - 1 && arrIndex < texts.length - 1){
            arrIndex++
            text = texts[arrIndex];
            symbolCount = 0;
        }

        // if(symbolCount === text?.length - 1 && arrIndex === texts.length - 1){
        //     setTimeout(() => {
        //         pandaBlock.removeClass('start-speak')
        //     }, 2000)
        // }

        symbolCount++
        pandaMessage.text(text?.slice(0, symbolCount))
    }, 90);

    startSpeak(text, function (){
        startSpeak(texts[arrIndex], function (){
            console.log('end')
        })
    })

}


// function startWrite(){
//     // startSpeak(text, () => startSpeak(text))
//
//     setInterval(() => {
//         if(symbolCount === text.length - 1 && arrIndex < texts.length){
//             arrIndex++
//             text = texts[arrIndex];
//             symbolCount = 0;
//         }
//         symbolCount++
//         pandaMessage.text(text.slice(0, symbolCount))
//     }, 80)
// }




function startSpeak(text, callBackEnd){
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en";
    speech.rate = 0.7;
    speech.pitch = 1;
    speech.volume = 0.8;
    window.speechSynthesis.speak(speech);

    speech.onend = () => callBackEnd()
}

let animUpset;

pandaBlock.pep({
    ignoreRightClick: true,
    shouldEase: false,
    initiate: function (e){
        clearInterval(interval)
        animUpset = setTimeout(() => {
            pandaBlock.css('background-image', `url(images/panda-6.png)`).addClass('start-speak');
            pandaMessage.text('Please let me go, I\'m upset')
        }, 2000)
    },
    stop: function (e){
        clearTimeout(animUpset);
        startPrintText(textsArray)
        animUpset = undefined;
        pandaBlock.css('background-image', `url(images/panda-3.png)`).addClass('start-speak');
        pandaMessage.text('')
    },
    drag: function (e){
        if(e.pep.x < 350){
            pandaBlock.addClass('message-right')
        } else {
            pandaBlock.removeClass('message-right')
        }
    }
});

pandaBlock.on('dblclick', function (){
    if($(this).hasClass('close')){
        $(this).removeClass('close')
    } else {
        $(this).addClass('close')
    }
})