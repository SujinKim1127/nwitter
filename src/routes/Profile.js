import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";


const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [nweets, setNweets] = useState([]);
    const [newDisplayName, seteNewDisplayName] = useState(userObj.newDisplayName);
    
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };


    useEffect(() => {
        dbService
        .collection("nweets")
        .onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
      }, []);



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

        <div className="container">
            
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    onChange={onChange}
                    type="text" placeholder="Display name" 
                    value={newDisplayName}
                    autoFocus
                    className="formInput"
                />
                <input 
                    type="submit" 
                    value="Update Profile" 
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>

            <NweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30}}>
                {nweets.map((nweet) => (
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};


export default Profile;