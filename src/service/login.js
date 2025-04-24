import axios from "axios";

const AuthService = {
  async UserLogin(data) {
    const req = await axios.post(
      "https://back.ifly.com.uz/api/auth/login",
      {
        login: data.username,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return req?.data;
  },

  async GetUser(token) {
    const req = await axios.get(
      "https://back.ifly.com.uz/api/admin",
      {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsImlzX2NyZWF0b3IiOmZhbHNlLCJpc19hY3RpdmUiOnRydWUsImlhdCI6MTc0NTUwMzc1MiwiZXhwIjoxNzQ1NTU3NzUyfQ.ILY4M4mdzxn7zcMo-NFVPgH9KdxdZC8ZoyQJsHXcNvs",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return req?.data;
  },
};

export default AuthService;
