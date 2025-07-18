import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Edit,
  Trash2,
  UserPlus,
  Search,
  MoreHorizontal,
  Plus,
  Grid,
  List,
  Hash,
  Calendar,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import {
  useBorrowBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/api/baseApi";
import Loading from "@/components/loading/loading";
import type { IBook } from "@/types";
import Swal from "sweetalert2";

const BooksPage = () => {
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [deleteBook, { isLoading: deleteBookLoading }] =
    useDeleteBookMutation();

  useEffect(() => {
    if (data?.data) {
      setBooks(data.data);
    }
  }, [data]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [borrowFormData, setBorrowFormData] = useState({
    quantity: 1,
    dueDate: "",
  });
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);
  const [isBorrowLoading, setIsBorrowLoading] = useState(false);
  const [borrowBook, { isLoading: borrowBookLoading }] =
    useBorrowBookMutation();

  // Set default due date to 2 weeks from now
  useState(() => {
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 14);
    setBorrowFormData((prev) => ({
      ...prev,
      dueDate: defaultDueDate.toISOString().split("T")[0],
    }));
  });

  const filteredBooks = books?.filter(
    (book: IBook) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Do you want to delete this book?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteBook(id).unwrap();
          if (res.success) {
            Swal.fire(`${res.message}`, "", "success");
          } else {
            Swal.fire(`${res.message}`, "", "error");
          }
        } catch (error) {
          Swal.fire("Failed to delete the book", "", "error");
        }
      }
    });
  };

  const handleBorrow = (book: IBook) => {
    setSelectedBook(book);
    setIsBorrowDialogOpen(true);
  };

  const handleBorrowSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formDataObj = new FormData(formElement);
    const quantity = Number(formDataObj.get("quantity"));
    const dueDate = formDataObj.get("dueDate") as string;

    if (quantity > selectedBook?.copies) {
      toast.error("Quantity exceeds available copies!");
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date!");
      return;
    }

    setIsBorrowLoading(true);

    try {
      const borrowData = {
        id: selectedBook?._id,
        quantity,
        dueDate,
      };
      console.log(borrowData);

      const res = await borrowBook(borrowData).unwrap();

      if (res.success) {
        setIsBorrowDialogOpen(false);
        Swal.fire({
          title: `${res.message}`,
          icon: "success",
        });
        navigate("/borrow-summary");
      } else {
        Swal.fire({
          title: `${res.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire("Failed to borrow the book", "", "error");
    } finally {
      setIsBorrowLoading(false);
    }
  };

  const handleBorrowInputChange = (field: string, value: string | number) => {
    setBorrowFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading || deleteBookLoading || borrowBookLoading) return <Loading />;
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Book Collection</h1>
          <p className="text-muted-foreground">
            Manage your library's book inventory and track availability.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/create-book">
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </Link>
        </Button>
      </div>

      {/* Search and View Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books by title, author, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}>
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}>
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Books Display */}
      {viewMode === "table" ? (
        <Card>
          <CardHeader>
            <CardTitle>All Books ({filteredBooks?.length || 0})</CardTitle>
            <CardDescription>
              Complete list of books in your library collection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Copies</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks?.map((book: IBook, index) => (
                    <TableRow
                      key={index}
                      className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        <Link
                          to={`/books/${book._id}`}
                          className="hover:text-primary transition-colors">
                          {book.title}
                        </Link>
                      </TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.genre}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {book.isbn}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{book.copies}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={book.available ? "default" : "destructive"}>
                          {book.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/books/${book._id}`}>
                                <BookOpen className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/edit-book/${book._id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Book
                              </Link>
                            </DropdownMenuItem>
                            {book.available && (
                              <DropdownMenuItem
                                onClick={() => handleBorrow(book)}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Borrow Book
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => {
                                if (book?._id) {
                                  handleDelete(book._id);
                                }
                              }}
                              className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Book
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book: IBook, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge
                    variant={book.available ? "default" : "destructive"}
                    className="mb-2">
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/books/${book._id}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/edit-book/${book._id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Book
                        </Link>
                      </DropdownMenuItem>
                      {book.available && (
                        <DropdownMenuItem onClick={() => handleBorrow(book)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Borrow Book
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => {
                          if (book?._id) {
                            handleDelete(book._id);
                          }
                        }}
                        className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Book
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-lg leading-tight">
                  <Link
                    to={`/books/${book._id}`}
                    className="hover:text-primary transition-colors">
                    {book.title}
                  </Link>
                </CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Genre:</span>
                    <span>{book.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Copies:</span>
                    <Badge variant="secondary">{book.copies}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ISBN:</span>
                    <span className="font-mono text-xs">{book.isbn}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredBooks?.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding your first book."}
            </p>
            <Button asChild>
              <Link to="/create-book">
                <Plus className="mr-2 h-4 w-4" />
                Add New Book
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Borrow Book Dialog */}
      <Dialog open={isBorrowDialogOpen} onOpenChange={setIsBorrowDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              Fill in the borrowing details for "{selectedBook?.title}"
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBorrowSubmit} className="space-y-4">
            {/* Book Info */}
            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <h4 className="font-medium">{selectedBook?.title}</h4>
              <p className="text-sm text-muted-foreground">
                by {selectedBook?.author}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span>Available Copies:</span>
                <Badge variant="secondary">{selectedBook?.copies}</Badge>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label
                htmlFor="borrow-quantity"
                className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Quantity *
              </Label>
              <Input
                id="borrow-quantity"
                name="quantity"
                type="number"
                max={selectedBook?.copies}
                value={borrowFormData.quantity}
                onChange={(e) =>
                  handleBorrowInputChange(
                    "quantity",
                    Number.parseInt(e.target.value) || 1
                  )
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Maximum {selectedBook?.copies} copies available
              </p>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label
                htmlFor="borrow-dueDate"
                className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Due Date *
              </Label>
              <Input
                id="borrow-dueDate"
                name="dueDate"
                type="date"
                value={borrowFormData.dueDate}
                onChange={(e) =>
                  handleBorrowInputChange("dueDate", e.target.value)
                }
                required
                min={new Date().toISOString().split("T")[0]}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Select when you plan to return the book
              </p>
            </div>

            {/* Summary */}
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <h4 className="font-semibold text-sm">Borrowing Summary</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Book:</span>
                  <span className="font-medium">{selectedBook?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">
                    {borrowFormData.quantity} copy(ies)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span className="font-medium">
                    {borrowFormData.dueDate
                      ? new Date(borrowFormData.dueDate).toLocaleDateString()
                      : "Not set"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isBorrowLoading}
                className="flex-1 cursor-pointer">
                {isBorrowLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Borrow Book
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsBorrowDialogOpen(false)}
                className="flex-1 bg-transparent cursor-pointer">
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BooksPage;
