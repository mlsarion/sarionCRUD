"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchWithToken } from "@/lib/fetchWithToken";

interface Position {
  id: number;
  position_code: string;
  position_name: string;
  created_at?: string;
  updated_at?: string;
}

export default function PositionsDashboard() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ code: "", name: "" });

  useEffect(() => {
    loadPositions();
  }, []);

  async function loadPositions() {
    try {
      const res = await fetchWithToken("/positions");
      const data = await res.json();
      setPositions(data);
    } catch (error) {
      console.error("Failed to load positions:", error);
    }
  }

  async function handleCreate() {
    try {
      const res = await fetchWithToken("/positions", {
        method: "POST",
        body: JSON.stringify({
          position_code: form.code,
          position_name: form.name,
        }),
      });

      if (!res.ok) {
        console.error("Failed to create position");
        return;
      }

      const newPos = await res.json();
      setPositions((prev) => [...prev, newPos]);
      setForm({ code: "", name: "" });
    } catch (error) {
      console.error("Error during creation:", error);
    }
  }

  async function handleUpdate() {
    try {
      const res = await fetchWithToken(`/positions/${editing}`, {
        method: "PUT",
        body: JSON.stringify({
          position_code: form.code,
          position_name: form.name,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update position");
        return;
      }

      const updated = await res.json();
      setPositions((prev) =>
        prev.map((pos) => (pos.id === updated.id ? updated : pos))
      );

      setEditing(null);
      setForm({ code: "", name: "" });
    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetchWithToken(`/positions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Failed to delete position");
        return;
      }

      setPositions((prev) => prev.filter((pos) => pos.id !== id));
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Positions Dashboard
      </h1>

      {/* Create / Update Form */}
      <Card className="p-4 space-y-4">
        <Input
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          placeholder="Position Code"
        />
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Position Name"
        />
        <Button
          onClick={editing ? handleUpdate : handleCreate}
          className="w-full"
        >
          {editing ? "Update Position" : "Add Position"}
        </Button>
      </Card>

      {/* Positions List */}
      <div className="grid gap-4">
        {positions.map((pos) => (
          <Card key={pos.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{pos.position_code}</p>
              <p className="text-sm text-gray-500">{pos.position_name}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditing(pos.id);
                  setForm({
                    code: pos.position_code,
                    name: pos.position_name,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(pos.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
