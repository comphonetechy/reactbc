import React from 'react';
import { useState } from 'react';
import ProjectSidebar from './components/ProjectSiderbar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';
function App() {
  const [projectState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject(project) { 
      setProjectsState(prevState => {
        return {
          ...prevState,
          projects: [...prevState.projects, project],
          selectedProjectId: null,
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
   let content = <SelectedProject project={selectedProject} />
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
