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

const colors = ['text-[#9E2A2F]', 'text-[#1C6380]', 'text-[#861766]', 'text-[#EC4F2E]'];
const darkColors = ['text-[#5C0000]', 'text-[#002B3C]', 'text-[#4A1740]', 'text-[#9E2A2F]'];

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
      <div class="max-w-[585px] mb-[24px] md:mb-[32px]">
        <p class="h-[90px] text-[18px] leading-[24px]">
          CapRadio listeners are more than just listeners. They’re curious, engaged and action-oriented choosing CapRadio to stay informed, involved and inspired. Your message reaches them across platforms and across the region with trusted content that earns attention.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
      ${stats.map((s, i) => `
        <div class="w-[300px] h-[190px] grid justify-between rounded-[40px] bg-gray-100 p-[24px] text-center">
          <h4 class="font-semibold text-[14px] leading-[15px] ${colors[i]}">${s.label}</h4>
          <p class="text-[49px] leading-[58.8px] font-semibold ${colors[i]}">${s.percent}</p>
          <p class="${darkColors[i]}">${s.desc}</p>
        </div>
      `).join('')}
      </div>
      <p class="text-[14px] mt-[12px] italic text-[#2e3033]">
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
    <div class="leading-[21px] grid content-center grid-cols-1 md:grid-cols-2 gap-[16px]">
      <div class="bg-gray-100 p-[16px] rounded-[40px]">
        <p class="text-center">CapRadio ${index === 1 ? "news" : "music"} listeners spend over <strong>$2.5 billion annually</strong> in metro area retail sales</p>
      </div>
      <div class="bg-gray-100 grid justify-center p-[16px] rounded-[40px] h-[240px]">
        <h5 class="text-center relative top-[32px]">GENDER</h5>
        <canvas id="genderChart"></canvas>
      </div>
      <div class="bg-gray-100 grid justify-center p-[16px] rounded-[40px] h-[300px]">
        <h5 class="text-center relative top-[28px]">AGE RANGES</h5>
        <canvas id="ageChart"></canvas>
      </div>
      <div class="bg-gray-100 grid justify-center p-[16px] rounded-[40px] h-[300px]">
        <h5 class="text-center relative top-[28px]">HOUSEHOLD INCOME</h5>
        <canvas id="incomeChart"></canvas>
      </div>
    </div>
    <p class="text-[14px] mt-[12px] italic text-[#2e3033]">
      Sources: Information about where we sourced our data. Some more info and maybe a link.
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
        backgroundColor: ['#1C6380E5', '#00A3BAE5'],
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
