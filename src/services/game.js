import colors from "colors";
import delayHelper from "../helpers/delay.js";
import generatorHelper from "../helpers/generator.js";

class GameService {
  constructor() {}

  async getInfoBoost(user) {
    try {
      const { data } = await user.http.get("daily/task/status");
      if (data.code === 200) {
        return data.data;
      } else {
        throw new Error(`Lấy thông tin boost thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return [];
    }
  }

  async purchaseGame(user) {
    const body = { uid: user.info.id, type: "game" };
    try {
      const { data } = await user.http.post("daily/task/purchase", body);
      if (data.code === 200) {
        user.log.log(
          `Sử dụng game booster thành công, nhận thêm ${colors.blue(
            "3 lượt"
          )} chơi game`
        );
      } else {
        throw new Error(`Sử dụng game booster thất bại: ${data.msg}`);
      }
    } catch (error) {
      user.log.logError(error.message);
    }
  }

  async getInfoGame(user) {
    try {
      const { data } = await user.http.get("game/rule");
      if (data.code === 200 && data.data) {
        return {
          invited_count: data.data?.invited_count,
          daily_count: data.data?.daily_count,
          game_count: data.data?.game_count,
        };
      } else {
        throw new Error(`Lấy thông tin thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return null;
    }
  }

  async playGame(user) {
    try {
      const { data } = await user.http.get("game/play");
      if (data.code === 200) {
        user.log.log(
          `Bắt đầu chơi game, kết thúc và nhận thưởng sau: ${colors.blue(
            "30s"
          )}`
        );
        return data.data;
      } else {
        throw new Error(`Chơi game thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return null;
    }
  }

  async claimGame(user, gameId) {
    const point = generatorHelper.randomInt(180, 230);
    const body = { game_id: gameId, point };
    try {
      const { data } = await user.http.post("game/claim", body);
      if (data.code === 200) {
        user.log.log(
          `Chơi game xong, phần thưởng: ${colors.yellow(point + " 🔥")}`
        );
        return true;
      } else {
        throw new Error(`Nhận thưởng chơi game thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return false;
    }
  }

  async handleGame(user) {
    const boosts = await this.getInfoBoost(user);
    const boostGame = boosts.find((boost) => boost.name === "Game Booster");
    if (boostGame && boostGame?.current_count < boostGame?.task_count) {
      await this.purchaseGame(user);
    }
    await delayHelper.delay(3);
    const infoGame = await this.getInfoGame(user);
    if (!infoGame) return;
    let gameCount = infoGame?.game_count || 0;
    user.log.log(`Còn ${colors.blue(gameCount + " lượt")} chơi game`);
    while (gameCount > 0) {
      const game = await this.playGame(user);
      if (game) {
        await delayHelper.delay(32);
        await this.claimGame(user, game?.game_id);
        gameCount--;
      }
    }
    if (infoGame?.game_count > 0)
      user.log.log(colors.magenta("Đã dùng hết lượt chơi game"));
  }
}

const gameService = new GameService();
export default gameService;
