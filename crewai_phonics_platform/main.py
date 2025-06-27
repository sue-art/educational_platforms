from crewai import Task, Crew, Process
from typing import List

# Import agents from the agents module
# Note: Adjust the import path if your project structure or execution context is different.
# If running main.py from the crewai_phonics_platform directory:
from agents.phonics_agents import (
    curriculum_designer,
    content_creator,
    progress_tracker,
    learning_path_planner,
    ux_designer
)
# If crewai_phonics_platform is a package and you're running from its parent:
# from .agents.phonics_agents import ...

# Define the tasks for the crew
task1 = Task(
    description="Design the curriculum structure with clear progression paths across multiple reading levels",
    expected_output="A comprehensive curriculum map with defined levels, skills, and progression paths. This should be a textual description of the curriculum map, detailing levels, skills for each level, and how skills progress from one level to the next.",
    agent=curriculum_designer,
    # human_input=True # Uncomment if this task requires human input to proceed after agent's work
)

task2 = Task(
    description="Create sample phonics and reading exercises for each level with assessment components. Focus on one example exercise per level for brevity in this initial phase.",
    expected_output="A set of sample engaging exercises, activities, and assessments for each defined curriculum level. For this initial output, provide a textual description of one sample exercise and one assessment idea per level.",
    agent=content_creator
)

task3 = Task(
    description="Design the student progress tracking system including word mastery database and proficiency metrics. Provide a conceptual overview.",
    expected_output="A technical specification (conceptual overview) for the tracking system. This should include a description of the proposed database schema (e.g., key tables/collections and fields for word tracking) and definitions of core proficiency metrics (e.g., how accuracy, fluency might be measured).",
    agent=progress_tracker
)

task4 = Task(
    description="Develop the adaptive learning algorithm for personalized learning path generation. Describe the core logic.",
    expected_output="Algorithm specification (conceptual description) for analyzing student data and generating personalized learning paths. This should outline the key inputs (e.g., performance data, proficiency levels) and the logic for recommending next steps or remedial actions.",
    agent=learning_path_planner
)

task5 = Task(
    description="Design the user interface for students, teachers, and parents with progress visualization. Describe key screens and elements for each user role.",
    expected_output="UI/UX mockups (descriptive text format) and user flow diagrams (descriptive text format) for all platform interfaces. This should describe the main screens for students, teachers, and parents, and how they might navigate key tasks, including how progress is visualized.",
    agent=ux_designer
)

# Main script execution
if __name__ == "__main__":
    print("Phonics Platform Main Script - Initializing Crew...")

    # More detailed expected_output added to tasks to guide LLM agent better.
    # The actual implementation of tools returns strings, so agents will work with these strings.
    # The "expected_output" for tasks should guide the agent on what kind of textual output it should aim to produce.

    print("Task definitions complete.")
    # print(f"Task 1 assigned to: {task1.agent.role}")
    # print(f"Task 2 assigned to: {task2.agent.role}")
    # print(f"Task 3 assigned to: {task3.agent.role}")
    # print(f"Task 4 assigned to: {task4.agent.role}")
    # print(f"Task 5 assigned to: {task5.agent.role}")

    # Form the e-learning platform development crew
    phonics_platform_crew = Crew(
        agents=[curriculum_designer, content_creator, progress_tracker, learning_path_planner, ux_designer],
        tasks=[task1, task2, task3, task4, task5],
        verbose=2, # Enables detailed logging of the crew's execution process
        process=Process.sequential # Tasks will be executed one after another
    )

    print("\nCrew formation complete. Starting crew kickoff...")
    # Execute the crew's work
    result = phonics_platform_crew.kickoff()

    print("\n######################")
    print("## Crew Execution Result:")
    print("######################")
    print(result)
