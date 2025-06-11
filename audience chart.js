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
        <p class="text-[18px] leading-[24px] mt-[16px] sm:mt-0 md:h-[90px]">
          CapRadio listeners are more than just listeners. They’re curious, engaged and action-oriented choosing CapRadio to stay informed, involved and inspired. Your message reaches them across platforms and across the region with trusted content that earns attention.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
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
      <div class="bg-gray-100 grid gap-[8px] justify-items-center content-center p-[24px] rounded-[40px] max-w-[329px]">
        <svg class="w-[61px] fill-[#9E2A2FCC]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5 .6 9.1 .9 13.7 .9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1 .8-12.1 1.2-18.2 1.2z"/></svg>
        <p class="text-center text-[#5C0000]">CapRadio ${index === 1 ? "news" : "music"} listeners spend over <strong>$2.5 billion annually</strong> in metro area retail sales</p>
      </div>
      <div class="bg-gray-100 grid justify-center p-[16px] rounded-[40px] max-w-[329px] h-[240px]">
        <h5 class="text-center relative top-[32px]">GENDER</h5>
        <canvas id="genderChart"></canvas>
      </div>
      <div class="bg-gray-100 grid justify-center p-[16px] rounded-[40px] max-w-[329px] h-[300px]">
        <h5 class="text-center relative top-[28px]">AGE RANGES</h5>
        <canvas id="ageChart"></canvas>
      </div>
      <div class="bg-gray-100 grid justify-center p-[16px] rounded-[40px] max-w-[329px] h-[300px]">
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
        // disable label pointer events
        onClick: () => {},
        onHover: e => {
          e.native.target.style.cursor = 'default';
        },
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
        backgroundColor: ['#E49A23E5', '#EC4F2EE5', '#9E2A2FE5', '#1C6380E5', '#009B79E5'],
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
        backgroundColor: ['#5C0000E5', '#9E2A2FE5', '#C53834E5'],
        borderWidth: 0
      }]
    },
    options: commonOptions
  }));
}

document.addEventListener("DOMContentLoaded", function () {
  showTab(0);
});
