var dosbox = new Dosbox({
    id: 'dosbox',
    onload: function (dosbox) {
        dosbox.run('lib/Doom/jsdoom/roms/ultimate-doom.zip',"./UltDoom/DOOM.EXE");
    },
    onrun: function (dosbox, app) {
        console.log("App '" + app + " is running");
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const newsPanel = document.getElementById('news-panel');
  const eventPanel = document.getElementById('event-panel');
  const gameSection = document.getElementById('game-section');
  const gameHeading = gameSection.querySelector('h1');
  const gameParagraph = gameSection.querySelector('p');

  fetch('../lib/news-data.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      const articles = data.articles;
      
      if (!articles || articles.length === 0) {
        // No news available
        gameHeading.textContent = 'There is currently no event or news';
        gameParagraph.textContent = 'While you wait...';
        gameSection.style.display = 'block';
        document.getElementById('news-section').style.display = 'none';
        return;
      }

      // Separate articles by type
      const newsArticles = articles.filter(a => a.type === 'news');
      const eventArticles = articles.filter(a => a.type === 'events');

      // Populate news cards
      newsArticles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <img src="${article.image}" alt="News Image">
          <div class="news-card-content">
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </div>
        `;
        newsPanel.appendChild(card);
      });

      // Populate event cards
      eventArticles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <img src="${article.image}" alt="News Image">
          <div class="news-card-content">
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </div>
        `;
        eventPanel.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading news:', error);
      // Show fallback game section
      gameHeading.textContent = 'There is currently no event or news';
      gameParagraph.textContent = 'While you wait...';
      gameSection.style.display = 'block';
      document.getElementById('news-section').style.display = 'none';
    });
});
// toggle game display
const btn = document.getElementById('gameBtn')
let show = false
btn.addEventListener('click', function() {
    if (!show) {
        show = true
        document.getElementById('dosbox').style.display = 'block';
        document.getElementById('fullscreen').style.display = 'block';
    } else {
        document.getElementById('dosbox').style.display = 'none';
        document.getElementById('fullscreen').style.display = 'none';
        show = false
    }
});

// Toggle accordion panels
function togglePanel(panelId) {
  const panel = document.getElementById(panelId);
  const button = event.target.closest('.accordion');
  const arrow = button.querySelector('.arrow');
  
  if (panel.style.display === 'grid') {
    panel.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    panel.style.display = 'grid';
    arrow.style.transform = 'rotate(180deg)';
  }
}

