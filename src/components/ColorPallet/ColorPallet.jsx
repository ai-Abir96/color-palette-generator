import { useState } from "react";
import DragNDropColor from "../DragAndDrop/DragNDropColor";
import { useDispatch, useSelector } from "react-redux";
import { clearPalette, savePalette, updateColors } from "../utils/slices/paletteSlice";

const ColorPallet = () => {
  const [newColor, setNewColor] = useState("");
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.palettes.colors);
  const savedPalettes = useSelector((state) => state.palettes.savedPalettes);

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
    dispatch(updateColors(Array.from({ length: 4 }, getRandomColor)));
  };

  //adds a new color to the colors pallet array
  const handleAddColor = () => {
    if (newColor) {
      dispatch(updateColors([...colors, newColor]));
      setNewColor("");
    }
  };

  //for drag and drop the color pallet to a desired order
  const moveColor = (fromIndex, toIndex) => {
    const updatedColors = [...colors];
    const [movedColor] = updatedColors.splice(fromIndex, 1);
    updatedColors.splice(toIndex, 0, movedColor);
    dispatch(updateColors(updatedColors));
  };

  //for saving the color pallet
  const handleSavePalette = () => {
    dispatch(savePalette(colors));
  };

  //export the color pallet as json file
  const handleExportPalette = (palette) => {
    const json = JSON.stringify(palette);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-palette.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearPalette = () => {
    dispatch(clearPalette());
  };
  return (
    <div className="mt-48 mx-48">
      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="flex items-center justify-center">
            {colors.map((color, index) => (
              <DragNDropColor key={color} index={index} colorValue={color} moveColor={moveColor} />
            ))}
          </div>

          <div className="flex md:flex-row flex-col items-center justify-center mt-5 gap-3">
            <button
              className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={generateRandomColorPalette}
            >
              Generate Random Palette
            </button>
            <button
              className="bg-green-500   hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSavePalette}
            >
              Save Palette
            </button>
          </div>
        </div>
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

      <div className="mt-4 flex flex-col items-center justify-center">
        {savedPalettes.map((palette, index) => (
          <div className="justify-center items-center flex flex-col" key={index}>
            <div className="flex mt-2">
              {palette.map((color, colorIndex) => (
                <DragNDropColor key={color} index={colorIndex} colorValue={color} moveColor={moveColor} />
              ))}
            </div>
            <button className=" bg-green-500 text-white px-2 py-1" onClick={() => handleExportPalette(palette)}>
              Export Palette
            </button>
          </div>
        ))}
        {savedPalettes.length != 0 && (
          <div className="mt-6 ">
            <button className=" bg-red-500 text-white px-2 py-1" onClick={handleClearPalette}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPallet;
