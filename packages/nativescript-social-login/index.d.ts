import { SocialLoginCommon } from './common';

export declare class SocialLogin extends SocialLoginCommon {
  static getInstance():NativescriptSocialLogin;
  loginWithFacebook(config?: any): Promise<Partial<ILoginResult>>;
  loginWithGoogle(config: any): Promise<Partial<ILoginResult>>;
  logout(): Promise<void>;
}
