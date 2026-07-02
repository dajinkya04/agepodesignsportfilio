const API_BASE = "https://agepcoatings.com/agepdesign";

const params = new URLSearchParams(window.location.search);

const slug = params.get("slug")?.trim();

function isValidImage(image) {
  if (!image) return false;

  if (image.includes("YOUR_")) {
    return false;
  }

  return true;
}

async function loadProject() {
  try {
    const response = await fetch(`${API_BASE}/galleryitem/${slug}`);

    const project = await response.json();

    const detail = project.projectDetail || {};

    /* TOP */

    document.getElementById("badge").innerText = detail.badge || "";

    const title = detail.mainTitle || "";

    const splitTitle = title.split(/[-–—]/);

    if (splitTitle.length > 1) {
      document.getElementById("mainTitle").innerHTML = `

    <span>
      ${splitTitle[0].trim()} –
    </span>

    ${splitTitle[1].trim()}

  `;
    } else {
      document.getElementById("mainTitle").innerText = title;
    }

    document.getElementById("about").innerText = detail.about || "";

    /* SHOWCASE */

    const leftImage = detail.topSection?.section1?.leftImage;

    if (isValidImage(leftImage)) {
      document.getElementById("leftImage").src = leftImage;
    } else {
      document.querySelector(".left-image-col")?.remove();
    }

    document.getElementById("sectionTitle").innerText =
      detail.topSection?.section1?.rightContent?.title || "";

    const points = detail.topSection?.section1?.rightContent?.points || [];

    const pointsList = document.getElementById("pointsList");

    pointsList.innerHTML = "";

    if (points.length) {
      points.forEach((point) => {
        pointsList.innerHTML += `
          <li>${point}</li>
        `;
      });
    } else {
      pointsList.remove();
    }

    /* MIDDLE */

    const middleTitle = detail.topSection?.section2?.title;

    const middleDescription = detail.topSection?.section2?.description;

    if (middleTitle || middleDescription) {
      document.getElementById("middleTitle").innerText = middleTitle || "";

      document.getElementById("middleDescription").innerText =
        middleDescription || "";
    } else {
      document.querySelector(".agep-middle-section")?.remove();
    }

    /* BANNER */

    const bannerContainer = document.getElementById("bannerContainer");

    const bannerData = detail.topSection?.section3;

    if (bannerData && bannerData.url && !bannerData.url.includes("YOUR_")) {
      if (bannerData.type === "video") {
        bannerContainer.innerHTML = `

          <video
            autoplay
            muted
            loop
            playsinline
            controls
            class="agep-banner-video"
          >

            <source
              src="${bannerData.url}"
              type="video/mp4"
            >

          </video>

        `;
      } else {
        bannerContainer.innerHTML = `

          <img
            src="${bannerData.url}"
            class="
              img-fluid
              agep-banner-image
            "
          />

        `;
      }
    } else {
      document.querySelector(".agep-banner-section")?.remove();
    }

    /* SCROLL */

    /* ======================================================
   SCROLL TEXT
====================================================== */
const scrollContainers = document.querySelectorAll(".agep-scroll-text");

if (detail.topSection?.section4?.scrollText?.length) {
  const items = detail.topSection.section4.scrollText;

  const loopItems = [...items, ...items, ...items, ...items];

  scrollContainers.forEach((container) => {
    container.innerHTML = loopItems
      .map((text) => `<span>${text}</span>`)
      .join("");
  });
} else {
  document.querySelectorAll(".agep-scroll-wrapper").forEach((wrapper) => {
    wrapper.classList.add("agep-empty");
  });
}
    /* GALLERY */

//  const galleryTitle = detail.middleSection?.title || "";

// const words = galleryTitle.split(" ");

// const lastTwoWords = words.splice(-2).join(" ");

// document.getElementById("galleryTitle").innerHTML = `

//   ${words.join(" ")}

//   <span>
//     ${lastTwoWords}
//   </span>

// `;


const galleryTitle = detail.middleSection?.title || "";

const words = galleryTitle.trim().split(/\s+/);

if (words.length >= 2) {
    const lastTwoWords = words.splice(-2).join("&nbsp;");

    document.getElementById("galleryTitle").innerHTML = `
        ${words.join(" ")}
        <br>
        <span class="gradient-text">${lastTwoWords}</span>
    `;
} else {
    document.getElementById("galleryTitle").textContent = galleryTitle;
}
    const galleryGrid = document.getElementById("galleryGrid");

    const images = detail.middleSection?.images || [];

    let validImageCount = 0;

    images.forEach((image) => {
      if (isValidImage(image)) {
        validImageCount++;

        galleryGrid.innerHTML += `

          <div class="agep-gallery-item">

            <img
              src="${image}"
              class="img-fluid"
            />

          </div>

        `;
      }
    });

    if (validImageCount === 0) {
      document.querySelector(".agep-gallery-section")?.remove();
    }

    /* FINAL */

    const finalImage = detail.bottomSection?.fullImage;

    if (isValidImage(finalImage)) {
      document.getElementById("finalImage").src = finalImage;

      document.getElementById("finalCaption").innerText =
        detail.bottomSection?.caption || "";

      document.getElementById("finalDescription").innerText =
        detail.bottomSection?.description || "";
    } else {
      document.querySelector(".agep-final-section")?.remove();
    }

    /* RELATED */

    loadRelatedProjects(project.category, project.slug);
  } catch (error) {
    console.log(error);
  }
}

/* RELATED */

async function loadRelatedProjects(category, currentSlug) {
  const response = await fetch(`${API_BASE}/gallerycategory/${category}`);

  const projects = await response.json();

  const container = document.getElementById("relatedProjects");

  const filtered = projects.filter((item) => item.slug !== currentSlug);

  if (!filtered.length) {
    document.querySelector(".agep-related-projects")?.remove();

    return;
  }

  filtered.slice(0, 2).forEach((project) => {
    if (isValidImage(project.thumbnail)) {
      container.innerHTML += `

          <div class="
            col-lg-6
            col-md-6
            col-12
          ">

            <div class="agep-project-card">

              <a href="
                project-details.html?slug=${project.slug}
              ">

                <div class="agep-project-image">

                  <img
                    src="${project.thumbnail}"
                    class="img-fluid"
                  />

                </div>

              </a>

              <div class="agep-project-content">

                <h5>
                  ${project.title}
                </h5>
                <p>

                  ${project.subtext || ""}

                  <a href="
                    project-details.html?slug=${project.slug}
                  ">
                    view project >
                  </a>

                </p>

              </div>

            </div>

          </div>

        `;
    }
  });
}

loadProject();
