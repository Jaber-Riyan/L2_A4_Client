import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, TrendingUp, Users, Calendar } from "lucide-react";
import { Link } from "react-router";
import { useBorrowedSummaryQuery } from "@/redux/api/baseApi";
import Loading from "@/components/loading/loading";

export default function BorrowSummaryPage() {
  const { data, isLoading } = useBorrowedSummaryQuery(undefined, {
    pollingInterval:3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const stateData = data?.data;
  console.log(stateData);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Borrow Summary</h1>
          <p className="text-muted-foreground">
            Overview of all borrowed books and borrowing statistics.
          </p>
        </div>
        <Button asChild>
          <Link to="/books">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse Books
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stateData.totalBooks}</div>
            <p className="text-xs text-muted-foreground">Books in collection</p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Borrowings
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stateData.totalBorrowings}
            </div>
            <p className="text-xs text-muted-foreground">All-time borrowings</p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-150">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stateData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Users on this system
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Books
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stateData.availableBooks}</div>
            <p className="text-xs text-muted-foreground">
              Books available to borrow
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Borrow Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Some Borrowing Books Statistics</CardTitle>
          <CardDescription>
            Detailed breakdown of borrowing activity for each book in your
            collection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead className="text-center">Total Borrowed</TableHead>
                  <TableHead className="text-center">
                    Available Copies
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stateData &&
                  stateData.sortByTotalBorrowed.slice(0, 4).map((book:any) => (
                    <TableRow
                      key={book._id}
                      className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        <Link
                          to={`/books/${book._id}`}
                          className="hover:text-primary transition-colors">
                          {book.title}
                        </Link>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {book.isbn}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="font-semibold">
                          {book.totalBorrowed}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            book.availableCopies > 0 ? "default" : "destructive"
                          }>
                          {book.availableCopies}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            book.availableCopies > 0 ? "default" : "destructive"
                          }>
                          {book.availableCopies > 0
                            ? "Available"
                            : "Unavailable"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Popular Books */}
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Books</CardTitle>
          <CardDescription>
            Books with the highest borrowing activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stateData &&
              stateData.sortByTotalBorrowed
                .slice(0, 3)
                .map((book:any, index: number) => (
                  <div
                    key={book._id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <span className="text-sm font-bold text-primary">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          ISBN: {book.isbn}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {book.totalBorrowed}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        total borrows
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {stateData && stateData.sortByTotalBorrowed.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No borrowing activity yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start borrowing books to see your borrowing summary here.
            </p>
            <Button asChild>
              <Link to="/books">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Books
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
