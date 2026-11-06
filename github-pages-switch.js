(() => {
  if (!/\.github\.io$/iu.test(window.location.hostname)) return;

  const currentScript = document.currentScript;
  if (!currentScript) return;

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const inBase = window.location.pathname.split('/').includes('base');
  const projectRoot = new URL(inBase ? '../' : './', window.location.href);
  const demoHref = new URL(currentFile, projectRoot).href;
  const baseHref = new URL(`base/${currentFile}`, projectRoot).href;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('github-pages-switch.css', currentScript.src).href;
  document.head.append(stylesheet);

  const switcher = document.createElement('nav');
  switcher.className = 'github-pages-switch';
  switcher.setAttribute('aria-label', 'Choisir la version du site');
  switcher.innerHTML = `<span>VERSION</span><a href="${demoHref}"${inBase ? '' : ' aria-current="page"'}>DÉMO</a><a href="${baseHref}"${inBase ? ' aria-current="page"' : ''}>BASE</a>`;
  document.body.append(switcher);
})();
