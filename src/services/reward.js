import colors from "colors";
import dayjs from "dayjs";

class RewardClass {
  constructor() {
    this.useDailyBooster = true;
  }

  async getInfoReward(user) {
    const body = { uid: user.info.id };
    try {
      const { data } = await user.http.post("point/reward", body);
      if (data.code === 200) {
        return data.data;
      } else {
        throw new Error(`Lấy thông tin reward thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return null;
    }
  }

  async rewardFarming(user) {
    const body = { uid: user.info.id };
    try {
      const { data } = await user.http.post("point/reward/farming", body);
      if (data.code === 200) {
        user.log.logSuccess(
          `Farming reward thành công, chờ claim sau 480 phút`
        );
        if (this.useDailyBooster) {
          await this.purchaseDaily(user);
        }
        return true;
      } else {
        throw new Error(`Farming reward thất bại: ${data.err}`);
      }
    } catch (error) {
      console.log(error);

      user.log.logError(error.message);
      return false;
    }
  }

  async rewardClaim(user, reward) {
    const body = { uid: user.info.id };
    try {
      const { data } = await user.http.post("point/reward/claim", body);
      if (data.code === 200 && data.data) {
        user.log.logSuccess(
          `Claim reward thành công, phần thưởng: ${colors.yellow(
            Math.round(reward / 1000) + " 🔥"
          )}`
        );
        return true;
      } else {
        throw new Error(`Claim reward thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return false;
    }
  }

  async purchaseDaily(user) {
    const body = { uid: user.info.id, type: "daily" };
    try {
      const { data } = await user.http.post("daily/task/purchase", body);
      if (data.code === 200 && data.data) {
        const speed = data.data?.split(" ").at(-1);
        user.log.log(
          `Sử dụng daily booster thành công, tốc độ đào hiện tại: ${colors.green(
            speed
          )}`
        );
      } else {
        throw new Error(`Sử dụng daily booster thất bại: ${data.msg}`);
      }
    } catch (error) {
      user.log.logError(error.message);
    }
  }

  async handleReward(user) {
    const infoReward = await this.getInfoReward(user);
    if (!infoReward) return 5;
    if (infoReward?.reward === 0) {
      await this.rewardFarming(user);
      return 480;
    } else {
      const diffTimeClaim = dayjs().diff(
        dayjs(infoReward?.next_claim_timestamp),
        "minute"
      );
      if (diffTimeClaim > 0) {
        const statusClaim = await this.rewardClaim(user, infoReward?.reward);
        if (statusClaim) {
          await this.rewardFarming(user);
          return 480;
        } else {
          return 5;
        }
      } else {
        user.log.log(
          `Chưa tới thời gian claim, chờ sau: ${colors.blue(
            Math.abs(diffTimeClaim) + " phút"
          )}`
        );
        return Math.abs(diffTimeClaim);
      }
    }
  }
}

const rewardClass = new RewardClass();
export default rewardClass;
