document.addEventListener("DOMContentLoaded", function() {
    // Scroll to the next section or back to the top
    const scrollButton = document.getElementById("scroll-btn");
    const sections = document.querySelectorAll("section");
    let currentSectionIndex = 0;

    scrollButton.addEventListener("click", function() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
        } else {
            currentSectionIndex = 0;
            sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
        }
        updateScrollButton();
    });

    function updateScrollButton() {
        if (currentSectionIndex === sections.length - 1) {
            scrollButton.innerHTML = '&#9650;';
        } else {
            scrollButton.innerHTML = '&#9660;';
        }
    }

    // detect which section is currently in view
    const observerOptions = {
        root: null, 
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSectionIndex = Array.from(sections).indexOf(entry.target);
                updateScrollButton();
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => observer.observe(section));

    updateScrollButton();

    // Carousel
    const carouselContainers = document.querySelectorAll(".carousel-container");
    
    carouselContainers.forEach(container => {
        const prevButton = container.querySelector(".prev-button");
        const nextButton = container.querySelector(".next-button");
        const carousel = container.querySelector(".carousel");
        let index = 0;

        function goToNextSlide(){
            if(index < carousel.children.length - 1){
                index++;
            } else {
                index = 0;
            }
            carousel.style.transform = `translateX(${-index * 100}%)`;
        }

        const autoScrollInterval = setInterval(goToNextSlide, 3000);

        nextButton.addEventListener("click", () => {
            clearInterval(autoScrollInterval);
            goToNextSlide();
        });

        prevButton.addEventListener("click", () => {
            if (index > 0) {
                index--;
            } else {
                index = carousel.children,length - 1; 
            }
                carousel.style.transform = `translateX(${-index * 100}%)`;
            });
    });

    //Appearing title - obtained on moving letters resource.
        var textWrapper = document.querySelector('.main-heading');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
    .add({
        targets: '.main-heading .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i+1)
    }).add({
        targets: '.main-heading',
        opacity: 0,
        duration: 600,
        easing: "easeOutExpo",
        delay: 1000
    });
});
