"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, LogOut, Rocket } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  id: string;
  text: string;
  nickname: string;
  timestamp: Timestamp | null;
};

type ChatProps = {
  nickname: string;
  onLogout: () => void;
};

export default function Chat({ nickname, onLogout }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
    }, (error) => {
        console.error("Error fetching messages: ", error);
        // Optionally, show a toast notification to the user
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
        await addDoc(collection(db, "messages"), {
          text: newMessage,
          nickname,
          timestamp: serverTimestamp(),
        });
        setNewMessage("");
    } catch(error) {
        console.error("Error sending message: ", error);
        // Optionally, show a toast notification to the user
    }
  };

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <main className="flex items-center justify-center h-full bg-background p-4 font-body">
      <Card className="w-full max-w-2xl h-[90vh] flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline text-2xl">ChatterBox</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Log out">
            <LogOut className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  msg.nickname === nickname ? "justify-end" : ""
                }`}
              >
                {msg.nickname !== nickname && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">
                      {getInitials(msg.nickname)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`flex flex-col ${
                    msg.nickname === nickname ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-xs text-muted-foreground px-1">{msg.nickname}</span>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-xs sm:max-w-sm md:max-w-md shadow-sm ${
                      msg.nickname === nickname
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border"
                    }`}
                  >
                    <p className="text-sm break-words">{msg.text}</p>
                  </div>
                </div>
                 {msg.nickname === nickname && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">
                      {getInitials(msg.nickname)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4 bg-card">
          <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim()} aria-label="Send Message">
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
