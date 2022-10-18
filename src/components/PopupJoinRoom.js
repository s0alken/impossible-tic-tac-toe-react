import React from 'react';
import '../styles/PopupJoinRoom.scss';
import Button from './Button';

function PopupJoinRoom({ createRoomId, setManualRoomId, handleVsPlayerSubmit }) {
    
    return (
        <div className="popup-join">
            <button className="btn btn-lg btn--silver backInLeft delay-3" onClick={createRoomId}>Create a room</button>
            <p className="popup-join__text heading-lg backInLeft delay-5">Or join a room</p>
            <div className="popup-join__group backInLeft delay-7">
                <input
                    type="text"
                    id="room_id"
                    className="popup-join__input heading-xs"
                    placeholder="Enter room id"
                    onChange={e => setManualRoomId(e.target.value)}
                />
                <Button className="btn btn-md btn--yellow" onClick={handleVsPlayerSubmit}>Enter</Button>
            </div>
        </div>
    )
}

export default PopupJoinRoom;