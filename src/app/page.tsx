"use client";
import Employee from "@/components/Employee";
import Loading from "@/components/Loading";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { APIAiAgent, APIGetEmployee } from "@/lib/api-service";
import { useModalState } from "@/store/userModalStore";
import { Label } from "@radix-ui/react-label";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const queryClient = useQueryClient();
  const { onOpen, setData } = useModalState();
  const { isLoading: isLoad, data } = useQuery<Employee[] | []>({
    queryKey: ["emplyoee"],
    queryFn: async () => {
      try {
        const response = await APIGetEmployee();
        return response.data.data;
      } catch (error) {
        return [];
      }
    },
  });
  const [textValue, setTextValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!textValue) return;
      setIsLoading(true);
      const resp = await APIAiAgent(textValue);
      setIsLoading(false);
      setData(resp.data.data);
      handleChange("");
      onOpen();
      queryClient.invalidateQueries({ queryKey: ["emplyoee"] });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setTextValue(value);
  };
  return (
    <div className="mx-8 ">
      <Loading isLoad={isLoading || isLoad} />
      <h3 className="text-3xl py-4 font-semibold ">
        🤖 : AI Agent for Employee Detail
      </h3>
      <div className="flex items-center w-full gap-1.5  h-48">
        <div className="w-full space-y-2">
          <Label htmlFor="message">What can I help with?</Label>
          <Textarea
            id="message"
            value={textValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Message For AI"
          />
        </div>
      </div>
      <Button variant="outline" className="mb-4" onClick={handleSubmit}>
        Send
      </Button>
      <Modal />
      {data && data.length ? <Employee data={data} /> : null}
    </div>
  );
}
