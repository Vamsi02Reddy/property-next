import connectDB from "../../../../config/database";
import Property from "../../../../models/Property";


export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const { id } =await params;

    const property = await Property.findById(id);

    if (!property) {
      return new Response("No Property Found!", { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response("Server Error", { status: 500 });
  }
};