const dateInput = document.getElementById('dateInput');
const fetchButton = document.getElementById('fetchButton');
const bankHolidaysDataElement = document.getElementById('bankHolidaysData');

function fetchBankHolidaysData() {
  return fetch('https://www.gov.uk/bank-holidays.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

function displayBankHolidaysForDate(data, date) {
  const englandHolidays = data['england-and-wales'].events;

  const matchingEvents = englandHolidays.filter(event => event.date === date);

  let html = '<h2>Holidays</h2>';
  if (matchingEvents.length > 0) {
    html += '<ul>';
    matchingEvents.forEach(event => {
      html += `<li style="font-size:35px;font-family:bold;background-color: white;border-radius: 15px;color:red;">${event.date}: ${event.title}</li>`;
    });
    html += '</ul>';
  } else {
    html += '<p>No bank holidays found for the selected date.</p>';
  }

  bankHolidaysDataElement.innerHTML = html;
}

fetchButton.addEventListener('click', () => {
  const selectedDate = dateInput.value.trim();
  if (selectedDate) {
    fetchBankHolidaysData()
      .then(data => {
        displayBankHolidaysForDate(data, selectedDate);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  } else {
    bankHolidaysDataElement.innerHTML = '<p>Please enter a valid date.</p>';
  }
});