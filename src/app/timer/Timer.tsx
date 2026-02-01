"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

type TimerState = "idle" | "inspection" | "running" | "stopped";

export default function Timer({ onStop }: { onStop: (time: number) => void }) {
  // ===== UI STATE =====
  const [state, setState] = useState<TimerState>("idle");
  const [inspection, setInspection] = useState(15);
  const [time, setTime] = useState(0);

  const [beepEnabled, setBeepEnabled] = useState(true);
  const [beepVolumeUI, setBeepVolumeUI] = useState(30);

  const [useInspection, setUseInspection] = useState(true);

  // ===== REFS (LÓGICA) =====
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const volumeRef = useRef(0.3);
  const beepEnabledRef = useRef(true);
  const useInspectionRef = useRef(true);

  // ===== AUDIO =====
  function initAudio() {
    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = volumeRef.current;
      gain.connect(ctx.destination);
      audioCtxRef.current = ctx;
      gainRef.current = gain;
    }
  }

  function beep() {
    if (!beepEnabledRef.current) return;
    if (!audioCtxRef.current || !gainRef.current) return;

    const osc = audioCtxRef.current.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 900;
    osc.connect(gainRef.current);
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.07);
  }

  // ===== TIMER REAL =====
  function loop(ts: number) {
    if (!startRef.current) startRef.current = ts;
    setTime(ts - startRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }

  function startTimer() {
    startRef.current = null;
    setTime(0);
    setState("running");
    rafRef.current = requestAnimationFrame(loop);
  }

  function stopTimer() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }

  // ===== INSPEÇÃO =====
  useEffect(() => {
    if (state !== "inspection") return;
    if (!useInspectionRef.current) return;

    if (inspection <= 0) {
      startTimer();
      return;
    }

    const interval = setInterval(() => {
      setInspection((t) => {
        const next = t - 1;
        if (next <= 8 && next > 0) beep();
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state, inspection]);

  // ===== TECLADO =====
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();

      initAudio();

      // idle
      if (state === "idle") {
        if (useInspectionRef.current) {
          setInspection(15);
          setState("inspection");
        } else {
          startTimer();
        }
        return;
      }

      // inspection
      if (state === "inspection") {
        startTimer();
        return;
      }

      // running
      if (state === "running") {
        stopTimer();
        setState("stopped");
        onStop(time);
        return;
      }

      // stopped
      if (state === "stopped") {
        setTime(0);
        if (useInspectionRef.current) {
          setInspection(15);
          setState("inspection");
        } else {
          setState("idle");
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state, time]);

  // ===== CONTROLES =====
  function toggleBeep(v: boolean) {
    setBeepEnabled(v);
    beepEnabledRef.current = v;
  }

  function setVolume(v: number) {
    setBeepVolumeUI(v);
    volumeRef.current = v / 100;
    if (gainRef.current) gainRef.current.gain.value = volumeRef.current;
  }

  function toggleInspection(v: boolean) {
    setUseInspection(v);
    useInspectionRef.current = v;
  }

  const danger = state === "inspection" && inspection <= 8;

  // ===== UI =====
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        animate={{ scale: state === "running" ? 1.05 : 1 }}
        className={`text-8xl font-mono select-none ${
          danger
            ? "text-red-500"
            : state === "inspection"
              ? "text-yellow-400"
              : state === "running"
                ? "text-green-400"
                : "text-white"
        }`}
      >
        {state === "inspection" && inspection}
        {(state === "running" || state === "stopped") &&
          (time / 1000).toFixed(2)}
        {state === "idle" && "0.00"}
      </motion.div>

      {/* CONTROLES */}
      <div className="w-64 space-y-3 text-sm text-white bg-green-400/10 p-4 rounded">
        <div className="flex items-center gap-2 ">
          <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal">
              <Switch
                id="inspection-switch-basic"
                name="terms-checkbox-basic"
                checked={useInspection}
                onCheckedChange={(v) => toggleInspection(Boolean(v))}
              />

              <FieldLabel htmlFor="inspection-switch-basic">
                {useInspection ? "Inspeção ativada" : "Inspeção desativada"}
              </FieldLabel>
            </Field>
          </FieldGroup>
        </div>

        <div className="flex items-center gap-2">
          <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal">
              <Switch
                id="beep-switch-basic"
                name="beep-checkbox-basic"
                checked={beepEnabled}
                onCheckedChange={(v) => toggleBeep(Boolean(v))}
              />
              <FieldLabel htmlFor="beep-switch-basic">
                {beepEnabled ? "Beep ativado" : "Beep desativado"}
              </FieldLabel>
            </Field>
          </FieldGroup>
        </div>

        <div className="flex flex-col">
          <Slider
            defaultValue={[50]}
            max={100}
            min={0}
            value={[beepVolumeUI]}
            onValueChange={([v]) => setVolume(v)}
            step={1}
            className="mx-auto w-full max-w-xs"
          />
          <span className="text-center text-xs mt-1">{beepVolumeUI}%</span>
        </div>
      </div>
    </div>
  );
}
