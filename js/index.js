var isFadeBoolean = true;

const DOM = {
    taskboardHeader: null,
    taskForm: null,
    taskPayload: {
        taskDetails: null,
        taskDate: null,
        taskTime: null,
    },
    taskboardContainer: null,
    addTaskBtn: null,
    resetFormBtn: null,
}

const state = { taskboard: [] };
const CONFIG = { TASKBOARD: "TaskBoard" };

function init() {
    DOM.taskboardHeader = document.querySelector("#taskboard-header");
    DOM.taskForm = document.querySelector("#task-form");
    DOM.taskPayload.taskDetails = DOM.taskForm[0];
    DOM.taskPayload.taskDate = DOM.taskForm[1];
    DOM.taskPayload.taskTime = DOM.taskForm[2];
    DOM.taskboardContainer = document.querySelector("#notes-container");
    DOM.addTaskBtn = document.querySelector("#add-task-btn");
    DOM.resetFormBtn = document.querySelector("#reset-form-btn");
    DOM.resetFormBtn.addEventListener("click", function () {
        DOM.taskForm.reset();
    });
    DOM.addTaskBtn.addEventListener("click", addTask);
    _drawTaskboardOnLoad();
    function _drawTaskboardOnLoad() {
        let taskboard = [];
        state.taskboard = taskboard;
        try {
            const taskboardString = localStorage.getItem(CONFIG.TASKBOARD);
            taskboard = JSON.parse(taskboardString);
            if (!taskboard) return;
            state.taskboard = taskboard;
        } catch (ex) {
            alert("something went wrong try to clear local storage");
        }
        draw(state.taskboard);
    }
}

function addTask() {
    isFadeBoolean = true;
    if (!DOM.taskPayload.taskDetails.value || !DOM.taskPayload.taskDate.value || !DOM.taskPayload.taskTime.value) {
        return alert("all task fields must be filled!")
    };
    const task = createTask({
        taskDetails: DOM.taskPayload.taskDetails.value,
        taskDate: DOM.taskPayload.taskDate.value,
        taskTime: DOM.taskPayload.taskTime.value,
    });
    state.taskboard.push(task);
    setTaskboardInLS(state.taskboard);
    DOM.taskForm.reset();
}

function draw(taskboard) {
    if (!Array.isArray(taskboard)) return;
    let lastIndex = taskboard.length - 1;
    DOM.taskboardContainer.innerHTML = "";
    for (let index = 0; index < taskboard.length; index++) {
        const currentTask = taskboard[index];
        const taskUI = getStickyNoteUI(currentTask);
        if (!taskUI) return;
        if ((index === lastIndex) && (isFadeBoolean === true)) {
            console.log("try to fade");
            taskUI.style.animation = "fadeIn 2s";
        }
        DOM.taskboardContainer.append(taskUI);
    }
}

function setTaskboardInLS(taaskboard) {
    localStorage.setItem(CONFIG.TASKBOARD, JSON.stringify(taaskboard));
    draw(state.taskboard);
}

init();
