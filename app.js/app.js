function renderWorkout(dayKey) {
  const dayData = workoutData[dayKey];
  const container = document.getElementById('workout-container');
  if (!dayData) return;
  
  container.innerHTML = '';
  document.getElementById('day-title').innerText = dayKey;
  document.getElementById('workout-meta').innerText = `${dayData.totalExercises} exercises • ~${dayData.timeEstimate}`;

  dayData.sections.forEach((section, sIndex) => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'space-y-3';

    let sectionHeaderHtml = `
      <div class="flex justify-between items-center text-gray-300 border-b border-gray-800 pb-1">
        <h2 class="text-lg font-semibold">${section.title}</h2>
        <span class="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">${section.sets} sets ${section.rest ? '• ' + section.rest : ''}</span>
      </div>
    `;
    sectionEl.innerHTML = sectionHeaderHtml;

    section.exercises.forEach((ex, eIndex) => {
      const exId = `${dayKey}-${sIndex}-${eIndex}`;
      const savedLog = localStorage.getItem(exId) || '';

      const card = document.createElement('div');
      card.className = 'bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-3 flex flex-col gap-2';
      
      card.innerHTML = `
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3 cursor-pointer" onclick="openModal('${ex.name}', '${ex.description}', '${ex.videoUrl}')">
            <div class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-emerald-400 font-bold">▶</div>
            <div>
              <h3 class="font-medium text-white hover:text-emerald-400">${ex.name}</h3>
              <p class="text-xs text-gray-400">${ex.prescription}</p>
            </div>
          </div>
        </div>
        <div class="pt-2 border-t border-gray-800/50 flex items-center gap-2">
          <span class="text-xs text-gray-400">Tracker:</span>
          <input type="text" value="${savedLog}" placeholder="e.g. Set 1: 12 reps, Set 2: 12 reps" 
            onchange="saveProgress('${exId}', this.value)"
            class="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white w-full focus:border-emerald-500 focus:outline-none" />
        </div>
      `;
      sectionEl.appendChild(card);
    });

    container.appendChild(sectionEl);
  });
}

function saveProgress(id, value) {
  localStorage.setItem(id, value);
}

function openModal(title, desc, videoUrl) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-desc').innerText = desc;
  document.getElementById('modal-iframe').src = videoUrl;
  document.getElementById('video-modal').classList.remove('hidden');
  document.getElementById('video-modal').classList.add('flex');
}

function closeModal() {
  document.getElementById('video-modal').classList.add('hidden');
  document.getElementById('video-modal').classList.remove('flex');
  document.getElementById('modal-iframe').src = '';
}

document.getElementById('day-select').addEventListener('change', (e) => {
  renderWorkout(e.target.value);
});

renderWorkout('Day 1');
