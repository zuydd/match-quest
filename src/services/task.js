import colors from "colors";

class TaskService {
  constructor() {}

  async getTaskList(user) {
    const body = {
      uid: user.info.id,
    };
    const skipTasks = [""];
    try {
      const { data } = await user.http.post("point/task/list", body);
      if (data.code === 200 && data.data) {
        const tasks = data.data["Tasks"] || [];
        const extraTasks = data.data["Extra Tasks"] || [];
        return [...tasks, ...extraTasks].filter(
          (task) => !skipTasks.includes(task.name) && !task.complete
        );
      } else {
        throw new Error(`Lấy danh sách nhiệm vụ thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return [];
    }
  }

  async completeTask(user, task) {
    const body = { uid: user.info.id, type: task.name };
    try {
      const { data } = await user.http.post("point/task/complete", body);
      if (data.code === 200) {
        return data?.data;
      } else {
        throw new Error(
          `Làm nhiệm vụ ${colors.blue(task.description)} thất bại: ${data.err}`
        );
      }
    } catch (error) {
      user.log.logError(error.message);
      return false;
    }
  }

  async claimTask(user, task) {
    const body = { uid: user.info.id, type: task.name };
    try {
      const { data } = await user.http.post("point/task/claim", body);
      if (data.code === 200) {
        user.log.log(
          `Làm nhiệm vụ ${colors.blue(
            task.description
          )} thành công, phần thưởng: ${colors.yellow(task.points + " 🔥")}`
        );
      } else {
        throw new Error(
          `Claim phần thưởng nhiệm vụ ${colors.blue(
            task.description
          )} thất bại: ${data.err}`
        );
      }
    } catch (error) {
      user.log.logError(error.message);
    }
  }

  async handleTask(user) {
    const tasks = await this.getTaskList(user);

    if (!tasks.length) {
      user.log.log(colors.magenta("Đã làm hết nhiệm vụ"));
      return;
    }

    for (const task of tasks) {
      let complete = task.complete;
      if (!complete) {
        complete = await this.completeTask(user, task);
      }
      if (complete) {
        await this.claimTask(user, task);
      }
    }
  }
}

const taskService = new TaskService();
export default taskService;
