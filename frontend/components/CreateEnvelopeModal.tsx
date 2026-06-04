"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateEnvelopeModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateEnvelopeModal({
  onClose,
  onCreated,
}: CreateEnvelopeModalProps) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currency, setCurrency] = useState<"EUR" | "COP">("EUR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const parsed = parseFloat(targetAmount);
    if (!name.trim()) {
      setError("Ingresa un nombre para el sobre.");
      setLoading(false);
      return;
    }
    if (isNaN(parsed) || parsed <= 0) {
      setError("Ingresa un monto objetivo válido.");
      setLoading(false);
      return;
    }

    try {
      await api.createEnvelope({
        name: name.trim(),
        target_amount: parsed,
        currency,
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Algo salió mal."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl border border-[rgba(0,0,0,0.08)]"
        >
          <h2 className="text-lg font-bold text-[#0a0a0f] mb-5">
            Nuevo sobre
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <div>
              <Label htmlFor="name" className="mb-1.5 block">
Nombre
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Fondo de viaje"
              />
            </div>

            <div>
              <Label htmlFor="target" className="mb-1.5 block">
                Monto objetivo
              </Label>
              <Input
                id="target"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="1000.00"
              />
            </div>

            <div>
              <Label className="mb-1.5 block">Moneda</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrency("EUR")}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                    currency === "EUR"
                      ? "border-primary-500 bg-primary-500 text-white"
                      : "border-[rgba(0,0,0,0.08)] text-[#6b6b80] hover:border-[#0a0a0f]"
                  }`}
                >
                  EUR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("COP")}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                    currency === "COP"
                      ? "border-primary-500 bg-primary-500 text-white"
                      : "border-[rgba(0,0,0,0.08)] text-[#6b6b80] hover:border-[#0a0a0f]"
                  }`}
                >
                  COP
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="secondary"
                size="md"
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Creando..." : "Crear"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
