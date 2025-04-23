const dashboardTab = document.getElementById('dashboardTab');
const tasksTab = document.getElementById('tasksTab');
const dashboardSection = document.getElementById('dashboardSection');
const tasksSection = document.getElementById('tasksSection');
const addTaskButton = document.getElementById('addTaskButton');
const popupOverlay = document.getElementById('popupOverlay');
const popupForm = document.getElementById('popupForm');
const taskForm = document.getElementById('taskForm');
const dashboardList = document.getElementById('dashboardList');
const cancelButton = document.getElementById('cancelButton');
const toggleSidebarButton = document.getElementById('toggleSidebarButton');
const container = document.querySelector('.container');

// Array to store tasks
let tasks = [];

// Function to switch tabs
function switchTab(activeTab, inactiveTab, activeSection, inactiveSection) {
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
    activeSection.classList.add('active');
    inactiveSection.classList.remove('active');
}

// Event listeners for tab switching
dashboardTab.addEventListener('click', () => {
    switchTab(dashboardTab, tasksTab, dashboardSection, tasksSection);
    renderDashboard();
});

tasksTab.addEventListener('click', () => {
    switchTab(tasksTab, dashboardTab, tasksSection, dashboardSection);
});

// Function to render tasks on the dashboard
function renderDashboard() {
    // Clear the current list
    dashboardList.innerHTML = '';

    // Sort tasks by due date
    const sortedTasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Render each task
    sortedTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <strong>${task.name}</strong>
            <p>Due: ${task.dueDate}</p>
            <p>${task.notes}</p>
        `;
        dashboardList.appendChild(taskItem);
    });
}

// Show popup with fade-in effect
addTaskButton.addEventListener('click', () => {
    popupOverlay.style.display = 'block';
    popupForm.style.display = 'block';
    popupForm.style.opacity = 0;
    setTimeout(() => {
        popupForm.style.opacity = 1;
    }, 10);
});

// Hide popup with fade-out effect
cancelButton.addEventListener('click', () => {
    popupForm.style.opacity = 0;
    setTimeout(() => {
        popupOverlay.style.display = 'none';
        popupForm.style.display = 'none';
    }, 300);
});

// Event listener for form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const notes = document.getElementById('notes').value;

    // Add task to the array
    tasks.push({ name: taskName, dueDate, notes });

    // Clear the form
    taskForm.reset();

    // Hide the popup
    popupOverlay.style.display = 'none';
    popupForm.style.display = 'none';

    // Refresh the dashboard if it's active
    if (dashboardSection.classList.contains('active')) {
        renderDashboard();
    }
});

// Toggle sidebar visibility
toggleSidebarButton.addEventListener('click', () => {
    container.classList.toggle('sidebar-collapsed');

    // Update the toggle button icon
    const icon = toggleSidebarButton.querySelector('i');
    if (container.classList.contains('sidebar-collapsed')) {
        icon.classList.remove('fa-angle-left');
        icon.classList.add('fa-angle-right');
    } else {
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-left');
    }
});