import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { task } = await req.json();

  if (!task) {
    return NextResponse.json({ error: "Task is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("todos")
    .insert([{ task, completed: false }])
    .single();

  if (error) {
    console.error("Error inserting todo:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, completed } = await req.json();

  const { data, error } = await supabase
    .from("todos")
    .update({ completed })
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
  
    console.log("Received id:", id);
  
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
  
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .select();
  
    console.log("Deleted rows data:", data);
  
    if (error) {
      console.error("Error deleting todo:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "Todo not found or already deleted" }, { status: 404 });
    }
  
    return NextResponse.json({ message: "Todo deleted successfully" });
  }

export async function GET() {
  const { data, error } = await supabase.from("todos").select();

  if (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
