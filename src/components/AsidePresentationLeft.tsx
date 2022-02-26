import IllustrationImg from "../assets/images/illustration.svg";

import "../styles/aside.presentation.scss";

export function AsidePresentationLeft() {
  return (
    <aside>
      <img
        src={IllustrationImg}
        alt="Ilustração simbolizando perguntas e respostas"
      />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo real</p>
    </aside>
  );
}
