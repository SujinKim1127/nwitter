import { authService, dbService } from "fbase";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
    const history = useHistory();
    
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)     // where함수로 creatorId 필드에서 userObj.uid와 같은 값을 찾기 위한 표현
            // .orderBy("createdAt")           // 오름차순 정리
            .get(); // 앞에 3개 collection, where, orderBy 실행하는 함수

        console.log(nweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};


export default Profile;