import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");


    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(nweetArray);
            setNweets(nweetArray);
        });
      }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        // const attachmentUrl = await response.ref.getDownloadURL();

        // await dbService.collection("nweets").add({
        //     text: nweet,
        //     createdAT: Date.now(),
        //     creatorId: userObj.uid,
        // });
        // setNweet("");
        // setAttachment("");
        console.log(await response.ref.getDownloadURL());
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    };


    // 첨부 파일 정보 출력
    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader(); // 웹브라우저에 사진 출력
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }

    // 파일 선택 취소 버튼
    const onClearAttachment = () => setAttachment("");

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div> 
                    )}
            </form>

            <div>
                {nweets.map((nweet) => (
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </>
    );
};


export default Home;