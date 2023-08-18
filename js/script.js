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

AOS.init();

const allSections = $('section');


const sectionsInfo = [];

allSections.each((index, elem) => {
    sectionsInfo.push({
        top: $(elem).offset().top,
        text: $(elem).data('pandatext'),
        success: true
    })
})


const pandaBlock = $('.panda-anim');
const pandaMessage = $('.panda-anim-message');


$(window).on('scroll', function (){


    sectionsInfo.forEach((item, index) => {

        if($(window).scrollTop() >= item.top - 300 && item.success){
            item.success = false;

            const texts = item.text.split('/')
            pandaBlock.addClass('start-speak')

            startPrintText(texts)

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
        if(symbolCount === text?.length - 1 && arrIndex < texts.length){
            arrIndex++
            text = texts[arrIndex];
            symbolCount = 0;
        }
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

