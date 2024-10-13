document.addEventListener('DOMContentLoaded', function() {
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true
    });

    // Circular progress animation
    const circleProgress = document.querySelectorAll('.circle-progress');
    
    circleProgress.forEach(progress => {
        const value = progress.getAttribute('data-percent');
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        circle.setAttribute("width", "150");
        circle.setAttribute("height", "150");
        circle.innerHTML = `
            <circle cx="75" cy="75" r="70" />
            <circle cx="75" cy="75" r="70" />
        `;
        progress.appendChild(circle);
        
        const circleElement = circle.querySelector("circle:last-child");
        const circumference = 2 * Math.PI * 70;
        circleElement.style.strokeDasharray = circumference;
        circleElement.style.strokeDashoffset = circumference - (value / 100) * circumference;
    });

    // Animate skills on scroll
    const skillSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress');
    const circularProgressBars = document.querySelectorAll('.circular-progress');

    const animateSkills = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });

                circularProgressBars.forEach(circle => {
                    const percent = circle.querySelector('.progress-value').textContent;
                    circle.style.background = `conic-gradient(var(--accent-color) 0deg, rgba(255, 255, 255, 0.1) 0deg)`;
                    setTimeout(() => {
                        circle.style.background = `conic-gradient(var(--accent-color) ${percent}, rgba(255, 255, 255, 0.1) 0deg)`;
                    }, 100);
                });
            }
        });
    };

    const observer = new IntersectionObserver(animateSkills, { threshold: 0.5 });
    observer.observe(skillSection);

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links li').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});
