interface OPTIONS_posterScrollAnimation {
    wraper:string,
    poster:string
}
function posterScrollAnimation(options){
    const opt = {
        wrapper:".c-posterScrollAnimation",
        poster:".m-coverPoster",
        ...options
    };
    var heroVisualEl = document.querySelector(`${opt.wrapper} ${opt.poster}`);
    if (heroVisualEl) {
        var heroVisualTl = gsap.timeline({
            scrollTrigger: {
                trigger: opt.wrapper,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
        heroVisualTl.to(`${opt.wrapper} ${opt.poster}`, {
            height: '200px',
            ease: "none",
        }, 0);
    }
}