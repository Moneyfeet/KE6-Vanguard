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
  const container = document.getElementById('newsContainer');
  const gameSection = document.getElementById('game-section');
  const gameHeading = gameSection.querySelector('h1');
  const gameParagraph = gameSection.querySelector('p');

  // Loading state
  container.innerHTML = `<p style="text-align:center; color:#66fcf1;">Loading news...</p>`;

  fetch('news-dat.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      const articles = data.articles;
      container.innerHTML = ''; // clear loader

      if (!articles || articles.length === 0) {
        // No news available
        gameHeading.textContent = 'There is currently no event or news';
        gameParagraph.textContent = 'While you wait...';
        gameSection.style.display = 'block';
        return;
      }

      // Populate news cards
      articles.forEach(article => {
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
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading news:', error);
      // Show fallback game section
      gameHeading.textContent = 'There is currently no event or news';
      gameParagraph.textContent = 'While you wait...';
      gameSection.style.display = 'block';
    });
});

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

