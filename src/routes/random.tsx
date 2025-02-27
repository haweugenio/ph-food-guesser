import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Select from "react-select";
import CompassIcon from "../components/CompassIcon";
import { calculateCompassDirection } from "../utils/compassDirection";

export const Route = createFileRoute("/random")({
  component: RouteComponent,
  loader: async () => {
    try {
      let food = window.localStorage.getItem("food");
      if (food == null) {
        // Fetch food data
        const foodResponse = await fetch(
          "http://127.0.0.1:8000/api/foods/random"
        );
        if (!foodResponse.ok) {
          throw new Error("Failed to fetch food data");
        }
        food = await foodResponse.json();
        window.localStorage.setItem("food", JSON.stringify(food));
      } else {
        food = JSON.parse(food);
      }

      // Fetch provinces data
      const provincesResponse = await fetch(
        "http://127.0.0.1:8000/api/provinces"
      );
      if (!provincesResponse.ok) {
        throw new Error("Failed to fetch provinces data");
      }
      const provinces = await provincesResponse.json();

      return { food, provinces };
    } catch (error) {
      console.error("Loader error:", error);
      throw new Error("Failed to load data");
    }
  },
});

type Province = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

function RouteComponent() {
  const navigate = useNavigate();

  const [selectedProvinces, setSelectedProvinces] = useState<Province[]>([]);

  const { food, provinces } = useLoaderData({ from: "/random" }) as {
    food: any;
    provinces: Province[];
  };

  const onChange = (option: Province | null) => {
    if (option?.id == food.province_id) {
      const data = window.localStorage.getItem("gameState");
      const gameState = data ? JSON.parse(data) : {};
      gameState.hasWon = true;
      gameState.roundOver = true;
      window.localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    setSelectedProvinces((prevProvinces) => {
      if (option) {
        return [...prevProvinces, option];
      }
      return prevProvinces;
    });
  };

  const filteredProvinces = provinces.filter(
    (item) => !selectedProvinces.map((x) => x.id).includes(item.id)
  );

  const customSingleValue = () => {
    return null;
  };

  useEffect(() => {
    const data = window.localStorage.getItem("gameState");
    const parsedData = data ? JSON.parse(data) : {};

    if (parsedData.selectedProvinces?.length) {
      setSelectedProvinces(parsedData.selectedProvinces);
    }
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("gameState");
    let gameState = data ? JSON.parse(data) : {};

    gameState.selectedProvinces = selectedProvinces;
    gameState.roundOver =
      gameState.roundOver || selectedProvinces.length === 5 ? true : false;

    window.localStorage.setItem("gameState", JSON.stringify(gameState));
    console.log(gameState);
    if (gameState.roundOver) {
      navigate({ to: "/result" });
    }
  }, [selectedProvinces]);

  return (
    <div className="h-dvh overscroll-none">
      <div>
        <nav className="grid grid-cols-2 gap-4">
          <h2
            className="text-4xl cursor-pointer"
            onClick={() => {
              navigate({ to: "/" });
            }}
          >
            PHFoodGuesser
          </h2>
          <div className="flex justify-end gap-24">
            <div>
              <svg
                fill="#000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="1.8em"
                height="1.8em"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    strokeWidth="1px"
                    d="M23.424,10.827c0,3.956-4.533,5.478-5.507,6.907c-0.729,1.063-0.485,2.557-2.495,2.557c-1.309,0-1.946-1.064-1.946-2.039   c0-3.623,5.323-4.442,5.323-7.425c0-1.643-1.096-2.616-2.921-2.616c-3.895,0-2.373,4.016-5.323,4.016   c-1.066,0-1.979-0.639-1.979-1.855c0-2.983,3.407-5.628,7.119-5.628C19.59,4.742,23.424,6.536,23.424,10.827z M15.545,22.268   c-1.369,0-2.496,1.125-2.496,2.496c0,1.369,1.127,2.494,2.496,2.494c1.367,0,2.494-1.125,2.494-2.494   C18.039,23.393,16.912,22.268,15.545,22.268z M32,16c0,8.822-7.178,16-16,16C7.178,32,0,24.822,0,16S7.178,0,16,0   C24.822,0,32,7.177,32,16z M29,16c0-7.168-5.832-13-13-13S3,8.832,3,16s5.832,13,13,13S29,23.168,29,16z"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </nav>
      </div>

      {/* <div className="h-full">
        <div className="flex h-full">
          <img
            className="object-scale-down max-h-full drop-shadow-md rounded-md m-auto"
            src={food.images}
            alt=""
          />
        </div>
      </div> */}

      <div className="flex flex-row h-full justify-between">
        <div className="h-full">
          <img
            className="object-scale-down max-h-full drop-shadow-md rounded-md m-auto"
            src={food.images}
            alt=""
          />
        </div>
        <div className="h-full">
          <div className="max-w-2xl w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mr-5 mt-5 flex flex-col gap-4 overflow-auto">
            <div>
              <div className="text-sm font-bold opacity-80">Name</div>
              <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              {selectedProvinces.length > 1 ? (
                <div className="text-6xl font-bold">{food.name}</div>
              ) : (
                <div className="italic opacity-60">Reveals after 2 guesses</div>
              )}
            </div>
            <div>
              <div className="text-sm font-bold opacity-80">Ingredients</div>
              <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="text-lg">{food.ingredients}</div>
            </div>
            <div>
              <div className="text-sm font-bold opacity-80">Description</div>
              <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="text-lg">{food.description}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-0">
        <div className="max-w-3xl w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mr-5 flex flex-col">
          <div className="flex flex-row justify-between">
            <span>Guesses Remaining:</span>
            <span>{5 - selectedProvinces.length}</span>
          </div>
          <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <ul className="space-y-2 mt-2 mb-3">
            {selectedProvinces.map((province) => (
              <li
                key={province.id}
                className="p-3 bg-gray-100 rounded-md shadow-sm"
              >
                <div className="flex justify-between">
                  <div>{province.name}</div>
                  <CompassIcon
                    direction={calculateCompassDirection(
                      province.latitude,
                      province.longitude,
                      food.province.latitude,
                      food.province.longitude
                    )}
                  />
                </div>
              </li>
            ))}
          </ul>
          <Select<Province>
            options={filteredProvinces}
            menuPlacement="top"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => String(option.id)}
            onChange={onChange}
            placeholder="Guess a province"
            components={{
              SingleValue: customSingleValue,
            }}
            isDisabled={selectedProvinces.length == 5}
            value={null}
            isClearable={false}
          />
        </div>
      </div>
    </div>
  );
}
