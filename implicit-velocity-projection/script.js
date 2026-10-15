// Paste a public or unlisted YouTube URL here when ready.
// Example formats: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID
const resources = { youtube: 'https://www.youtube.com/watch?v=E-jOMLrl_tw', paper: 'assets/sa26conference-ivp_nocc.pdf', code: 'https://github.com/medialab-ku/ImplicitVelocityProjection' };
for (const name of ['paper', 'code']) {
  if (!resources[name]) continue;
  const link = document.getElementById(`${name}-link`);
  link.href = resources[name];
  link.hidden = false;
}

function youtubeId(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    let id = '';
    if (host === 'youtu.be') id = url.pathname.slice(1).split('/')[0];
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'].includes(host)) {
      id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] || '';
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

const id = youtubeId(resources.youtube);
const player = document.getElementById('demo-video');
if (id) {
  const embed = `https://www.youtube-nocookie.com/embed/${id}`;
  player.src = `${embed}?rel=0`;
  player.hidden = false;
  document.getElementById('video-placeholder').hidden = true;
  document.querySelector('.chapters').hidden = false;
  document.querySelectorAll('[data-time]').forEach(link => {
    const seconds = Math.floor(Number(link.dataset.time));
    link.href = `https://www.youtube.com/watch?v=${id}&t=${seconds}s`;
    link.addEventListener('click', event => {
      event.preventDefault();
      player.src = `${embed}?rel=0&autoplay=1&start=${seconds}`;
      document.getElementById('demo').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  });
}
