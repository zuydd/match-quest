import colors from "colors";
import fileHelper from "../helpers/file.js";
import tokenHelper from "../helpers/token.js";

class AuthService {
  constructor() {}

  async login(user) {
    const body = {
      uid: user.info.id,
      first_name: user.info.first_name,
      last_name: user.info.last_name,
      username: user.info.username,
      tg_login_params: user.query_id,
    };
    try {
      const { data } = await user.http.post("user/login", body);
      if (data.code === 200 || data.code === 404) {
        return {
          code: data.code,
          info: data?.data || null,
        };
      } else {
        throw new Error(`Đăng nhập thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return null;
    }
  }

  async checkNickname(user, nickname) {
    const body = {
      nickname,
    };
    try {
      const { data } = await user.http.post(
        "user/check_nickname_is_existed",
        body
      );
      if (data.code === 200) {
        return data.data;
      } else {
        return true;
      }
    } catch (error) {
      user.log.logError("nickname đa tồn tại, đang tạo nickname mới");
      return true;
    }
  }

  async getNickname(user) {
    let nickname = user.info.username;
    let nicknameIsExisted = true;
    let countCheck = 0;
    const id = user.info.id.toString().slice(-4);
    while (nicknameIsExisted) {
      nicknameIsExisted = await this.checkNickname(user, nickname);
      if (nicknameIsExisted) {
        nickname = nickname + (parseInt(id) + countCheck);
        countCheck++;
      }
    }
    return nickname;
  }

  async register(user) {
    const nickname = await this.getNickname(user);
    const body = {
      uid: user.info.id,
      first_name: user.info.first_name,
      last_name: user.info.last_name,
      username: user.info.username,
      tg_login_params: user.query_id,
      invitor: user?.database?.ref,
      nickname,
    };
    try {
      const { data } = await user.http.post("user/register", body);
      if (data.code === 200) {
        user.log.logSuccess("Đăng ký tài khoản thành công");
        return true;
      } else {
        throw new Error(`Đăng ký tài khoản thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return false;
    }
  }

  async handleLogin(user) {
    console.log(
      `============== Chạy tài khoản ${user.index} | ${user.info.fullName.green} ==============`
    );

    let token = fileHelper.getTokenById(user.info.id);
    if (token && !tokenHelper.isExpired(token)) {
      const info = { token };
      await this.handleAfterLogin(user, info);
      return 1;
    }

    let infoLogin = await this.login(user);

    if (infoLogin?.code === 200) {
      await this.handleAfterLogin(user, infoLogin.info);
      return 1;
    }

    if (infoLogin?.code === 404) {
      const statusRegister = await this.register(user);
      if (statusRegister) {
        infoLogin = await this.login(user);
        if (infoLogin?.code === 200) {
          await this.handleAfterLogin(user, infoLogin.info);
          return 1;
        }
      }
    }
    user.log.logError(
      "Quá trình đăng nhập thất bại, vui lòng kiểm tra lại thông tin tài khoản (có thể cần phải lấy mới query_id). Hệ thống sẽ thử đăng nhập lại sau 60s"
    );
    return 0;
  }

  async getProfile(user) {
    const body = {
      uid: user.info.id,
    };
    try {
      const { data } = await user.http.post("user/profile", body);
      if (data.code === 200) {
        return data.data;
      } else {
        throw new Error(`Lấy thông tin tài khoản thất bại: ${data.err}`);
      }
    } catch (error) {
      user.log.logError(error.message);
      return null;
    }
  }

  async handleAfterLogin(user, info) {
    const token = info.token || null;
    user.http.updateToken(token);
    fileHelper.saveToken(user.info.id, token);
    const profile = await this.getProfile(user);
    if (profile?.Balance) {
      user.log.log(
        colors.green("Đăng nhập thành công: ") +
          `Số điểm: ${colors.yellow(Math.round(profile?.Balance / 1000))} 🔥`
      );
    }
  }
}

const authService = new AuthService();
export default authService;
