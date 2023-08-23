const {
    active
} = {
    active: 'active'
}


$('.gradient-card-running-line').each((index, elem) => {
    const gradientCardRunningLine = $(elem).text();

    $(elem).text('');

    for (let i = 0; i < gradientCardRunningLine.length - 1; i++) {
        $(elem).append(`<span>${gradientCardRunningLine[i]}</span>`)
    }

    const thisChild = $(elem).children('span');

    let count = 0;
    thisChild.each((index, elemSpan) => count += $(elemSpan).width())

    $(elem).css('width', `${count}px`);
    $(elem).css('animation', `gradient-card-line ${count / 80}s linear`);
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
let textsArray = []
let text = '';
let arrIndex = 0;
let symbolCount = 0;
let interval = setInterval(() => 's', 90);

const fontSizeHeaderFaq = 1;


$(window).on('scroll', function (){


    $('.header-faq-title').css('transform', `scale(${fontSizeHeaderFaq - ($(window).scrollTop() / 350) })`)


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

        if(symbolCount === text?.length - 1 && arrIndex === texts.length - 1){
            setTimeout(() => {
                pandaBlock.removeClass('start-speak')
            }, 3000)
        }

        symbolCount++
        pandaMessage.text(text?.slice(0, symbolCount))
    }, 90);


}

$(window).on('load', function (){
    setTimeout(() => {
        pandaBlock.addClass('start-speak');
        startPrintText(
            [
                'Hello, I\'m WebIQ panda, I will inform you about the site and our activities, you can be attentive, learn about our promotions and services, and if you don\'t want to see me, just remove it, I won\'t be offended'
            ]
        )
    }, 2000)
})



let animUpset = true;
//
pandaBlock.pep({
    ignoreRightClick: true,
    shouldEase: false,
    initiate: function (){
        clearInterval(interval)
        animUpset = true;
        setTimeout(() => {
            if(animUpset){
                pandaBlock.css('background-image', `url(images/panda-6.png)`).addClass('start-speak');
                pandaMessage.text('Please let me go, I\'m upset');
            }
        }, 2000)
    },
    stop: function (){
        animUpset = false;
        startPrintText(textsArray);
        pandaBlock.css('background-image', 'url(images/panda-3.png)').addClass('start-speak');
        pandaMessage.text('');
    },
    drag: function (e){
        startPrintText(textsArray)
        // console.log(e.pep.x, e.pep.y, $(window).width())
        if(e.pep.x <  wWidth()){
            pandaBlock.addClass('message-right').addClass('close');
        } else {
            pandaBlock.removeClass('message-right').removeClass('close');
        }
    }
});

function wWidth(){
    if($(window).width() < 768){
        return 200
    } else {
        return 350
    }
}

$('#close-panda').on('click', openClosePanda)

$('#open-panda').on('click', openClosePanda)

function openClosePanda(){
    if(pandaBlock.hasClass('close')){
        pandaBlock.removeClass('close')
    } else {
        pandaBlock.addClass('close').removeClass('message-right')
    }
}