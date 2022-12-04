import React from "react";
import "./projet.css";
import { addProjet } from "../../utils/api";

export default function ModalAddProjet(props) {
  const [title, setTitle] = React.useState("");
  const [github, setGithub] = React.useState("");
  const [type, setType] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const setIsModalOpen = props.setIsModalOpen;

  const HandleSubmit = (e) => {
    e.preventDefault();
    addProjet(title, github, type).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
      }
    });
  };
  return (
    <>
      <div className="transparence" onClick={() => setIsModalOpen(false)}></div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          left: 0,
          top: 0,
        }}
      >
        <div className="container-add-projet">
          <div
            style={{
              width: "90%",
              margin: "0 auto",
            }}
          >
            {success && <p className="success">Projet ajouté</p>}
            <h1>Ajoutés un projet</h1>
            <div className="container-input-add">
              <label htmlFor="title">Titre du projet</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="github">Lien Github</label>
              <input
                type="text"
                name="github"
                id="github"
                onChange={(e) => setGithub(e.target.value)}
              />
              <select onChange={(e) => setType(e.target.value)}>
                <option value="0">Application Web</option>
                <option value="1">Application mobile</option>
              </select>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button onClick={(e) => HandleSubmit(e)}>Ajouter</button>
                <button className="close" onClick={() => setIsModalOpen(false)}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
