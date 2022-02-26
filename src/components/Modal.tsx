import { Button } from "./Button";

import CloseImg from "../assets/images/close.svg";
import DeleteImg from "../assets/images/delete-red.svg";

import "../styles/modal.scss";

type PropsModal = {
  typeModal: "end-room" | "delete-question";
  toggleModal: () => void;
  handleConfirm: () => void;
};

export function Modal({
  typeModal = "end-room",
  toggleModal,
  handleConfirm,
}: PropsModal) {
  return (
    <div className="modal">
      <div className="content">
        <img
          src={typeModal === "end-room" ? CloseImg : DeleteImg}
          alt={typeModal == "end-room" ? "Encerrar sala" : "Deletar questão"}
        />
        <h2>
          {typeModal === "end-room" ? "Encerrar sala" : "Excluir Pergunta"}
        </h2>
        <p>
          Tem certeza que você deseja{" "}
          {typeModal === "end-room"
            ? "encerrar esta sala"
            : "excluir esta pergunta"}
          ?
        </p>

        <div>
          <Button
            onClick={toggleModal}
            style={{ backgroundColor: "#DBDCDD", color: "#737380" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            style={{ backgroundColor: "#E73F5D" }}
          >
            {typeModal === "end-room" ? "Sim, encerrar" : "Sim, excluir"}
          </Button>
        </div>
      </div>
    </div>
  );
}
