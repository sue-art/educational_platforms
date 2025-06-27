# This file defines configurations for agents.
# Agents will be instantiated in main.py with a shared LLM.

# Import tools from their respective modules
# Assuming main.py is run from crewai_phonics_platform directory
from tools.curriculum_tools import (
    CurriculumStructureTool,
    LevelDefinitionTool,
    SkillProgressionMappingTool
)
from tools.content_tools import (
    PhonicsExerciseGeneratorTool,
    ReadingPassageCreatorTool,
    AssessmentGeneratorTool
)
from tools.progress_tools import (
    WordTrackingDatabaseTool,
    ProficiencyMetricsTool,
    ProgressVisualizationTool
)
from tools.learning_path_tools import (
    AdaptiveLearningAlgorithmTool,
    PersonalizedRecommendationTool,
    LearningGapAnalysisTool
)
from tools.ux_tools import (
    InterfaceDesignTool,
    UserFlowMappingTool,
    AccessibilityCheckTool
)

# Instantiate tools to be used by agents. These will be imported by main.py
# Curriculum Tools
curriculum_structure_tool = CurriculumStructureTool()
level_definition_tool = LevelDefinitionTool()
skill_progression_mapping_tool = SkillProgressionMappingTool()

# Content Tools
phonics_exercise_generator_tool = PhonicsExerciseGeneratorTool()
reading_passage_creator_tool = ReadingPassageCreatorTool()
assessment_generator_tool = AssessmentGeneratorTool()

# Progress Tools
word_tracking_database_tool = WordTrackingDatabaseTool()
proficiency_metrics_tool = ProficiencyMetricsTool()
progress_visualization_tool = ProgressVisualizationTool()

# Learning Path Tools
adaptive_learning_algorithm_tool = AdaptiveLearningAlgorithmTool()
personalized_recommendation_tool = PersonalizedRecommendationTool()
learning_gap_analysis_tool = LearningGapAnalysisTool()

# UX Tools
interface_design_tool = InterfaceDesignTool()
user_flow_mapping_tool = UserFlowMappingTool()
accessibility_check_tool = AccessibilityCheckTool()


# Agent Configurations
# These dictionaries will be used in main.py to instantiate Agent objects.

curriculum_designer_config = {
    "role": "Curriculum Designer",
    "goal": "Design a comprehensive, progressive phonics and reading curriculum across multiple levels",
    "backstory": """You are an expert in literacy education with decades of experience in developing phonics and reading curricula.
    Your expertise lies in creating structured learning paths that progressively build skills from basic phonemic awareness to advanced reading comprehension.""",
    "verbose": True,
    "allow_delegation": True,
    "tools": [
        curriculum_structure_tool,
        level_definition_tool,
        skill_progression_mapping_tool
    ]
}

content_creator_config = {
    "role": "Content Creator",
    "goal": "Create engaging, level-appropriate phonics and reading exercises, activities, and assessments",
    "backstory": """You are a creative educational content developer specialized in making engaging phonics and reading materials.
    You know how to craft exercises that are both educational and enjoyable, ensuring students remain motivated while learning.""",
    "verbose": True,
    "allow_delegation": True,
    "tools": [
        phonics_exercise_generator_tool,
        reading_passage_creator_tool,
        assessment_generator_tool
    ]
}

progress_tracker_config = {
    "role": "Student Progress Tracker",
    "goal": "Design and implement systems to track student progress, word mastery, and proficiency levels",
    "backstory": """You are a data-driven education specialist who excels at designing metrics and tracking systems for educational progress.
    You understand how to measure reading proficiency and track incremental improvements in student performance.""",
    "verbose": True,
    "allow_delegation": True,
    "tools": [
        word_tracking_database_tool,
        proficiency_metrics_tool,
        progress_visualization_tool
    ]
}

learning_path_planner_config = {
    "role": "Learning Path Planner",
    "goal": "Create personalized learning paths based on student performance data and proficiency levels",
    "backstory": """You are an adaptive learning expert who specializes in creating personalized educational journeys.
    You analyze student performance data to identify strengths, weaknesses, and optimal next steps in their learning journey.""",
    "verbose": True,
    "allow_delegation": True,
    "tools": [
        adaptive_learning_algorithm_tool,
        personalized_recommendation_tool,
        learning_gap_analysis_tool
    ]
}

ux_designer_config = {
    "role": "User Experience Designer",
    "goal": "Design an intuitive, engaging interface for students and teachers to interact with the platform",
    "backstory": """You are a UX/UI specialist with expertise in educational technology platforms. You understand how to create interfaces
    that are accessible to young learners while providing robust features for teachers and parents to monitor progress.""",
    "verbose": True,
    "allow_delegation": True,
    "tools": [
        interface_design_tool,
        user_flow_mapping_tool,
        accessibility_check_tool
    ]
}

if __name__ == '__main__':
    # This section can be used for verifying tool instantiations if needed
    print("Phonics Agent configurations defined.")
    print(f"Curriculum Designer tools: {[tool.name for tool in curriculum_designer_config['tools']]}")
    # Add more prints if necessary for other agent configs
