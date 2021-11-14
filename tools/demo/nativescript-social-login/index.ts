import { DemoSharedBase } from '../utils';
import { SocialLogin } from '@martinbuezas/nativescript-social-login';
import ENV from '../../../env';

export class DemoSharedNativescriptSocialLogin extends DemoSharedBase {
  user: any = null;
  private sl: SocialLogin = SocialLogin.getInstance();

  loginWithGoogle() {
    this.sl.loginWithGoogle({
      requestServerAuthCode: true,
      serverClientId: ENV.GOOGLE_OAUTH2_SERVER_CLIENT_ID,
      iosClientId: ENV.GOOGLE_OAUTH2_IOS_CLIENT_ID,
    })
    .then((result) => {
      this.user = result;
      console.log("USER", result);
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
  }

  loginWithFacebook() {
    this.sl.loginWithFacebook()
      .then((result) => {
        this.user = result;
        console.log("USER", result);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  logout() {
    this.sl.logout()
      .then(() => this.user = null)
      .catch((error) => console.log("ERROR", error));
  }
}