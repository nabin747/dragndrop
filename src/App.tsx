import { useState } from "react";
import "./App.css";

function App() {
  //state with default data
  const [tasks, setTasks] = useState(
    [
    { 
      cardData: "STORY-4513: Add tooltip",
     status: "inprocess",
      bgcolor: "lightblue" 
    },
    {
      cardData: "STORY-4547: Fix search bug",
      status: "inprocess",
      bgcolor: "lightgrey",
    },
    {
      cardData: "STORY-4525: New filter option",
      status: "complete",
      bgcolor: "lightgreen",
    },
    {
      cardData: "STORY-4526: Remove region filter",
      status: "complete",
      bgcolor: "#ee9090",
    },
    {
      cardData: "STORY-4520: Improve performance",
      status: "complete",
      bgcolor: "#eeed90",
    },
  ]);

  //this event is for the dragged task card.
  //this is required to save unique id in the dom event so that when we drop it we would know the card id
  const onDragStart = (event:any, id:any) => {
    event.dataTransfer.setData("id", id);
  };

  //fetches the card id and based on that update the status/category of that card in tasks state
  const onDrop = (event:any, data:any) => {
    let id = event.dataTransfer.getData("id");
    let newTasks = tasks.filter((task) => {
      if (task.cardData == id) {
        task.status = data;
      }
      return task;
    });

    setTasks([...newTasks]);
  };

  //method to filter tasks beased on their status
  const getTask = () => {
    const tasksToRender:any = {
      inprocess: [],
      complete: [],
    };

    //this div is the task card which is 'draggable' and calls onDragStart method
    //when we drag it
    tasks.forEach((t:any) => {
      tasksToRender[t.status].push(
        <div
          key={t.cardData}
          onDragStart={(e) => onDragStart(e, t.cardData)}
          draggable
          className="task-card"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.cardData}
        </div>
      );
    });

    return tasksToRender;
  };

  return (
    <div className="drag-drop-container">
      <div className="drag-drop-board">
        <div className="outer" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {onDrop(e, "inprocess")}}>
          <div className="task-header">In-PROGRESS</div>
          {getTask().inprocess}
        </div>
        <div className="outer"  onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, "complete")}>
          <div className="task-header">COMPLETED</div>
          {getTask().complete}
        </div>
      </div>
    </div>
  );
}

export default App;