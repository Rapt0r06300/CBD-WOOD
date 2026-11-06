(() => {
  if (!/\.github\.io$/iu.test(window.location.hostname)) return;

  const currentScript = document.currentScript;
  if (!currentScript) return;

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const inDemo = window.location.pathname.split('/').includes('demo');
  const inBaseAlias = window.location.pathname.split('/').includes('base');
  const projectRoot = new URL(inDemo || inBaseAlias ? '../' : './', currentScript.src);
  const demoHref = new URL(`demo/${currentFile}`, projectRoot).href;
  const baseHref = new URL(currentFile, projectRoot).href;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('github-pages-switch.css?v=wood-pages-switch-v2-20261106', currentScript.src).href;
  document.head.append(stylesheet);

  const switcher = document.createElement('nav');
  switcher.className = 'github-pages-switch';
  switcher.setAttribute('aria-label', 'Choisir la version du site');
  switcher.innerHTML = `<span>VERSION</span><a href="${demoHref}"${inDemo ? ' aria-current="page"' : ''}>DÉMO</a><a href="${baseHref}"${inDemo ? '' : ' aria-current="page"'}>BASE</a>`;
  const header = document.querySelector('.nav');
  (header || document.body).append(switcher);
})();
