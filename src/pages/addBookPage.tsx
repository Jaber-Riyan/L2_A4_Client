import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, BookPlus, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PrivateRoutes from "@/routes/privateRoutes/PrivateRoutes";
import Swal from "sweetalert2";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import Loading from "@/components/loading/loading";

export default function CreateBookForm() {
  const [createBook, { isLoading: createBookLoading }] =
    useCreateBookMutation();
    const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await createBook(formData).unwrap();
    if (res.success) {
      Swal.fire({
        title: `${res.message}`,
        icon: "success",
      });
    }

    navigate("/books")
    setIsLoading(false);
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading || createBookLoading) return <Loading />;

  return (
    <PrivateRoutes>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/books">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
            <p className="text-muted-foreground">
              Add a new book to your library collection.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookPlus className="h-5 w-5" />
              Book Information
            </CardTitle>
            <CardDescription>
              Fill in the details below to add a new book to your library.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter book title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  placeholder="Enter author name"
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
                    placeholder="e.g., Fiction, Non-fiction"
                    value={formData.genre}
                    onChange={(e) => handleInputChange("genre", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN *</Label>
                  <Input
                    id="isbn"
                    placeholder="978-0-123456-78-9"
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
                  placeholder="Enter a brief description of the book"
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
                      handleInputChange("copies", parseInt(e.target.value) || 0)
                    }
                    required
                  />
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
                      {formData.available ? "Available" : "Not Available"}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Book...
                    </>
                  ) : (
                    <>
                      <BookPlus className="mr-2 h-4 w-4" />
                      Add Book
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="flex-1 bg-transparent">
                  <Link to="/books">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PrivateRoutes>
  );
}
