// Martian Habitat Dashboard JS

// User data with privileges
let users = [
  { id: 1, name: 'Dheeraj Chennaboina', role: 'Commander', bio: 'Lead astronaut.', alerts: ['Hydration reminder'], personalNotes: '', privileges: ['read', 'write', 'admin', 'medical', 'research', 'navigation'] },
  { id: 2, name: 'Tarushv Kosgi', role: 'Engineer', bio: 'Systems engineer.', alerts: ['Sleep cycle alert'], personalNotes: '', privileges: ['read', 'write'] },
  { id: 3, name: 'Abhinav Boora', role: 'Scientist', bio: 'Research scientist.', alerts: ['Mental wellness check'], personalNotes: '', privileges: ['read', 'research'] },
  { id: 4, name: 'Lalith Dasa', role: 'Medic', bio: 'Medical officer.', alerts: ['Exercise reminder'], personalNotes: '', privileges: ['read', 'medical'] },
  { id: 5, name: 'Crew Member 5', role: 'Technician', bio: 'Maintenance tech.', alerts: [], personalNotes: '', privileges: ['read'] },
  { id: 6, name: 'Crew Member 6', role: 'Pilot', bio: 'Mission pilot.', alerts: [], personalNotes: '', privileges: ['read', 'navigation'] }
];

let currentUser = null;

// Data storage with timestamps
let data = {
  oxygen: [],
  interiorTemp: [],
  exteriorTemp: [],
  food: [],
  power: [],
  sleep: [],
  wellness: []
};

let startTime = Date.now();

// Alert history
let alertHistory = [];

// Charts
let charts = {};



// Normal distribution random function for realistic noise
function randomNormal(mean, std) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  let z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + z * std;
}

// Initialize charts
function initCharts() {
  const ctxOxygen = document.getElementById('oxygen-chart').getContext('2d');
  charts.oxygen = new Chart(ctxOxygen, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Oxygen %',
        data: [],
        borderColor: '#00d4ff',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: 'rgba(0, 212, 255, 0.1)'
      }]
    },
     options: {
       responsive: true,
       animation: { duration: 0 },
       scales: {
        x: {
          type: 'time',
          time: { unit: 'second', displayFormats: { second: 'mm:ss' } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          min: 18,
          max: 22,
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#e0e0e0' }
        }
       },
        plugins: {
          legend: { labels: { color: '#e0e0e0' } },
          tooltip: {
           callbacks: {
             label: function(context) {
               const value = context.parsed.y;
               const warning = value < 19 ? ' (WARNING: Low oxygen!)' : '';
               return `Oxygen: ${value.toFixed(1)}%${warning}`;
             }
           },
           backgroundColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return value < 19 ? 'rgba(255, 59, 48, 0.9)' : 'rgba(0, 212, 255, 0.9)';
           },
           titleColor: '#ffffff',
           bodyColor: '#ffffff',
           borderColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return value < 19 ? 'rgba(255, 59, 48, 1)' : 'rgba(0, 212, 255, 1)';
           },
           borderWidth: 1
         }
       }
     }
   });

    const ctxInteriorTemp = document.getElementById('interior-temp-chart').getContext('2d');
  charts.interiorTemp = new Chart(ctxInteriorTemp, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Interior Temperature °C',
        data: [],
        borderColor: '#ff6b6b',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: 'rgba(255, 107, 107, 0.1)'
      }]
    },
     options: {
       responsive: true,
       animation: { duration: 0 },
       scales: {
        x: {
          type: 'time',
          time: { unit: 'second', displayFormats: { second: 'mm:ss' } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          min: 0,
          max: 25,
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#e0e0e0' }
        }
       },
        plugins: {
          legend: { labels: { color: '#e0e0e0' } },
          tooltip: {
           callbacks: {
             label: function(context) {
               const value = context.parsed.y;
               const warning = value > 25 ? ' (WARNING: High temperature!)' : '';
               return `Interior Temp: ${value.toFixed(1)}°C${warning}`;
             }
           },
           backgroundColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return value > 25 ? 'rgba(255, 59, 48, 0.9)' : 'rgba(255, 107, 107, 0.9)';
           },
           titleColor: '#ffffff',
           bodyColor: '#ffffff',
           borderColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return value > 25 ? 'rgba(255, 59, 48, 1)' : 'rgba(255, 107, 107, 1)';
           },
           borderWidth: 1
         }
       }
     }
   });

    const ctxExteriorTemp = document.getElementById('exterior-temp-chart').getContext('2d');
  charts.exteriorTemp = new Chart(ctxExteriorTemp, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Exterior Temperature °C',
        data: [],
        borderColor: '#ff4500',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: 'rgba(255, 69, 0, 0.1)'
      }]
    },
     options: {
       responsive: true,
       animation: { duration: 0 },
       scales: {
        x: {
          type: 'time',
          time: { unit: 'second', displayFormats: { second: 'mm:ss' } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          min: -60,
          max: 40,
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#e0e0e0' }
        }
       },
        plugins: {
          legend: { labels: { color: '#e0e0e0' } },
          tooltip: {
           callbacks: {
             label: function(context) {
               const value = context.parsed.y;
               const warning = (value < -50 || value > 30) ? ' (WARNING: Extreme conditions!)' : '';
               return `Exterior Temp: ${value.toFixed(1)}°C${warning}`;
             }
           },
           backgroundColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return (value < -50 || value > 30) ? 'rgba(255, 59, 48, 0.9)' : 'rgba(255, 69, 0, 0.9)';
           },
           titleColor: '#ffffff',
           bodyColor: '#ffffff',
           borderColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return (value < -50 || value > 30) ? 'rgba(255, 59, 48, 1)' : 'rgba(255, 69, 0, 1)';
           },
           borderWidth: 1
         }
       }
     }
   });

   const ctxFood = document.getElementById('food-chart').getContext('2d');
  charts.food = new Chart(ctxFood, {
    type: 'bar',
    data: { labels: ['Current'], datasets: [{ label: 'Food Inventory %', data: [], backgroundColor: '#4ecdc4' }] },
     options: {
       responsive: true,
       animation: { duration: 0 },
       scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#e0e0e0' }
        },
        x: { ticks: { color: '#e0e0e0' } }
       },
        plugins: {
          legend: { labels: { color: '#e0e0e0' } },
          tooltip: {
           callbacks: {
             label: function(context) {
               const value = context.parsed.y;
               const warning = value < 20 ? ' (WARNING: Low food!)' : '';
               return `Food Inventory: ${value.toFixed(1)}%${warning}`;
             }
           },
           backgroundColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return value < 20 ? 'rgba(255, 59, 48, 0.9)' : 'rgba(78, 205, 196, 0.9)';
           },
           titleColor: '#ffffff',
           bodyColor: '#ffffff',
           borderColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return value < 20 ? 'rgba(255, 59, 48, 1)' : 'rgba(78, 205, 196, 1)';
           },
           borderWidth: 1
         }
       }
     }
   });

   const ctxPower = document.getElementById('power-chart').getContext('2d');
  charts.power = new Chart(ctxPower, {
    type: 'doughnut',
    data: { labels: ['Used', 'Available'], datasets: [{ data: [], backgroundColor: ['#ffa726', '#66bb6a'] }] },
     options: {
       responsive: true,
       animation: { duration: 0 },
        plugins: {
          legend: { labels: { color: '#e0e0e0' } },
          tooltip: {
           callbacks: {
             label: function(context) {
               const label = context.label || '';
               const value = context.parsed;
               const warning = label === 'Used' && value > 90 ? ' (WARNING: High usage!)' : '';
               return `${label}: ${value}%${warning}`;
             }
           },
           backgroundColor: function(context) {
             const label = context.tooltip.dataPoints[0].label;
             const value = context.tooltip.dataPoints[0].parsed;
             return (label === 'Used' && value > 90) ? 'rgba(255, 59, 48, 0.9)' : 'rgba(255, 167, 38, 0.9)';
           },
           titleColor: '#ffffff',
           bodyColor: '#ffffff',
           borderColor: function(context) {
             const label = context.tooltip.dataPoints[0].label;
             const value = context.tooltip.dataPoints[0].parsed;
             return (label === 'Used' && value > 90) ? 'rgba(255, 59, 48, 1)' : 'rgba(255, 167, 38, 1)';
           },
           borderWidth: 1
         }
       }
     }
   });

    const ctxSleep = document.getElementById('sleep-chart').getContext('2d');
  charts.sleep = new Chart(ctxSleep, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Sleep Hours',
        data: [],
        borderColor: '#ab47bc',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: 'rgba(171, 71, 188, 0.1)'
      }]
    },
     options: {
       responsive: true,
       animation: { duration: 0 },
       scales: {
        x: {
          type: 'time',
          time: { unit: 'second', displayFormats: { second: 'mm:ss' } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          beginAtZero: true,
          max: 10,
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#e0e0e0' }
        }
       },
        plugins: {
          legend: { labels: { color: '#e0e0e0' } },
          tooltip: {
           callbacks: {
             label: function(context) {
               const value = context.parsed.y;
               const warning = value < 6 ? ' (WARNING: Insufficient sleep!)' : '';
               return `Sleep: ${value.toFixed(1)}h${warning}`;
             }
           },
           backgroundColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return value < 6 ? 'rgba(255, 59, 48, 0.9)' : 'rgba(171, 71, 188, 0.9)';
           },
           titleColor: '#ffffff',
           bodyColor: '#ffffff',
           borderColor: function(context) {
             const value = context.tooltip.dataPoints[0].parsed.y;
             return value < 6 ? 'rgba(255, 59, 48, 1)' : 'rgba(171, 71, 188, 1)';
           },
           borderWidth: 1
         }
       }
     }
   });

   const ctxWellness = document.getElementById('wellness-chart').getContext('2d');
  charts.wellness = new Chart(ctxWellness, {
    type: 'radar',
    data: { labels: ['Stress', 'Mood', 'Energy'], datasets: [{ label: 'Wellness', data: [], backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: '#ff6384' }] },
     options: {
       responsive: true,
       animation: { duration: 0 },
       scales: {
        r: {
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#e0e0e0' },
          pointLabels: { color: '#e0e0e0' }
        }
       },
        plugins: {
          legend: { labels: { color: '#e0e0e0' } },
          tooltip: {
           callbacks: {
             label: function(context) {
               const label = context.label || '';
               const value = context.parsed.r;
               return `${label}: ${value.toFixed(1)}`;
             }
           },
           backgroundColor: 'rgba(255, 99, 132, 0.9)',
           titleColor: '#ffffff',
           bodyColor: '#ffffff',
           borderColor: 'rgba(255, 99, 132, 1)',
           borderWidth: 1
         }
       }
     }
   });
 }

// Update data with sine waves for smooth variation
function updateData() {
  const t = (Date.now() - startTime) / 1000; // time in seconds

  // Simulate data with sine waves plus realistic noise (slower, clamped)
  const oxygen = Math.max(18, Math.min(22, 20 + 0.5 * Math.sin(t * 0.1) + randomNormal(0, 0.1)));
  const interiorTemp = Math.max(0, Math.min(25, 10 + 5 * Math.sin(t * 0.05) + randomNormal(0, 0.5)));
  const exteriorTemp = Math.max(-60, Math.min(40, -10 + 30 * Math.sin(t * 0.02) + randomNormal(0, 2)));
  const food = 80 + 10 * Math.sin(t * 0.2) + randomNormal(0, 2);
  const power = 65 + 15 * Math.sin(t * 0.4) + randomNormal(0, 3);
  const sleep = 7.5 + 1.5 * Math.sin(t * 0.6) + randomNormal(0, 0.5);
  const wellness = [
    5 + 2 * Math.sin(t * 0.7) + randomNormal(0, 0.5),
    5 + 2 * Math.sin(t * 0.8) + randomNormal(0, 0.5),
    5 + 2 * Math.sin(t * 0.9) + randomNormal(0, 0.5)
  ];

  const now = new Date();

  // Update arrays
  data.oxygen.push({ x: now, y: oxygen });
  data.interiorTemp.push({ x: now, y: interiorTemp });
  data.exteriorTemp.push({ x: now, y: exteriorTemp });
  data.food = [food];
  data.power = [power, 100 - power];
  data.sleep.push({ x: now, y: sleep });
  data.wellness = wellness;

  // Limit data points to 100
  if (data.oxygen.length > 100) data.oxygen.shift();
  if (data.interiorTemp.length > 100) data.interiorTemp.shift();
  if (data.exteriorTemp.length > 100) data.exteriorTemp.shift();
  if (data.sleep.length > 100) data.sleep.shift();

  // Update current values
  document.getElementById('oxygen-val').textContent = oxygen.toFixed(1) + '%';
  document.getElementById('temp-val').textContent = interiorTemp.toFixed(1) + '°C';
  document.getElementById('food-val').textContent = food.toFixed(1) + '%';
  document.getElementById('power-val').textContent = power.toFixed(1) + '%';
  document.getElementById('sleep-val').textContent = sleep.toFixed(1) + 'h';
  document.getElementById('wellness-val').textContent = wellness.reduce((a, b) => a + b) / 3 > 5 ? 'Good' : 'Needs Attention';

  // Update charts
  charts.oxygen.data.datasets[0].data = [...data.oxygen];
  charts.oxygen.update();

  charts.interiorTemp.data.datasets[0].data = [...data.interiorTemp];
  charts.interiorTemp.update();

  charts.exteriorTemp.data.datasets[0].data = [...data.exteriorTemp];
  charts.exteriorTemp.update();

  charts.food.data.datasets[0].data = [...data.food];
  charts.food.update();

  charts.power.data.datasets[0].data = [...data.power];
  charts.power.update();

  charts.sleep.data.datasets[0].data = [...data.sleep];
  charts.sleep.update();

  charts.wellness.data.datasets[0].data = [...data.wellness];
  charts.wellness.update();

  // Check alerts
  checkAlerts();
}

// Check alerts
function checkAlerts() {
  let alerts = [];
  const latestOxygen = data.oxygen[data.oxygen.length - 1]?.y || 20;
  const latestInteriorTemp = data.interiorTemp[data.interiorTemp.length - 1]?.y || 10;
  const latestExteriorTemp = data.exteriorTemp[data.exteriorTemp.length - 1]?.y || -10;
  const latestSleep = data.sleep[data.sleep.length - 1]?.y || 7.5;

  if (latestOxygen < 19) alerts.push('Low oxygen alert!');
  if (latestInteriorTemp > 25) alerts.push('High interior temperature alert!');
  if (latestExteriorTemp < -50) alerts.push('Extreme cold exterior alert!');
  if (latestExteriorTemp > 30) alerts.push('Extreme heat exterior alert!');
  if (data.food[0] < 20) alerts.push('Low food inventory!');
  if (data.power[0] > 90) alerts.push('High power usage!');
  if (latestSleep < 6) alerts.push('Insufficient sleep!');

  // User-specific alerts
  users.forEach(user => {
    user.alerts.forEach(alert => alerts.push(`${user.name}: ${alert}`));
  });

  document.getElementById('alert-list').innerHTML = alerts.map(a => `<div class="alert">${a}<button class="acknowledge-btn" data-alert="${a}">Acknowledge</button></div>`).join('');
}

// Get prevention tips based on alerts
function getPreventionTips(alerts) {
  const tips = {
    'Hydration reminder': 'Drink water regularly throughout the day to stay hydrated.',
    'Sleep cycle alert': 'Maintain a consistent sleep schedule and aim for 7-8 hours of sleep.',
    'Mental wellness check': 'Practice mindfulness, meditation, or engage in relaxing activities.',
    'Exercise reminder': 'Incorporate daily physical activity like walking or stretching.'
  };
  return alerts.map(alert => `<li>${tips[alert] || 'Follow general health guidelines.'}</li>`).join('');
}

// Get icon based on role
function getRoleIcon(role) {
  const icons = {
    'Commander': '⭐',
    'Engineer': '⚙️',
    'Scientist': '🔬',
    'Medic': '⚕️',
    'Technician': '🔧',
    'Pilot': '✈️'
  };
  return icons[role] || '👤';
}

// Display users
function displayUsers() {
  const userList = users.map(user => {
    const preventionTips = getPreventionTips(user.alerts);
    const icon = getRoleIcon(user.role);
    return `
    <div class="user">
      <div class="user-icon">${icon}</div>
      <h4>${user.name}</h4>
      <p>Role: ${user.role}</p>
      <p>Bio: ${user.bio}</p>
      ${preventionTips ? `<div class="prevention-section"><h5>Alert Prevention Tips</h5><ul>${preventionTips}</ul></div>` : ''}
       <button onclick="openProfileModal(${user.id})">View Profile</button>
    </div>
  `}).join('');
  document.getElementById('users').innerHTML = userList;
}

// Open profile modal
function openProfileModal(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    // Populate modal with user data
    document.getElementById('modal-name').textContent = user.name;
    document.getElementById('modal-role').textContent = user.role;
    document.getElementById('modal-bio').textContent = user.bio;
    document.getElementById('modal-oxygen').textContent = document.getElementById('oxygen-val').textContent;
    document.getElementById('modal-temp').textContent = document.getElementById('temp-val').textContent;
    document.getElementById('modal-sleep').textContent = document.getElementById('sleep-val').textContent;
    document.getElementById('modal-wellness').textContent = document.getElementById('wellness-val').textContent;
    document.getElementById('modal-notes').value = user.personalNotes || '';

    // Populate alerts
    const alertsList = user.alerts.map(alert => `<li>${alert}</li>`).join('');
    document.getElementById('modal-alerts').innerHTML = alertsList || '<li>No active alerts</li>';

    // Show modal
    const modal = document.getElementById('profile-modal');
    modal.style.display = 'block';

    // Store current user ID for saving
    modal.dataset.userId = id;

    // Attach event listeners (in case they weren't attached)
    setupModalEventListeners();
  }
}

// Close modal
function closeProfileModal() {
  const modal = document.getElementById('profile-modal');
  modal.style.display = 'none';
  // Remove keyboard listener when modal closes
  document.removeEventListener('keydown', handleModalKeydown);
}

// Setup modal event listeners
function setupModalEventListeners() {
  const modal = document.getElementById('profile-modal');
  const closeBtn = document.getElementById('modal-close');
  const saveBtn = document.getElementById('modal-save');
  const addAlertBtn = document.getElementById('add-alert-btn');

  // Remove existing listeners to prevent duplicates
  if (closeBtn) {
    closeBtn.removeEventListener('click', closeProfileModal);
    closeBtn.addEventListener('click', closeProfileModal);
  }
  if (saveBtn) {
    saveBtn.removeEventListener('click', saveProfileChanges);
    saveBtn.addEventListener('click', saveProfileChanges);
  }
  if (addAlertBtn) {
    addAlertBtn.removeEventListener('click', addAlertToUser);
    addAlertBtn.addEventListener('click', addAlertToUser);
  }
  if (modal) {
    modal.removeEventListener('click', handleModalClick);
    modal.addEventListener('click', handleModalClick);

    // Add keyboard support
    document.removeEventListener('keydown', handleModalKeydown);
    document.addEventListener('keydown', handleModalKeydown);
  }
}

// Handle modal click (outside to close)
function handleModalClick(e) {
  const modal = document.getElementById('profile-modal');
  if (e.target === modal) {
    closeProfileModal();
  }
}

// Handle keyboard events for modal
function handleModalKeydown(e) {
  const modal = document.getElementById('profile-modal');
  if (modal.style.display === 'block' && e.key === 'Escape') {
    closeProfileModal();
  }
}

// Save profile changes
function saveProfileChanges() {
  const modal = document.getElementById('profile-modal');
  const userId = parseInt(modal.dataset.userId);
  const user = users.find(u => u.id === userId);

  if (user) {
    // Save personal notes
    user.personalNotes = document.getElementById('modal-notes').value;
    closeProfileModal();
    displayUsers(); // Refresh the display
  }
}

// Add alert to user
function addAlertToUser() {
  const modal = document.getElementById('profile-modal');
  const userId = parseInt(modal.dataset.userId);
  const user = users.find(u => u.id === userId);

  if (user) {
    const newAlert = prompt('Add alert:', '');
    if (newAlert) {
      user.alerts.push(newAlert);
      // Update modal alerts display
      const alertsList = user.alerts.map(alert => `<li>${alert}</li>`).join('');
      document.getElementById('modal-alerts').innerHTML = alertsList;
    }
  }
}

// Terminal commands
const commands = {
  'login': (args) => {
    if (!args[0]) return 'Usage: login [username]';
    const user = users.find(u => u.name.toLowerCase().includes(args[0].toLowerCase()));
    if (user) {
      currentUser = user;
      return `Logged in as ${user.name} (${user.role}). Privileges: ${user.privileges.join(', ')}`;
    }
    return 'User not found.';
  },
  'logout': () => {
    if (currentUser) {
      const name = currentUser.name;
      currentUser = null;
      return `Logged out ${name}.`;
    }
    return 'Not logged in.';
  },
  'whoami': () => currentUser ? `${currentUser.name} (${currentUser.role})` : 'Not logged in.',
  'su': (args) => {
    if (!currentUser || !currentUser.privileges.includes('admin')) return 'Permission denied. Admin required.';
    if (!args[0]) return 'Usage: su [username]';
    const user = users.find(u => u.name.toLowerCase().includes(args[0].toLowerCase()));
    if (user) {
      currentUser = user;
      return `Switched to ${user.name} (${user.role}).`;
    }
    return 'User not found.';
  },
  'status': () => checkPermission('read') ? 'System status: All systems nominal. Habitat integrity: 100%. Life support: Active.' : 'Permission denied.',
  'oxygen': () => checkPermission('read') ? 'Oxygen levels: ' + document.getElementById('oxygen-val').textContent + ' (Optimal: 19.5-23.2%)' : 'Permission denied.',
  'set oxygen': (args) => {
    if (!checkPermission('write')) return 'Permission denied. Write access required.';
    if (!args[0]) return 'Usage: set oxygen [value]';
    const val = parseFloat(args[0]);
    if (val < 18 || val > 25) return 'Value out of safe range (18-25%).';
    document.getElementById('oxygen-val').textContent = val.toFixed(1) + '%';
    return `Oxygen set to ${val.toFixed(1)}%.`;
  },
  'temperature': () => checkPermission('read') ? 'Temperature: ' + document.getElementById('temp-val').textContent + ' (Optimal: -10°C to 25°C)' : 'Permission denied.',
  'set temperature': (args) => {
    if (!checkPermission('write')) return 'Permission denied. Write access required.';
    if (!args[0]) return 'Usage: set temperature [value]';
    const val = parseFloat(args[0]);
    if (val < -50 || val > 50) return 'Value out of safe range (-50 to 50°C).';
    document.getElementById('temp-val').textContent = val.toFixed(1) + '°C';
    return `Temperature set to ${val.toFixed(1)}°C.`;
  },
  'water_temp': () => checkPermission('read') ? 'Water temperature: 22°C (Optimal: 20-25°C)' : 'Permission denied.',
  'set water_temp': (args) => {
    if (!checkPermission('write')) return 'Permission denied. Write access required.';
    if (!args[0]) return 'Usage: set water_temp [value]';
    const val = parseFloat(args[0]);
    if (val < 0 || val > 100) return 'Value out of safe range (0-100°C).';
    return `Water temperature set to ${val}°C.`;
  },
  'irrigation': () => checkPermission('read') ? 'Irrigation system: Active (Hydroponics: 85% efficiency)' : 'Permission denied.',
  'set irrigation': (args) => {
    if (!checkPermission('write')) return 'Permission denied. Write access required.';
    if (!args[0] || !['on', 'off'].includes(args[0].toLowerCase())) return 'Usage: set irrigation [on/off]';
    return `Irrigation set to ${args[0]}.`;
  },
  'analytics': () => checkPermission('research') ? 'Advanced Analytics:\n- Oxygen trend: Stable\n- Power consumption: 65% avg\n- Crew efficiency: 92%\n- Anomaly detection: 0 alerts' : 'Permission denied. Research access required.',
  'food': () => checkPermission('read') ? 'Food inventory: ' + document.getElementById('food-val').textContent + ' (Critical below 20%)' : 'Permission denied.',
  'power': () => checkPermission('read') ? 'Power usage: ' + document.getElementById('power-val').textContent + ' (Solar panels: 85% efficiency)' : 'Permission denied.',
  'sleep': () => checkPermission('read') ? 'Average sleep: ' + document.getElementById('sleep-val').textContent + ' (Recommended: 7-9 hours)' : 'Permission denied.',
  'wellness': () => checkPermission('read') ? 'Mental wellness: ' + document.getElementById('wellness-val').textContent + ' (Monitor stress levels)' : 'Permission denied.',
  'alerts': () => {
    if (!checkPermission('read')) return 'Permission denied.';
    const alerts = document.querySelectorAll('#alert-list .alert');
    if (alerts.length) {
      return 'Active alerts:\n' + Array.from(alerts).map(a => '- ' + a.textContent).join('\n');
    }
    return 'No active alerts.';
  },
  'users': () => checkPermission('read') ? 'Crew members:\n' + users.map(u => `- ${u.name} (${u.role}) - Privileges: ${u.privileges.join(', ')}`).join('\n') : 'Permission denied.',
  'diagnose': () => checkPermission('read') ? 'Running diagnostics... All modules: PASS. Radiation shielding: 98%. Communication: Stable.' : 'Permission denied.',
  'override': () => checkPermission('admin') ? 'Override mode activated. Use with caution. Type "override off" to disable.' : 'Permission denied.',
  'override off': () => checkPermission('admin') ? 'Override mode deactivated.' : 'Permission denied.',
  'eject': () => checkPermission('admin') ? 'Eject sequence initiated. Confirm with "eject confirm".' : 'Permission denied.',
  'eject confirm': () => checkPermission('admin') ? 'EJECTING! (Simulation: Habitat depressurization in 10 seconds...)' : 'Permission denied.',
  'help': `Available commands (may require login/privileges):
- login [username]: Log in as user
- logout: Log out
- whoami: Show current user
- su [username]: Switch user (admin only)
- status/oxygen/temperature/water_temp/irrigation/food/power/sleep/wellness: View metrics
- set oxygen/temperature/water_temp/irrigation [value]: Modify settings (write privilege)
- analytics: Advanced stats (research)
- alerts/users/diagnose: System info
- override/eject: Emergency controls (admin)
- clear: Clear terminal
- man [command]: Help
- history: Command history`,
  'man login': 'login [username]: Authenticate as a crew member to access commands.',
  'man logout': 'logout: Log out current session.',
  'man whoami': 'whoami: Display current logged-in user.',
  'man su': 'su [username]: Switch to another user (requires admin).',
  'man set oxygen': 'set oxygen [value]: Adjust oxygen levels (requires write privilege).',
  'man set temperature': 'set temperature [value]: Adjust temperature (requires write privilege).',
  'man set water_temp': 'set water_temp [value]: Adjust water temperature (requires write privilege).',
  'man set irrigation': 'set irrigation [on/off]: Control irrigation system (requires write privilege).',
  'man analytics': 'analytics: View advanced system analytics (requires research privilege).',
  'man override': 'override: Enable manual control (admin only).',
  'man eject': 'eject: Initiate emergency evacuation (admin only).',
  'man clear': 'clear: Clear terminal output.',
  'man man': 'man [command]: Detailed help for command.',
  'man help': 'help: Lists all available commands.',
  'man history': 'history: Show recent command history.',
  'history': () => checkPermission('read') ? 'Command history:\n' + (commandHistory.length ? commandHistory.slice(-10).join('\n') : 'No history.') : 'Permission denied.',
  'clear': ''
};

let commandHistory = [];

function checkPermission(privilege) {
  return currentUser && currentUser.privileges.includes(privilege);
}

function executeCommand(cmd) {
  cmd = cmd.trim();
  if (!cmd) return;
  const output = document.getElementById('terminal-output');
  const parts = cmd.split(' ');
  const lowerCmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  commandHistory.push(cmd);
  let response = commands[lowerCmd] || commands['man ' + lowerCmd] || 'Unknown command. Type "help" for commands.';
  if (typeof response === 'function') response = response(args);
  if (response && response.includes('\n')) {
    response = response.split('\n').map(line => `<div>${line}</div>`).join('');
  } else if (response) {
    response = `<div>${response}</div>`;
  } else {
    response = '';
  }
  const prompt = currentUser ? `${currentUser.name}@habitat:~$ ` : 'habitat:~$ ';
  output.innerHTML += `<div>${prompt}${cmd}</div>${response}`;
  output.scrollTop = output.scrollHeight;
  if (lowerCmd === 'clear') output.innerHTML = '';
}

// Cachebuster for robust updates
document.addEventListener('DOMContentLoaded', function() {
  var timestamp = Date.now();
  var cssLink = document.querySelector('link[href*="CACHEBUSTER"]');
  if (cssLink) {
    cssLink.href = cssLink.href.replace('CACHEBUSTER', timestamp);
  }
  var jsScript = document.querySelector('script[src*="CACHEBUSTER"]');
  if (jsScript) {
    jsScript.src = jsScript.src.replace('CACHEBUSTER', timestamp);
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  displayUsers();
  // Initial updates to populate graphs
  for (let i = 0; i < 50; i++) {
    const t = i * 0.1; // Simulate past data
    const now = new Date(startTime - (50 - i) * 1000);
    const oxygen = Math.max(18, Math.min(22, 20 + 0.5 * Math.sin(t * 0.1) + randomNormal(0, 0.1)));
    const interiorTemp = Math.max(0, Math.min(25, 10 + 5 * Math.sin(t * 0.05) + randomNormal(0, 0.5)));
    const exteriorTemp = Math.max(-60, Math.min(40, -10 + 30 * Math.sin(t * 0.02) + randomNormal(0, 2)));
    const sleep = 7.5 + 1.5 * Math.sin(t * 0.6) + randomNormal(0, 0.5);
    data.oxygen.push({ x: now, y: oxygen });
    data.interiorTemp.push({ x: now, y: interiorTemp });
    data.exteriorTemp.push({ x: now, y: exteriorTemp });
    data.sleep.push({ x: now, y: sleep });
  }
  setInterval(updateData, 1000); // Update every 1s for spacecraft efficiency

  // Terminal
  document.getElementById('terminal-submit').addEventListener('click', () => {
    const input = document.getElementById('terminal-input');
    executeCommand(input.value.trim());
    input.value = '';
  });
  document.getElementById('terminal-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      executeCommand(e.target.value.trim());
      e.target.value = '';
    }
  });

  // Initial terminal message
  const output = document.getElementById('terminal-output');
  output.innerHTML = '<div>Martian Habitat Control System v1.0</div><div>Type "help" for commands. Login required for most operations.</div>';

  // Alert acknowledge event delegation
  document.getElementById('alert-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('acknowledge-btn')) {
      const alertText = e.target.getAttribute('data-alert');
      const alertDiv = e.target.parentElement;
      const time = new Date().toLocaleString();

      // Add fade animation
      alertDiv.classList.add('acknowledged');

      // Log to history
      alertHistory.push(`Alert acknowledged at ${time}: ${alertText}`);
      document.getElementById('alert-history-list').innerHTML = alertHistory.map(h => `<div>${h}</div>`).join('');

      // Show history if hidden
      document.getElementById('alert-history').style.display = 'block';

      // Remove alert after animation
      setTimeout(() => {
        alertDiv.remove();
      }, 1000);
    }
  });

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(tabName + '-tab').classList.add('active');

      // Focus the input in uplink tab
      if (tabName === 'uplink') {
        setTimeout(() => document.getElementById('uplink-chat-input').focus(), 0);
      }
    });
  });

  // Uplink functionality (Earth messages)
  const uplinkOutput = document.getElementById('uplink-output');
  uplinkOutput.innerHTML = '<div>[System] Uplink established. Ready to send messages to Earth.</div><div>[System] Last contact: 2 hours ago. Status: Nominal.</div>';

  document.getElementById('uplink-submit').addEventListener('click', () => {
    const msg = document.getElementById('uplink-input').value.trim();
    if (msg) {
      const timestamp = new Date().toLocaleTimeString();
      uplinkOutput.innerHTML += `<div>[${timestamp}] Sent: ${msg}</div>`;
      uplinkOutput.scrollTop = uplinkOutput.scrollHeight;
      document.getElementById('uplink-input').value = '';
    }
  });

  document.getElementById('uplink-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('uplink-submit').click();
    }
  });

  // Integrated Chat functionality with Gun.js in uplink tab
  var gun = Gun({
    peers: ['https://gun-manhattan.herokuapp.com/gun', 'https://gun-us.herokuapp.com/gun', 'https://gun-eu.herokuapp.com/gun']
  });

  var chatMessages = gun.get('habitat-chat-room');

  // Mode-based nickname
  var commMode = localStorage.getItem('comm-mode') || 'craft';
  var chatNickname = commMode === 'craft' ? 'CRAFT[1]' : 'BASE[DELTA]';

  var chatOutput = document.getElementById('uplink-chat-output');
  var chatMessagesDiv = chatOutput.querySelector('.chat-messages');
  chatMessagesDiv.innerHTML = '<div>[System] Uplink established. Ready to send messages to Earth.</div><div>[System] Last contact: 2 hours ago. Status: Nominal.</div><div>[System] Connecting to decentralized chat network...</div><div>[System] Messages may appear with delay. Mode: ' + commMode.toUpperCase() + '</div>';
  var chatInput = document.getElementById('uplink-chat-input');
  var clearChatButton = document.getElementById('clearChatButton');
  var modeRadios = document.querySelectorAll('input[name="comm-mode"]');

  var displayedChatMessages = {};
  var sentMessages = new Set();

  function appendChatMessage(sender, message, timestamp) {
    var div = document.createElement('div');
    var timeStr = new Date(timestamp).toLocaleTimeString();
    div.textContent = "[" + timeStr + "] " + sender + ": " + message;
    chatMessagesDiv.appendChild(div);
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  }

  chatMessages.map().on(function(data, key) {
    if (data && !displayedChatMessages[key]) {
      var msgKey = data.sender + ':' + data.message + ':' + data.timestamp;
      if (!sentMessages.has(msgKey)) {
        displayedChatMessages[key] = true;
        appendChatMessage(data.sender, data.message, data.timestamp);
      }
    }
  });

  // Mode switch handler
  modeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      commMode = this.value;
      localStorage.setItem('comm-mode', commMode);
      chatNickname = commMode === 'craft' ? 'CRAFT[1]' : 'BASE[DELTA]';
      document.getElementById('chat-prompt').textContent = commMode === 'craft' ? 'CRAFT>' : 'BASE>';
      var modeDiv = document.createElement('div');
      modeDiv.textContent = '[System] Switched to ' + commMode.toUpperCase() + ' mode. Nickname: ' + chatNickname;
      chatMessagesDiv.appendChild(modeDiv);
      chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    });
  });

  // Set initial mode
  document.querySelector(`input[name="comm-mode"][value="${commMode}"]`).checked = true;
  document.getElementById('chat-prompt').textContent = commMode === 'craft' ? 'CRAFT>' : 'BASE>';

  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && chatInput.value.trim() !== "") {
      var msg = chatInput.value.trim();
      var timestamp = Date.now();
      var msgKey = chatNickname + ':' + msg + ':' + timestamp;
      sentMessages.add(msgKey);
      chatMessages.set({
        sender: chatNickname,
        message: msg,
        timestamp: timestamp
      });
      // Local echo for immediate feedback
      appendChatMessage(chatNickname, msg, timestamp);
      chatInput.value = "";
    }
  });

  clearChatButton.addEventListener('click', function() {
    if (confirm("Are you sure you want to clear the chat for everyone?")) {
      chatMessages.map().once(function(data, key) {
        if (key) {
          chatMessages.get(key).put(null);
        }
      });
      chatMessagesDiv.innerHTML = '<div>[System] Chat cleared.</div>';
      displayedChatMessages = {};
      sentMessages.clear();
    }
  });

  // Setup modal event listeners
  setupModalEventListeners();
});