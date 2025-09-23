import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SentimentResult {
  wordCount: number;
  sentiment: number;
}

export default function SentimentPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    try {
      const res = await axios.post<SentimentResult>(
        "http://localhost:2306/api/sentiment",
        {
          text,
        }
      );
      setResult(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Unexpected error");
      } else {
        setError("Server not reachable");
      }
    }
  };

  return (
    <Card className="max-w-2xl mx-5 md:mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Sentiment Analysis</h2>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="mb-4"
      />

      <Button onClick={handleAnalyze}>Analyze</Button>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <CardContent className="mt-4">
          <p>
            <b>Word Count:</b> {result.wordCount}
          </p>
          <p>
            <b>Sentiment Score:</b> {result.sentiment}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
