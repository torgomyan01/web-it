
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
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
    ]
});
