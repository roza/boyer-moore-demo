import * as React from "react";
import * as Modal from "react-modal";

import BadCharTable from "./BadCharTable";
import { makeBadCharTable } from "./boyerMoore";
import { ModalState } from "./ModalState";

const modalStyle = {
    content : {
        maxHeight: "600px",
        maxWidth: "600px",
        width: "100%",
        margin: "auto auto",
    }
};

class BadCharModal extends React.Component<{}, ModalState> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        const needle = "exemple";
        return (
            <div>
                <div>
                    <a href="#" onClick={this.openModal}>Table du mauvais caractère</a>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                    contentLabel="Règle du mauvais caractère"
                >
                    <div className="flex-row">
                        <div className="flex-row-item">
                            <h3>Table du mauvais caractère</h3>
                        </div>
                        <div className="flex-row-right-item">
                            <button onClick={this.closeModal}>Fermer</button>
                        </div>
                    </div>
                    <div>
                        <p>
                            La table du mauvais caractère nous informe, étant donné un caractère ne correspondant 
                            pas dans le texte, du décalage nécessaire qui permettrait
                            d'aligner l'occurence la plus à droite de ce caractère dans le motif
                            avec le caractère ne correspondant pas dans le texte.
                        </p>
                        <p>
                            Par exemple, si le motif est "exemple" alors la table
                            du mauvais charactère est :
                        </p>
                        <div>
                            <BadCharTable
                                ruleTable={makeBadCharTable(needle)}
                                logEntry={null}
                                haystack=""
                                needle={needle} />
                        </div>
                        <p>
                            Si nous comparons le texte au motif, et que nous trouvons
                            un "m" qui ne correspond pas au caractère courant dans le
                            motif, alors nous savons que nous devons décaler l'index
                            du texte de 3 positions vers la droite et remettre l'index du
                            motif à sa valeur par défaut soit sa longueur 7 (en alignant les "m"s) 
                            avant que le motif n'aie une chance de correspondre au texte.
                        </p>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default BadCharModal;
