export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return Response.json({ error: "Query required" }, { status: 400 });
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    q
  )}&format=jsonv2&limit=5`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "property-next"
    }
  });

  const data = await res.json();
//   console.log(data);

  return Response.json(data);
}