'use strict';

const sections = document.querySelectorAll('section[id]');
const projectsContainer = document.querySelector('.projects-container');
const contactForm = document.querySelector('.contact-form');

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

    const projectThumbnailContainer = document.createElement('div');
    const projectThumbnail = document.createElement('img');
    projectThumbnailContainer.classList.add('project-thumbnail-container');
    projectThumbnail.classList.add('project-thumbnail');
    projectThumbnail.src = `./data/${projectData.thumbnail}`;

    const infoOnHover = document.createElement('div');
    infoOnHover.classList.add('project-info-on-hover');

    const logo = document.createElement('img');
    logo.src = `./data/${projectData.logo}`;
    logo.classList.add('project-logo');

    const title = document.createElement('h3');
    title.classList.add('project-title');
    title.textContent = projectData.title;

    const descriptionBlock = document.createElement('div');
    descriptionBlock.classList.add('project-block');
    descriptionBlock.innerHTML = `<h4 class="project-label">Description:</h4>
    <p class="project-description">
      ${projectData.description}
    </p>`;
    const stacksBlock = document.createElement('div');
    stacksBlock.classList.add('project-block');
    stacksBlock.innerHTML = `<h4 class="project-label">Stacks:</h4>
    <p class="project-stacks">
      ${projectData.stacks}
    </p>`;

    infoOnHover.append(logo);
    infoOnHover.append(title);
    infoOnHover.append(descriptionBlock);
    infoOnHover.append(stacksBlock);

    projectThumbnailContainer.append(projectThumbnail);
    projectEl.append(projectThumbnailContainer);
    projectEl.append(infoOnHover);

    projectEl.addEventListener('click', () => {
      window.open(projectData.url, '_blank').focus();
    });

    projectEl.addEventListener('mouseover', () => {
      projectThumbnail.classList.add('blur');
    });

    projectEl.addEventListener('mouseleave', () => {
      projectThumbnail.classList.remove('blur');
    });

    projectsContainer.append(projectEl);
  });
}

loadProjects();

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const myForm = e.target;
  const formData = new FormData(myForm);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log('Form successfully submitted'))
    .catch(console.error);
});
