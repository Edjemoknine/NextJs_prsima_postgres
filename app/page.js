"use client";
import { useCompletion } from "ai/react";

export default function Home() {
  const {
    completion,
    input,
    handleInputChange,
    isLoading,
    stop,
    handleSubmit,
  } = useCompletion({ api: "/api/complition" });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-4xl min-h-[500px] w-full mx-auto p-10 rounded-md bg-gray-700">
        <h1 className="text-center text-4xl font-semibold mb-10">Ai Chatbot</h1>
        <form className="mb-10" onSubmit={handleSubmit}>
          <input
            placeholder="Ask a question"
            className="w-full p-3 rounded-md border-gray-400 border text-gray-400 focus:border-none bg-transparent focus:outline-blue-500"
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <div className="mt-4">
            {completion && (
              <button
                className="p-2 px-6 cursor-pointer hover:bg-red-600 duration-300 rounded-md text-white bg-red-500 mr-3"
                onClick={stop}
              >
                stop
              </button>
            )}
            {!completion && (
              <button
                className="p-2 px-6 cursor-pointer hover:bg-blue-600 duration-300 rounded-md text-white bg-blue-500"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Loading..." : "Ask me"}
              </button>
            )}
          </div>
        </form>
        <output>
          {" "}
          <span className="font-bold text-2xl mb-2">
            AI Results:
          </span> <br /> {completion}
        </output>
      </div>
    </main>
  );
}
