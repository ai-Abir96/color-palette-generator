import { useState } from "react";
import { SketchPicker } from "react-color";
const ColorCell = ({ colorValue }) => {
  const [toolTip, setTooltip] = useState(false);
  const [colorPicker, setColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorValue);

  const handleOnMouseEnter = () => {
    setTooltip(true);
  };

  const handleOnMouseLeave = () => {
    setTooltip(false);
  };

  const handleColorPicker = () => {
    setColorPicker(!colorPicker);
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor.hex);
  };

  return (
    <div
      className="w-full px-8 py-2 relative"
      style={{ backgroundColor: selectedColor }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleColorPicker}
    >
      {toolTip && <div className="absolute -top-10 left-0 p-2 bg-white rounded shadow">{selectedColor}</div>}
      {colorPicker && (
        <div className="absolute top-0 left-0 p-2">
          <SketchPicker color={selectedColor} onChange={handleColorChange} />
        </div>
      )}
      &nbsp;
    </div>
  );
};

export default ColorCell;
