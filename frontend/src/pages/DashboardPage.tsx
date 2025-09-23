import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DashboardPage = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <Card className="max-w-2xl mx-5 md:mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {/* <Button onClick={handleAnalyze}>Analyze</Button> */}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Card>
  );
};

export default DashboardPage;
