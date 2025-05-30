const tabData = [
  {
    stats: [
      { label: 'CULTURALLY ACTIVE', percent: '170%', desc: 'more likely to support arts, cultural or environmental organizations' },
      { label: 'EDUCATED & AFFLUENT', percent: '78%', desc: 'hold a college degree or higher; 61% earn $100K+' },
      { label: 'PROFESSIONALLY INFLUENCIAL', percent: '71%', desc: 'more likely to be in top management roles' },
      { label: 'DISTINCT', percent: '64%', desc: 'of CapRadio listeners are exclusive — meaning they choose CapRadio over every other radio source.' }
    ]
  },
  {
    genderPercentage: [52, 48],
    agePercentage: [17, 19, 15, 15, 34],
    incomePercentage: [60, 27, 13]
  },
  {
    genderPercentage: [50, 50],
    agePercentage: [13, 20, 2, 3, 62],
    incomePercentage: [50, 10, 40]
  }
];

const age = ['18–34', '35–44', '45–54', '55–64', '65+'];
const income = ['$100K+', '$50K–$100K', 'Under $50K'];
const gender = ['Male', 'Female'];

let currentChartInstances = [];

function showTab(index) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active-tab'));
  document.querySelectorAll('.tab-button')[index].classList.add('active-tab');

  const content = document.getElementById('tab-content');

  if (index === 0) {
    const stats = tabData[0].stats;
    content.innerHTML = `
      <div class="text-center">
        <p class="text-lg max-w-2xl mx-auto">
          CapRadio listeners are more than just listeners. They’re curious, engaged and action-oriented choosing CapRadio to stay informed, involved and inspired. Your message reaches them across platforms and across the region with trusted content that earns attention.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        ${stats.map(s => `
          <div class="rounded-xl bg-gray-100 p-6 text-center">
            <h4 class="font-bold text-sm text-[#6B1E1E]">${s.label}</h4>
            <p class="text-4xl font-bold my-2 text-[#6B1E1E]">${s.percent}</p>
            <p class="text-sm text-gray-600">${s.desc}</p>
          </div>
        `).join('')}
      </div>
      <p class="text-xs mt-4 italic text-gray-500">
        Sources: Information about where we sourced our data. Some more info and maybe a link.
      </p>
    `;
    return;
  }

  const data = tabData[index];
  const genderChartLabels = data.genderPercentage.map((v, i) => `${v}% ${gender[i]}`);
  const ageChartLabels = data.agePercentage.map((v, i) => `${v}% ${age[i]}`);
  const incomeChartLabels = data.incomePercentage.map((v, i) => `${v}% ${income[i]}`);

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-100 p-4 rounded-xl">
        <p class="text-center">CapRadio ${index === 1 ? "news" : "music"} listeners spend over <strong>$2.5 billion annually</strong> in metro area retail sales</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-xl">
        <h3 class="text-center text-lg mt-2">Gender</h3>
        <canvas id="genderChart"></canvas>
      </div>
      <div class="bg-gray-100 p-4 rounded-xl">
        <h3 class="text-center text-lg mt-2">Age Ranges</h3>
        <canvas id="ageChart"></canvas>
      </div>
      <div class="bg-gray-100 p-4 rounded-xl">
        <h3 class="text-center text-lg mt-2">Household Income</h3>
        <canvas id="incomeChart"></canvas>
      </div>
    </div>
    <p class="text-xs mt-4 italic text-gray-500">
      Sources: Information about where we sourced our data. Some more info and maybe a link or just date ranges.
    </p>
  `;

  currentChartInstances.forEach(chart => chart.destroy());
  currentChartInstances = [];

  const commonOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 12,
          boxWidth: 10
        }
      }
    }
  };

  currentChartInstances.push(new Chart(document.getElementById('genderChart'), {
    type: 'pie',
    data: {
      labels: genderChartLabels,
      datasets: [{
        data: data.genderPercentage,
        backgroundColor: ['#134C5E', '#4DA6B3'],
        borderWidth: 0
      }]
    },
    options: commonOptions
  }));

  currentChartInstances.push(new Chart(document.getElementById('ageChart'), {
    type: 'doughnut',
    data: {
      labels: ageChartLabels,
      datasets: [{
        data: data.agePercentage,
        backgroundColor: ['#E27D60', '#E8A87C', '#C38D9E', '#41B3A3', '#6B1E1E'],
        borderWidth: 0
      }]
    },
    options: commonOptions
  }));

  currentChartInstances.push(new Chart(document.getElementById('incomeChart'), {
    type: 'pie',
    data: {
      labels: incomeChartLabels,
      datasets: [{
        data: data.incomePercentage,
        backgroundColor: ['#6B1E1E', '#A63D40', '#D95D39'],
        borderWidth: 0
      }]
    },
    options: commonOptions
  }));
}

document.addEventListener("DOMContentLoaded", function () {
  showTab(0);
});
