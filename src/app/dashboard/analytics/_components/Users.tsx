"use client";

import { userDetailsResponse } from "@/app/api/getUserDetails/route";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Users: React.FC = () => {
  const [users, setUsers] = useState<userDetailsResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { toast } = useToast();

  // Debounced API call function
  const fetchUsers = useCallback(
    async (query: string) => {
      try {
        const response = await axios.get(`/api/getUserDetails`, {
          params: { searchQuery: query }, // assuming backend supports a 'search' query param
        });
        setUsers(response.data.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong while fetching users.",
        });
      }
    },
    [toast]
  );

  // Debounce effect for search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 500); // Adjust debounce delay as needed

    // Cleanup function to clear timeout if query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchUsers]);

  return (
    <>
      <Input
        className="max-w-lg"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search users..."
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-start">Phone</TableHead>
            <TableHead className="text-start">Website</TableHead>
            <TableHead className="text-start">Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-start">{user.phone}</TableCell>
              <TableCell className="text-start">{user.website}</TableCell>
              <TableCell className="text-start">{user.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <TableRow className="font-bold">
            <TableCell colSpan={5} className="text-start ">
              Total
            </TableCell>
            <TableCell className="">{users.length} Users</TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </>
  );
};

export default Users;
