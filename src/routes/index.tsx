import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handlePlay = () => {
    window.localStorage.clear();
    navigate({ to: "/random" });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl text-center">
          <span>PHFoodGuesser</span>
        </h1>
        <button
          className="w-sm mt-5 px-6 py-4 bg-blue-500 text-white font-bold cursor-pointer text-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => handlePlay()}
        >
          Play
        </button>
      </div>
    </div>
  );
}
