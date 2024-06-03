import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

export const Sentiment = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { sentiment } = useParams();
  const [sentimentSentences, setSentimentSentences] = useState<string[]>([]);

  useEffect(() => {
    if (location.state.result) {
      const data: ResultProps = location.state.result;
      Object.entries(data.highlighted_text).map(([value, key]) => {
          console.log(value, sentiment)
        if (sentiment === key && !sentimentSentences.includes(value)) {
          setSentimentSentences([...sentimentSentences, value]);
        }
      });
    }
  }, [location, sentiment, sentimentSentences]);

  return (
    <div className="grid place-content-center mt-2 sm:mt-5">
      <h2 className="text-center text-[40px] font-semibold  blue_gradient">
        Highlighted Sentences
      </h2>
      <p className="desc">
        These are sentence(s) that have the {sentiment} sentiment
      </p>

      {sentimentSentences.length > 0 ? (
        <div>
          {sentimentSentences.map((sentence, index) => (
            <div key={sentence} className="flex gap-3 mt-5">
              <p className="text-[20px]">{index + 1}</p>
              <p className="text-[20px]">{sentence}</p>
            </div>
          ))}
          <button className="btn mt-4" onClick={() => navigate('/')}>Go back</button>
        </div>
      ) : (
        <div className="mt-4 grid place-content-center">
          <p className="text-lg">There are no sentences for {sentiment}</p>
          <button className="btn mt-4" onClick={() => navigate('/')}>Go back</button>
        </div>
      )}
    </div>
  );
};
