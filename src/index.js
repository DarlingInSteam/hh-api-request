import axios from 'axios';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const vacancyContainer = document.getElementById('vacancyContainer');

searchButton.addEventListener('click', async () => {
    const jobTitle = searchInput.value.trim();

    if (jobTitle) {
        try {
            const response = await axios.get(`https://api.hh.ru/vacancies?text=${jobTitle}`, {
                headers: {
                    'User-Agent': 'api-test-agent'
                }
            });
            const vacancies = response.data;

            renderVacancies(vacancies);
        } catch (error) {
            console.error('Error fetching vacancies:', error);
        }
    } else {
        alert('Please enter a job title');
    }
});

function renderVacancies(vacancies) {
    vacancyContainer.innerHTML = '';

    vacancies.items.forEach(vacancy => {
        const card = document.createElement('div');
        card.classList.add('vacancy-card');
        const salaryText = vacancy.salary.from !== null ? `${vacancy.salary.from} Руб` : 'По договоренности';
        const requiermnet= vacancy.snippet.requirement !== null ? `${vacancy.snippet.requirement}` : 'Нет';
        console.log(vacancy.name)
        card.innerHTML = `
            <h2>${vacancy.name}</h2>
            <p>Зарплата: ${salaryText}</p>
            <p>График: ${vacancy.schedule.name}</p>
            <p>Опыт: ${requiermnet}</p>
            <p>Работодатель: ${vacancy.employer.name}</p>
            <p>Город: ${vacancy.area.name}</p>
        `;
        vacancyContainer.appendChild(card);
    });
}
