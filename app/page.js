"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

let imageSet = [
  "/dhoni1.png",
  "/dhoni2.png",
  "/dhoni3.png",
  "/dhoni4.png",
  "/dhoni5.png",
  "/dhoni6.png",
  "/dhoni7.png",
];

const OPENAI_API_KEY = "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";

export default function Home() {
  const [image, setImage] = useState("/dhoni1.png");

  const [audio, setAudio] = useState(
    typeof Audio !== "undefined" && new Audio("/boleKoyal.mp3")
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const [ans, setAns] = useState("Loading...");

  const [inputVal, setInputVal] = useState("");

  const handleClick = async () => {
    const APIBody = {
      model: "text-davinci-003",
      prompt: `Relate the word ${inputVal}  to  7 and give the logic within 70words`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setAns(data.choices[0].text.trim());
      })
      .then(() => {
        setInputVal("");
      })
      .catch(() => {
        setAns(
          "OpenAI API Not working, But expect here a THALA logic for relating the word to number 7"
        );
      });

    var randomNumber1 = Math.floor(Math.random() * 7);
    setImage(imageSet[randomNumber1]);

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
      <div className="h-[60%] w-[65%] md:h-[70%] md:w-[45%] lg:h-[70%] lg:w-[35%] bg-white p-12 rounded-3xl border border-red-200 flex-row justify-center space-y-16">
        <h1 className="text-center font-bold text-4xl">
          Thala Review System 🙇‍♂️
        </h1>
        <div className="flex items-center space-x-5 md:space-x-10">
          <div className="relative w-full h-10">
            <form>
              <input
                className="peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-black focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=""
                name="word"
                onChange={(e) => setInputVal(e.target.value)}
                value={inputVal}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Enter a word
              </label>
            </form>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="dark"
                disabled={inputVal.trim() === ""}
                onClick={handleClick}
              >
                Submit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold mt-2">
                  Everything Happens for a Reason & Reason is Thala
                </DialogTitle>
              </DialogHeader>
              <div className="mx-auto space-y-3 text-center">
                <Image src={image} width={300} height={300} alt={image} />
                <p className=" p-3 m-3 rounded-lg border border-red-500 text-red-500 text-sm">
                  {ans}
                </p>
                <h2 className=" text-red-500 text-2xl font-bold">
                  THALA for a Reason !! 🙇‍♂️
                </h2>
              </div>
              <DialogFooter>
                <DialogClose
                  asChild
                  onClick={() => {
                    setIsPlaying(false);
                    audio.pause();
                    audio.currentTime = 0;
                  }}
                >
                  <Button type="button" variant="dark">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-center space-x-5 md:pt-16">
          <h1 className=" font-bold">Made by Mayank with ❤️ | </h1>
          <Link href="https://www.linkedin.com/in/mayank-raj-anand-060289174/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 50 50"
            >
              <path
                fill="#0288D1"
                d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
