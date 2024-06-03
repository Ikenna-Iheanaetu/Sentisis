import { useState } from "react";
import Textarea from "../components/textarea";
import SentimentResult from "../components/sentimentResult";

interface ResultProps {
  highlighted_text: {
    [key: string]: string;
  };
  overall_sentiment_score: number;
  sentiment_label: string;
  sentiment_scores: {
    [key: string]: number;
  };
}

export const App = () => {
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResultProps | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleSubmit = async () => {
    setLoading(!loading);

    if (inputText === "") {
      setErrorMessage("Input a sentence or paragragh to know it's sentiment");
      setLoading(false);
      setTimeout(() => {
        return setErrorMessage(null);
      }, 5000);
    }

    const url = "https://ai-text-sentiment-analysis.onrender.com/analyze_text";
    const body = {
      text: inputText,
    };
    console.log(body);

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setResult(data)
      })
      .catch((error) => console.error("Error:", error));

    console.log(result);
    setLoading(false);
  };

  return (
    <div className="px-3 mt-5 grid place-content-center">
      <div className="flex items-center justify-center flex-col gap-3">
        <h1 className="text-[30px] mt-3 blue_gradient sm:text-4xl sm:mt-6 md:text-6xl">
          Sentinemt Analysis
        </h1>
        <h4 className="desc">
          Transform text into actionable insights with our advanced sentiment
          analysis tool. Discover the emotions behind the words and make
          data-driven decisions with ease.
        </h4>
      </div>
      <Textarea
        inputText={inputText}
        setInputText={setInputText}
        loading={loading}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
      <SentimentResult result={result} />
    </div>
  );
};
