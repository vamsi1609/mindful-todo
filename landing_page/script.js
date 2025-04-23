const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

// Open the modal
if (openModal) {
    openModal.addEventListener('click', () => {
        modal.classList.add('show');
    });
}

// Close the modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });
}

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const workType = document.getElementById('workType').value.trim();
    const featureSuggestions = document.getElementById('featureSuggestions').value.trim();

    // Ensure all fields are filled
    if (!name || !email || !dob || !workType) {
        alert('Please fill out all required fields.');
        return;
    }

    try {
        // Send the data as JSON
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, dob, workType, featureSuggestions }),
        });

        if (response.ok) {
            // Redirect to the congratulations page
            window.location.href = './congratulations.html';
        } else {
            const result = await response.json();
            console.error('Error response from server:', result.message); // Log the error
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error during signup:', error); // Log the error
        alert('An error occurred. Please try again later.');
    }
});