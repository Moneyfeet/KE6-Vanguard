fetch("lib/schedule.json")
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("matches-table");

    Object.values(data).forEach(match => {
      const row = document.createElement("tr");
      const status = match.score1 === '#' || match.score2 === '#' ? 'Upcoming' : (match.score1 > match.score2 ? 'Loss': 'Win');
      const statusClass = match.score1 === '#' || match.score2 === '#' ? 'upcoming' : (match.score1 > match.score2 ? 'result loss' : 'result win');
      row.innerHTML = `
        <td>${match.datetime}</td>
        <td>${match.opponent}</td>
        <td>${match.score1} - ${match.score2}</td>
        <td class="${statusClass}">${status}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error(err));
