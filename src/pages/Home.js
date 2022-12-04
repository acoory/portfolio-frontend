import "../App.css";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaSass,
  FaSymfony,
  FaGithub,
  FaFileAlt,
} from "react-icons/fa";
import { MdOutlineArrowDropDown, MdWebAsset } from "react-icons/md";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { AiOutlineMobile } from "react-icons/ai";
import ImageGallery from "react-image-gallery";
import { getAllProjet, getConfig, getUploadProjetById } from "../utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [projet, setProjet] = useState([]);
  const [upload, setUpload] = useState([]);
  const [title, setTitle] = useState("");
  const [githubProjet, setGithubProjet] = useState("");
  const [indexCaroussel, setIndexCaroussel] = useState(0);
  const [gitUri, setGitUri] = useState("");
  const [cvUri, setCvUri] = useState("");

  useEffect(() => {
    getAllProjet().then((res) => {
      setProjet(res.data);
      console.log(res.data);
      setTitle(res.data[0].name);
      setGithubProjet(res.data[0].github);
      getUploadProjetById(res.data[0].id).then((res) => {
        // change uri property to original
        const images = res.data.map((image) => {
          return {
            original: image.uri,
            thumbnail: image.uri,
          };
        });
        setUpload(images);
      });
    });
    getConfig().then((res) => {
      console.log(res.data);
      setGitUri(res.data[0].github);
      setCvUri(res.data[0].cv);
    });
  }, []);

  const HandleNext = () => {
    if (indexCaroussel + 1 >= upload?.length) {
      setIndexCaroussel(0);
    } else {
      setIndexCaroussel(indexCaroussel + 1);
    }
  };

  const HandlePrev = () => {
    if (indexCaroussel - 1 < 0) {
      setIndexCaroussel(upload?.length - 1);
    } else {
      setIndexCaroussel(indexCaroussel - 1);
    }
  };
  return (
    <>
      <div className="container">
        <div className="header"></div>
        <div className="content">
          <div className="container-social">
            <div className="social">
              {gitUri && (
                <>
                  <a href={gitUri} target="_blank">
                    <div className="container-icon">
                      <FaGithub size={30} color="white" />
                    </div>
                  </a>
                  <a href={cvUri} target="_blank">
                    <div className="container-icon">
                      <FaFileAlt size={30} color="white" />
                    </div>
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="container-listprojet">
            <div className="title">
              <div
                style={{
                  marginTop: 0,
                }}
              >
                <MdOutlineArrowDropDown size={30} color="rgb(74 74 74)" />
              </div>
              <p>Projets</p>
            </div>
            {/* <div className="container-titleprojet">
              <MdWebAsset
                size={20}
                color="rgb(74 74 74)"
                style={{
                  marginLeft: 10,
                }}
              />
              Readme
            </div> */}
            {projet.length > 0 ? (
              projet.map((item, index) => (
                <div
                  className="container-titleprojet"
                  key={index}
                  onClick={() => {
                    setUpload([]);
                    setTitle(item.name);
                    setIndexCaroussel(0);
                    getUploadProjetById(item.id).then((res) => {
                      const images = res.data.map((image) => {
                        return {
                          original: image.uri,
                          thumbnail: image.uri,
                        };
                      });
                      setGithubProjet(projet[index].github);
                      setUpload(images);
                    });
                  }}
                >
                  {item.type == 0 ? (
                    <MdWebAsset
                      size={20}
                      color="rgb(74 74 74)"
                      style={{
                        marginLeft: 10,
                      }}
                    />
                  ) : (
                    <AiOutlineMobile
                      size={20}
                      color="rgb(74 74 74)"
                      style={{
                        marginLeft: 10,
                      }}
                    />
                  )}
                  {item.name}
                </div>
              ))
            ) : (
              <>
                <div className="loader-titleprojet"></div>
                <div className="loader-titleprojet"></div>
                <div className="loader-titleprojet"></div>
                <div className="loader-titleprojet"></div>
              </>
            )}
          </div>
          <main>
            <div
              className="title"
              style={{
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  marginLeft: 10,
                }}
              >
                {title}
              </p>

              <a href={githubProjet} target="__blank">
                <FaGithub
                  size={20}
                  color="white"
                  style={{
                    marginRight: 20,
                  }}
                />
              </a>
            </div>
            {upload.length > 0 ? (
              <div className="body-main">
                <div
                  style={{
                    position: "absolute",
                    color: "white",
                    padding: 10,
                    backgroundColor: "rgb(42 42 42 / 50%)",
                  }}
                >
                  {indexCaroussel + 1} / {upload?.length}
                </div>
                <div
                  className="container-button"
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(42 42 42 / 50%)",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button onClick={() => HandlePrev()}>
                    <BsArrowLeftSquareFill size={50} color="white" />
                  </button>
                  <img
                    src={upload[indexCaroussel]?.original}
                    style={{
                      width: "80%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <button
                    onClick={() => HandleNext()}
                    style={{
                      left: 30,
                    }}
                  >
                    <BsArrowRightSquareFill size={50} color="white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="container-loader">
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
