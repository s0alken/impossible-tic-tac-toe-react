import React from 'react';
import '../styles/PopupSelectDifficulty.scss';

function PopupSelectDifficulty({handleVsCPUSubmit}) {
    return (
        <div className="popup-difficulty">
            <h1 className="popup-difficulty__heading heading-lg popup-difficulty__heading--tie backInLeft delay-3">
                Difficulty level
            </h1>
            <div className="popup-difficulty__options backInLeft delay-5">
                <div className="popup-difficulty__options__container">
                    <button className="btn btn-md btn--silver" onClick={() => handleVsCPUSubmit('easy')}>Easy</button>
                    <button className="btn btn-md btn--silver" onClick={() => handleVsCPUSubmit('medium')}>Medium</button>
                    <button className="btn btn-md btn--silver" onClick={() => handleVsCPUSubmit('hard')}>Hard</button>
                    <button className="btn btn-md btn--silver" onClick={() => handleVsCPUSubmit('impossible')}>Impossible</button>
                </div>
            </div>
        </div>
    )
}

export default PopupSelectDifficulty;