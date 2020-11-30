import { graphSpecType, mouseType } from "./App";

function DrawGraph(
    context: CanvasRenderingContext2D, 
    {stageWidth, stageHeight, axisGap, bar_width, bar_cnt}: graphSpecType,
    sampleData: number[],
    {xPos, yPos}: mouseType
){
           
    context.beginPath();

    // context.arc(0, 0, 50, 0, Math.PI * 2, false);
    
    
    for(let i=0; i< bar_cnt; i++){
        const distance = (stageWidth - (bar_width*bar_cnt)) / (bar_cnt + 1); // 막대 간 간격
        const xPosition = (distance + bar_width) * i + distance - axisGap/2; //

        context.font = "20px Arial";
        context.fillStyle = "black";
        context.fillText(`${i}`, xPosition+ 10, 30);

        context.fillStyle = 'rgb(0, 199, 235, 0.4)';
        if(xPos > xPosition && xPos <= xPosition+bar_width){
            if(yPos < 0 && yPos >= -1 * stageHeight * (sampleData[i] * 0.001))
            context.fillStyle = 'rgb(244, 67, 54, 0.4)';
        } 
        context.fillRect(xPosition, 0, bar_width, -1 * stageHeight * (sampleData[i] * 0.001));
    }

    
    context.stroke();
    context.fill();
    context.closePath();
}

export default DrawGraph;