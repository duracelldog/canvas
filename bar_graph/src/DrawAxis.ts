import { graphSpecType } from "./App";

function DrawAxis(context: CanvasRenderingContext2D, {stageWidth, stageHeight, axisGap, bar_width, bar_cnt}: graphSpecType){
    context.beginPath();

    // y축
    context.moveTo(0, 0);
    context.lineTo(0, -1 * (stageHeight - axisGap));
    context.stroke();

    // y축 눈금
    for(let i=0; i< 9; i++){

        context.moveTo(0, 0);
        context.moveTo(0, -1 * (stageHeight - axisGap)/10*(i+1));
        context.moveTo(-5, -1 * (stageHeight - axisGap)/10*(i+1));
        context.lineTo(5, -1 * (stageHeight - axisGap)/10*(i+1));
        context.stroke();

        

        // 텍스트
        context.fillStyle = "black";
        context.font = "20px Arial";
        context.fillText(`${i+1}`, -30, -1 * (stageHeight - axisGap)/10*(i+1) + 5)
    }

    // x축
    context.moveTo(0, 0);
    context.lineTo(stageWidth - axisGap, 0);
    context.stroke();


    context.closePath();
}   

export default DrawAxis;