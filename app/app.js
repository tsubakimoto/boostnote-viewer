window.onload = function() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
            console.log('data', data);

            let titles = '';
            data.forEach(item => {
                titles += `<li>${item.title}</li>`;
            });

            const app = document.getElementById('app');
            app.innerHTML = `<ul>${titles}</ul>`;
        })
        .catch(error => console.log('error', error));
};