import React from 'react';
import { useState } from 'react';
import ProjectSidebar from './components/ProjectSiderbar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';
import UpdateSelectedProject from './components/UpdateSelectedProject';
function App() {
  const [projectState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    projectToUpdate: null
  });
  const [updatingProject, setpdatingProject] = useState(false);

  function handleAddTask(task) {
setProjectsState(prevState => {
        const taskId = Math.random().toString()
        const newTask = {
          isDone: true,
          text:task,
          projectId:prevState.selectedProjectId,
          id: taskId
        }
        return {
          ...prevState,
          tasks: [...prevState.tasks, newTask]
        };
      });
      
  }

  function handleDeleteTask(id){
       setProjectsState(prevState => {
        return {
          ...prevState,
          tasks: prevState.tasks.filter(
            (task) => task.id !== id
          )
        };
      })
  }

  function handleStartAddProject(project) { 
      setProjectsState(prevState => {
        return {
          ...prevState,
          projects: [...prevState.projects, project],
          selectedProjectId: null,
        };
      })
   }

   function handleDeleteProject(){
       setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: prevState.projects.filter(
            project => project.id !== prevState.selectedProjectId
          )
        };
      })
   }

   function updateSelectedProject(projectId, projectData) {
    setpdatingProject(false);
    // alert("Project Updated Successfully!")
    console.log("Updated Project ID: "+projectId, "title: "+projectData.title, "description: "+projectData.description, "dueDate: "+projectData.dueDate);
    setProjectsState(prevState => {
          console.log('existing project ids:', prevState.projects.map(p => p.id));

      return {
        ...prevState,
        projects: prevState.projects.map(project => 
          project.id === projectId ? {...project, ...projectData} : project
        ),
        projectToUpdate: null
      }
    })

   }

   function updateProject(projectData) {
    setpdatingProject(true);
    setProjectsState(prevState => {
        return {
          ...prevState,
          projectToUpdate: projectData
        };
      })
   }

   function handleAddProject(projectData) {
      setProjectsState(prevState => {
        const projectId = Math.random().toString()
        const newProject = {
          ...projectData,
          id: projectId
        }
        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: [...prevState.projects, newProject]
        };
      });
      
   }
console.log(projectState.projects)

   const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
   let content = updatingProject?<UpdateSelectedProject project={projectState.projectToUpdate} onUpdate={updateSelectedProject}/>:<SelectedProject
   tasks={projectState.tasks}
   onDeleteTask={handleDeleteTask} 
   onAddTask={handleAddTask}
   onDelete={handleDeleteProject} project={selectedProject} 
   onUpdate={updateProject}
      selectedProjectId={projectState.selectedProjectId}/>

    if (projectState.selectedProjectId === null) {
      content = <NewProject onCancel={handleCancelAddProject}  onAddProject={handleAddProject} />
    } else if (projectState.selectedProjectId === undefined) {
      content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    }

    function handleCancelAddProject(){
          setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: undefined,
        };
      })
    }


        function handleSelectProject(id){
          setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: id,
        };
      })
    }
  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar onSelectProject={handleSelectProject}  onStartAddProject={handleStartAddProject} projects={projectState.projects}/>
      {content}

    </main>
  );
}

export default App;
