import React, { useState } from "react";
import { Modal } from "bootstrap";

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AI_API}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return URL.createObjectURL(result);
}

const HeroData = [
  {
    img: "https://cdn.openai.com/labs/images/3D%20render%20of%20a%20cute%20tropical%20fish%20in%20an%20aquarium%20on%20a%20dark%20blue%20background,%20digital%20art.webp?v=1",
    caption:
      "3D render of a cute tropical fish in an aquarium on a dark blue background, digital art",
  },
  {
    img: "https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1",
    caption: "Armchair in the shape of an avocado",
  },
  {
    img: "https://cdn.openai.com/labs/images/An%20expressive%20oil%20painting%20of%20a%20basketball%20player%20dunking,%20depicted%20as%20an%20explosion%20of%20a%20nebula.webp?v=1",
    caption:
      "Expressive oil painting of a basketball player dunking, depicted as an explosion of a nebula",
  },
  {
    img: "https://cdn.openai.com/labs/images/A%20photo%20of%20a%20white%20fur%20monster%20standing%20in%20a%20purple%20room.webp?v=1",
    caption: "Photo of a white fur monster standing in a purple room",
  },
  {
    img: "https://cdn.openai.com/labs/images/A%203D%20render%20of%20an%20astronaut%20walking%20in%20a%20green%20desert.webp?v=1",
    caption: "3D render of an astronaut walking in a green desert",
  },
  {
    img: "https://cdn.openai.com/labs/images/A%20photo%20of%20a%20teddy%20bear%20on%20a%20skateboard%20in%20Times%20Square.webp?v=1",
    caption: "Photo of a teddy bear on a skateboard in Times Square",
  },
];

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalCaption, setModalCaption] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const variation1 = " - Variation 1";
      const variation2 = " - Variation 2";
      const variation3 = " - Variation 3";
      const variation4 = " - Variation 4";

      const prompt1 = inputText + variation1;
      const prompt2 = inputText + variation2;
      const prompt3 = inputText + variation3;
      const prompt4 = inputText + variation4;

      const responses = await Promise.all([
        query({ inputs: prompt1 }),
        query({ inputs: prompt2 }),
        query({ inputs: prompt3 }),
        query({ inputs: prompt4 }),
      ]);

      setImageData(responses);
      localStorage.setItem("generatedImages", JSON.stringify(responses));
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(
        "An error occurred while fetching images. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openModal = (imgSrc, caption) => {
    setModalImage(imgSrc);
    setModalCaption(caption);
    new Modal(document.getElementById("imageModal")).show();
  };

  return (
    <div className="container" style={{ width: "55%" }}>
      <h1 className="text-center mt-5 mb-2">AI Image Generator</h1>
      <p className="text-center mt-2 mb-4">
        An AI-powered text-to-image generator that provides you with endless
        results in real-time. Give it a try!
      </p>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control py-3"
            placeholder="Describe what you want to see"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={!inputText.trim() || loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 19 18"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  className="me-2"
                >
                  <path d="M16.294 1.888 15.846.872a.623.623 0 0 0-1.14 0l-.448 1.016a.62.62 0 0 1-.319.318l-1.016.448a.623.623 0 0 0 0 1.141l1.016.448a.62.62 0 0 1 .319.319l.448 1.015a.623.623 0 0 0 1.14 0l.448-1.015a.62.62 0 0 1 .319-.32l1.016-.447a.623.623 0 0 0 0-1.14l-1.016-.449a.62.62 0 0 1-.319-.318"></path>
                  <path
                    fillRule="evenodd"
                    d="M9.795 4.976.242 14.53a.88.88 0 0 0 0 1.243l2.486 2.486a.88.88 0 0 0 1.243 0l9.553-9.554a.88.88 0 0 0 0-1.243L11.04 4.976a.88.88 0 0 0-1.244 0Zm-.724 3.211 1.346-1.346 1.243 1.243-1.346 1.346zm0 2.487-5.722 5.72-1.243-1.243 5.721-5.72 1.243 1.243Z"
                    clipRule="evenodd"
                  ></path>
                  <path d="m16.07 9.825.307.694c.043.098.12.175.218.218l.694.307c.34.149.34.63 0 .78l-.695.306a.43.43 0 0 0-.217.218l-.307.695a.426.426 0 0 1-.78 0l-.306-.695a.43.43 0 0 0-.218-.218l-.695-.306a.426.426 0 0 1 0-.78l.695-.307a.43.43 0 0 0 .218-.218l.306-.694c.15-.34.63-.34.78 0M7.763 1.906l-.306-.695a.426.426 0 0 0-.78 0l-.306.695a.43.43 0 0 1-.218.218l-.695.306c-.34.15-.34.63 0 .78l.695.307c.097.043.175.12.218.218l.306.694c.15.34.63.34.78 0l.306-.694a.43.43 0 0 1 .218-.218l.695-.307a.426.426 0 0 0 0-.78l-.695-.306a.43.43 0 0 1-.218-.218"></path>
                </svg>
                Generate
              </>
            )}
          </button>
        </div>
        {error && <div className="text-danger">{error}</div>}
      </form>

      {imageData.length > 0 && !loading && (
        <div className="row row-cols-1 row-cols-md-2 g-2">
          {imageData.map((imageSrc, index) => (
            <div key={index} className="col">
              <div className="card position-relative p-0 m-0">
                <div
                  className="card-img-top"
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "100% 100%",
                    height: "350px",
                  }}
                  alt={`Generated image ${index + 1}`}
                ></div>
                <button
                  className="btn btn-light position-absolute top-0 end-0 m-2"
                  onClick={() => handleDownload(imageSrc)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-download"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {imageData.length === 0 && !loading && (
        <div className="row">
          {HeroData.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div
                className="position-relative"
                onClick={() => openModal(item.img, item.caption)}
              >
                <img
                  src={item.img}
                  className="w-100 shadow-1-strong rounded mb-2"
                  alt="Image"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="modal fade" id="imageModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <img src={modalImage} className="img-fluid" alt="Modal" />
              <h6 className="mt-4 text-center">{modalCaption}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
