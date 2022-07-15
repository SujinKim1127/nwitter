import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target : {name},
        } = event;
        let provider;       // provider에 소셜로그인서비스제공업체 대입
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    };

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};


export default Auth;