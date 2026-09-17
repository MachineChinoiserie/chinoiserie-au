(() => {
  'use strict';
  const viewer = document.getElementById('work-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const works = Array.from(document.querySelectorAll('.drawing-open'));
  const image = document.getElementById('viewer-image');
  const title = document.getElementById('viewer-title');
  const position = document.getElementById('viewer-position');
  const previous = document.getElementById('viewer-previous');
  const next = document.getElementById('viewer-next');
  let current = 0;
  let opener = null;

  function showWork(index) {
    if (index < 0 || index >= works.length) return;
    current = index;
    const work = works[index];
    image.src = work.href;
    image.alt = work.querySelector('img').alt;
    title.textContent = work.dataset.title;
    position.textContent = `${index + 1} / ${works.length}`;
    previous.disabled = index === 0;
    next.disabled = index === works.length - 1;
  }

  document.querySelectorAll('a[data-work]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      showWork(Number(link.dataset.work));
      viewer.showModal();
      document.body.classList.add('viewer-open');
    });
  });
  previous.addEventListener('click', () => showWork(current - 1));
  next.addEventListener('click', () => showWork(current + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showWork(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    image.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
