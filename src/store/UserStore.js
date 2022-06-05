import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

class UserStore {
  userInfo = {
    isUser: false,
    userData: null
  };

  constructor() {
    makeObservable(this, {
      userInfo: observable,
      login: action,
      logout: action
    });
    autorun(this.logUserDetails);
    runInAction(this.prefetchDetails);
  }

  logUserDetails = () => {
    console.log('check');
  };
  login(data) {
    return (this.userInfo.isUser = true), (this.userInfo.userData = data);
  }
  logout() {
    return (this.userInfo.isUser = false), (this.userInfo.userData = null);
  }
  prefetchDetails = () => {
    console.log('run in action');
  };
}

export default UserStore;
