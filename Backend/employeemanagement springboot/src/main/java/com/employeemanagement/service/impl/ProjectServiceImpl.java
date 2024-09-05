package com.employeemanagement.service.impl;

import com.employeemanagement.exception.ProjectNotFoundException;
import com.employeemanagement.model.Project;
import com.employeemanagement.repository.ProjectRepository;
import com.employeemanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService{
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProject(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @Override
    public void deleteProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if(project.isPresent()) {
            projectRepository.deleteById(id);
        } else {
            throw new ProjectNotFoundException(id);
        }
    }

    @Override
    public Project createProject(Project project) {
        Project createdProject = projectRepository.save(project);
        return createdProject;
    }

    @Override
    public Project updateProject(Project project,Long id) {
        Project updatedProject = projectRepository.save(project);
        return updatedProject;
    }

    @Override
    public Optional<Project> searchProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if(!project.isPresent()) {
            throw new ProjectNotFoundException(id);
        }
        return project;
    }
}
