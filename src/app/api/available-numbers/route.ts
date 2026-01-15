import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") || "";
  
  try {
    // Fetch available numbers from inventory
    const query = supabase
      .from("number_inventory")
      .select("id, e164, prefix, area_name, monthly_cost_gbp")
      .eq("status", "available")
      .is("allocated_to_org", null)
      .order("prefix", { ascending: true })
      .order("e164", { ascending: true })
      .limit(50);
    
    // Filter by prefix if provided
    if (prefix) {
      query.like("prefix", `${prefix}%`);
    }
    
    const { data: numbers, error } = await query;
    
    if (error) {
      console.error("Error fetching available numbers:", error);
      return NextResponse.json(
        { error: "Failed to fetch available numbers" },
        { status: 500 }
      );
    }
    
    // Group by area code
    const grouped = numbers?.reduce((acc: any, num: any) => {
      const areaName = num.area_name || "Other";
      if (!acc[areaName]) {
        acc[areaName] = [];
      }
      acc[areaName].push(num);
      return acc;
    }, {});
    
    return NextResponse.json({
      numbers: numbers || [],
      grouped: grouped || {},
      total: numbers?.length || 0,
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
