
function createTask(task) {
    return {
        id: _makeid(5),
        taskDetails: task.taskDetails,
        taskDate: task.taskDate,
        taskTime: task.taskTime,
    };
    function _makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

}