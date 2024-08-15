// Initialize LocomotiveScroll for smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnime(){ 
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
    });
}

function animateSections() {
    // Animate elements in the second section
    gsap.from("#second .elem", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: Expo.easeInOut,
        stagger: 0.3,
        scrollTrigger: {
            trigger: "#second",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate the 'about' section
    gsap.from("#about img, #textabout", {
        opacity: 0,
        x: -100,
        duration: 1.5,
        ease: Expo.easeInOut,
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate the footer section
    gsap.from("#footer a", {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: Expo.easeInOut,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#footer",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
}

// Mouse follower and skew effect
function circleskew(){
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;

    window.addEventListener("mousemove", function(dets){
        xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            document.querySelector(
              "#minicircle"
            ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
          }, 100);
    });
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

// Call functions to initiate animations
circleMouseFollower();
firstPageAnime();
circleskew();
animateSections();

// Hover effects for elements
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function () {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3.easeOut,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3.easeOut,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
});

