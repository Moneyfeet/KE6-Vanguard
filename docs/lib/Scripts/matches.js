fetch("lib/schedule.json")
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("matches-table");

    Object.values(data).forEach(match => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${match.datetime}</td>
        <td>${match.opponent}</td>
        <td>${match.score1} - ${match.score2}</td>
        <td>Unknown</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error(err));
