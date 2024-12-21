var swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
        });

        document.getElementById('menuButton').addEventListener('click', function() {
            var menuDropdown = document.getElementById('menuDropdown');
            if (menuDropdown.classList.contains('hidden')) {
                menuDropdown.classList.remove('hidden');
            } else {
                menuDropdown.classList.add('hidden');
            }
        });

        window.addEventListener('load', function() {
            setTimeout(function() {
                var splashScreen = document.getElementById('splashScreen');
                splashScreen.style.display = 'none';
            }, 60000); // 60000 milliseconds = 1 minute
        });