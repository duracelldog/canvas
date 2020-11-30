import DrawArc from "./DrawArc";
import DrawAxis from "./DrawAxis";
import DrawGraph from "./DrawGraph";

export type graphSpecType = {
    stageWidth: number; 
    stageHeight: number; 
    baseX: number;
    baseY: number;
    axisGap: number; 
    bar_width: number; 
    bar_cnt: number;
}

export type mouseType = {
    xPos: number;
    yPos: number;
}

function App(){
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.body.appendChild(canvas);

    const sampleData = [
        100, 200, 300, 500, 800, 400, 200, 100, 200, 300
    ]

    
    let processData: number[] = [];
    sampleData.forEach(()=>{
        processData.push(1);
    })

    let mouse = {
        xPos: 0,
        yPos: 0
    }

    let graphSpecs: graphSpecType = {
        stageWidth: document.body.clientWidth,
        stageHeight: document.body.clientHeight,
        baseX: 0,
        baseY: 0,
        axisGap: 50,
        bar_width: 30,
        bar_cnt: sampleData.length
    }

    const increaseData = (data: number[], targetData: number[]) =>{
        let newData: number[] = [];
        data.forEach((data, index)=>{
            if(targetData[index] >= data){
                newData.push(data + 15);
            }else{
                newData.push(data);
            }
        });
        return newData;
    }
    
    


    const resize = ()=>{
        graphSpecs.stageWidth = document.body.clientWidth;
        graphSpecs.stageHeight = document.body.clientHeight;
        graphSpecs.baseX = graphSpecs.axisGap;
        graphSpecs.baseY = graphSpecs.stageHeight - graphSpecs.axisGap;
        
        canvas.width = graphSpecs.stageWidth * 2;
        canvas.height = graphSpecs.stageHeight * 2;
        context?.scale(2, 2);
        context?.translate(graphSpecs.baseX, graphSpecs.baseY); 

        // if(context){
        //     DrawAxis(context, graphSpecs);
        //     DrawArc(context,graphSpecs, mouse.xPos, mouse.yPos);
        //     DrawGraph(context, graphSpecs, processData);
            
        // }
    };
    window.addEventListener('resize', resize);
    resize();




    const animate = () =>{

        processData = increaseData(processData, sampleData);

        if(context){
            context.clearRect(-graphSpecs.baseX, -graphSpecs.baseY, graphSpecs.stageWidth, graphSpecs.stageHeight);
            DrawAxis(context, graphSpecs);
            DrawArc(context, mouse);
            DrawGraph(context, graphSpecs, processData, mouse);
        }
        
        requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener('mousemove', (e)=>{
        mouse.xPos = e.clientX - graphSpecs.baseX;
        mouse.yPos = e.clientY - graphSpecs.baseY;
    })
}

export default App;