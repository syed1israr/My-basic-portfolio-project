function loco(){
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
      });
      
      locoScroll.on("scroll", ScrollTrigger.update);
      
      // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
      ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
      });
      
      ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
      
      ScrollTrigger.refresh();
      
}
loco();

gsap.registerPlugin(ScrollTrigger);
document.addEventListener('mousemove', handleMouseMovement);
let circleX = 0;
let circleY = 0;
function updateCirclePosition(x, y) {
    gsap.to("#Minicircle", {
        x: x+20,
        y: y+10,
        duration: 0.3,
        ease: "power2.out"
    });
}
function handleMouseMovement(event) {
    const x = event.clientX;
    const y = event.clientY;
    const xOffset = -10;
    const yOffset = -10;

    circleX = x + xOffset;
    circleY = y + yOffset;

    updateCirclePosition(circleX, circleY);
}
function animateElements(selector) {
    gsap.from(selector, {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.5,
        stagger: 0.2,
    });
}

animateElements(".changes");

