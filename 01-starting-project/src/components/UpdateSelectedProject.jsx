import Input from "./Input";
import Button from "./Button";
import {useRef} from "react";
function UpdateSelectedProject({project, onUpdate, onCancel}) {
    console.log("Update Project ID: "+project)
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    function handleUpdate(e){
        const updatedProject = {
            id: project.id,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            dueDate: dueDateRef.current.value
        }
        onUpdate(project.id,updatedProject)
    }
    return(
        <>  
        <h1>Updating Project ID {project.id}</h1>
        <Input ref={titleRef} label="Title" id="title" type="text" defaultValue={project.title}/>
        <Input ref={descriptionRef} label="Description" id="description" type="text" defaultValue={project.description}/>
        <Input ref={dueDateRef} label="Due Date" id="dueDate" type="date" defaultValue={project.dueDate}/>   
        <Button className="size-14 text-bg-400" onClick={handleUpdate}>Update</Button>
        </>
    )
}

export default UpdateSelectedProject;