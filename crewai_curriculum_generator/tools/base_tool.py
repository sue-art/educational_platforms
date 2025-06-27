from crewai_tools import BaseTool as CrewAIBaseTool

class BaseTool(CrewAIBaseTool):
    """
    Base class for all custom tools in the CrewAI Curriculum Generator.
    It inherits from CrewAI's BaseTool.
    Subclasses must implement the _run method.
    The 'name' and 'description' attributes should be set at the class level in subclasses.
    """

    # Subclasses will define:
    # name: str
    # description: str

    def _run(self, *args, **kwargs):
        """
        The main execution method for the tool.
        Subclasses must implement this method.
        """
        raise NotImplementedError("Subclasses must implement the _run method.")

if __name__ == '__main__':
    # Example of how a tool might be structured, inheriting from this BaseTool
    class MySampleCurriculumTool(BaseTool):
        name: str = "My Sample Curriculum Tool"
        description: str = "A sample tool that does something related to curriculum."

        def _run(self, argument: str) -> str:
            return f"Sample curriculum tool executed with: {argument}"

    sample_tool = MySampleCurriculumTool()
    print(f"Tool '{sample_tool.name}' created with description: '{sample_tool.description}'")
    try:
        print(f"Executing sample tool: {sample_tool._run(argument='hello curriculum')}")
    except Exception as e:
        print(f"Error with sample tool: {e}")

    class MyIncompleteCurriculumTool(BaseTool):
        name: str = "Incomplete Curriculum Tool"
        description: str = "This tool is missing _run."
        # No _run method

    incomplete_tool = MyIncompleteCurriculumTool()
    try:
        # This would typically be called by agent.run(tool_input)
        # Directly calling run() or _run() on an incomplete tool:
        incomplete_tool._run("test")
    except NotImplementedError as e:
        print(f"Caught expected error for incomplete curriculum tool: {e}")
    except Exception as e:
        print(f"Unexpected error for incomplete curriculum tool: {e}")
