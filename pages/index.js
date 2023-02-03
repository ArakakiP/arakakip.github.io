import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();


  function sendAnswer (event){
    setTimeout(() => {
      onSubmit(event)
    }, 1000);
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animalInput ),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data)
      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <h3>Me faça uma pergunta</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="animal"
            placeholder="Pergunta"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <div onClick={sendAnswer} className={styles.buttonSend}> Gerar Resposta</div>
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
