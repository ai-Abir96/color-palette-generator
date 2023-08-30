import { useState } from "react";
import DragNDropColor from "../DragAndDrop/DragNDropColor";

const ColorPallet = () => {
  const [colors, setColors] = useState(["#FF5733", "#34FFA2", "#438AFF", "#FD33E9"]);
  const [newColor, setNewColor] = useState("");
  const [savedPalettes, setSavedPalettes] = useState([]);

  //generates random color in hex format
  const getRandomColor = () => {
    const HexCharecters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += HexCharecters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  //generate colorpallet for the colors array
  const generateRandomColorPalette = () => {
    const randomColors = Array.from({ length: 4 }, getRandomColor);
    setColors(randomColors);
  };

  //adds a new color to the colors pallet array
  const handleAddColor = () => {
    if (newColor) {
      setColors([...colors, newColor]);
      setNewColor("");
    }
  };

  //for drag and drop the color pallet to a desired order
  const moveColor = (fromIndex, toIndex) => {
    const updatedColors = [...colors];
    const [movedColor] = updatedColors.splice(fromIndex, 1);
    updatedColors.splice(toIndex, 0, movedColor);
    setColors(updatedColors);
  };

  //for saving the color pallet
  const handleSavePalette = () => {
    setSavedPalettes([...savedPalettes, colors]);
  };

  //export the color pallet as json file
  const handleExportPalette = (palette) => {
    const json = JSON.stringify(palette, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-palette.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-48 mx-48">
      <div className=" flex flex-col items-center">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            {colors.map((color, index) => (
              <DragNDropColor key={color} index={index} colorValue={color} moveColor={moveColor} />
            ))}
          </div>
          <button
            className="bg-blue-500 w-1/6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={generateRandomColorPalette}
          >
            Generate Random Palette
          </button>
        </div>
        <button
          className="bg-blue-500 w-1/6 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSavePalette}
        >
          Save Palette
        </button>
        <div className="flex mt-20">
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="Enter new color in HEX format"
            className="border p-1 mr-2 "
          />
          <button className="w-full bg-teal-300 hover:bg-teal-600 font-bold py-2 px-4 rounded" onClick={handleAddColor}>
            Add Color
          </button>
        </div>
      </div>

      <div className="mt-4">
        {savedPalettes.map((palette, index) => (
          <div className="justify-center items-center flex flex-col" key={index}>
            <div className="flex flex-wrap  -mx-4 mt-2">
              {palette.map((color, colorIndex) => (
                <DragNDropColor key={color} index={colorIndex} colorValue={color} moveColor={moveColor} />
              ))}
            </div>
            <button className=" bg-green-500 text-white px-2 py-1" onClick={() => handleExportPalette(palette)}>
              Export
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPallet;
