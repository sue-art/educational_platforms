import { Button } from "@/components/ui/button"; // Using alias path

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Vite + React + shadcn/ui
      </h1>
      <p className="mb-4 text-muted-foreground">This is a test of the shadcn/ui Button component.</p>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <Button variant="default" size="default" onClick={() => alert("Default Button Clicked!")}>Default Button</Button>
          <Button variant="secondary" size="sm" onClick={() => alert("Secondary Button Clicked!")}>Secondary SM</Button>
          <Button variant="destructive" size="lg" onClick={() => alert("Destructive Button Clicked!")}>Destructive LG</Button>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => alert("Outline Button Clicked!")}>Outline Button</Button>
          <Button variant="ghost" onClick={() => alert("Ghost Button Clicked!")}>Ghost Button</Button>
          <Button variant="link" onClick={() => alert("Link Button Clicked!")}>Link Button</Button>
        </div>
        <div className="flex space-x-4">
          <Button disabled>Disabled Button</Button>
          <Button variant="default" size="icon" onClick={() => alert("Icon Button Clicked!")}>
            {/* Placeholder for an icon, e.g., a SVG or an icon font character */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App;
