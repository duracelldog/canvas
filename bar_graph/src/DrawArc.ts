import { graphSpecType, mouseType } from "./App";

function DrawArc(
    context: CanvasRenderingContext2D, 
    {xPos, yPos}: mouseType
){
    context.beginPath();
    // context.clearRect(0, 0, stageWidth, stageHeight);
    context.fillStyle = 'rgb(0, 0, 0, 0.5)';
    context.arc(xPos, yPos, 5, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
    context.closePath();
}

export default DrawArc;