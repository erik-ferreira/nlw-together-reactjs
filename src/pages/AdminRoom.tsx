import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";

import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import LogoImg from "../assets/images/logo.svg";
import CheckImg from "../assets/images/check.svg";
import DeleteImg from "../assets/images/delete.svg";
import AnswerImg from "../assets/images/answer.svg";

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

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleCheckQuestionAsAnswer(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              <div>
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswer(question.id)}
                    >
                      <img
                        src={CheckImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={AnswerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}

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
              </div>
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
