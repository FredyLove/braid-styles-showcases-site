/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Checkbox 
} from "@/components/ui/checkbox";
import { 
  Loader2, 
  PlusCircle, 
  Trash2, 
  Home, 
  Youtube, 
  Pencil 
} from "lucide-react";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";

const difficulties = ["Beginner", "Intermediate", "Advanced", "All Levels"];

type Tutorial = {
  id: number;
  title: string;
  description: string;
  video_id: string;
  duration: string;
  difficulty: string;
  show_on_homepage: boolean;
};

const AdminTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [newTutorial, setNewTutorial] = useState<Omit<Tutorial, "id">>({
    title: "",
    description: "",
    video_id: "",
    duration: "",
    difficulty: "Beginner",
    show_on_homepage: true,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const token = localStorage.getItem("access_token");

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/tutorials/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch tutorials");
      const data = await res.json();
      setTutorials(data);
    } catch (error) {
      toast.error("Failed to load tutorials");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateTutorial = async () => {
    if (!newTutorial.title || !newTutorial.video_id || !newTutorial.duration) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8000/tutorials/${editingId}`
      : "http://localhost:8000/tutorials/";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTutorial),
      });

      if (!res.ok) throw new Error("Failed to save tutorial");

      toast.success(`Tutorial ${editingId ? "updated" : "created"} successfully`);
      setNewTutorial({
        title: "",
        description: "",
        video_id: "",
        duration: "",
        difficulty: "Beginner",
        show_on_homepage: true,
      });
      setEditingId(null);
      await fetchTutorials();
    } catch (err) {
      toast.error("Error saving tutorial");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (tutorial: Tutorial) => {
    setEditingId(tutorial.id);
    setNewTutorial({ ...tutorial });
  };

  const deleteTutorial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tutorial?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:8000/tutorials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Deletion failed");
      toast.success("Tutorial deleted successfully");
      await fetchTutorials();
    } catch (err) {
      toast.error("Failed to delete tutorial");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleHomepage = async (id: number, currentValue: boolean) => {
    try {
      const res = await fetch(`http://localhost:8000/tutorials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ show_on_homepage: !currentValue }),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchTutorials();
      toast.success(`Tutorial ${!currentValue ? "added to" : "removed from"} homepage`);
    } catch (err) {
      toast.error("Failed to update homepage visibility");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Youtube className="h-6 w-6" />
            Manage Tutorials
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Create/Update Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                placeholder="Tutorial title"
                value={newTutorial.title}
                onChange={(e) => setNewTutorial({ ...newTutorial, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Video ID (YouTube) *</Label>
              <Input
                placeholder="YouTube video ID"
                value={newTutorial.video_id}
                onChange={(e) => setNewTutorial({ ...newTutorial, video_id: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration *</Label>
              <Input
                placeholder="e.g. 10:30"
                value={newTutorial.duration}
                onChange={(e) => setNewTutorial({ ...newTutorial, duration: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <Select
                value={newTutorial.difficulty}
                onValueChange={(value) => setNewTutorial({ ...newTutorial, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Detailed tutorial description"
                value={newTutorial.description}
                onChange={(e) => setNewTutorial({ ...newTutorial, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2 md:col-span-2">
              <Checkbox
                id="homepage-toggle"
                checked={newTutorial.show_on_homepage}
                onCheckedChange={(checked) => setNewTutorial({ ...newTutorial, show_on_homepage: Boolean(checked) })}
              />
              <Label htmlFor="homepage-toggle">Show on homepage</Label>
            </div>
            <Button onClick={createOrUpdateTutorial} className="md:col-span-2" disabled={submitting}>
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {editingId ? "Update Tutorial" : "Add Tutorial"}
                </>
              )}
            </Button>
          </div>

          {/* Tutorials Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Homepage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : tutorials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No tutorials found
                    </TableCell>
                  </TableRow>
                ) : (
                  tutorials.map((tutorial) => (
                    <TableRow key={tutorial.id}>
                      <TableCell className="font-medium">{tutorial.title}</TableCell>
                      <TableCell>{tutorial.duration}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tutorial.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                          tutorial.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                          tutorial.difficulty === "Advanced" ? "bg-red-100 text-red-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {tutorial.difficulty}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleHomepage(tutorial.id, tutorial.show_on_homepage)}
                        >
                          <Home className={`h-4 w-4 mr-2 ${tutorial.show_on_homepage ? "text-green-600" : "text-gray-400"}`} />
                          {tutorial.show_on_homepage ? "Visible" : "Hidden"}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => startEditing(tutorial)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteTutorial(tutorial.id)} disabled={deletingId === tutorial.id}>
                          {deletingId === tutorial.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTutorials;
