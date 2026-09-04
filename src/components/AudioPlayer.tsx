import { useEffect, useRef, useState } from "react";

// Playlist: play only track2 (track1 removed)
const PLAYLIST = ["/track2.mp3"];

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("audioMuted") === "true";
    } catch {
      return false;
    }
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = encodeURI(PLAYLIST[index]);
    audio.muted = muted;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setIsBlocked(false);
      } catch (err) {
        setIsPlaying(false);
        setIsBlocked(true);
      }
    };

    tryPlay();

    const onEnded = () => {
      setIndex((i) => (i + 1) % PLAYLIST.length);
    };

    audio.addEventListener("ended", onEnded);

    const onFirstInteraction = () => {
      if (!audio) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBlocked(false);
        })
        .catch(() => {});
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true, capture: true });

    return () => {
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", onFirstInteraction, { capture: true } as any);
    };
  }, [index, muted]);

  useEffect(() => {
    // when index changes, attempt to play the new track
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = encodeURI(PLAYLIST[index]);
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsBlocked(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setIsBlocked(true);
      });
  }, [index]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
    try {
      localStorage.setItem("audioMuted", String(audio.muted));
    } catch {}
  };

  const handlePlayClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
      setIsBlocked(false);
    } catch {}
  };

  const currentTrackName = PLAYLIST[index].split("/").pop() || "";

  return (
    <>
      <audio ref={audioRef} preload="auto" />

      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleMute}
          aria-pressed={!muted}
          className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground"
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <div className="text-sm text-foreground">{isPlaying ? `Playing: ${currentTrackName}` : "Paused"}</div>
      </div>

      {isBlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <button
            onClick={handlePlayClick}
            className="rounded bg-white px-6 py-3 text-lg font-semibold"
          >
            Click to play audio
          </button>
        </div>
      )}
    </>
  );
}
