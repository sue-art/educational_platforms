from crewai_tools import BaseTool as CrewAIBaseTool

# It's good practice to give it a distinct name if you also have a class named BaseTool,
# or ensure your class inherits from it and doesn't redefine conflicting Pydantic model fields.

class BaseTool(CrewAIBaseTool):
    """
    Base class for all custom tools in the CrewAI Phonics Platform.
    It inherits from CrewAI's BaseTool and can be extended.
    Subclasses must implement the _run method.
    The 'name' and 'description' attributes should be set at the class level in subclasses.
    """

    # name: str -> This will be defined in each subclass
    # description: str -> This will be defined in each subclass

    def _run(self, *args, **kwargs):
        """
        The main execution method for the tool.
        Subclasses must implement this method.
        """
        raise NotImplementedError("Subclasses must implement the _run method.")

    # The `run` method is already handled by crewai_tools.BaseTool's Pydantic model.
    # We just need to ensure _run is implemented.

if __name__ == '__main__':
    # Example of how a tool might be structured, inheriting from this BaseTool

    class MySampleTool(BaseTool):
        name: str = "My Sample Tool"
        description: str = "A sample tool that does something."

        def _run(self, argument: str) -> str:
            return f"Sample tool executed with: {argument}"

    sample_tool = MySampleTool()
    try:
        # Pydantic validation for BaseTool expects name & description to be set.
        # print(sample_tool.run(argument="test")) -> This would work if run within CrewAI context
        # Directly running it might not show the full Pydantic effect as when Agent initializes.
        print(f"Tool '{sample_tool.name}' created with description: '{sample_tool.description}'")
        print(f"Executing sample tool: {sample_tool._run(argument='hello')}")

    except Exception as e:
        print(f"Error with sample tool: {e}")

    # Test case for a tool not implementing _run
    class MyIncompleteTool(BaseTool):
        name: str = "Incomplete Tool"
        description: str = "This tool is missing _run."
        # No _run method

    incomplete_tool = MyIncompleteTool()
    try:
        incomplete_tool.run("test") # This should call _run
    except NotImplementedError as e:
        print(f"Caught expected error for incomplete tool: {e}")
    except Exception as e:
        print(f"Unexpected error for incomplete tool: {e}")
