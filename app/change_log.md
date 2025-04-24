# Changelog

All notable changes to this project will be documented in this file.
## [0.0.2.20250424]

### Added
- **Task Checkbox**: Added a round checkbox with a depth effect next to each task name on the dashboard.
- **Task Details Toggle**: Implemented functionality to display only the task name initially. Clicking on the task name reveals additional details (due date and notes).
- **Popup Form Animation**: Added smooth fade-in and scale-up animations for the "Add Task" popup form.
- **Dynamic Task Rendering**: Tasks are now dynamically rendered on the dashboard from a simulated JSON-like structure.

### Changed
- **"Add Task" Button**: Positioned the floating "Add Task" button at the center bottom of the page for better visibility.
- **Popup Form Design**: Updated the "Add Task" form with a modern gray color scheme, rounded corners, and subtle shadows.


## [0.0.1.20250423]

### Added
- **Sidebar Toggle Button**: Added a button inside the sidebar to toggle its visibility. The button dynamically updates its icon (`<` or `>`) based on the sidebar state.
- **Collapsible Sidebar**: Implemented functionality to collapse the sidebar to show only icons while maintaining a smooth transition.
- **Profile Section**: Added a profile section at the bottom of the sidebar with a profile picture, name, and email.
- **Dashboard and Tasks Tabs**: Added two tabs ("Dashboard" and "Tasks") with icons and text. The tabs are styled to match the modern design.

### Changed
- **Sidebar Design**: Updated the sidebar to match a modern design with a clean layout, rounded corners, and smooth transitions.
- **Sidebar Behavior**: Modified the sidebar to reduce its width to `80px` when collapsed, showing only icons and hiding text.
- **Tab Spacing**: Adjusted the spacing between the profile section and the "Dashboard" and "Tasks" tabs for better visual alignment.
- **Popup Animations**: Added fade-in and fade-out effects for the task popup form.

### Fixed
- **Sidebar Collapsing Issue**: Resolved the issue where the sidebar was collapsing completely instead of showing icons.
- **Icon Alignment**: Ensured icons remain fully visible and centered when the sidebar is collapsed.

### Removed
- **Unnecessary Tabs**: Removed "Wallet," "Notification," and "Add Task" tabs from the sidebar to simplify the design.

---

## [Initial Version]
- Initial setup of the project with basic sidebar and task management functionality.