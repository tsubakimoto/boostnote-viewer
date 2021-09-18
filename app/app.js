const selectedNoteBackgroundColorClass = 'bg-green-100';

let notes;
let selectedNoteId;

window.onload = function() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
            console.debug('data', data);
            notes = data;

            let documents = '';
            data.forEach(item => {
                const title = `<h5 class="font-semibold text-gray-900">${item.title}</h5>`;
                const tags = item.tags.join(', ');
                const content = `<p>Tags: ${tags}</p>`;
                documents += `<div id="${item.id}" class="note mt-3 mb-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer" onclick="selectNote('${item.id}')">${title}${content}</div>`;
            });

            const docs = document.getElementById('docs');
            docs.innerHTML = documents;
        })
        .catch(error => console.log('error', error));
};

function selectNote(selectedId) {
    clearSelection(selectedNoteId);
    setSelection(selectedId);
    showNote(selectedId);
    selectedNoteId = selectedId;
}

function clearSelection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.remove(selectedNoteBackgroundColorClass);
    }
}

function setSelection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.add(selectedNoteBackgroundColorClass);
    }
}

function showNote(selectedId) {
    const note = notes.find( ({ id }) => id === selectedId);
    console.debug('note', note);

    const titleElement = document.getElementById('title');
    const contentElement = document.getElementById('content');
    if (note === undefined || note === null) {
        titleElement.innerHTML = '';
        contentElement.innerHTML = '<p class="text-gray-600">Note is not found.</p>';
    } else {
        titleElement.innerHTML = note.title;

        const content = note.snippets[0].content;
        contentElement.innerHTML = marked(content, { sanitize: true });
    }
}
