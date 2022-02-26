import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";

import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import LogoImg from "../assets/images/logo.svg";
import DeleteImg from "../assets/images/delete.svg";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params?.id;
  const { title, questions } = useRoom(roomId);
  const navigate = useNavigate();

  const [questionIdToDelete, setQuestionIdToDelete] = useState<string>("");

  const [showModalEndRoom, setShowModalEndRoom] = useState<boolean>(false);
  const [showModalDeleteQuestion, setShowModalDeleteQuestion] =
    useState<boolean>(false);

  async function handleDeleteQuestion() {
    await database
      .ref(`rooms/${roomId}/questions/${questionIdToDelete}`)
      .remove();

    toggleModalDeleteQuestion();
    setQuestionIdToDelete("");
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    navigate("/");
  }

  function toggleModalEndRoom() {
    setShowModalEndRoom(!showModalEndRoom);
  }

  function toggleModalDeleteQuestion() {
    setShowModalDeleteQuestion(!showModalDeleteQuestion);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />

          <div>
            <RoomCode code={roomId || "Sem código"} />
            <Button isOutlined onClick={toggleModalEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
            >
              <button
                type="button"
                onClick={() => {
                  if (questionIdToDelete !== question.id) {
                    setQuestionIdToDelete(question.id);
                  }

                  toggleModalDeleteQuestion();
                }}
              >
                <img src={DeleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>

      {showModalEndRoom && (
        <Modal
          typeModal="end-room"
          toggleModal={toggleModalEndRoom}
          handleConfirm={handleEndRoom}
        />
      )}

      {showModalDeleteQuestion && (
        <Modal
          typeModal="delete-question"
          toggleModal={toggleModalDeleteQuestion}
          handleConfirm={handleDeleteQuestion}
        />
      )}
    </div>
  );
}
