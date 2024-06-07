"use client"
export const initializeContactForm = () => {
    const btnSubmit = document.getElementById('contact-form-btn') as HTMLButtonElement;
    const email = document.getElementById('contact-form-email') as HTMLInputElement;
    const subject = document.getElementById('subject') as HTMLInputElement;
    const message = document.getElementById('message') as HTMLTextAreaElement;

    if (btnSubmit) {
        btnSubmit.addEventListener('click', () => {
            const url = "http://localhost:5000/api/forms/customer/contact-us";

            const data = {
                email: email.value,
                subject: subject.value,
                message: message.value,
                lang: localStorage.getItem('Language') || 'en',
            };

            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            if (email.value !== "" && subject.value !== "" && message.value !== "") {
                fetch(url, options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la solicitud: ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Respuesta del servidor:', data);
                        email.value = "";
                        subject.value = "";
                        message.value = "";
                    })
                    .catch(error => {
                        console.error('Hubo un problema con la solicitud fetch:', error);
                    });

                console.log("Send Email");
            } else {
                console.log("ERROR");
            }
        });
    }
};
