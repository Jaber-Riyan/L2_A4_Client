import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import Loading from "@/components/loading/loading";
import type { IBook } from "@/types";
import Swal from "sweetalert2";

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: dataLoading } = useGetBookQuery(id);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IBook | null>(null);
  const [updateBook, { isLoading: updateBookLoading }] =
    useUpdateBookMutation();

  useEffect(() => {
    if (data?.data) {
      setFormData(data.data);
    }
  }, [data]);

  const handleInputChange = (
    field: keyof IBook,
    value: string | number | boolean
  ) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsLoading(true);

    // Normally you'd call an update mutation here...
    const res = await updateBook(formData).unwrap();
    console.log(res);

    if (res.success) {
      setFormData(null);
      Swal.fire({
        title: `${res.message}`,
        icon: "success",
      });
    }

    setIsLoading(false);
    navigate(`/books`);
  };

  if (dataLoading || isLoading || !formData || updateBookLoading)
    return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Book
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Edit Book</h1>
          <p className="text-muted-foreground">
            Update the book information below.
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
          <CardDescription>
            Make changes to the book details and save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => handleInputChange("genre", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange("isbn", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies *</Label>
                <Input
                  id="copies"
                  type="number"
                  min="0"
                  value={formData.copies}
                  onChange={(e) =>
                    handleInputChange("copies", Number(e.target.value))
                  }
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Setting copies to 0 will mark the book as unavailable.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="available">Available for Borrowing</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) =>
                      handleInputChange("available", checked)
                    }
                  />
                  <Label
                    htmlFor="available"
                    className="text-sm text-muted-foreground">
                    {formData.available === true
                      ? "Available"
                      : "Not Available"}
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
