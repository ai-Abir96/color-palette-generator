import { useDrag, useDrop } from "react-dnd";
import ColorCell from "../ColorCell/ColorCell";

const DragNDropColor = ({ index, colorValue, moveColor }) => {
  const [, ref] = useDrag({
    type: "COLOR",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "COLOR",
    hover: (item) => {
      if (item.index !== index) {
        moveColor(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className=" flex items-center mx-auto px-4 py-4">
      <ColorCell colorValue={colorValue} />
    </div>
  );
};

export default DragNDropColor;
