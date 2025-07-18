import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, BookOpen } from "lucide-react";
import { toast } from "sonner";
import PrivateRoutes from "@/routes/privateRoutes/PrivateRoutes";
import Loading from "@/components/loading/loading";
import type { IBook } from "@/types";
import { useGetBookQuery } from "@/redux/api/baseApi";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setBook(data?.data);
    } catch (err) {
      toast.error("Failed to load book details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, data?.data]);

  if (isLoading || loading) return <Loading />;
  if (!book)
    return (
      <p className="text-center py-10 text-red-500 text-3xl min-h-[90vh] flex justify-center items-center">
        <span>Book not found :(</span>
      </p>
    );

  return (
    <PrivateRoutes>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/books">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-muted-foreground text-lg">by {book.author}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to={`/edit-book/${book._id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-[3/4] max-w-sm mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <BookOpen className="h-16 w-16 mx-auto text-primary/60" />
                    <p className="text-sm text-muted-foreground">Book Cover</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Availability
                  <Badge variant={book.available ? "default" : "destructive"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Copies Available:
                  </span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {book.copies}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Genre:</span>
                    <span className="font-medium">{book.genre}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ISBN:</span>
                    <span className="font-mono text-sm">{book.isbn}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  asChild
                  className="w-full bg-transparent">
                  <Link to={`/edit-book/${book._id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Book Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PrivateRoutes>
  );
}
