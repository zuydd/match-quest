import colors from "colors";

class InviteClass {
  constructor() {}

  async getBalanceInvite(user) {
    const body = {
      uid: user.info.id,
    };
    try {
      const { data } = await user.http.post("point/invite/balance", body);
      if (data.code === 200 && data.data) {
        return data.data?.balance;
      } else {
        throw new Error(`Lấy thông tin invite balance thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return 0;
    }
  }

  async claimInvite(user) {
    const body = {
      uid: user.info.id,
    };
    try {
      const { data } = await user.http.post("point/invite/claim", body);
      if (data.code === 200) {
        user.log.log(
          `Claim điểm giới thiệu thành công, nhận được: ${colors.yellow(
            Math.round(data.data / 1000) + " 🔥"
          )}`
        );
        return true;
      } else {
        throw new Error(`Claim điểm giới thiệu thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return false;
    }
  }

  async handleInvite(user) {
    const balance = await this.getBalanceInvite(user);
    if (balance > 0) {
      await this.claimInvite(user);
    }
  }
}

const inviteClass = new InviteClass();
export default inviteClass;
