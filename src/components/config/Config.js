import React, { useEffect } from "react";
import { getConfig, updateConfig } from "../../utils/api";
import "./config.css";

export default function Config() {
  const [config, setConfig] = React.useState({});
  const [github, setGithub] = React.useState("");
  const [cv, setCv] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    getConfig().then((res) => {
      setGithub(res.data[0].github);
      setCv(res.data[0].cv);
    });
  }, [success, error]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    updateConfig(github, cv).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setSuccess(true);
        setError(false);
      }
    });
  };

  return (
    <div className="container-config">
      {success && <p className="success">Modification effectuée</p>}
      <h1>Config</h1>
      <label htmlFor="github">Github</label>
      <input
        type="text"
        name="github"
        id="github"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <label htmlFor="cv">Cv</label>
      <input
        type="text"
        name="cv"
        id="cv"
        value={cv}
        onChange={(e) => setCv(e.target.value)}
      />
      <button onClick={(e) => HandleSubmit(e)}>Enregistrer</button>
    </div>
  );
}
