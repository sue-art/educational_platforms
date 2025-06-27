from crewai import Agent, Task, Crew, Process
from typing import List
from langchain_openai import ChatOpenAI

# Import agent configurations from the agents module
from agents.phonics_agents import (
    curriculum_designer_config,
    content_creator_config,
    progress_tracker_config,
    learning_path_planner_config,
    ux_designer_config
    # Tools are also implicitly available if needed directly, e.g., agents.phonics_agents.curriculum_structure_tool
)

# Main script execution
if __name__ == "__main__":
    print("Phonics Platform Main Script - Initializing Crew with V2 compatible LLM...")

    # Initialize the V2 compatible LLM
    # Ensure OPENAI_API_KEY environment variable is set for this to work.
    # User can change the model as needed.
    try:
        llm = ChatOpenAI(model="gpt-3.5-turbo")
    except Exception as e:
        print(f"Error initializing LLM. Please ensure OPENAI_API_KEY is set and valid: {e}")
        print("Attempting to proceed without LLM initialization for structural check, but CrewAI will likely fail.")
        llm = None # Fallback for structural checks, though crew will fail.

    # Instantiate Agents with the shared LLM
    curriculum_designer = Agent(**curriculum_designer_config, llm=llm)
    content_creator = Agent(**content_creator_config, llm=llm)
    progress_tracker = Agent(**progress_tracker_config, llm=llm)
    learning_path_planner = Agent(**learning_path_planner_config, llm=llm)
    ux_designer = Agent(**ux_designer_config, llm=llm)

    # Define the tasks for the crew
    task1 = Task(
        description="Design the curriculum structure with clear progression paths across multiple reading levels",
        expected_output="A comprehensive curriculum map with defined levels, skills, and progression paths. This should be a textual description of the curriculum map, detailing levels, skills for each level, and how skills progress from one level to the next.",
        agent=curriculum_designer,
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

    print("Agent and Task definitions complete.")

    # Form the e-learning platform development crew
    phonics_platform_crew = Crew(
        agents=[curriculum_designer, content_creator, progress_tracker, learning_path_planner, ux_designer],
        tasks=[task1, task2, task3, task4, task5],
        verbose=2, # Enables detailed logging of the crew's execution process
        process=Process.sequential # Tasks will be executed one after another
    )

    print("\nCrew formation complete. Starting crew kickoff...")

    if llm is None:
        print("LLM not initialized. CrewAI kickoff will likely fail. This run is primarily for structural validation.")

    try:
        # Execute the crew's work
        result = phonics_platform_crew.kickoff()

        print("\n######################")
        print("## Crew Execution Result:")
        print("######################")
        print(result)
    except Exception as e:
        print(f"\nAn error occurred during crew kickoff: {e}")
        print("This might be due to missing API keys or other runtime issues.")
