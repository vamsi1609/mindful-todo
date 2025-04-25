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
const existingTasksContainer = document.getElementById('existingTasks');
const completedTasksContainer = document.getElementById('completedTasks');

// Declare happinessScoreSlider and happinessScoreValue at the top
const happinessScoreSlider = document.getElementById('happinessScore');
const happinessScoreValue = document.getElementById('happinessScoreValue');

console.log(addTaskButton);
console.log(popup);
console.log(overlay);
console.log(taskForm);
console.log(cancelButton);

// Simulated JSON data for tasks
let tasks = [
    {
        id: 1,
        name: "Complete project report",
        dueDate: "2025-04-25",
        notes: "Finalize the draft and send it to the manager.",
        happinessScore: 7
    },
    {
        id: 2,
        name: "Team meeting",
        dueDate: "2025-04-26",
        notes: "Discuss project milestones and deadlines.",
        happinessScore: 5
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
    renderDashboard(); // Render the graph on the dashboard
});

tasksTab.addEventListener('click', () => {
    switchTab(tasksTab, dashboardTab, tasksSection, dashboardSection);
    renderTasks(); // Render tasks in the "Tasks" tab
});

// Function to render tasks on the dashboard
function renderDashboard() {
    const ctx = document.getElementById('dashboardChart').getContext('2d');

    // Get the current date and calculate the start and end of the week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 7); // Sunday

    // Format the start and end dates
    const options = { month: 'short', day: 'numeric' };
    const startOfWeekFormatted = startOfWeek.toLocaleDateString(undefined, options);
    const endOfWeekFormatted = endOfWeek.toLocaleDateString(undefined, options);

    // Days of the week for the x-axis
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Filter completed tasks and group them by day of the week
    const completedTasks = tasks.filter(task => task.completed);
    const happinessScoresByDay = Array(7).fill(0); // Initialize scores for each day

    completedTasks.forEach(task => {
        const taskDate = new Date(task.dueDate);
        const dayIndex = (taskDate.getDay() + 6) % 7; // Adjust to make Monday = 0, Sunday = 6
        happinessScoresByDay[dayIndex] += task.happinessScore;
    });

    // Chart data
    const data = {
        labels: daysOfWeek,
        datasets: [{
            label: 'Happiness Score',
            data: happinessScoresByDay,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.4 // Smooth curve for the line
        }]
    };

    // Chart configuration
    const config = {
        type: 'line', // Change to 'line' for a line graph
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Week: ${startOfWeekFormatted} - ${endOfWeekFormatted}`,
                    align: 'end', // Align the title to the top-right
                    position: 'top',
                    font: {
                        size: 14
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Clear the existing chart if it exists
    if (window.dashboardChart) {
        if (typeof window.dashboardChart.destroy === 'function') {
            window.dashboardChart.destroy();
        }
    }

    // Render the chart
    window.dashboardChart = new Chart(ctx, config);
}

// Function to render tasks in the "Tasks" tab
function renderTasks() {
    // Clear the current lists
    existingTasksContainer.innerHTML = '<h2></h2>';
    completedTasksContainer.innerHTML = '<h2>Completed Tasks</h2>';

    // Check if there are tasks
    if (tasks.length === 0) {
        existingTasksContainer.innerHTML += '<p>No tasks available. Add a new task!</p>';
        return;
    }

    // Loop through tasks and categorize them
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        // Apply a green gradient based on happiness score
        const happinessPercentage = (task.happinessScore / 10) * 100;
        taskItem.style.background = `linear-gradient(to right, #d4edda ${happinessPercentage}%, #ffffff ${happinessPercentage}%)`;

        // Create the label (colored dot)
        const taskLabel = document.createElement('div');
        taskLabel.classList.add('task-label', 'personal'); // Add dynamic class based on category

        // Create the task content
        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');

        const taskName = document.createElement('strong');
        taskName.classList.add('task-name');
        taskName.textContent = task.name;

        const taskTime = document.createElement('span');
        taskTime.classList.add('task-time');
        taskTime.textContent = task.dueDate; // Replace with formatted time if available

        const happinessScoreDisplay = document.createElement('span');
        happinessScoreDisplay.classList.add('happiness-score');
        happinessScoreDisplay.textContent = `Happiness: ${task.happinessScore}`;

        taskContent.appendChild(taskName);
        taskContent.appendChild(taskTime);
        taskContent.appendChild(happinessScoreDisplay);

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = task.completed || false;

        // Add a click event to the task title to open the edit popup
        taskName.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering other click events
            if (!task.completed) {
                console.log('Edit Task Clicked'); // Debugging log
                showEditPopup(task); // Open the edit popup for the task
            }
        });

        // Append elements to the task item
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(checkbox);

        // Append the task item to the appropriate container
        if (checkbox.checked) {
            completedTasksContainer.appendChild(taskItem);
        } else {
            existingTasksContainer.appendChild(taskItem);
        }

        // Add an event listener to move tasks between containers
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            renderTasks();
        });
    });
}

// Function to show the edit popup with pre-filled task details
function showEditPopup(task) {
    // Update the popup title to "Edit Task"
    document.querySelector('#popupForm h2').textContent = 'Edit Task';

    // Pre-fill the form with the task's details
    document.getElementById('taskName').value = task.name;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('notes').value = task.notes;
    happinessScoreSlider.value = task.happinessScore;
    happinessScoreValue.textContent = task.happinessScore;

    // Show the popup
    popup.classList.add('active');
    overlay.classList.add('active');

    // Update the form submission to edit the task
    taskForm.onsubmit = (e) => {
        e.preventDefault();

        // Update the task with the new details
        task.name = document.getElementById('taskName').value;
        task.dueDate = document.getElementById('dueDate').value;
        task.notes = document.getElementById('notes').value;
        task.happinessScore = parseInt(happinessScoreSlider.value, 10);

        // Close the popup
        popup.classList.remove('active');
        overlay.classList.remove('active');

        // Clear the form
        taskForm.reset();

        // Re-render the tasks
        renderTasks();
    };
}

// Add a toggle for the "Completed Tasks" container
const completedTasksHeader = document.querySelector('#completedTasks h2');

// Initially hide only the tasks inside the completed tasks container
completedTasksContainer.querySelectorAll('.task-item').forEach(task => {
    task.style.display = 'none';
});

// Add an event listener to toggle the visibility of the tasks inside the completed tasks container
completedTasksHeader.addEventListener('click', () => {
    const tasks = completedTasksContainer.querySelectorAll('.task-item');
    const isHidden = Array.from(tasks).every(task => task.style.display === 'none');

    tasks.forEach(task => {
        task.style.display = isHidden ? 'block' : 'none'; // Show or hide tasks
    });
});

// Show the popup for creating a new task
addTaskButton.addEventListener('click', () => {
    console.log('Add Task Button Clicked'); // Debugging log

    // Update the popup title to "Create Task"
    document.querySelector('#popupForm h2').textContent = 'Create Task';

    // Clear the form
    taskForm.reset();
    happinessScoreSlider.value = 5; // Reset slider to default value
    happinessScoreValue.textContent = 5; // Reset displayed value

    // Set up the form submission for creating a new task
    taskForm.onsubmit = (e) => {
        e.preventDefault();

        // Get form data
        const taskName = document.getElementById('taskName').value;
        const dueDate = document.getElementById('dueDate').value;
        const notes = document.getElementById('notes').value;
        const happinessScore = parseInt(happinessScoreSlider.value, 10);

        // Create a new task object
        const newTask = {
            id: tasks.length + 1, // Generate a new ID
            name: taskName,
            dueDate: dueDate,
            notes: notes,
            happinessScore: happinessScore,
            completed: false
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Close the popup
        popup.classList.remove('active');
        overlay.classList.remove('active');

        // Clear the form
        taskForm.reset();

        // Re-render the tasks
        renderTasks();
    };

    // Show the popup
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

// Update the displayed value of the happiness score slider
happinessScoreSlider.addEventListener('input', () => {
    const sliderValue = happinessScoreSlider.value;
    happinessScoreValue.textContent = sliderValue;

    // Calculate the position of the score dynamically
    const sliderWidth = happinessScoreSlider.offsetWidth;
    const thumbWidth = 20; // Width of the slider thumb
    const min = parseInt(happinessScoreSlider.min, 10);
    const max = parseInt(happinessScoreSlider.max, 10);
    const percentage = ((sliderValue - min) / (max - min)) * 100;

    // Adjust the position of the score
    const offset = (percentage / 100) * (sliderWidth - thumbWidth);
    happinessScoreValue.style.left = `calc(${percentage}% - ${offset}px)`;
});

happinessScoreSlider.addEventListener('input', () => {
    // Update the value attribute dynamically
    happinessScoreSlider.setAttribute('value', happinessScoreSlider.value);
});

// Initial render of tasks in the "Tasks" tab
renderTasks();

document.addEventListener('DOMContentLoaded', () => {
    addTaskButton.addEventListener('click', () => {
        console.log('Add Task Button Clicked'); // Debugging log
        // Update the popup title to "Create Task"
        document.querySelector('#popupForm h2').textContent = 'Create Task';

        // Clear the form
        taskForm.reset();
        happinessScoreSlider.value = 5; // Reset slider to default value
        happinessScoreValue.textContent = 5; // Reset displayed value

        // Show the popup
        popup.classList.add('active');
        overlay.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const happinessScoreSlider = document.getElementById('happinessScore');
    const happinessScoreValue = document.getElementById('happinessScoreValue');

    happinessScoreSlider.addEventListener('input', () => {
        const sliderValue = happinessScoreSlider.value;
        happinessScoreValue.textContent = sliderValue;

        // Calculate the position of the score dynamically
        const sliderWidth = happinessScoreSlider.offsetWidth;
        const thumbWidth = 20; // Width of the slider thumb
        const min = parseInt(happinessScoreSlider.min, 10);
        const max = parseInt(happinessScoreSlider.max, 10);
        const percentage = ((sliderValue - min) / (max - min)) * 100;

        // Adjust the position of the score
        const offset = (percentage / 100) * (sliderWidth - thumbWidth);
        happinessScoreValue.style.left = `calc(${percentage}% - ${offset}px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const happinessScoreSlider = document.getElementById('happinessScore');
    const happinessScoreValue = document.getElementById('happinessScoreValue');

    console.log(happinessScoreSlider); // Should not be null
    console.log(happinessScoreValue); // Should not be null
});

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('dashboardChart').getContext('2d');

    // Example data for the chart
    const data = {
        labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
        datasets: [{
            label: 'Happiness Score',
            data: [7, 5, 8, 6, 9], // Example scores
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar', // Change to 'line', 'pie', etc., for different chart types
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Render the chart
    new Chart(ctx, config);
});

document.addEventListener('DOMContentLoaded', () => {
    const cancelButton = document.getElementById('cancelButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            popup.classList.remove('active');
            overlay.classList.remove('active');
        });
    } else {
        console.error('Cancel button not found in the DOM.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cancelButton = document.getElementById('cancelButton');
    console.log(cancelButton); // Should not be null
});

console.log(document.getElementById('dashboardChart'));

// Ensure the dashboard is rendered on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set the dashboard as the default active tab
    dashboardTab.classList.add('active');
    tasksTab.classList.remove('active');
    dashboardSection.classList.add('active');
    tasksSection.classList.remove('active');

    // Render the dashboard graph
    renderDashboard();
});