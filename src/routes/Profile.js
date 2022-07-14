import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, seteNewDisplayName] = useState(userObj.newDisplayName);
    
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    // const getMyNweets = async () => {
    //     const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", userObj.uid)     // where함수로 creatorId 필드에서 userObj.uid와 같은 값을 찾기 위한 표현
    //         // .orderBy("createdAt")           // 오름차순 정리
    //         .get(); // 앞에 3개 collection, where, orderBy 실행하는 함수

    //     console.log(nweets.docs.map((doc) => doc.data()));
    // };

    // useEffect(() => {
    //     getMyNweets();
    // }, []);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        seteNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.newDisplayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName});
            refreshUser();
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange}
                    type="text" placeholder="Display name" 
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};


export default Profile;