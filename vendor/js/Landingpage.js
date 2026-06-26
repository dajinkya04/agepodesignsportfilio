const API_BASE = "https://agepcoatings.com/agepdesign";

async function loadHomeProjects() {
  try {
    const response = await fetch(`${API_BASE}/getgallery`);

    const projects = await response.json();

    const slider = document.getElementById("homeProjectSlider");

    slider.innerHTML = "";

    const loopProjects = [...projects, ...projects];

    loopProjects.forEach((project) => {
      slider.innerHTML += `

        <a
          href="protfilio.html?category=${project.category}" 
         class="agep-slide-item"
        >

          <img
            src="${project.thumbnail}"
            alt="${project.title}"
          >

          <div class="agep-slide-overlay">

            <h5>
              ${project.title}
            </h5>

          </div>

        </a>

      `;
    });

    const sliderWrapper = document.querySelector(".agep-home-slider");

    if (sliderWrapper) {
      sliderWrapper.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();

          sliderWrapper.scrollLeft += e.deltaY;
        },
        { passive: false },
      );
    }
  } catch (error) {
    console.log(error);
  }
}

loadHomeProjects();
