import React from "react";
import { Progress } from "@/components/ui/progress";

export const ProgressIndicator = ({ value }) => {
  return <Progress value={value} className="mb-2" />;
};
