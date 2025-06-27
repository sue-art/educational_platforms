# BaseTool class for all custom tools

class BaseTool:
    """
    Base class for all custom tools in the CrewAI Phonics Platform.
    Subclasses should implement the _run method.
    """
    name: str = "BaseTool"
    description: str = "A base tool"

    def _run(self, *args, **kwargs):
        """
        The main execution method for the tool.
        Subclasses must implement this method.
        """
        raise NotImplementedError("Subclasses must implement the _run method.")

    def run(self, *args, **kwargs):
        # This is to make it compatible with how crewAI expects tools to be structured,
        # often looking for a `run` method directly.
        return self._run(*args, **kwargs)

if __name__ == '__main__':
    # Example of how a tool might be instantiated (though BaseTool itself is not meant to be run directly)
    try:
        tool = BaseTool()
        tool.run()
    except NotImplementedError as e:
        print(f"Caught expected error: {e}")
