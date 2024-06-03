import { useNavigate } from "react-router-dom";

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

interface SentimentResultProps {
  result: null | ResultProps;
}

export default function SentimentResult({ result }: SentimentResultProps) {
  const navigate = useNavigate()

  return (
    <div>
      {result ? (
        <div>
          <div className="mt-5 grid place-content-center">
            <p className="text-2xl">Sentiment Results</p>
          </div>

          <div className="">
            <div className="flex gap-3 items-center mt-4">
              <p className="text-[20px] font-medium">Sentiment Label:</p>
              <p className="text-[20px]">{result.sentiment_label}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <p className="text-[20px] font-medium">Sentiment Scores: </p>
              <div className="flex flex-col">
                {Object.entries(result.sentiment_scores).map(([key, value]) => (
                  <div className="flex gap-2 first:mt-0 mt-2" key={key}>
                    <p className="text-[20px]">{key}:</p>
                    <p className="text-[20px]">{value}</p>
                    <button className="btn" onClick={() => navigate(`/sentiment/${key}`, { state: {result} })}>Sentiment Text</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 items-center mt-4">
              <p className="text-[20px] font-medium">Overall Sentiment Score:</p>
              <p className="text-[20px]">{ Math.round(result.overall_sentiment_score)}%</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-content-center mt-[15%]">
          <p>No analyzed text to check sentiment</p>
        </div>
      )}
    </div>
  );
}
