
function getStickyNoteUI(task) {
    var stickyNote = document.createElement("li");
    stickyNote.className = "taskboard-note";
    var stickyNote_anchor = document.createElement("a");
    stickyNote_anchor.className = "position-relative";
    stickyNote_anchor.href = "#";

    var tape = document.createElement("img");
    tape.style.width = "30px";
    tape.style.height = "40px";
    tape.src = "./images/PushPin.jpg"
    tape.style.position = "absolute";
    tape.style.left = '43%';
    tape.style.top = "-15px";

    const deleteStickyNoteBtn = _getDeleteButton();

    stickyNote.addEventListener("mouseenter", function () {
        this.querySelector(".deleteMeButton").classList.remove("invisible");
        this.querySelector(".deleteMeButton").classList.add("visible");
    });

    stickyNote.addEventListener("mouseleave", function () {
        this.querySelector(".deleteMeButton").classList.remove("visible");
        this.querySelector(".deleteMeButton").classList.add("invisible");
    });

    var stickyNoteDetails = document.createElement("p");
    stickyNoteDetails.className = "taskboard-details";
    var dateAndTimeDiv = document.createElement("div");
    dateAndTimeDiv.className = "taskboard-date-and-time";
    var timeSpan = document.createElement("span");
    var dateSpan = document.createElement("span");

    stickyNoteDetails.innerText = task.taskDetails;
    dateSpan.innerText = _getDateFormat(task.taskDate);
    timeSpan.innerText = task.taskTime;

    stickyNote.append(stickyNote_anchor);
    stickyNote_anchor.append(tape, stickyNoteDetails, dateAndTimeDiv, deleteStickyNoteBtn);
    dateAndTimeDiv.append(dateSpan, timeSpan);

    return stickyNote;

    function _getDeleteButton() {
        const button = document.createElement("button");
        button.style.visibility = "hidden";
        button.style.background = "transparent";
        button.style.border = "none";
        button.style.position = "absolute";
        button.style.right = "15px";
        button.style.bottom = "15px";
        button.classList.add("deleteMeButton");
        const deleteNoteIcon = document.createElement("i");
        deleteNoteIcon.classList.add("bi", "bi-x-circle");
        button.append(deleteNoteIcon);

        button.onclick = function () {
            isFadeBoolean = false;
            const taskIndex = getTaskIndexById(task.id, state.taskboard);
            if (taskIndex === undefined) return;
            if (state.taskboard.length === 1) DOM.taskboardHeader.style.visibility = "hidden";
            state.taskboard.splice(taskIndex, 1);
            setTaskboardInLS(state.taskboard);
        };

        return button;
    }
    function _getDateFormat(date) {
        let year = date[0] + date[1] + date[2] + date[3];
        let month = date[5] + date[6];
        let day = date[8] + date[9];
        return `${day}/${month}/${year}`;
    }
}

function getTaskIndexById(id, task) {
    if (typeof id !== "string") return;
    if (!Array.isArray(task)) return;
    for (let index = 0; index < task.length; index++) {
        const currentTask = task[index];
        if (currentTask.id === id) {
            return index;
        }
    }
}

