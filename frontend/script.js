const API_URL = 'http://localhost:3000/api/profile'; // Adjust if your backend is on a different port

document.addEventListener('DOMContentLoaded', () => {
    fetchProfile();
    document.getElementById('searchButton').addEventListener('click', searchProfile);
});

async function fetchProfile() {
    try {
        const response = await fetch(API_URL);
        const profile = await response.json();
        displayProfile(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        document.getElementById('profile-details').innerHTML = '<p>Error loading profile. Please ensure the backend is running and accessible.</p>';
    }
}

function displayProfile(profile) {
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-email').textContent = profile.email;
    document.getElementById('profile-education').textContent = profile.education || 'N/A';

    const skillsList = document.getElementById('profile-skills');
    skillsList.innerHTML = '';
    if (profile.skills && profile.skills.length > 0) {
        profile.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    } else {
        skillsList.innerHTML = '<li>No skills listed.</li>';
    }

    const projectsDiv = document.getElementById('profile-projects');
    projectsDiv.innerHTML = '';
    if (profile.projects && profile.projects.length > 0) {
        profile.projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.innerHTML = `
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                ${project.links ? `
                    <ul>
                        ${project.links.map(link => `<li><a href="${Object.values(link)[0]}" target="_blank">${Object.keys(link)[0]}</a></li>`).join('')}
                    </ul>
                ` : ''}
            `;
            projectsDiv.appendChild(projectItem);
        });
    } else {
        projectsDiv.innerHTML = '<p>No projects listed.</p>';
    }

    const workDiv = document.getElementById('profile-work');
    workDiv.innerHTML = '';
    if (profile.work && profile.work.length > 0) {
        profile.work.forEach(job => {
            const workItem = document.createElement('div');
            workItem.classList.add('work-item');
            workItem.innerHTML = `
                <h4>${job.title} at ${job.company}</h4>
                <p>${new Date(job.startDate).toLocaleDateString()} - ${job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}</p>
                <p>${job.description || ''}</p>
            `;
            workDiv.appendChild(workItem);
        });
    } else {
        workDiv.innerHTML = '<p>No work experience listed.</p>';
    }

    if (profile.links) {
        document.getElementById('github-link').href = profile.links.github || '#';
        document.getElementById('linkedin-link').href = profile.links.linkedin || '#';
        document.getElementById('portfolio-link').href = profile.links.portfolio || '#';
    }
}

async function searchProfile() {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm) {
        fetchProfile(); // If search bar is empty, show full profile
        return;
    }

    try {
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(searchTerm)}`);
        const results = await response.json();
        displaySearchResults(results);
    } catch (error) {
        console.error('Error searching profile:', error);
        document.getElementById('profile-details').innerHTML = '<p>Error performing search.</p>';
    }
}

function displaySearchResults(results) {
    const profileDetails = document.getElementById('profile-details');
    profileDetails.innerHTML = ''; // Clear current profile display

    // Display sections with results
    if (results.name || results.email || results.education) {
        profileDetails.innerHTML += `
            <h2>Search Results</h2>
            <p><strong>Name:</strong> ${results.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${results.email || 'N/A'}</p>
            <p><strong>Education:</strong> ${results.education || 'N/A'}</p>
        `;
    }

    if (results.skills && results.skills.length > 0) {
        profileDetails.innerHTML += '<h3>Matching Skills</h3><ul>';
        results.skills.forEach(skill => {
            profileDetails.innerHTML += `<li>${skill}</li>`;
        });
        profileDetails.innerHTML += '</ul>';
    }

    if (results.projects && results.projects.length > 0) {
        profileDetails.innerHTML += '<h3>Matching Projects</h3><div id="search-projects"></div>';
        const searchProjectsDiv = profileDetails.querySelector('#search-projects');
        results.projects.forEach(project => {
            searchProjectsDiv.innerHTML += `
                <div class="project-item">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                </div>
            `;
        });
    }

    if (results.work && results.work.length > 0) {
        profileDetails.innerHTML += '<h3>Matching Work Experience</h3><div id="search-work"></div>';
        const searchWorkDiv = profileDetails.querySelector('#search-work');
        results.work.forEach(job => {
            searchWorkDiv.innerHTML += `
                <div class="work-item">
                    <h4>${job.title} at ${job.company}</h4>
                    <p>${new Date(job.startDate).toLocaleDateString()} - ${job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}</p>
                    <p>${job.description || ''}</p>
                </div>
            `;
        });
    }

    if (Object.keys(results).length === 0 || (results.skills && results.skills.length === 0 && results.projects && results.projects.length === 0 && results.work && results.work.length === 0 && !results.name && !results.email && !results.education)) {
        profileDetails.innerHTML = '<p>No results found for your search.</p>';
    }
}
