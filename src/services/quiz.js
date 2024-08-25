import colors from "colors";

class QuizService {
  constructor() {}

  async getQuizList(user) {
    try {
      const { data } = await user.http.get("daily/quiz/progress");
      if (data.code === 200) {
        return data?.data || [];
      } else {
        throw new Error(`Lấy danh sách quiz thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return null;
    }
  }

  async submitQuiz(user, answerResult) {
    const body = {
      answer_result: answerResult,
    };
    try {
      const { data } = await user.http.post("daily/quiz/submit", body);
      if (data.code === 200) {
        user.log.log(
          `Trả lời quiz thành công, phần thưởng: ${colors.yellow("200 🔥")}`
        );
      } else {
        throw new Error(`Trả lời quiz thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return null;
    }
  }

  async handleQuiz(user) {
    const quizList = await this.getQuizList(user);
    if (!quizList) return;
    if (!quizList.length) {
      user.log.log(colors.magenta("Đã trả lời xong quiz của hôm nay"));
      return;
    }
    const answerResult = quizList.map((quiz) => {
      let correctAnswer = quiz.items.find((item) => item.is_correct);
      if (!correctAnswer) correctAnswer = quiz.items[0];
      return {
        quiz_id: quiz.Id,
        selected_item: correctAnswer.number,
        correct_item: correctAnswer.number,
      };
    });
    await this.submitQuiz(user, answerResult);
  }
}

const quizService = new QuizService();
export default quizService;
