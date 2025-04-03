(() => {
    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;
    const HOURS_IN_DAY = 24;
    const MONTHS_IN_YEAR = 12;

    const dateInput = document.getElementById('date1');
    const ageOutput = document.getElementById('age');
    let intervalId = null;

    function calculateAndDisplayAge() {
        const birthDateString = dateInput.value;
        if (!birthDateString) {
            displayMessage('Please select your date of birth.');
            return;
        }

        const birthDate = new Date(birthDateString);
        if (isNaN(birthDate.getTime())) {
            displayMessage('Invalid date selected.');
            return;
        }

        const now = new Date();
        if (birthDate > now) {
            displayMessage('Birth date cannot be in the future.');
            return;
        }

        const ageComponents = calculateAgeComponents(birthDate, now);
        displayAge(ageComponents);
    }

    function calculateAgeComponents(birthDate, now) {
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) {
            seconds += SECONDS_IN_MINUTE;
            minutes--;
        }
        if (minutes < 0) {
            minutes += MINUTES_IN_HOUR;
            hours--;
        }
        if (hours < 0) {
            hours += HOURS_IN_DAY;
            days--;
        }
        if (days < 0) {
            const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += daysInLastMonth;
            months--;
        }
        if (months < 0) {
            months += MONTHS_IN_YEAR;
            years--;
        }

        const totalDays = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
        return {
            years: Math.max(0, years),
            months: Math.max(0, months),
            days: Math.max(0, days),
            hours: Math.max(0, hours),
            minutes: Math.max(0, minutes),
            seconds: Math.max(0, seconds),
            totalDays
        };
    }

    function displayAge(ageComponents) {
        ageOutput.removeAttribute('data-placeholder');
        
        ageOutput.innerHTML = `
            <div class="age-component"><span class="age-value">${ageComponents.years}</span> years</div>
            <div class="age-component"><span class="age-value">${ageComponents.months}</span> months</div>
            <div class="age-component"><span class="age-value">${ageComponents.days}</span> days</div>
            <div class="age-component"><span class="age-value">${ageComponents.hours}</span> hours</div>
            <div class="age-component"><span class="age-value">${ageComponents.minutes}</span> minutes</div>
            <div class="age-component"><span class="age-value">${ageComponents.seconds}</span> seconds</div>
            <div class="age-total">Total days: <span class="age-value">${ageComponents.totalDays.toLocaleString()}</span></div>
        `;
    }

    function displayMessage(message) {
        ageOutput.removeAttribute('data-placeholder');
        ageOutput.textContent = message;
    }

    function startLiveUpdate() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        calculateAndDisplayAge();
        intervalId = setInterval(calculateAndDisplayAge, 1000);
    }

    dateInput.addEventListener('input', () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        
        if (dateInput.value && !isNaN(new Date(dateInput.value).getTime())) {
            startLiveUpdate();
        } else {
            calculateAndDisplayAge();
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        if (dateInput.value) {
            startLiveUpdate();
        } else {
            displayMessage('Please select your date of birth.');
        }
    });
})();
