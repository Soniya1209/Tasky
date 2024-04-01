const state = {
    taskList: [],
};

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

const htmlTaskContent = ({id, title, description, type, url}) => `
    <div class="col-md-6 col-lg-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-info mr-2" name=${id}>
                    <i class="fas fa-pencil-alt" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger mr-2" name=${id}>
                    <i class="fas fa-trash-alt" name=${id}></i>
                </button>
            </div>
            <div class="card-body">
                ${
                    url && `<img  width="100%" src=${url} alt="card image cap" class="card-image-top md-3 rounded-lg" />`
                }
                <h4 class="task__card__title">${title}</h4>
                <p class="description trim-3-lines text-muted" data-gram_editor="fasle">${description}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" 
                data-bs-target="#showTask" id=${id} onclick='openTask.apply(this, arguments)' >Open Task</button>
            </div>
        </div>
    </div>
`;

const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
        ${
            url && `<img  width="100%" src=${url} alt="card image cap" class="img-fluid place__holdeer__image mb-3" />`
        }
        <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
        <h2 class="my-3">${title}</h2>
        <p class="lead">${description}</p>
    </div>
    `;
};

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify({tasks: state.taskList,}));

};

const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.tasks);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData));
    })
};

const handleSubmit = (event) => {
    const id = `${Date.now()}` ;
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        type: document.getElementById('tags').value,
    };

    if(input.title === '' || input.description === '' || input.type === ''){
        return alert("Please fill all the required fields");
    }

    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({...input, id, }));

    state.taskList.push({...input, id });
    updateLocalStorage();
};

const openTask = (e) => {
    if(!e) e= window.event;

    const getTask = state.taskList.find(({id}) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
};

