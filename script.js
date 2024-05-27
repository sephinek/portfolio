const sections = document.querySelectorAll('section[id]');
const projectsContainer = document.querySelector('.projects-container');

window.addEventListener('scroll', navActive);

function navActive() {
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');

    if (sectionId === 'contact') {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        const starBtnImg = document.querySelector(
          `.star-btn-img.star-btn-img-${sectionId}`
        );
        starBtnImg.src = '/img/star-btn-active.png';
      } else {
        const starBtnImg = document.querySelector(
          `.star-btn-img.star-btn-img-${sectionId}`
        );
        starBtnImg.src = '/img/star-btn-inactive.png';
      }
    } else {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        const btnInHeader = document.querySelector(
          `.nav-menu.nav-menu-${sectionId}`
        );
        const starBtnImg = document.querySelector(
          `.star-btn-img.star-btn-img-${sectionId}`
        );
        btnInHeader.classList.add('active');
        starBtnImg.src = '/img/star-btn-active.png';
      } else {
        const btnInHeader = document.querySelector(
          `.nav-menu.nav-menu-${sectionId}`
        );
        const starBtnImg = document.querySelector(
          `.star-btn-img.star-btn-img-${sectionId}`
        );
        btnInHeader.classList.remove('active');
        starBtnImg.src = './img/star-btn-inactive.png';
      }
    }
  });
}

async function fetchProjects() {
  const res = await fetch('./data/projects.json');
  const projects = await res.json();
  return projects;
}

async function loadProjects() {
  const projectsData = await fetchProjects();

  await projectsData.forEach((projectData) => {
    const projectEl = document.createElement('div');
    projectEl.classList.add('project');

    const projectThumbnail = document.createElement('img');
    projectThumbnail.classList.add('project-thumbnail');
    projectThumbnail.src = `./data/${projectData.thumbnail}`;

    projectEl.append(projectThumbnail);

    const onHoverInfo = document.createElement('div');

    projectEl.addEventListener('mouseover', () => {
      projectThumbnail.classList.add('project-thumbnail-blur');
    });

    projectEl.addEventListener('mouseleave', () => {
      projectThumbnail.classList.remove('project-thumbnail-blur');
    });

    projectsContainer.append(projectEl);
  });
}

// loadProjects();
