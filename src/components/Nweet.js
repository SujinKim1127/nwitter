import { dbService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);        // input 입력 text 업데이트
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        console.log(ok);
        if (ok) {
            console.log(nweetObj.id);
            const data = await dbService.doc(`nweets/${nweetObj.id}`).delete();
            console.log(data);
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    // 입력값 변하게 해주는 함수
    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNewNweet(value);
    };

    // firestore에 새 입력값 반영하는 onSubmit 함수
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet});
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your nweet" onChange={onChange} value={newNweet} required/>
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;