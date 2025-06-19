/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  icon: string;
}

interface ServiceForm extends Omit<Service, 'id' | 'features'> {
  features: string; // For form input as comma-separated string
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<ServiceForm>({ 
    title: '',
    description: '',
    duration: '',
    price: '',
    features: '',
    icon: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("access_token");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/services/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      toast.error("Failed to load services");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.duration || !form.price) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:8000/services/${editingId}`
        : "http://localhost:8000/services/";

      const payload = {
        ...form,
        features: form.features.split(',').map(f => f.trim()).filter(f => f)
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      
      toast.success(`Service ${editingId ? "updated" : "added"} successfully`);
      setForm({ 
        title: '',
        description: '',
        duration: '',
        price: '',
        features: '',
        icon: ''
      });
      setEditingId(null);
      await fetchServices();
    } catch (err) {
      toast.error("Failed to save service");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    try {
      const res = await fetch(`http://localhost:8000/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error("Failed to delete");
      
      toast.success("Service deleted successfully");
      await fetchServices();
    } catch (err) {
      toast.error("Could not delete service");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Duration"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <Input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <Input
          placeholder="Icon (e.g., Shield)"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />
        <Input
          className="col-span-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Input
          className="col-span-full"
          placeholder="Features (comma-separated)"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />
        <Button 
          onClick={handleSubmit} 
          className="col-span-full"
          disabled={submitting}
        >
          {submitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : editingId ? (
            "Update Service"
          ) : (
            "Add Service"
          )}
        </Button>
      </div>

      <div className="overflow-auto rounded shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No services found
                </TableCell>
              </TableRow>
            ) : (
              services.map((srv) => (
                <TableRow key={srv.id}>
                  <TableCell>{srv.title}</TableCell>
                  <TableCell>{srv.duration}</TableCell>
                  <TableCell>{srv.price}</TableCell>
                  <TableCell>{srv.icon}</TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setForm({ 
                          ...srv, 
                          features: srv.features.join(", ") 
                        });
                        setEditingId(srv.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(srv.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminServices;