let notes;

window.onload = function() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            notes = data;

            let documents = '';
            data.forEach(item => {
                const title = `<h5 class="font-semibold text-gray-900">${item.title}</h5>`;
                const tags = item.tags.join(', ');
                const content = `<p>Tags: ${tags}</p>`;
                documents += `<div class="mt-5 mb-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer" onclick="showNote('${item.id}')">${title}${content}</div>`;
            });

            const docs = document.getElementById('docs');
            docs.innerHTML = documents;
        })
        .catch(error => console.log('error', error));
};

function showNote(selectedId) {
    const note = notes.find( ({ id }) => id === selectedId);
    console.debug('note', note);

    const contentElement = document.getElementById('content');
    if (note === undefined || note === null) {
        contentElement.innerHTML = '<p class="text-gray-600">Note is not found.</p>';
    } else {
        const content = note.snippets[0].content;
        contentElement.innerHTML = marked(content, { sanitize: true });
    }
}
