import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, Input, LinearProgress } from "@mui/joy";
import Content from "../components/Content";
import Repo from "../repositories";
import Header from "../components/Header";

function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(""); // ✅ สำหรับ debounce
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Repo.users.getAll({ name: debouncedTerm });
      setUsers(res?.rows || []);
    } catch (error) {
      console.error("Error", error?.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-4">
      <Header />
      <Card>
        <CardContent>
          <div>Search Box</div>
          <Input
            placeholder="Input Some Search Word"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            You Search{" "}
            <span className="text-blue-500">{debouncedTerm || "ทั้งหมด"}</span>
          </div>
        </CardContent>

        {loading ? (
          <LinearProgress />
        ) : (
          <Content users={users} onActionSuccess={fetchData} />
        )}
      </Card>
    </div>
  );
}

export default UserList;
