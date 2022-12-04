import React, { useEffect } from "react";
import "./projet.css";
import { SiAddthis } from "react-icons/si";
import { getAllProjet, getUploadProjetById, uploadfile } from "../../utils/api";
import ModalAddProjet from "./ModalAddProjet";

export default function Projet() {
  const [projet, setProjet] = React.useState([]);
  const [upload, setUpload] = React.useState([]);
  const [file, setFile] = React.useState([]);
  const [indexProjet, setIndexProjet] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  useEffect(() => {
    getAllProjet().then((res) => {
      setProjet(res.data);
      setIndexProjet(res.data[0].id);
      getUploadProjetById(res.data[0].id).then((res) => {
        setUpload(res.data);
      });
    });
  }, [isModalOpen]);

  return (
    <div className="container-projet">
      {isModalOpen && <ModalAddProjet setIsModalOpen={setIsModalOpen} />}
      {success && (
        <p className="success">Bravo vous avez ajoutés l'image avec succes</p>
      )}
      {error && <p className="error">Une erreur est survenue</p>}
      <h1>Projet</h1>
      <div className="container-projet-choice">
        <select
          onChange={(e) => {
            getUploadProjetById(e.target.value).then((res) => {
              setUpload(res.data);
              setIndexProjet(res.data[0].projet_id);
            });
          }}
        >
          {projet.map((projet, index) => {
            return (
              <option
                key={index}
                onClick={() => console.log(projet.id)}
                value={projet.id}
              >
                {projet.name}
              </option>
            );
          })}
        </select>

        <SiAddthis
          size={30}
          color="#070707"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="container-projet-list">
        <div className="container-upload">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button
            onClick={() => {
              uploadfile(indexProjet, file).then((res) => {
                if (res.status === 200) {
                  getUploadProjetById(indexProjet).then((res) => {
                    setUpload(res.data);
                    setSuccess(true);
                  });
                } else {
                  setError(true);
                }
              });
            }}
          >
            Upload
          </button>
        </div>
        {upload.map((image, index) => {
          return (
            <div className="container-img">
              <img src={image.uri} alt="image" key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
