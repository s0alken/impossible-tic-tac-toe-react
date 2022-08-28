import icon_o from '../assets/icon-o.svg';

const YouWon = () => (
    <>
        <p className="popup__result heading-xs">You won!</p>
        <h1 className="popup__heading heading-lg popup__heading--circle">
            <img src={icon_o} alt="Cross Logo" className="popup__heading-icon" />
            Takes the round
        </h1>
        <div className="popup__options">
            <button className="btn btn-md btn--silver">Quit</button>
            <button className="btn btn-md btn--yellow btn-next-round">Next round</button>
        </div>
    </>
);

const YouLoose = () => (
    <>
        <p className="popup__result heading-xs">You won!</p>
        <h1 className="popup__heading heading-lg popup__heading--circle">
            <img src={icon_o} alt="Cross Logo" className="popup__heading-icon" />
            Takes the round
        </h1>
        <div className="popup__options">
            <button className="btn btn-md btn--silver">Quit</button>
            <button className="btn btn-md btn--yellow btn-next-round">Next round</button>
        </div>
    </>
);

const Tie = () => (
    <>
        <h1 className="popup__heading heading-lg popup__heading--tie">
            Round tied
        </h1>
        <div className="popup__options">
            <button className="btn btn-md btn--silver">Quit</button>
            <button className="btn btn-md btn--yellow btn-next-round">Next round</button>
        </div>
    </>
)

const PopupContent = {
    YouWon,
    YouLoose,
    Tie
}

export default PopupContent;