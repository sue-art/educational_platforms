import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react"; // Example icon

export default function LessonDisplay({ title, description, children }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children ? (
          children
        ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>No Content Yet</AlertTitle>
            <AlertDescription>
              This lesson's content is still under development. Check back soon!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
