Chart.defaults.font.family = "'IBM Plex Mono', monospace";
Chart.defaults.color = '#7C9199';

// ---- Dial (CSAT gauge) ----
const csatScore = 87;
new Chart(document.getElementById('dialChart'), {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [csatScore, 100 - csatScore],
      backgroundColor: ['#E8A23D', '#1C2E33'],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
      cutout: '78%'
    }]
  },
  options: {
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    events: []
  }
});
document.querySelector('.dial-wrap').insertAdjacentHTML('beforeend',
  `<div class="dial-num">${csatScore}<span>/100</span></div>`);

// ---- Sentiment donut ----
const sentData = [
  { name: 'Delighted', value: 38, color: '#4FA9A2' },
  { name: 'Satisfied', value: 34, color: '#7FBFA9' },
  { name: 'Neutral', value: 16, color: '#7C9199' },
  { name: 'Frustrated', value: 9, color: '#E8A23D' },
  { name: 'Angry', value: 3, color: '#D9704F' },
];
new Chart(document.getElementById('sentimentDonut'), {
  type: 'doughnut',
  data: {
    labels: sentData.map(d => d.name),
    datasets: [{ data: sentData.map(d => d.value), backgroundColor: sentData.map(d => d.color), borderWidth: 0, cutout: '68%' }]
  },
  options: { plugins: { legend: { display: false } } }
});
document.getElementById('sentLegend').innerHTML = sentData.map(d => `
  <div class="legend-item">
    <span class="name"><span class="swatch" style="background:${d.color}"></span>${d.name}</span>
    <span class="num">${d.value}%</span>
  </div>`).join('');

// ---- Volume + CSAT trend ----
const days = ['Jun 28', 'Jun 29', 'Jun 30', 'Jul 1', 'Jul 2', 'Jul 3', 'Jul 4'];
new Chart(document.getElementById('volumeChart'), {
  data: {
    labels: days,
    datasets: [
      {
        type: 'bar',
        label: 'Tickets',
        data: [412, 388, 455, 502, 470, 398, 360],
        backgroundColor: 'rgba(124,145,153,0.35)',
        borderRadius: 4,
        yAxisID: 'y'
      },
      {
        type: 'line',
        label: 'CSAT',
        data: [84, 85, 83, 86, 87, 88, 87],
        borderColor: '#E8A23D',
        backgroundColor: '#E8A23D',
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: '#E8A23D',
        yAxisID: 'y1'
      }
    ]
  },
  options: {
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: { position: 'left', grid: { color: 'rgba(237,234,226,0.06)' }, ticks: { color: '#7C9199' } },
      y1: { position: 'right', min: 70, max: 100, grid: { display: false }, ticks: { color: '#E8A23D' } },
      x: { grid: { display: false } }
    },
    plugins: { legend: { labels: { color: '#EDEAE2', boxWidth: 10, font: { size: 11 } } } }
  }
});

// ---- Channel bar ----
const channels = ['Chat', 'Email', 'Phone', 'Social', 'Self-serve'];
new Chart(document.getElementById('channelChart'), {
  type: 'bar',
  data: {
    labels: channels,
    datasets: [{
      data: [1240, 860, 540, 310, 980],
      backgroundColor: ['#4FA9A2', '#E8A23D', '#D9704F', '#7C9199', '#7FBFA9'],
      borderRadius: 6,
      barThickness: 34
    }]
  },
  options: {
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(237,234,226,0.06)' }, ticks: { color: '#7C9199' } },
      y: { grid: { display: false }, ticks: { color: '#EDEAE2', font: { size: 12 } } }
    }
  }
});

// ---- Issues table ----
const issues = [
  { name: 'Billing discrepancy after plan upgrade', mentions: 186, sev: 'crit', pct: 82 },
  { name: 'Mobile app login failures (OTP delay)', mentions: 142, sev: 'crit', pct: 68 },
  { name: 'Shipment tracking not updating', mentions: 97, sev: 'warn', pct: 48 },
  { name: 'Refund processing time too long', mentions: 74, sev: 'warn', pct: 39 },
  { name: 'Confusing onboarding checklist', mentions: 41, sev: 'watch', pct: 22 },
];
document.getElementById('issuesBody').innerHTML = issues.map(i => `
  <tr>
    <td>${i.name}<div class="bar-mini"><i style="width:${i.pct}%"></i></div></td>
    <td style="font-family:'IBM Plex Mono',monospace;">${i.mentions}</td>
    <td><span class="tag ${i.sev}">${i.sev === 'crit' ? 'Critical' : i.sev === 'warn' ? 'Watch' : 'Low'}</span></td>
  </tr>`).join('');

// ---- Feedback stream ----
const feed = [
  { initials: 'RM', name: 'Riya M.', channel: 'Chat', time: '2m ago', quote: 'Support fixed my billing issue in under 10 minutes. Genuinely impressed.', sentiment: '#4FA9A2' },
  { initials: 'AK', name: 'Arjun K.', channel: 'Email', time: '11m ago', quote: 'Third time reporting the same tracking bug. Please escalate this.', sentiment: '#D9704F' },
  { initials: 'SP', name: 'Sneha P.', channel: 'Phone', time: '24m ago', quote: 'Agent was polite but the wait time was almost 40 minutes.', sentiment: '#E8A23D' },
  { initials: 'VT', name: 'Vikram T.', channel: 'Social', time: '38m ago', quote: 'Loving the new self-serve refund flow, much faster than before.', sentiment: '#4FA9A2' },
  { initials: 'NJ', name: 'Neha J.', channel: 'Chat', time: '52m ago', quote: 'Bot could not understand my query, had to restart the conversation twice.', sentiment: '#E8A23D' },
];
document.getElementById('feedList').innerHTML = feed.map(f => `
  <div class="feed-item">
    <div class="avatar">${f.initials}</div>
    <div class="feed-body">
      <div class="feed-top">
        <span><span class="feed-name">${f.name}</span> · ${f.channel}</span>
        <span>${f.time}</span>
      </div>
      <div class="feed-quote"><span class="sent-mark" style="background:${f.sentiment}"></span>${f.quote}</div>
    </div>
  </div>`).join('');

// ---- Range button interactivity ----
document.querySelectorAll('.range button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.range button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
