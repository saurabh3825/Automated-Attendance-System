document.addEventListener('DOMContentLoaded', function() {
  // Camera button functionality
  const cameraBtn = document.querySelector('.camera-btn');
  const cameraMessage = document.querySelector('.camera-message');
  const cameraOffIcon = document.querySelector('.camera-off-icon');
  let cameraOn = false;

  cameraBtn.addEventListener('click', function() {
    cameraOn = !cameraOn;
    
    if (cameraOn) {
      cameraMessage.textContent = 'Snapshot taken';
      cameraOffIcon.style.display = 'none';
      // In a real application, you would start the camera feed here
    } else {
      cameraMessage.textContent = 'Please keep your Camera on';
      cameraOffIcon.style.display = 'flex';
    }
  });

  // Login button functionality
  const loginBtn = document.querySelector('.login-btn');
  loginBtn.addEventListener('click', function() {
    alert('Login functionality would be implemented here');
  });

  // Finish button functionality
  const finishBtn = document.querySelector('.finish-btn');
  finishBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to finish the session?')) {
      alert('Session finished. Attendance has been recorded.');
    }
  });

  // Simulate real-time updates
  function updateAttendance() {
    const presentCount = document.querySelectorAll('.student-row:not(.offline)').length;
    const summaryText = document.querySelector('.attendance-summary span');
    summaryText.textContent = `No. of Students present: ${presentCount}`;
  }

  // Student status toggle (for demonstration)
  const studentRows = document.querySelectorAll('.student-row');
  studentRows.forEach(row => {
    row.addEventListener('click', function() {
      if (this.classList.contains('offline')) {
        this.classList.remove('offline');
        this.querySelector('.status-indicator').classList.remove('offline');
        this.querySelector('.status-indicator').classList.add('online');
      } else {
        this.classList.add('offline');
        this.querySelector('.status-indicator').classList.remove('online');
        this.querySelector('.status-indicator').classList.add('offline');
      }
      updateAttendance();
    });
  });

  // Initialize attendance count
  updateAttendance();

  // Auto-scroll simulation for student list
  const studentList = document.querySelector('.student-list');
  let scrollDirection = 1;
  
  setInterval(() => {
    if (studentList.scrollTop >= studentList.scrollHeight - studentList.clientHeight) {
      scrollDirection = -1;
    } else if (studentList.scrollTop <= 0) {
      scrollDirection = 1;
    }
    
    studentList.scrollTop += scrollDirection * 0.5;
  }, 50);
});

