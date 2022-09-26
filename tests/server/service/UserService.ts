import { Result } from '../utils';

const fakeUserInfo = {
  userId: '1',
  username: 'Jeecg',
  realname: 'Jeecg Admin',
  desc: 'manager',
  password: '',
  token: 'fakeToken1',
  roles: [
    {
      roleName: 'Super Admin',
      value: 'super',
    },
  ],
};
export default class UserService {
  async login() {
    return Result.success(fakeUserInfo);
  }

  async getUserInfoById() {
    return Result.success(fakeUserInfo);
  }
}
