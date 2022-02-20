const selectedFolderBackgroundColorClass = 'bg-blue-100';
const selectedNoteBackgroundColorClass = 'bg-green-100';

let notes;
let selectedFolderId;
let selectedNoteId;

marked.use({
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

window.onload = function () {
  fetch('/api/notes')
    .then(response => response.json())
    .then(data => {
      console.debug('data', data);
      notes = data;
    })
    .catch(error => console.log('error', error));
};

function selectNote(selectedId) {
  clearSelection(selectedNoteId, selectedNoteBackgroundColorClass);
  setSelection(selectedId, selectedNoteBackgroundColorClass);
  showNote(selectedId);
  selectedNoteId = selectedId;
}

function clearSelection(id, color) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove(color);
  }
}

function setSelection(id, color) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add(color);
  }
}

function showNote(selectedId) {
  const note = notes.find(({ id }) => id === selectedId);
  console.debug('note', note);

  const titleElement = document.getElementById('title');
  const contentElement = document.getElementById('content');
  if (note === undefined || note === null) {
    titleElement.innerHTML = '';
    contentElement.innerHTML = '<p class="text-gray-600">Note is not found.</p>';
  } else {
    titleElement.innerHTML = note.title;

    const content = note.snippets[0].content;
    contentElement.innerHTML = marked.parse(content);
  }
}

function clearNote() {
  const titleElement = document.getElementById('title');
  const contentElement = document.getElementById('content');
  titleElement.innerHTML = '';
  contentElement.innerHTML = '';
}

function showDocuments(folderId) {
  console.log('folder id', folderId);
  clearNote();
  clearSelection(selectedFolderId, selectedFolderBackgroundColorClass);
  setSelection(folderId, selectedFolderBackgroundColorClass);
  selectedFolderId = folderId;

  let documents = '';
  notes.forEach(item => {
    if (item.folder !== folderId) {
      return;
    }

    const title = `<h5 class="font-semibold text-gray-900">${item.title}</h5>`;
    const tags = item.tags.join(', ');
    const content = `<p>Tags: ${tags}</p>`;
    documents += `<div id="${item.id}" class="note mb-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer" onclick="selectNote('${item.id}')">${title}${content}</div>`;
  });

  const docs = document.getElementById('docs');
  docs.innerHTML = documents;
}
