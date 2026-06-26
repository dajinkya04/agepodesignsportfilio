

const API_BASE = "https://agepcoatings.com/agepdesign";

/* =========================
LOAD CATEGORY
========================= */

async function loadCategories() {
  try {
    const response = await fetch(`${API_BASE}/gallerycategories`);

    const categories = await response.json();

    const container = document.getElementById("categoryTabs");

    container.innerHTML = "";

    categories.forEach((category) => {
      container.innerHTML += `

        <button
          class="
            agep-category-btn
            ${category.value === "all" ? "active" : ""}
          "
          data-category="${category.value}"
          onclick="
            filterCategory(
              '${category.value}',
              this
            )
          "
        >

          ${category.name}

        </button>

      `;
    });
  } catch (error) {
    console.log("Category Error:", error);
  }
}

/* =========================
LOAD ALL PROJECTS
========================= */

async function loadProjects() {
  try {
    const response = await fetch(`${API_BASE}/getgallery`);

    const projects = await response.json();

    console.log("Projects:", projects);
    console.log("Is Array:", Array.isArray(projects));

    renderProjects(projects);
  } catch (error) {
    console.log("Projects Error:", error);
  }
}

/* =========================
FILTER CATEGORY
========================= */

async function filterCategory(category, button) {
  try {
    document.querySelectorAll(".agep-category-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    let url = "";

    if (category === "all") {
      url = `${API_BASE}/getgallery`;
    } else {
      url = `${API_BASE}/gallerycategory/${category}`;
    }

    const response = await fetch(url);

    const projects = await response.json();

    renderProjects(projects);
  } catch (error) {
    console.log("Filter Error:", error);
  }
}

/* =========================
RENDER PROJECTS
========================= */

function renderProjects(projects) {
  const container = document.getElementById("galleryContainer");

  container.innerHTML = "";

  if (!projects.length) {
    container.innerHTML = `
      <div class="col-12 text-center">
        <h5>No projects found.</h5>
      </div>
    `;
    return;
  }

  projects.forEach((project) => {
    container.innerHTML += `

      <div class="
        col-lg-6
        col-md-6
        col-12
      ">

        <div class="agep-project-card">

          <a
            href="project-details.html?slug=${project.slug}"
          >

            <div class="agep-project-image">

              <img
                src="${project.thumbnail}"
                alt="${project.title}"
                class="img-fluid w-100"
              >

            </div>

          </a>

          <div class="agep-project-content">

            <h5>
              ${project.title}
            </h5>

            <p>

              ${project.subtext || ""}

              <a
                href="project-details.html?slug=${project.slug}"
              >
                View Project >
              </a>

            </p>

          </div>

        </div>

      </div>

    `;
  });
}

/* =========================
AUTO FILTER FROM URL
========================= */

const urlParams = new URLSearchParams(
  window.location.search
);

const selectedCategory =
  urlParams.get("category");

/* =========================
INIT
========================= */

async function initPortfolio() {
  await loadCategories();

  if (selectedCategory) {
    const btn = document.querySelector(
      `[data-category="${selectedCategory}"]`
    );

    if (btn) {
      await filterCategory(
        selectedCategory,
        btn
      );
    } else {
      await loadProjects();
    }
  } else {
    await loadProjects();
  }
}

/* =========================
START
========================= */

initPortfolio();