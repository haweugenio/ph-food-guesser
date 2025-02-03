import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/result")({
  component: RouteComponent,
  loader: async () => {
    let gameState = window.localStorage.getItem("gameState");
    if (gameState != null) {
      gameState = JSON.parse(gameState);
    }

    return { gameState };
  },
});

function RouteComponent() {
  const { gameState } = useLoaderData({ from: "/result" }) as {
    gameState: any;
  };

  const navigate = useNavigate();

  const handlePlayAgain = () => {
    console.log("play agian");
    window.localStorage.clear();
    window.localStorage.setItem(
      "gameState",
      JSON.stringify({
        hasWon: false,
        roundOver: false,
        selectedProvinces: [],
      })
    );
    navigate({ to: "/random" });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl text-center">
          {gameState.roundOver && gameState.hasWon ? (
            <span>YOU WIN</span>
          ) : (
            <span>YOU LOSE</span>
          )}
        </h1>
        <button
          className="w-sm mt-5 px-6 py-4 bg-blue-500 text-white font-bold cursor-pointer text-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => handlePlayAgain()}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
