let notes;

window.onload = function() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            notes = data;

            let documents = '';
            data.forEach(item => {
                const title = `<h5 class="mt-10 mb-3 font-semibold text-gray-900">${item.title}</h5>`;
                const tags = item.tags.join(', ');
                const content = `<p>Tags: ${tags}</p>`;
                documents += `${title}${content}`;
            });

            const docs = document.getElementById('docs');
            docs.innerHTML = documents;
        })
        .catch(error => console.log('error', error));
};