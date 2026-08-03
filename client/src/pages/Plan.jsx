import { Tldraw } from "tldraw";
import 'tldraw/tldraw.css';
import { useParams } from "react-router";

export function PlanPage(){
    const {date} = useParams();
    return(
        <div className="fixed inset-0">
             <Tldraw key={date} persistenceKey={`day-${date}`} />
        </div>
    )
}