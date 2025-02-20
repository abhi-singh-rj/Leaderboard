let leaderboardData = [
    ["Seunghyun Lee", "California", "Bug Hunters", 1200, "https://randomuser.me/api/portraits/men/1.jpg"],
    ["Inspector Ambitious", "Texas", "Chrome", 1100, "https://randomuser.me/api/portraits/men/2.jpg"],
    ["Callum Carney", "Florida", "Android", 1050, "https://randomuser.me/api/portraits/men/3.jpg"],
    ["Ele7enxxh", "New York", "Bug Hunters", 950, "https://randomuser.me/api/portraits/men/4.jpg"],
    ["Ionial Con", "Illinois", "Chrome", 900, "https://randomuser.me/api/portraits/men/5.jpg"],
    ["Player 6", "California", "Bug Hunters", 850, "https://randomuser.me/api/portraits/men/6.jpg"],
    ["Player 7", "Texas", "Chrome", 800, "https://randomuser.me/api/portraits/men/7.jpg"],
    ["Player 8", "Florida", "Android", 750, "https://randomuser.me/api/portraits/men/8.jpg"],
];

const itemsPerPage = 20;
let currentPage = 1;

function displayTopPlayers() {
    const topPlayers = leaderboardData.slice(0, 4);
    document.getElementById("topPlayers").innerHTML = topPlayers.map(player =>
        `<div class="player-card">
            <img src="${player[4]}" alt="Profile">
            <strong>${player[0]}</strong><br>
            <div>Score: ${player[3]}</div>
            <div>Points: ${player[3]}</div>
            <div>Percentage: ${((player[3] / 1200) * 100).toFixed(2)}%</div>
        </div>`).join("");
}

function displayLeaderboard(page) {
    const start = (page - 1) * itemsPerPage;
    const paginatedPlayers = leaderboardData.slice(start, start + itemsPerPage);
    document.getElementById("leaderboardTable").innerHTML = paginatedPlayers.map((player, index) =>
        `<tr>
            <td>${start + index + 1}</td>
            <td><img src="${player[4]}" class="player-img">${player[0]}</td>
            <td>${player[1]}</td>
            <td>${player[3]}</td>
            <td>${player[3]}</td> <!-- Points column -->
            <td>${((player[3] / 1200) * 100).toFixed(2)}%</td>
        </tr>`).join("")

    document.getElementById("pageNumber").textContent = `Page ${page}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayLeaderboard(currentPage);
    }
}

function nextPage() {
    if (currentPage * itemsPerPage < leaderboardData.length) {
        currentPage++;
        displayLeaderboard(currentPage);
    }
}

function sortTable() {
    leaderboardData.sort((a, b) => b[3] - a[3]);
    displayLeaderboard(currentPage);
}

function filterLeaderboard() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const locationFilter = document.getElementById("location-filter").value;
    const programFilter = document.getElementById("program-filter").value;

    const filteredData = leaderboardData.filter(player => {
        return (!searchTerm || player[0].toLowerCase().includes(searchTerm)) &&
            (!locationFilter || player[1] === locationFilter) &&
            (!programFilter || player[2] === programFilter);
    });

    leaderboardData = filteredData;
    displayLeaderboard(1);
}

function showChart() {
    const chartWindow = window.open("", "_blank", "width=800,height=600");
    const chartContainer = chartWindow.document.createElement('div');
    chartWindow.document.body.appendChild(chartContainer);

    const canvas = document.createElement('canvas');
    chartContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const playerNames = leaderboardData.slice(0, 10).map(player => player[0]);
    const playerScores = leaderboardData.slice(0, 10).map(player => player[3]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: playerNames,
            datasets: [{
                label: 'Points',
                data: playerScores,
                backgroundColor: '#ff6600',
                borderColor: '#ff6600',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: {
                        color: '#ddd'
                    }
                },
                y: {
                    grid: {
                        color: '#ddd'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

displayTopPlayers();
displayLeaderboard(1);
