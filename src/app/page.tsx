"use client";

import { useState, useEffect } from "react";
import Chat from "@/components/chat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function Home() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [inputNickname, setInputNickname] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedNickname = localStorage.getItem("chatterbox-nickname");
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  const handleNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputNickname.trim()) {
      localStorage.setItem("chatterbox-nickname", inputNickname.trim());
      setNickname(inputNickname.trim());
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("chatterbox-nickname");
    setNickname(null);
    setInputNickname("");
  }

  if (!isClient) {
    return null; // Or a loading spinner
  }

  if (!nickname) {
    return (
      <main className="flex items-center justify-center h-full bg-background p-4">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">
              Welcome to ChatterBox
            </CardTitle>
            <CardDescription>Enter a nickname to join the chat</CardDescription>
          </CardHeader>
          <form onSubmit={handleNicknameSubmit}>
            <CardContent>
              <Input
                placeholder="Your nickname..."
                value={inputNickname}
                onChange={(e) => setInputNickname(e.target.value)}
                autoFocus
                aria-label="Nickname"
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={!inputNickname.trim()}>
                Join Chat
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    );
  }

  return <Chat nickname={nickname} onLogout={handleLogout} />;
}
