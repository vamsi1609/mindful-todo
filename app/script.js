const dashboardTab = document.getElementById('dashboardTab');
const tasksTab = document.getElementById('tasksTab');
const dashboardSection = document.getElementById('dashboardSection');
const tasksSection = document.getElementById('tasksSection');
const popup = document.getElementById('popupForm');
const overlay = document.getElementById('popupOverlay');
const taskForm = document.getElementById('taskForm');
const dashboardList = document.getElementById('dashboardList');
const cancelButton = document.getElementById('cancelButton');
const toggleSidebarButton = document.getElementById('toggleSidebarButton');
const container = document.querySelector('.container');
const addTaskButton = document.getElementById('addTaskButton');

// Simulated JSON data for tasks
let tasks = [
    {
        id: 1,
        name: "Complete project report",
        dueDate: "2025-04-25",
        notes: "Finalize the draft and send it to the manager."
    },
    {
        id: 2,
        name: "Team meeting",
        dueDate: "2025-04-26",
        notes: "Discuss project milestones and deadlines."
    }
];

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

    // Check if there are tasks
    if (tasks.length === 0) {
        dashboardList.innerHTML = '<p>No tasks available. Add a new task!</p>';
        return;
    }

    // Loop through tasks and create task items
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        // Create the checkbox element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');

        // Create the task name element
        const taskName = document.createElement('strong');
        taskName.textContent = task.name;
        taskName.style.cursor = 'pointer';

        // Create the task details container (hidden by default)
        const taskDetails = document.createElement('div');
        taskDetails.style.display = 'none'; // Initially hidden
        taskDetails.innerHTML = `
            <p>Due: ${task.dueDate}</p>
            <p>${task.notes}</p>
        `;

        // Add a click event to toggle task details
        taskName.addEventListener('click', () => {
            if (taskDetails.style.display === 'none') {
                taskDetails.style.display = 'block'; // Show details
            } else {
                taskDetails.style.display = 'none'; // Hide details
            }
        });

        // Append elements to the task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskName);
        taskItem.appendChild(taskDetails);

        // Append the task item to the dashboard list
        dashboardList.appendChild(taskItem);
    });
}

// Show the popup
addTaskButton.addEventListener('click', () => {
    popup.classList.add('active');
    overlay.classList.add('active');
});

// Hide the popup
cancelButton.addEventListener('click', () => {
    popup.classList.remove('active');
    overlay.classList.remove('active');
});

// Hide the popup when clicking on the overlay
overlay.addEventListener('click', () => {
    popup.classList.remove('active');
    overlay.classList.remove('active');
});

// Handle form submission to add a new task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const notes = document.getElementById('notes').value;

    // Create a new task object
    const newTask = {
        id: tasks.length + 1,
        name: taskName,
        dueDate: dueDate,
        notes: notes
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Close the popup
    popup.classList.remove('active');
    overlay.classList.remove('active');

    // Clear the form
    taskForm.reset();

    // Re-render the dashboard
    renderDashboard();
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

// Initial render of the dashboard
renderDashboard();