import { useState } from "react";
import { Oval } from "react-loader-spinner";

interface TextAreaProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSubmit: () => Promise<void>;
  errorMessage: string | null;
}

export default function Textarea({
  inputText,
  setInputText,
  loading,
  handleSubmit,
  errorMessage,
}: TextAreaProps) {
  const [screenWidth] = useState(window.innerWidth)

  return (
    <div className="mt-6">
      <div className="flex flex-col">
        <textarea
          className="text-sm md:text-2xl p-5 border border-black resize-none rounded-md"
          cols={screenWidth < 720 ? 10 : screenWidth >= 800 ? 50 : 10}
          rows={5}
          placeholder="Enter the text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="mt-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 px-16 py-6 rounded-md text-white text-2xl"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className="grid place-content-center">
              <Oval
              height="40"
              width="40"
              color="white"
              secondaryColor="#fff"
              ariaLabel="oval-loading"
            />
            </div>
          ) : (
            `Analyse`
          )}
        </button>
      </div>
      <div className="grid place-content-center mt-3">
        {errorMessage && <p className="text-red-500 text-sm md:text-lg">{errorMessage}</p>}
      </div>
    </div>
  );
}
