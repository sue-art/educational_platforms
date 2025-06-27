from typing import List
from .base_tool import BaseTool

class InterfaceDesignTool(BaseTool):
    name: str = "Interface Design Tool"
    description: str = "Tool for conceptualizing and outlining user interfaces for the platform."

    def _run(self, user_role: str, key_features: List[str]) -> str:
        """
        Outlines an interface design for a specific user role.

        Args:
            user_role: The role of the user (e.g., "student", "teacher", "parent").
            key_features: A list of key features that the interface must support.

        Returns:
            A string describing the interface design concept.
        """
        # Implementation logic here (placeholder)
        features_str = ", ".join(key_features)
        design_concept = f"Interface design concept for '{user_role}': "
        if user_role == "student":
            design_concept += f"A gamified, intuitive interface with easy navigation. Key features: {features_str} (e.g., access lessons, view progress, play games)."
        elif user_role == "teacher":
            design_concept += f"A dashboard-style interface for managing students and content. Key features: {features_str} (e.g., view class progress, assign tasks, create content)."
        elif user_role == "parent":
            design_concept += f"A simple interface for monitoring child's progress. Key features: {features_str} (e.g., view reports, understand learning path)."
        else:
            design_concept += f"A generic interface supporting features: {features_str}."

        return design_concept

class UserFlowMappingTool(BaseTool):
    name: str = "User Flow Mapping Tool"
    description: str = "Tool for mapping out user flows for various tasks within the platform."

    def _run(self, task_name: str, user_role: str, steps: List[str]) -> str:
        """
        Maps a user flow for a given task and user role.

        Args:
            task_name: The name of the task (e.g., "Completing a lesson", "Checking progress").
            user_role: The role of the user performing the task.
            steps: A list of steps involved in the user flow.

        Returns:
            A string describing the user flow map.
        """
        # Implementation logic here (placeholder)
        steps_str = " -> ".join(steps)
        return f"User flow map for task '{task_name}' by user '{user_role}': {steps_str}."

class AccessibilityCheckTool(BaseTool):
    name: str = "Accessibility Check Tool"
    description: str = "Tool for outlining accessibility considerations for platform features."

    def _run(self, feature_name: str, target_disabilities: List[str] = None) -> str:
        """
        Outlines accessibility checks for a given platform feature.

        Args:
            feature_name: The name of the feature to check (e.g., "Reading Passage Display", "Interactive Quiz").
            target_disabilities: List of disabilities to consider (e.g., "visual", "auditory", "motor").
                                 Defaults to ["visual", "auditory", "motor", "cognitive"].

        Returns:
            A string listing accessibility considerations.
        """
        if target_disabilities is None:
            target_disabilities = ["visual", "auditory", "motor", "cognitive"]

        # Implementation logic here (placeholder)
        checks = []
        for disability in target_disabilities:
            if disability == "visual":
                checks.append("Ensure sufficient color contrast, support for screen readers, keyboard navigation, resizable text.")
            elif disability == "auditory":
                checks.append("Provide captions/transcripts for audio content, visual alternatives for audio cues.")
            elif disability == "motor":
                checks.append("Ensure full keyboard accessibility, sufficient target sizes for clickable elements, no time limits or adjustable ones.")
            elif disability == "cognitive":
                checks.append("Use clear and simple language, consistent navigation, provide clear instructions and feedback.")
            else:
                checks.append(f"Considerations for '{disability}' disability group.")

        return f"Accessibility considerations for feature '{feature_name}': {'; '.join(checks)}"

if __name__ == '__main__':
    # Example Usage
    design_tool = InterfaceDesignTool()
    print(design_tool.run(user_role="student", key_features=["access lessons", "track badges"]))
    print(design_tool.run(user_role="teacher", key_features=["manage student accounts", "review submissions"]))

    flow_tool = UserFlowMappingTool()
    print(flow_tool.run(task_name="Submitting an exercise", user_role="student", steps=["Open exercise", "Complete answers", "Click submit", "View score"]))

    access_tool = AccessibilityCheckTool()
    print(access_tool.run(feature_name="Video lessons"))
    print(access_tool.run(feature_name="Drag and drop exercise", target_disabilities=["motor", "visual"]))
