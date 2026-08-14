import { Tldraw } from "tldraw";
import 'tldraw/tldraw.css';
import { useParams } from "react-router";

export function PlanPage(){
    const {date} = useParams();
    return(
        <div className="fixed inset-0">
             <Tldraw licenseKey="tldraw-2026-08-28/WyJnVUNYcUl0ZCIsWyIqIl0sMTYsIjIwMjYtMDgtMjgiXQ.4qkcULlEIeGoSEkYCam+PRdv37LP0iGBGEaiYyNpA0lI3l8ZAIHAJbCa49MhlLscGwSG1s/gChaKZqR0/eb2Gg" key={date} persistenceKey={`day-${date}`} />
        </div>
    )
}