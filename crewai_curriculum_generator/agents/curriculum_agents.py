# This file defines configurations for agents in the Curriculum Generation Crew.
# Agents will be instantiated in main.py with a shared LLM.

# Import instantiated tools from their respective modules
from ..tools.curriculum_tools import (
    EducationalStandardsDBTool,
    ReadingLevelFrameworkTool,
    ContentValidationTool
)
from ..tools.assessment_tools import (
    TextComplexityAnalysisTool,
    QuestionValidationTool
)
from ..tools.data_tools import (
    JSONSchemaDesignTool,
    JSONValidationTool,
    APIDocGeneratorTool
)

# Instantiate all tools that will be used by the agents
# Curriculum Expert Tools
educational_standards_db_tool = EducationalStandardsDBTool()
reading_level_framework_tool = ReadingLevelFrameworkTool()
content_validation_tool = ContentValidationTool()

# Reading Level Assessment Specialist Tools
text_complexity_analysis_tool = TextComplexityAnalysisTool()
question_validation_tool = QuestionValidationTool()

# Data Structure Engineer Tools
json_schema_design_tool = JSONSchemaDesignTool()
json_validation_tool = JSONValidationTool()
api_doc_generator_tool = APIDocGeneratorTool()


# Agent Configurations
# These dictionaries will be used in main.py to instantiate Agent objects.

curriculum_expert_config = {
    "role": "Curriculum Design Expert",
    "goal": "Design age-appropriate reading assessment content (passages and questions) aligned with educational standards for specified reading levels.",
    "backstory": """You are an Educational Content Specialist with a Ph.D. in Education, specializing in literacy development and reading assessment.
    Your expertise is in creating high-quality, developmentally appropriate assessment materials that are educationally sound and accurate.""",
    "verbose": True,
    "allow_delegation": False, # This agent is foundational, less delegation initially.
    "tools": [
        educational_standards_db_tool,
        reading_level_framework_tool,
        content_validation_tool
    ]
}

reading_level_specialist_config = {
    "role": "Reading Level Assessment Specialist",
    "goal": "Ensure accurate classification of reading passages by difficulty level and validate that assessment questions appropriately test comprehension at each level, applying standardized metrics.",
    "backstory": """You are a Literacy Specialist with deep expertise in reading assessment frameworks and methodologies.
    You excel at analyzing text complexity and ensuring proper progression between difficulty levels using metrics like Lexile and grade level equivalents.""",
    "verbose": True,
    "allow_delegation": False, # Works on specific outputs from curriculum expert.
    "tools": [
        text_complexity_analysis_tool,
        question_validation_tool
    ]
}

data_structure_engineer_config = {
    "role": "Data Structure Engineer",
    "goal": "Create a well-structured, consistent API-ready JSON data format for the generated reading assessment content, ensuring data consistency and validation.",
    "backstory": """You are a Software Engineer specializing in educational technology and API design.
    Your strength lies in modeling data effectively, designing robust JSON schemas, and ensuring technical requirements for data exchange are met.""",
    "verbose": True,
    "allow_delegation": False, # Focused on structuring data from other agents.
    "tools": [
        json_schema_design_tool,
        json_validation_tool,
        # api_doc_generator_tool # Not directly used in the primary goal of generating the JSON data itself for now
    ]
}

if __name__ == '__main__':
    print("Curriculum Agent configurations defined.")
    print(f"Curriculum Expert tools: {[tool.name for tool in curriculum_expert_config['tools']]}")
    print(f"Reading Level Specialist tools: {[tool.name for tool in reading_level_specialist_config['tools']]}")
    print(f"Data Structure Engineer tools: {[tool.name for tool in data_structure_engineer_config['tools']]}")
