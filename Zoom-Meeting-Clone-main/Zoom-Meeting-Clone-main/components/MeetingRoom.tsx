import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType =
  | "grid"
  | "speaker-left"
  | "speaker-right"
  | "speaker-top"
  | "speaker-bottom";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"right"} />;
      case "speaker-top":
        return <SpeakerLayout participantsBarPosition={"top"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"bottom"} />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px]">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-full p-3 bg-[#19232D] hover:bg-[#4C535B] ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {[
              { label: "Grid", value: "grid" },
              { label: "Speaker at Left", value: "speaker-left" },
              { label: "Speaker at Right", value: "speaker-right" },
              { label: "Speaker at Top", value: "speaker-top" },
              { label: "Speaker at Bottom", value: "speaker-bottom" },
            ].map((layout, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-dark-3"
                  onClick={() => setLayout(layout.value as CallLayoutType)}
                >
                  {layout.label}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-full p-3 bg-[#19232D] hover:bg-[#4C535B] ">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
