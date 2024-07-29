document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('notificationForm');

  form.addEventListener('submit', function (e) {
    let valid = true;

    // Username validation
    const username = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    if (username.value.trim() === '') {
      usernameError.textContent = 'Username is required.';
      usernameError.style.display = 'block';
      valid = false;
    } else {
      usernameError.textContent = '';
      usernameError.style.display = 'none';
    }

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
      emailError.textContent = 'Email is required.';
      emailError.style.display = 'block';
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      emailError.style.display = 'block';
      valid = false;
    } else {
      emailError.textContent = '';
      emailError.style.display = 'none';
    }

    // Date of Birth validation
    const dob = document.getElementById('dob');
    const dobError = document.getElementById('dobError');
    if (dob.value.trim() === '') {
      dobError.textContent = 'Date of Birth is required.';
      dobError.style.display = 'block';
      valid = false;
    } else {
      dobError.textContent = '';
      dobError.style.display = 'none';
    }

    if (!valid) {
      e.preventDefault();
    } else {
      const data = {
        username: username.value,
        email: email.value,
        dob: dob.value,
      };

      // Send data using fetch
      fetch('/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          const ackMessage = document.getElementById('ackMessage');
          ackMessage.innerHTML = `
          <p>Thank you for being a part of our community!</p>
          <p>We've automated our birthday notifications to make your special day even brighter.</p>
          <p>If it's your birthday today, we wish you a fantastic celebration filled with joy and happiness!</p>
          <p>Best regards,</p>
          <p>The Birthday App Team</p>
        `;
          ackMessage.style.display = 'block';

          // Hide the acknowledgement message after some time
          setTimeout(() => {
            ackMessage.style.display = 'none';
          }, 5000); // Hide after 5 seconds

          // Clear form fields
          form.reset();
        })
        .catch((error) => {
          console.log('Error:', error);
        });

      e.preventDefault();
    }
  });
});
